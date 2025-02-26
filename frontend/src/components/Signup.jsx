import '../css/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
const SignUp = () => {
    var navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            alert("password doesn't match","error");
        }
        else{
        try {
            const response = await axios.post("http://localhost:3001/signup", {
                name,
                email,
                password
            });
            alert("signup successful","success")
            setTimeout(() => {
                navigate("/home");
            }, 3000);
        } catch (err) {
            console.error("Signup error:");
            if (err.response && err.response.data.error) {
                alert(err.response.data.error,"error");
            } else {
                alert("Signup failed, please try again.","error");
            }
        }
    }
    }

    return (
        <div className='signup'>
            <form onSubmit={handleSubmit}>
                <label for="username">Name</label>
                <input type="text" name="username" placeholder="enter the username"  onChange={(event)=>setname(event.target.value)} required />
                <br/>
                <label for="email">Email</label>
                <input type="email" name="name" placeholder="enter your email" onChange={(event)=>setEmail(event.target.value)} required/>
                <br/>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="enter your password" onChange={(event)=>setPassword(event.target.value)} required />
                <br/>
                <label for="password">Confirm Password</label>
                <input type="password" name="password" placeholder="confirm your password" onChange={(event)=>confirmPassword(event.target.value)} required />
                <br/>
                <button >SignUP</button>
                <p>Already have an account?<Link to="/">Login</Link></p>
            </form>
        </div>
    )
}
export default SignUp