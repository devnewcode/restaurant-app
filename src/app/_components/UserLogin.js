import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin=(props)=>{
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();
    const loginHandle=async()=>{

        let response = await fetch(`${baseUrl}/api/user/login`,{
            method: 'post',
            body: JSON.stringify({email,password})
        })
        response = await response.json();
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem('user',JSON.stringify(result));
            if(props?.redirect?.order){
                router.push('/order');
            }
            else{
            router.push('/')
            } 
        } else{
            alert("failed to login. please try again with valid email and password.")
        }
    }
    return (
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="enter email" value={email} onChange={(event)=>setEmail(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="enter password" value={password} onChange={(event)=>setPassword(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    )
}
export default UserLogin;