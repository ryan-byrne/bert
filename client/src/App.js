// React Dependencies
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
// Apollo
import { ApolloSandbox } from '@apollo/sandbox/react';
// Import Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal Components
import {Message} from './components/Utilities';
import Schedule from './components/schedule/Schedule';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import {Logout, Login} from './components/Login';
import {NotFound} from './components/Utilities.js';

export default () => {

  const [user, setUser] = useState();
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    setMessage({text:'Contacting Bert API Server...', loading:true})
    fetch(`/auth/user`, {
      credentials:'include'
    })
      .then( resp => {
        setMessage({});
        if (resp.status === 403) navigate('login')
        else resp.json()
          .then( data => setUser(data) )
      })
      .catch( err => setMessage({text:err.message, error:true}))
  },[setUser])

  return (
    <div className='app-container text-light'>
      <div className="h-100">
        <Navigation user={user}/>
        <Message text={message.text} loading={message.loading} error={message.error}/>
        <Routes>
            <Route index element={<Landing/>}/>
            <Route path="schedule" element={<Schedule {...{user}}/>}/>
            <Route path="graphql" element={
              <ApolloSandbox
                className="apollo-container"
                initialEndpoint='/graphql'
                includeCookies={true}
              />
            }/>
            <Route path="login" element={<Login {...{user, navigate}}/>}/>
            <Route path="logout" element={<Logout {...{user, setUser, navigate}}/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}