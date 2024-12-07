import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://restaurant-app-six-orpin.vercel.app' 
        : 'http://localhost:3000';

    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        loadFoodItems(); // Runs only once on component mount
    }, []); // Empty dependency array ensures it only runs on mount

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        if (!restaurantData) {
            alert("No restaurant user found in local storage");
            return;
        }
        const resto_id = restaurantData._id;
        try {
            // Use baseUrl to ensure consistency across environments
            let response = await fetch(`${baseUrl}/api/restaurant/foods/${resto_id}`);
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

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`${baseUrl}/api/restaurant/foods/${id}`, {
                method: 'DELETE',
            });
            response = await response.json();
            if (response.success) {
                loadFoodItems(); // Reload food items after successful deletion
            } else {
                alert("Food item not deleted");
            }
        } catch (error) {
            console.error("Error deleting food item:", error);
        }
    };

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
                        foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                                <td>
                                    <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button onClick={() => router.push(`/dashboard/${item._id}`)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
