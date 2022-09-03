import { React, useState,useEffect } from "react";
// import axios from 'axios';
import "./ProductSales.css";

export default function ProductSales() {

  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    amount: "",
  });

  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setProduct({ ...product, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { productName, quantity, amount } = product;

    if (productName === "" || quantity === "" || amount === "") {
      alert("please enter details");
    } else {
      const data = await fetch("/productSales", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          quantity,
          amount,
        }),
      });

      if (data) {
        alert("registered");
        setProduct({productName:'',quantity:'',amount:''})
      }
    }
  };



  
  const [products, setData] = useState([]);

  useEffect(() => {
    getProducts();
  },[]);

  const getProducts = async () => {
    try {
      let data = await fetch("/topSelling");
      data = await data.json();
      setData(data)

    } catch (err) {
      console.log(err.message);
    }
  };


  const [sales, todayData] = useState([]);

  useEffect(() => {
    todaySales();
  },[]);

  const todaySales =async ()=>{
    try {
      let data = await fetch("/todaySales");
      data = await data.json();
      todayData(data)


    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
    <div className="header">
       <h1>Product sales management</h1>
      </div>
      <div className="main">
      
        <form method="post">
        <h1>Add Sales</h1>
          <input
            type="text"
            name="productName"
            placeholder="productName"
            value={product.productName}
            onChange={handleInput}
            autoFocus
          />
          <input
            type="number"
            name="quantity"
            placeholder="quantity"
            value={product.quantity}
            onChange={handleInput}
          />
          <input
            type="number"
            name="amount"
            placeholder="amount"
            value={product.amount}
            onChange={handleInput}
          />
          <br />
          <button type="submit" onClick={postData} id="add">
            Add details
          </button>
        </form>
          <div className="data">
              <button onClick={getProducts}>Refresh Top Sales</button>
              <div className="show-data">
                <br />
                <h2>Top Product Sales</h2>
                <br />
                <ul className="fieldName">
                  <li>product</li>
                  <li>quantity</li>
                  <li>amount</li>
                </ul>
                {products.slice(0 ,5).map((item, index) => 
                  <ul key={item._id}>
                    <li>{item.productName}</li>
                    <li>{item.quantity}</li>
                    <li>{item.amount}</li>
                  </ul>
                )}
                <br />
                
              </div>
              <button onClick={todaySales}> Refresh Today's revenue</button>
                 <br /><br />
                 <div className='revenu'>
                 {sales.data}
                 </div>
            </div> 
      </div>
    </div>
  );
}
