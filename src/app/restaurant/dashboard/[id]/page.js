'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems=(props)=>{
    console.log(props.params.id);
    const router = useRouter();
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [path , setPath] = useState("");
    const [description , setDescription] = useState("");
    const [error,setError] = useState(false);

    useEffect(()=>{
        handleLoadFoodItem();
    },[])
    const handleLoadFoodItem=async()=>{
        const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

        let response = await fetch(`${baseUrl}/api/restaurant/foods/edit/` + props.params.id)
        response = await response.json();
        if(response.success){
            console.log(response.result);
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.img_path)
            setDescription(response.result.description)

        }
    }


    const handleEditFoodItem= async ()=>{
        console.log(name,price,path,description);
        if(!name || !price || !path || !description){
            setError(true);
            return false;
        }else{
            setError(false);
        }
        const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';
        let response = await fetch(`${baseUrl}/api/restaurant/foods/edit/` + props.params.id,{
            method:'PUT',
            body:JSON.stringify({name,price,img_path:path,description})
        });
        response = await response.json();
        if(response.success){
            router.push("../dashboard")
        }else{
            alert("data is not updated please try again")
        }
    }
    return (
        <div className="container">
            <h1>update food items</h1>
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
                <button className="button" onClick={handleEditFoodItem}>update Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=>router.push('../dashboard')}>Back to food item list</button>
            </div>
        </div>
    )
}
export default EditFoodItems;