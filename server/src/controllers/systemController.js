const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const prisma = new PrismaClient();

module.exports = {
  getContentWithAi: async (req, res) => {
    const { message } = req.body;

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message,
      });

      return res.status(200).send({
        success: true,
        message: "Successfully get content with AI",
        data: response.data.response,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
  saveLog: async (req, res) => {
    const { message, userId } = req.body;
    console.log(message);
    if (message === undefined || message === null || message === "") {
      return res.send({
        success: false,
        message: "Message is required",
      });
    }
    
    try {
      await prisma.prompLog.create({
        data: {
          userId,
          message,
        },
      });

      return res.status(200).send({
        success: true,
        message: "Successfully save log",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
