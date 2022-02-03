import React, { useState } from 'react';


async function loginUser(credentials) {
  
  return fetch('http://localhost:8080/api/v2/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

export default function Login({ setToken }) {
  const [client_id, setclient_id] = useState();
  const [client_secret, setclient_secret] = useState();

  
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      client_id,
      client_secret
    });
   
  localStorage.setItem("token",`Bearer ${token?.data?.access_token}`)
  if(token?.data?.access_token){
    window.location.assign('/dashboard')
  }

    
  }


  return(
    <div className="login-wrapper">
      <h1>Log In</h1>
      

      <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <label for="">Client ID</label>
                  <input type="text" onChange={e => setclient_id(e.target.value)} placeholder='Client ID'/>
               </div>
               <div className="form-group">
                  <label for="">Client Secret</label>
                  <input type="text" onChange={e => setclient_secret(e.target.value)} placeholder='Client Secret'/>

               </div>
               
               <div className="form-group">
                  <button type="submit">  SIGN IN</button>
               </div>
              
            </form>
         
    </div>
  )
}
