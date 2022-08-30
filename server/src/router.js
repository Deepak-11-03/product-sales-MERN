const express=require('express')
const router=express.Router()
const productModel=require('./productModel')


module.exports= router.post('/productSales',async (req, res) => {
    try {
        let data = req.body;
        // console.log(data)
        const { productName, quantity, amount } = data
        // if (!productName || !quantity || !amount) {
        //     return res.status(400).send({ msg: 'please enter all datails' })
        // }
        const productData = { productName, quantity, amount ,date:new Date().toLocaleDateString()}
        const sales = await productModel.create(productData);
        // console.log(sales)
        return res.status(201).send(sales)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ msg: err.message })
    }
} )

module.exports=router.get('/topSelling' ,async(req,res)=>{
    try {
        const sales=await productModel.find().sort({quantity:-1})

        return res.status(201).send(sales)
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

module.exports=router.get('/todaySales',async(req,res)=>{
    try {
        const revenue=await productModel.find({date:new Date().toLocaleDateString()})
        let totalRevenue =0;
        for(let i=0;i<revenue.length;i++){
            totalRevenue+=revenue[i].amount
        }
        return res.status(200).send({ msg: 'today sales',data:totalRevenue})
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})