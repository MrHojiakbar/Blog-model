const express = require('express');
const messageRouter = require('./routes/messages.routes');
const { APP_PORT } = require('./config/app.config');
const app = express();

app.set("view engine","ejs")
app.use(express.text())
app.use(express.urlencoded({ extended: true }));

app.use(messageRouter)


app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`)
});
