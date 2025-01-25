const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    const { name, content, userId, cateId } = req.body;

    try {
      const blog = await prisma.blog.create({
        data: {
          name,
          content,
          user_id: userId,
          categoryId: parseInt(cateId),
        },
      });

      return res.status(201).send({
        succes: true,
        message: "Created blog already!",
        data: blog.id,
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  gets: async (req, res) => {
    const { search, page = 1, pageSize = 10 } = req.query;

    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    try {
      let blogs;
      let totalBlogs;

      if (search) {
        blogs = await prisma.blog.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            content: true,
            image: true,
            createdAt: true,
            Category: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                fname: true,
                lname: true,
                email: true,
                tel: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: pageSizeNumber,
        });

        totalBlogs = await prisma.blog.count({
          where: {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
            ],
          },
        });
      } else {
        blogs = await prisma.blog.findMany({
          select: {
            id: true,
            name: true,
            content: true,
            image: true,
            createdAt: true,
            Category: true,
            user: {
              select: {
                id: true,
                username: true,
                fname: true,
                lname: true,
                email: true,
                tel: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: pageSizeNumber,
        });

        totalBlogs = await prisma.blog.count();
      }

      if (blogs.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Not found this record",
        });
      }

      const totalPages = Math.ceil(totalBlogs / pageSizeNumber);

      return res.status(200).send({
        success: true,
        data: blogs,
        pagination: {
          totalBlogs,
          totalPages,
          currentPage: pageNumber,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  get: async (req, res) => {
    const { blogId } = req.params;

    try {
      const data = await prisma.blog.findUnique({
        where: { id: parseInt(blogId) },
      });

      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Not found blog",
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
  recommend: async (req, res) => {
    // wait to rating score from phase 3 or 4
  },
  delete: async (req, res) => {
    const { blogId } = req.params;

    try {
      const blog = await prisma.blog.findUnique({
        where: {
          id: blogId,
        },
      });

      if (blog.count === 0) {
        return res.status(400).send({
          succes: false,
          message: "No blog to delete",
        });
      }

      await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          status: "HIDDEN",
        },
      });

      return res.status(200).send({
        succes: true,
        message: "Deleted post already!",
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    const { name, content, categoryId } = req.body;
    const { blogId } = req.params;

    try {
      await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          name,
          content,
          categoryId,
        },
      });

      return res.status(200).send({
        succes: true,
        message: "Updated succesfully!",
      });
    } catch (error) {
      return res.staus(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  uploadImg: async (req, res) => {
    const { blogId } = req.params;
    const { file } = req;

    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: {
          image: file.filename,
        },
      });

      return res.status(200).send({
        success: true,
        message: "Upload image successfully!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
