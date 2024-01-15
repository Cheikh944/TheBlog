import React ,{ useState } from 'react'
import './styles/login.css'
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import Axios from '../Api/Axios';
import { useAuth } from '../context/authContext';

const Login = () => {
  
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState(false);
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !password){
      setError(true)
      return 
    }
    const response = await Axios.post('/auth/login', { 
      name, 
      password,
    },{
      withCredentials: true, // Inclure les informations du cookie
    })
    .then(response => {
      const accessToken = response?.data?.accessToken;
      setAuth( { name: response.data.name, accessToken: accessToken, id: response.data.id } );
      navigate(from, { replace: true });
    })
    .catch(error => {
      console.error('Erreur lors de la requête');
    });
  }

  return (
    <div className='login'>
        <div className="login-card">
            <form onSubmit={ handleSubmit }>
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" autoComplete="off" placeholder="Username" id='username' value={ name } onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id='password'value={ password } onChange={(e) => setPassword(e.target.value)}/>
                <li>{error && ("Please fill in all required fields.") }</li>
                <button>Login</button>
            </form>
            <div>
              <p>Don't have an account?</p>
              <Link to='/register'><button>Sign Up</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Login