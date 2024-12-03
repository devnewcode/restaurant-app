'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const router = useRouter();

    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if(delivery){
            router.push('/deliverydashboard');
        }
    },[])
    const loginHandle = async () => {
        // const baseUrl = process.env.NODE_ENV === 'production' ? 'https://restaurant-app-six-orpin.vercel.app/' : 'http://localhost:3000';

        let response = await fetch(`${baseUrl}/api/deliverypartners/login`, {
            method: 'post',
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard');
        } else {
            alert("failed to login. please try again with valid mobile and password.")
        }
    }

    const handleSignUp = async () => {
        console.log(name, mobile, password, confirmPassword, city, address);
        let response = await fetch(`${baseUrl}/api/deliverypartners/signup`, {
            method: 'post',
            body: JSON.stringify({ name, mobile, password, city, address })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard');
            
        } else {
            alert("failed")
        }
    }
    return (
        <div>
        <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>

                    <div className="input-wrapper">
                        <input type="text" placeholder="enter mobile" value={loginMobile} onChange={(event) => setLoginMobile(event.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="enter password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <button onClick={loginHandle} className="button">Login</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h3>Signup</h3>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter name" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter mobile" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter city" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter address" />
                    </div>

                    <div className="input-wrapper">
                        <button onClick={handleSignUp} className="button">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;