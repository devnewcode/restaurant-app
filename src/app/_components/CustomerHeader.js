'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./styleforcs.css";
const CustomerHeader = (props) => {
    // console.log(props);


    const [user, setUser] = useState();
    const router = useRouter();
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCartNumber(cartStorage.length);
        setCartItem(cartStorage);
        setUser(userStorage ? userStorage : undefined);
    }, [])
    useEffect(() => {
        if (props.cartData) {
            console.log(props);
            if (cartNumber > 0) {
                if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
                    //different restraunt, reset the cart
                    const newCart = [props.cartData];
                    setCartNumber(newCart.length);
                    setCartItem(newCart);
                    localStorage.setItem('cart', JSON.stringify(newCart));



                    //previous code
                    //     localStorage.removeItem('cart');
                    //     setCartNumber(1);
                    //     setCartItem([props.cartData])
                    // localStorage.setItem('cart',JSON.stringify([props.cartData]))
                } else {
                    //same restraunt, add to the cart
                    const newCart = [...cartItem, props.cartData];
                    setCartNumber(newCart.length);
                    setCartItem(newCart);
                    localStorage.setItem('cart', JSON.stringify(newCart));

                    //previous code
                    // let localCartItem = [...cartItem];
                    // localCartItem.push(JSON.parse(JSON.stringify(props.cartItem)))
                    // setCartItem(localCartItem);
                    // setCartNumber(cartNumber + 1)
                    // localStorage.setItem('cart',JSON.stringify(localCartItem))
                }
            } else {
                //cart is empty, add the first item
                const newCart = [props.cartData];
                setCartNumber(newCart.length);
                setCartItem(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));


                //previous code
                // setCartNumber(1)
                // setCartItem([props.cartData])
                // localStorage.setItem('cart',JSON.stringify([props.cartData]))
            }

        }
    }, [props.cartData])

    // useEffect(()=>{
    //     if(props.removeCartData){
    //         let localCartItem = cartItem.filter((item)=>{
    //             return item._id = props.removeCartData;
    //         })
    //         setCartItem(localCartItem);
    //         setCartNumber(cartNumber-1);
    //         localStorage.setItem('cart', JSON.stringify(localCartItem));
    //         if(localCartItem.length== 0) {
    //             localStorage.removeItem('cart');
    //         }
    //     }
    // },[props.removeCartData]);

    useEffect(() => {
        if (props.removeCartData) {
            const newCartItem = cartItem.filter((item) => item._id !== props.removeCartData);
            setCartItem(newCartItem);
            setCartNumber(newCartItem.length);
            localStorage.setItem('cart', JSON.stringify(newCartItem));
            if (newCartItem.length === 0) {
                localStorage.removeItem('cart');
            }
        }
    }, [props.removeCartData]);

    useEffect(()=>{
        if(props.removeCartData){
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem('cart');
        }
    },[props.removeCartData])
    const logout =()=>{
        localStorage.removeItem('user');
        router.push('/user-auth');
    }
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 100 }} src="/logo2.png" alt="logo" />

            </div>
            <ul>
                <li>
                    <Link href="/" >Home</Link>
                </li>
                {
                    user ?
                        <>
                            <li>
                                <Link href="/myprofile">{user?.name}</Link>
                            </li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                        :
                        <>
                            <li>
                                <Link href="/user-auth" >Login</Link>
                            </li>
                            <li>
                                <Link href="/user-auth" >Signup</Link>
                            </li>
                        </>
                }
                <li>
                    <Link href={cartNumber ? "/cart" : "#"} >Cart({cartNumber ? cartNumber : 0})</Link>
                </li>
                <li>
                    <Link href="/restaurant" >Add Restraunt</Link>
                </li>
                {/* <li>
                    <Link href="/deliverypartner" >Delivery Partner</Link>
                </li> */}
            </ul>
        </div>
    )
}
export default CustomerHeader;