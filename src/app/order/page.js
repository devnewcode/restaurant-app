'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page=()=>{
    const [userStorage,setUserStorage] = useState(null);
    // Initialize cartStorage state
    const [cartStorage, setCartStorage] = useState([]);

    // Initialize total state
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // Fetch cart data from localStorage on component mount
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setUserStorage(user);
        setCartStorage(cart);

        // Calculate the total price correctly
        // const cartTotal = cart.length === 1 
        //     ? cart[0].price 
        //     : cart.reduce((acc, item) => acc + item.price, 0);
        // setTotal(cartTotal);

        const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
setTotal(cartTotal);
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartStorage.filter(item => item._id !== itemId);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Recalculate the total after removing the item
        // const updatedTotal = updatedCart.length === 1 
        //     ? updatedCart[0].price 
        //     : updatedCart.reduce((acc, item) => acc + item.price, 0);
        // setTotal(updatedTotal);

        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
setTotal(updatedTotal);
    };

    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    // useEffect(()=>{
    //     if(!total){
    //         // router.push('/');

    //     }
    // },[total])

    const orderNow=async()=>{
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let foodItemIds = cart.map((item)=>item._id).toString();
        // let resto_id = cart[0].resto_id;
        let city = JSON.parse(localStorage.getItem('user')).city;
        // let deliveryBoyResponse = await fetch('http://localhost:3000/api/deliverypartners/delhi'+city);
        if (!userStorage?.city) {
            alert("City not available");
            return;
        }
        
        let deliveryBoyResponse = await fetch(`/api/deliverypartners/${userStorage.city}`);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        // console.log(deliveryBoyResponse);
        // deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item._id);
        
        let deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item.id);
        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
        // console.log(deliveryBoyIds);
        if(!deliveryBoy_id){
            alert("delivery partner not available");
        return false;
        }

        if (!userStorage) {
            return <div>Loading user data...</div>; // Add a loading state
        }

        // let deliveryBoy_id = "6720cced1259f62a485c2b02";
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',
            amount: total+DELIVERY_CHARGES+((total*TAX)/100),
        }
        // let response = await fetch('http://localhost:3000/api/order'
        let response = await fetch(`/api/order`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(collection)
        });
        response = await response.json();
        if(response.success){
            alert("order confirmed")
            setRemoveCartData(true);
            router.push('myprofile')
        }
        else{
            alert("order failed")
        }
        console.log(collection);
    }

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-wrapper">
                <div className="block-1">
                <h2>User Details</h2>
                <div className="row">
                    <span>Name</span>
                    <span>{userStorage?.name || 'Loading...'}</span>
                </div>
                <div className="row">
                    <span>Address</span>
                    <span>{userStorage?.address || 'Loading...'}</span>
                </div>
                <div className="row">
                    <span>Mobile</span>
                    <span>{userStorage?.mobile || 'Loading...'}</span>
                </div>
                <h2>Amount Details</h2>
                <div className="row">
                    <span>Tax : </span>
                    <span>{(total*TAX)/100}</span>
                </div>
                <div className="row">
                    <span>Delivery charges : </span>
                    <span>{DELIVERY_CHARGES}</span>
                </div>
                <div className="row">
                    <span>Total Amount : </span>
                    <span>{total+DELIVERY_CHARGES+((total*TAX)/100)}</span>
                </div>
                <div className="row">
                    <span>Cash on Delivery : </span>
                    <span>{total+DELIVERY_CHARGES+((total*TAX)/100)}</span>
                </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place your order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Page;