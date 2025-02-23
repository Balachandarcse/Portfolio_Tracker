import '../css/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
const SignUp = () => {
    var navigate=useNavigate();
    function HandelLogin(){
        
        navigate('/home');
    }
    return (
        <div className='signup'>
            <form action="">
                <label for="username">Name</label>
                <input type="text" name="username" placeholder="enter the username" required />
                <br />
                <label for="email">Email</label>
                <input type="text" name="name" placeholder="enter your email" required/>
                <br />
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="enter your password" required />
                <br />
                <button  onClick={HandelLogin}>SignUP</button>
                <p>Already have an account?<Link to="/">Login</Link></p>
            </form>
        </div>
    )
}
export default SignUp