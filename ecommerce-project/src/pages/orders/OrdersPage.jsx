
import axios from "axios";
import { useState, useEffect,Fragment } from "react";
import "./OrdersPage.css";
import Header from "../../components/Header";
import { Link } from "react-router";
import OrdersGrid from "./OrdersGrid";
const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
const fetchOrdersData=async ()=>{
const response=await axios.get("/api/orders?expand=products")
      setOrders(response.data);
}
   fetchOrdersData();
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders}/>
      </div>
    </>
  );
};

export default OrdersPage;
