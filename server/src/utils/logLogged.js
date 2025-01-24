const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const logLogged = async (userId, username, status, message, ipAddress) => {
  await prisma.user_log.create({
    data: {
      user_id: userId,
      username,
      status,
      message,
    },
  });
};

module.exports = { logLogged };
