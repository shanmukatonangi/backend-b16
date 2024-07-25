const express= require("express")
const app =express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const AuthRoute = require("./routes/Auth")
const PostRoute = require("./routes/Posts")

//database connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://b16:b16@cluster0.ihr5bwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',console.log("DB CONNECTED"));
}

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))




app.use("/api/users",userRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/post",PostRoute)





app.listen(8900,()=>{
    console.log("server is running on port 8900")
})