import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () =>{
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [error,setError] = useState();
    const router = useRouter();
    const handleLogin=async ()=>{
        if(!email || !password){
            setError(true);
            return false;
        }else{
            setError(false);
        }
        let response = await fetch(`${baseUrl}/api/restaurant`,{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        })
        response = await response.json();
        if(response.success){
            const {result}= response;
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));

            router.push("/restaurant/dashboard");
        }else{
            alert("login failed")
        }
        console.log(email,password)
    }
    return (
        <>
            <h3>Login Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter email id" className="input-field"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                     />
                     {error && !email && <span className="input-error">please enter valid email</span>}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter password" className="input-field"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                     />
                     {error && !password && <span className="input-error">please enter valid password</span>}

                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}
export default RestaurantLogin;