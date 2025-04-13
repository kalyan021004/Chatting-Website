const mongoose=require("mongoose");
const Chat=require("./models/chat.js")



main().then(()=>{
    console.log("Connection is succesful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
Chat.insertMany([
    {
        from: "kiran",
        to: "sneha",
        msg: "Good morning, Sneha!",
        created_at: new Date()
    },
    {
        from: "arjun",
        to: "ravi",
        msg: "Did you complete the project?",
        created_at: new Date()
    },
    {
        from: "megha",
        to: "riya",
        msg: "Let's catch up this weekend!",
        created_at: new Date()
    }
]);

