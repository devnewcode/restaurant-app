'use client'
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css';
import { useState } from "react";
import AddFoodItems from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard =()=>{
    const [addItem,setAddItem]= useState(false);
    return (
        <div>
        <RestaurantHeader />
        <button onClick={()=>setAddItem(true)}>Add food</button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />
        }
        </div>
    )
}
export default Dashboard;