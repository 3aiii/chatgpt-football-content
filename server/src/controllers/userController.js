const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { logLogged } = require("../utils/logLogged");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        await logLogged(null, username, "Failed", "No user account found");

        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        await logLogged(user.id, username, "Failed", "Invalid Password");

        return res.status(400).send({
          success: false,
          message: "Incorrect password, please try again",
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          role: user.role,
          tel: user.tel,
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 12 * 60 * 60 * 1000,
      });

      await logLogged(user.id, username, "Success", "Login success");

      return res.status(200).send({
        success: true,
        message: "Login success!",
        token,
        role: user.role,
      });
    } catch (error) {
      await logLogged(user.id, username, "Error", error.message);
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  logout: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!user) {
        res.clearCookie("token", { path: "/" });
        return res.status(200).send({
          success: true,
          message: "User not found.",
        });
      }

      await logLogged(
        user.id,
        user.username,
        "Success",
        "Logged out successfully"
      );

      res.clearCookie("token");

      return res.status(200).send({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error) {
      await logLogged(user.id, user.username, "Error", error.message);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    const { username, password, fname, lname, email, tel, role } = req.body;

    try {
      const existingUsername = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      // Check existing user
      if (existingUsername) {
        return res.status(400).send({
          success: false,
          message: "username is already exist",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashPassword,
          email,
          fname,
          lname,
          tel,
          role,
        },
      });

      return res.status(201).send({
        success: true,
        message: `created successfully!`,
        userId: user.id,
      });
    } catch (error) {
      if (error?.meta?.target === "User_username_key") {
        return res.status(400).send({
          success: false,
          message: "This email is already taken",
        });
      } else if (error?.meta?.target === "User_email_key") {
        return res.status(400).send({
          success: false,
          message: "This email is already taken",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    }
  },
  gets: async (req, res) => {
    const { search, page = 1, pageSize = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    try {
      let users;
      let totalUsers;

      if (search) {
        users = await prisma.user.findMany({
          where: {
            OR: [
              {
                username: {
                  contains: search,
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: pageSizeNumber,
          select: {
            id: true,
            username: true,
            email: true,
            tel: true,
            fname: true,
            lname: true,
            createdAt: true,
            role: true,
          },
        });

        totalUsers = await prisma.user.count({
          where: {
            OR: [
              {
                username: {
                  contains: search,
                },
              },
            ],
          },
        });
      } else {
        users = await prisma.user.findMany({
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: pageSizeNumber,
          select: {
            id: true,
            username: true,
            email: true,
            tel: true,
            fname: true,
            lname: true,
            createdAt: true,
            role: true,
          },
        });

        totalUsers = await prisma.user.count();
      }

      if (users.length === 0) {
        return res.send({
          succes: false,
          message: "Not found this record",
        });
      }

      const totalPages = Math.ceil(totalUsers / pageSizeNumber);

      return res.status(200).send({
        success: true,
        data: users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage: pageNumber,
        },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  get: async (req, res) => {
    const { userId } = req.params;

    try {
      const data = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: {
          id: true,
          username: true,
          fname: true,
          lname: true,
          email: true,
          tel: true,
          role: true,
        },
      });

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Not found user",
        });
      }

      return res.status(200).send({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    const { userId } = req.params;
    const { username, password, fname, lname, email, tel, role } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!existingUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      const hashPassword = password
        ? await bcrypt.hash(password, 10)
        : existingUser.password;

      const updateData = {
        username,
        password: hashPassword,
        fname,
        lname,
        email,
        tel: tel,
      };

      if (req.body.role === "ADMIN") {
        updateData.role = role;
      }

      // Perform the update
      const updateUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: updateData,
      });

      if (!updateUser) {
        return res.status(400).send({
          success: false,
          message: "Unable to update the user data",
        });
      }

      return res.status(200).send({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      if (error.meta?.target === "tbl_User_username_key") {
        return res.status(400).send({
          success: false,
          message: "This username is already taken",
        });
      } else if (error.meta?.target === "tbl_User_email_key") {
        return res.status(400).send({
          success: false,
          message: "This email is already taken",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    }
  },
  delete: async (req, res) => {
    const { userId } = req.params;

    try {
      await prisma.user.delete({
        where: { id: parseInt(userId) },
      });

      // await prisma.blog.delete({
      //   where: {
      //     user_id: parseInt(userId),
      //   },
      // });

      return res.status(200).send({
        success: true,
        message: `Deleted user successfully!`,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
