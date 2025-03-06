const { Router } = require("express");
const path = require('node:path');
const fs = require('node:fs');
const filePath=path.join(__dirname,"..","db","data.json")

const messageRouter=Router()

let blog_name="Hojiakbar Blog"


messageRouter.get("/",(req,res)=>{
    let data=JSON.parse(fs.readFileSync(filePath,"utf-8"))
    res.render("index",{blog_name,data})
})

messageRouter.post('/message', (req, res) => {
    if (req.body!="") {
        let data=JSON.parse(fs.readFileSync(filePath,"utf-8"))
        let Mess=req.body
        let newMessage={
            id:data.at(-1)?.id+1||1,
            content:Mess.message
        }
        data.push(newMessage)
        fs.writeFileSync(filePath,JSON.stringify(data,null,4))
    }
    res.redirect("/")
});

messageRouter.post("/delete/:index", (req, res) => {
    let index = +req.params.index
    let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (index >= 0 && index < data.length) { 
        data.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    }

    res.redirect("/");
});

messageRouter.post("/update/:index", (req, res) => {
    let index = +req.params.index
    let data=JSON.parse(fs.readFileSync(filePath,"utf-8"))
    console.log(index)
    if (index >= 0 && index < data.length && req.body!="") {
        let Message=(req.body).message
        data[index].content=Message
        fs.writeFileSync(filePath,JSON.stringify(data,null,4))
    }

    return res.redirect("/");
});

module.exports=messageRouter