const pool = require("../config/db.config")

exports.getAllMessages=async (req,res)=>{
    try {
        let blog_name="Hojiakbar Blog"
        const mes=await pool.query(`SELECT * FROM messages;`)
        const data=mes.rows
        res.render("index",{blog_name,data})
    } catch (error) {
        console.error(error);
        res.status(500).send("Server xatosi");
    }
}
exports.createMessage=async(req, res) => {
    try {
        if (req.body.message) {
            let content=req.body.message
            const newMessage=await pool.query(`INSERT INTO messages (content) VALUES ($1)`,[content])
            
        }
        res.redirect("/")
    } catch (error) {
        console.error(error);
        res.status(500).send("Server xatosi");
    }
}
exports.deleteMessage = async (req, res) => {
    try {
        let id = req.params.id; 
        
        await pool.query("DELETE FROM messages WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server xatosi");
    }
};
exports.updateMessage = async (req, res) => {
    try {
        let id = req.params.id;
        let newContent = req.body.message;

        await pool.query("UPDATE messages SET content = $1 WHERE id = $2", [newContent, id]);

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server xatosi");
    }
};
