import React ,{ useState } from 'react'
import {Link} from 'react-router-dom';
import axios from '../Api/Axios';

const Register = () => {

  const [error, setError] = useState(false);
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !password){
      setError(true)
      return 
    }
    const response = await axios.post('/auth/register', { 
      name, 
      password 
    })
    .then(response => {
      console.log('Réponse du serveur:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête POST:', error);
    });
  }

  return (
    <div>
        <div className="login-card">
            <form onSubmit={ handleSubmit }>
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id='username' value={ name } onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id='password'value={ password } onChange={(e) => setPassword(e.target.value)}/>
                <li>{error && ("Please fill in all required fields.") }</li>
                <button>Sign Up</button>
            </form>
            <div>
              <p>already have an account ?</p>
              <Link to='/login'><button>Login</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Register