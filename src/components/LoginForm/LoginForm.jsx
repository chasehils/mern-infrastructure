import { useState } from "react";
import { login } from "../../utilities/users-service";


export default function LoginForm( {setUser}) {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  handleChange = (evt) => {

    // this.setState({

    //   [evt.target.name]: evt.target.value,
    //   error: ''
    // });
    setCredentials({
        ...credentials,
          [evt.target.name]: evt.target.value
        });
        setError('');
  };
  
  // handleSubmit
 async function handleSubmit (evt) {
    evt.preventDefault()
      console.log('handle submit is hitting')
    try {
      const user = await login(credentials)
      setUser(user)
      console.log('credentials in login', credentials)
    } catch {

      setError('Login failed, try again!')
    }
  }
  // ever single class component NEEDS a render method
  // this render method tells our app what this component returns

   
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <button type="submit" >Log In</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
}