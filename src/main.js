const path = require("node:path");
const express = require('express');
const messageRouter = require('./routes/messages.routes');
const { APP_PORT } = require('./config/app.config');
const create_tables = require('./model/db.model');

const app = express();

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.text())
app.use(express.urlencoded({ extended: true }));

create_tables().then(data => console.log(data)).catch(err=>{
    console.log(err.message);
    process.exit(1);
  })

app.use(messageRouter)

app.all("/*",(req,res)=>{
  res.status(404).send({
    message: `Given URL: ${req.url} is not found`
  })
})

app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`)
});
