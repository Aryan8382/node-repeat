const express=require("express")

const app=express()

app.set("view engine","ejs")
app.use(express.urlencoded())

let student=[
    {
        id:"1",
        name:"abc"    },
    {
        id:"2",
        name:"aryan"
    }
]

app.get("/",(req,res)=>{
    // return res.send("hello")
    res.render("Home",{student})
})

app.post("/insertData",(req,res)=>{
    const {id,name}=req.body
    let obj={
        id,name
    }

    student.push(obj)
    return res.redirect("/")
})


app.get("/delete", (req, res) => {
    const id = req.query.id;

    student = student.filter((el) => el.id !== id);
    
    res.redirect("/");
});

app.get("/update", (req, res) => {
    const id = req.query.id;

    const data = student.find((el) => el.id === id);

    res.render("edit", { data });
});

app.post("/updateData", (req, res) => {
    const { id, name } = req.body;

    student = student.map((el) => {
        if (el.id === id) {
            return { id, name };
        }
        return el;
    });

    res.redirect("/");
});

app.listen(5005,()=>{
console.log("Server running on http://localhost:5005")
})