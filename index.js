const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Product = require("./Model/products")

mongoose
        .connect("mongodb://localhost:27017/sarah-shop")
        .then(()=>console.log("DB connection is successful"))
        .catch((err)=>console.log("DB error", err))


app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.post("/products", async(req, res)=>{
    console.log(req.body)

    const {name, productsID, description, image, price, feedback} = req.body;

    if(!name || !productsID || !description || !image || !price){
        return res.status(400).json({
            status: "error",
            message: "Failed to create product"
        })
    }

    await Product.create({
         name,
         productsID, 
         description, 
         image, 
         price, 
         feedback
    })

    return res.status(200).json({
        status: "success",
        message: "Product created successfully"
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})