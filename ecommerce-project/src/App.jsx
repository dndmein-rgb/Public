import{Routes,Route} from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import Error from './pages/Error'
import { useEffect,useState } from 'react'
import axios from 'axios'
function App() {
    const [cart, setCart] = useState([])
    useEffect(()=>{
      const fetchAppData=async()=>{
         const response=await axios.get('/api/cart-items?expand=product')
         setCart(response.data);
      }
      fetchAppData();
    },[])
       

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/>
      <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
       <Route path="orders" cart={cart} element={<OrdersPage/>}/>
       <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart}/>}/>
       <Route path='*' element={<Error cart ={cart}/>} />
    </Routes>
 
  )
}

export default App
