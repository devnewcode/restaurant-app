import { useState } from "react";

const AddFoodItems=(props)=>{
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [path , setPath] = useState("");
    const [description , setDescription] = useState("");
    const [error,setError] = useState(false);


    const handleAddFoodItem=async ()=>{
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

        console.log(name,price,path,description);
        if(!name || !price || !path || !description){
            setError(true);
            return false;
        }else{
            setError(false);
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restaurantData){
            resto_id = restaurantData._id;
        }
        let response = await fetch(`${baseUrl}/api/restaurant/foods`, {
            method: "POST",
            body: JSON.stringify({name,price,img_path:path, description, resto_id})
        });
        response = await response.json();
        if(response.success){
            alert("Food item added")
            props.setAddItem(false)
        }else{
            alert("Food item not added")
        }
    }
    return (
        <div className="container">
            <h1>add new food items</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food name"
                 value={name} onChange={(e)=>setName(e.target.value)} />
                 {error && !name && <span className="input-error">please enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter price"
                 value={price} onChange={(e)=>setPrice(e.target.value)} />
                 {error && !price && <span className="input-error">please enter valid price</span>}

            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter image path"
                 value={path} onChange={(e)=>setPath(e.target.value)} />
                 {error && !path && <span className="input-error">please enter valid path</span>}

            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter description"
                 value={description} onChange={(e)=>setDescription(e.target.value)} />
                 {error && !description && <span className="input-error">please enter valid description</span>}

            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
}
export default AddFoodItems;