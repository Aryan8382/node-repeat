const express = require("express")
const db=require("./config/db")

const B_router = require("./Routes/BookRoute") 
const app = express()

app.use(express.json())

app.use("/book", B_router)


app.listen(8990, () => {
    console.log("server listen")
})