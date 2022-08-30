const mongoose =require('mongoose')

const productSales=new mongoose.Schema({
    productName:String,
    quantity:Number,
    amount:Number,
    date:String
})

module.exports= mongoose.model('Productsales',productSales)