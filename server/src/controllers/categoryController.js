const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const existingCategory = await prisma.category.findUnique({
        where: {
          name: name,
        },
      });

      if (existingCategory) {
        return res.status(400).send({
          success: false,
          message: "category is already exist",
        });
      }

      await prisma.category.create({
        data: {
          name,
        },
      });

      return res.status(201).send({
        success: true,
        message: `created successfully!`,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  gets: async (req, res) => {
    const { page, pageSize } = req.query; // รับค่าจาก query
    const pageNumber = page ? parseInt(page) : null; // ถ้าไม่มีค่า ให้เป็น null
    const pageSizeNumber = pageSize ? parseInt(pageSize) : null;
    const skip =
      pageNumber && pageSizeNumber ? (pageNumber - 1) * pageSizeNumber : 0;

    try {
      let categories;
      let totalCategories;

      // ดึงจำนวนทั้งหมด
      totalCategories = await prisma.category.count();

      // ถ้าไม่มี page และ pageSize ดึงข้อมูลทั้งหมด
      if (!pageNumber || !pageSizeNumber) {
        categories = await prisma.category.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        categories = await prisma.category.findMany({
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: pageSizeNumber,
        });
      }

      if (categories.length === 0) {
        return res.send({
          success: false,
          message: "Not found this record",
        });
      }

      const totalPages = pageSizeNumber
        ? Math.ceil(totalCategories / pageSizeNumber)
        : 1;

      return res.status(200).send({
        success: true,
        data: categories,
        pagination: {
          totalCategories,
          totalPages,
          currentPage: pageNumber || 1,
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
    const { cateName } = req.params;

    try {
      let findCate = await prisma.category.findUnique({
        where: { name: cateName },
      });

      if (!findCate) {
        return res.send({
          success: false,
          message: "Not found Category",
        });
      }

      const blogs = await prisma.blog.findMany({
        where: {
          categoryId: findCate.id,
          status: "ACTIVE"
        },
        include: {
          Category: true,
        },
      });

      return res.status(200).send({
        success: true,
        data: {
          findCate,
          blogs,
        },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    const { cateId } = req.params;
    try {
      await prisma.category.delete({
        where: { id: parseInt(cateId) },
      });

      return res.status(200).send({
        success: true,
        message: `Deleted category successfully!`,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    const { cateId } = req.params;

    try {
      const existingUser = await prisma.category.findUnique({
        where: { id: parseInt(cateId) },
      });

      if (!existingUser) {
        return res.send({
          success: false,
          message: "User not found",
        });
      }

      await prisma.category.update({
        where: { id: parseInt(cateId) },
        data: {
          name,
        },
      });

      return res.status(200).send({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
