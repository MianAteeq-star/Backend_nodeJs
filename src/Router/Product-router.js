const express = require('express');
const mongoose = require('mongoose');
const router= express.Router();
const  Products = require("../Model/Product_model")


// Read Products
router.get("/getProduct", async(req,res)=>{
const product= await Products.find()
res.json(product)
console.log(product);

});


// Create Products


router.post("/createProduct", async(req,res)=>{
try {
    const productData= new Products({
        _id : new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        tags:req.body.tags,
        specification: req.body.specification,
     
        });
 
    const proData= await productData.save()
    
    if(!proData){
        return res.status(404).json({message: "Product not found"})
    }
    return res.status(200).json({message:"Product saved Successfully", proData:proData})
} catch (error) {
    return res.status(500).json({message:error.message})
}
});


// Delete Products
router.delete("/deleteProduct/:id",async (req,res)=>{
try {
    const  proId= req.params.id
    const deleteProduct = await Products.findByIdAndRemove(proId)
    if(!deleteProduct){
        return res.status(404).json({message:"Product not found"})
    }
    return res.status(200).json({message:"Product deleted successfully"})
} catch (error) {
 return  res.status(500).json({message:error.message}) 
}
})



// Update product

router.put("/updateProduct/:id",async (req,res)=>{
 try {
    const updId= req.params.id;
    const productToBeUpdated= new Products({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        tags:req.body.tags,
        specification: req.body.specification
    })
    const update= await Products.findByIdAndUpdate(updId, productToBeUpdated,{new:true});
    if(!update){
        return res.status(404).json({messsage: "Product not Found"})

    }
    return res.status(200).json({messsage:"Product updated successfully"}) 
    console.log("update :",update);
 } catch (error) {
    return res.status(500).json({messsage: error.message}) 
 }
})


module.exports = router