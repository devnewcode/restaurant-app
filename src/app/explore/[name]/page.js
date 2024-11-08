'use client'
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useEffect, useState } from "react";

const Page = (props) => {
    const name = props.params.name
    const [restaurantDetails,setRestaurantDetails] = useState();
    const [foodItems,setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage , setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [cartIds, setCartIds] = useState(()=>cartStorage.map((item)=>item._id))

    const [removeCartData,setRemoveCartData] = useState();

    //previous code
    // useEffect(()=>{
    //     loadRestaurantDetails();

    // },[]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartStorage(storedCart);
        setCartIds(storedCart.map(item => item._id));
        loadRestaurantDetails();
    }, []);
    console.log(cartIds);
    const loadRestaurantDetails=async()=>{
        const id = props.searchParams.id;
        // console.log(id);
        let response = await fetch("http://localhost:3000/api/customer/"+id)
        response = await response.json();
        if(response.success){
            setRestaurantDetails(response.details);
            setFoodItems(response.foodItems);
        }
    }
    const addToCart=(item)=>{
        //previous code
        // setCartData(item)
        // let localCartIds = cartIds;
        // localCartIds.push(item._id);
        // setCartIds(localCartIds);
        // setRemoveCartData();

        setCartData(item);
        let localCartIds = [...cartIds, item._id];
        setCartIds(localCartIds);
        setRemoveCartData(null);

    }
    const removeFromCart=(id)=>{
        //previous code
        // setRemoveCartData(id);
        // var localIds = cartIds.filter(item=>item!=id)
        // setCartData(localIds)
        // setCartIds();

        setRemoveCartData(id);
        let localIds = cartIds.filter(item => item !== id);
        setCartIds(localIds);
        setCartData(null);

    }
    return (
        <div>
        <CustomerHeader cartData = {cartData} removeCartData={removeCartData}/>
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="detail-wrapper">
                <h4>Contact : {restaurantDetails?.contact}</h4>
                <h4>City : {restaurantDetails?.city}</h4>
                <h4>Address : {restaurantDetails?.address}</h4>
                <h4>Email : {restaurantDetails?.email}</h4>
            </div>
            <div className="food-item-wrapper">
                {
                    foodItems.length>0 ? foodItems.map((item)=>(
                        <div className="list-item">
                        <img style={{width:100}} src={item.img_path} />
                        <div>
                        <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div className="description">{item.description}</div>
                            {
                                cartIds.includes(item._id)? 
                                <button onClick={()=>removeFromCart(item._id)}>Remove from cart</button> :
                                <button onClick={()=>addToCart(item)}>Add to cart</button>
                            }
                            
                            
                        </div>
                            
                            

                        </div>
                    ))
                    : <h1>No food items added for now</h1>
                }
            </div>
            <Footer />
        </div>
    )
}
export default Page;