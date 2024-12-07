'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setUserStorage(user);
        setCartStorage(cart);

        const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(cartTotal);
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartStorage.filter(item => item._id !== itemId);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(updatedTotal);
    };

    const orderNow = async () => {
        if (!userStorage?.city) {
            alert("City not available in user details");
            return;
        }

        const user_id = userStorage._id;
        const cart = cartStorage;
        const resto_id = cart.length > 0 ? cart[0].resto_id : null;

        if (!resto_id) {
            alert("No restaurant ID found in the cart");
            return;
        }

        const foodItemIds = cart.map((item) => item._id).toString();
        const deliveryPartnerResponse = await fetch(
            `https://restaurant-app-six-orpin.vercel.app/api/deliverypartners/${userStorage.city}`
        );

        const deliveryData = await deliveryPartnerResponse.json();
        const deliveryBoyIds = deliveryData.result.map((item) => item.id);
        const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

        if (!deliveryBoy_id) {
            alert("No delivery partner available");
            return;
        }

        const orderDetails = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status: 'confirm',
            amount: total + DELIVERY_CHARGES + ((total * TAX) / 100),
        };

        const orderResponse = await fetch(`https://restaurant-app-six-orpin.vercel.app/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        const orderData = await orderResponse.json();

        if (orderData.success) {
            alert("Order placed successfully!");
            setRemoveCartData(true);
            localStorage.removeItem('cart');
            router.push('/myprofile');
        } else {
            alert("Order placement failed. Please try again.");
        }
    };

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
                        <span>Tax:</span>
                        <span>{(total * TAX) / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery charges:</span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount:</span>
                        <span>{total + DELIVERY_CHARGES + ((total * TAX) / 100)}</span>
                    </div>
                    <div className="row">
                        <span>Cash on Delivery:</span>
                        <span>{total + DELIVERY_CHARGES + ((total * TAX) / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place your order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
