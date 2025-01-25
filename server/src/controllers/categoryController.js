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
    const { page = 1, pageSize = 1 } = req.query;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    try {
      let categories;
      let totalCategories;

      categories = await prisma.category.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: skip,
        take: pageSizeNumber,
      });

      totalCategories = await prisma.category.count();

      if (categories.length === 0) {
        return res.send({
          succes: false,
          message: "Not found this record",
        });
      }

      const totalPages = Math.ceil(totalCategories / pageSizeNumber);

      return res.status(200).send({
        success: true,
        data: categories,
        pagination: {
          totalCategories,
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
    const { cateId } = req.params;

    try {
      const data = await prisma.category.findUnique({
        where: { id: parseInt(cateId) },
      });

      if (!data) {
        return res.send({
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
