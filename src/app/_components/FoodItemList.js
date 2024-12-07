import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const FoodItemList =()=>{
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            loadFoodItems(); // Ensure it runs only in the client
        }
    }, []);
    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        if (!restaurantData) {
            alert("No restaurant user found in local storage");
            return;
        }
        const resto_id = restaurantData._id;
        try {
            let response = await fetch(`/api/restaurant/foods/${resto_id}`);
            response = await response.json();
            if (response.success) {
                setFoodItems(response.result);
            } else {
                alert("Food item list not loading");
            }
        } catch (error) {
            console.error("Error loading food items:", error);
        }
    };
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            loadFoodItems();
        }
    }, []);
    
    const deleteFoodItem = async(id)=>{
        let response = await fetch(`${baseUrl}/api/restaurant/foods/`+id,{
            method:'delete'
        });
        response = await response.json();
        if(response.success){
            loadFoodItems();
        }else {
            alert("food item not deleted")
        }
    }
    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>Sr.No.</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                {
                    foodItems.map((item,key)=>(
                        <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td><img src={item.img_path} /></td>
                        <td><button onClick={()=>deleteFoodItem(item._id)}>Delete</button><button onClick={()=>router.push('dashboard/' + item._id)}>edit</button></td>
                    </tr>
                    ))
                }
                
                </tbody>
            </table>
        </div>
    )
}
export default FoodItemList;