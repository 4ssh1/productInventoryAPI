const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;
const Product = require("./Model/products")

mongoose
        .connect("mongodb://localhost:27017/sarah-shop")
        .then(()=>console.log("DB connection is successful"))
        .catch((err)=>console.log("DB error", err))


app.use(express.json())

app.get("/products", async(req,res)=>{
    try {
        const allProducts = await Product.find()
        return res.status(200).json({
            status: "success",
            message: "Products retrieved",
            data : allProducts
        })
    } catch (error) {
        return res.status(500).json({
            status: "error ",
            message: "internal server error",
            error
        })
    }
})

app.patch("/products/:id", async(req,res)=>{
    const {id} = req.params;
    const {name, productsID, description, image, price, feedback} = req.body
    const products = await Product.findByIdAndUpdate(id, {
        name, productsID, description, image, price, feedback
    })

    res.status(200).json({
        status: "success",
        message: "product updated successfully",
        data: products
    })
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

app.delete("/products/:id", async(req, res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id)    
    res.status(200).json({
        status: "success",
        message: "Product deleted successfully"
    })
})

app.get("/products/:id", async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        return res.status(400).json({
            status: "failed",
            message: "product not found"
        })
    }

    res.status(200).json({
        status: "successful",
        message: "Product found successfully",
        data: product
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})