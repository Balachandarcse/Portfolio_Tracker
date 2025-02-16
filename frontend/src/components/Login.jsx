import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'
const Login = () => {
    var navigate=useNavigate();
    function HandelLogin(){
        navigate('/home');
    }
    return (
        <div className='login'>
            <form action="">
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="enter the username" required />
                <br />
                <label for="password">password</label>
                <input type="password" name="password" placeholder="enter your password" required />
                <br />
                <button onClick={HandelLogin}>Login</button> 
                <p>Doesn't have an account?<Link to="/signup">SignUp</Link></p>
            </form>
        </div>
    )
}
export default Login