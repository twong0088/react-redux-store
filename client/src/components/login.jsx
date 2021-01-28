import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { signIn, signUp, signInGoogle } from '../actions';

const Login = (props) => {

  const[login, changeLogin] = useState(true);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const emailErr = useSelector(state => state.emailErr);
  const passErr = useSelector(state => state.passErr);

  // const dispatch = useDispatch();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(login) {
      // dispatch(signIn({
      //   email,
      //   password
      // }))
      props.signIn({
        email: email,
        password: password
      })
    } else {
      // dispatch(signUp({
      //   email,
      //   password
      // }))
      props.signUp({
        email: email,
        password: password
      })
    }
  };

  const signInWGoogle = (event) => {
    props.signInGoogle();
    // dispatch(signInGoogle());
  }

  return (
    <div id='login'>
      {login ? <h1>Log In</h1> : <h1>Sign Up</h1>}
      <form id='login-form' className='login-form' onSubmit={(e) => {
      handleSubmit(e);
      }}>
        <label htmlFor="email">Email: </label><br />
        <input type="text" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input><br />
        <p className="errorMsg"> {emailErr}</p>
        <label htmlFor="password">Password: </label><br />
        <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input><br />
        <p className="errorMsg">{passErr}</p>
        {login ? <input type="submit" id='loginButton' value="Log In" /> : <input  id='loginButton' type="submit" value="Sign Up" />}
      </form>
      <div>
        {login ? <p className='login'>Don't have an account? <span className='switch' onClick={() => {changeLogin(!login)}}>Sign up</span></p> : <p className='login'>Have an account? <span className='switch' onClick={() => {changeLogin(!login)}}>Sign In</span></p> }
      </div>
      <div>
        <p className='login'>or</p>
        <button onClick={signInWGoogle}>Sign in with Google</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signUp: (creds) => dispatch(signUp(creds)),
    signInGoogle: () => dispatch(signInGoogle())
  }
};

// export default Login;
export default connect(null, mapDispatchToProps)(Login);