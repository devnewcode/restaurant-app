'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page=()=>{
    // Initialize cartStorage state
    const [cartStorage, setCartStorage] = useState([]);

    // Initialize total state
    const [total, setTotal] = useState(0);
    const router = useRouter();
    

    useEffect(() => {
        // Fetch cart data from localStorage on component mount
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartStorage(cart);

        // Calculate the total price correctly
        const cartTotal = cart.length === 1 
            ? cart[0].price 
            : cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(cartTotal);
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartStorage.filter(item => item._id !== itemId);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Recalculate the total after removing the item
        const updatedTotal = updatedCart.length === 1 
            ? updatedCart[0].price 
            : updatedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(updatedTotal);
    };
    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order');
        }
        else{
        router.push('/user-auth?order=true');
        }
    }
    return (
        <div>
            <CustomerHeader />
            
            <div className="food-item-wrapper">
                {
                    cartStorage.length>0 ? cartStorage.map((item)=>(
                        <div className="list-item">
                        <div className="list-item-block-1">
                        <img style={{width:100}} src={item.img_path} />
                        </div>
                        <div className="list-item-block-2">
                        <div>{item.name}</div>
                            <div className="description">{item.description}</div>
                            {
                                <button onClick={()=>removeFromCart(item._id)}>Remove from cart</button>  
                            }
                        </div>
                        <div className="list-item-block-3">Price : {item.price}</div>
                            
                            

                        </div>
                    ))
                    : <h1>No food items added for now</h1>
                }
            </div>
            <div className="total-wrapper">
            <div className="newflex">
            <div className="flex-1">
                <div className="block-1">
                <div className="row">
                    <span>Food Charges : </span>
                    <span>{total}</span>
                </div>
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
                </div>
                </div>
                <div className="flex-2">
                <div className="block-2">
                    <button  onClick={orderNow}>Order Now</button>
                </div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}
export default Page;