const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

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
        success: true,
        message: "Created blog already!",
        data: blog.id,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  gets: async (req, res) => {
    const { search, page = 1, pageSize = 100 } = req.query;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    let dynamicStatus = {
      OR: [{ status: "ACTIVE" }],
    };

    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded?.role === "ADMIN") {
        dynamicStatus = {
          OR: [{ status: "ACTIVE" }, { status: "HIDDEN" }],
        };
      }
    }

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
                ...(dynamicStatus && dynamicStatus),
              },
            ],
          },
          select: {
            id: true,
            name: true,
            content: true,
            image: true,
            createdAt: true,
            status: true,
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
          where: {
            ...(dynamicStatus && dynamicStatus),
          },

          select: {
            id: true,
            name: true,
            content: true,
            image: true,
            createdAt: true,
            Category: true,
            status: true,
            _count: {
              select: {
                Comment: true,
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
            ...(dynamicStatus && dynamicStatus),
          },
        });
      }

      for (let blog of blogs) {
        const aggregationRating = await prisma.rating.aggregate({
          where: {
            blogId: blog.id,
          },
          _avg: {
            rating: true,
          },
        });

        blog.averageRating = aggregationRating._avg.rating || 0;
      }

      if (blogs.length === 0) {
        return res.send({
          success: false,
          message: "Not found this record",
        });
      }

      const totalPages = Math.ceil(totalBlogs / pageSizeNumber);

      return res.status(200).send({
        success: true,
        data: blogs,
        rating: blogs.averageRating,
        pagination: {
          totalBlogs,
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
    const { blogId } = req.params;

    try {
      const data = await prisma.blog.findUnique({
        where: { id: blogId },
        include: {
          Category: true,
          Rating: true,
        },
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
      let dynamicStatus;

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

      if (blog.status === "HIDDEN") {
        dynamicStatus = {
          status: "ACTIVE",
        };
      } else {
        dynamicStatus = {
          status: "HIDDEN",
        };
      }

      await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          ...(dynamicStatus && dynamicStatus),
        },
      });

      return res.status(200).send({
        success: true,
        message: "Deleted post already!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    const { name, content, cateId } = req.body;
    const { blogId } = req.params;
    try {
      await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          name,
          content,
          categoryId: parseInt(cateId),
        },
      });

      return res.status(200).send({
        success: true,
        message: "Updated succesfully!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
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
  getComment: async (req, res) => {
    const { blogId } = req.params;

    try {
      const comments = await prisma.comments.findMany({
        where: {
          blogId,
        },
        select: {
          text: true,
          createdAt: true,
          blogId: true,
          user: {
            select: {
              id: true,
              username: true,
              fname: true,
              lname: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).send({
        success: true,
        data: comments,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  createComment: async (req, res) => {
    const { blogId } = req.params;
    const { userId, text } = req.body;

    try {
      await prisma.comments.create({
        data: {
          text,
          userId,
          blogId,
        },
      });

      return res.status(201).send({
        success: true,
        message: "Created comment already!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  createRating: async (req, res) => {
    const { blogId } = req.params;
    const { rating, userId } = req.body;
    try {
      const ratingExist = await prisma.rating.findFirst({
        where: {
          userId,
          blogId,
        },
      });

      if (ratingExist) {
        await prisma.rating.update({
          where: {
            id: ratingExist?.id,
          },
          data: {
            rating,
          },
        });

        return res.status(201).send({
          success: true,
          message: "rating this blog already!",
        });
      }

      await prisma.rating.create({
        data: {
          rating,
          userId,
          blogId,
        },
      });

      return res.status(201).send({
        success: true,
        message: "rating this blog already!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  removeRating: async (req, res) => {
    try {
      const { blogId } = req.params;
      const { userId } = req.body;

      const ratingExist = await prisma.rating.findFirst({
        where: { userId, blogId },
      });

      await prisma.rating.update({
        where: {
          id: ratingExist?.id,
        },
        data: {
          rating: 0,
        },
      });

      return res.status(200).send({
        success: true,
        message: "Removed rating already!",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
