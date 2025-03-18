const { Router } = require("express");
const { getAllMessages, createMessage, deleteMessage, updateMessage } = require("../controllers/message.controller");

const messageRouter=Router()



messageRouter.get("/",getAllMessages)

messageRouter.post('/message',createMessage);

messageRouter.post("/delete/:id",deleteMessage);

messageRouter.post("/update/:id",updateMessage);

module.exports=messageRouter