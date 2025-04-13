const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Chat=require("./models/chat.js")
const path=require("path");
const methodOverride=require("method-override")
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("Connection is succesful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://mongo:VgHQvTbfRKSuJqYxHAhmFbpKXSAxmOJd@yamanote.proxy.rlwy.net:17077');

}


app.listen(8080,()=>{
    console.log("Server is istening");
});


app.get("/",(req,res)=>{
    res.send("we are on root path ")
});
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats})
    
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then(res=>{
        console.log("chat was saved")
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");


});
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {
            msg:newMsg
        },
        {
          runValidators:true,new:true  
        }

    )
    res.redirect("/chats");
})
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    
    let chat=await Chat.findById(id)
    res.render("edit.ejs",{ chat })
})
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats")

})