const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {},
  logout: async (req, res) => {
    const { userId } = req.params;

    try {
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    const { username, password, email, tel, role } = req.body;
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
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  gets: async (req, res) => {},
  get: async (req, res) => {
    const { userId } = req.params;

    try {
      const data = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          fname: true,
          lname: true,
          email: true,
          tel: true,
          image: true,
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
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
