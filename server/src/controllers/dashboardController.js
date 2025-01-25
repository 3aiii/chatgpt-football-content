const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  SumOfData: async (req, res) => {
    try {
      const SumOfUser = await prisma.user.count();
      const SumOfBlog = await prisma.blog.count();
      const SumOfCategory = await prisma.category.count();

      return res.status(200).send({
        success: true,
        data: {
          SumOfUser,
          SumOfBlog,
          SumOfCategory,
        },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  UserLogData: async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    const skip = (pageNumber - 1) * pageSizeNumber;

    try {
      const logData = await prisma.user_log.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: skip,
        take: pageSizeNumber,
      });

      const totalUserLog = await prisma.user_log.count();
      const totalPages = Math.ceil(totalUserLog / pageSizeNumber);

      return res.status(200).send({
        success: true,
        data: logData,
        pagination: {
          totalUserLog,
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
};
