// React Dependencies
import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
// Import Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Routes
import Index from './routes/Index';
import Schedule from './routes/schedule/Schedule';
import Logout from './routes/logout/Logout';
import TrainingPage from './routes/training/TrainingPage';
import {NotFound} from './components/Utilities.js';
// Internal Components
import {Message} from './components/Utilities';
import Navigation from './components/Navigation';

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

  /*
  <Route path="training" element={<Training {...{user}}/>}/>
  <Route path="training/:trainingId" element={<Training {...{user}}/>}/>
  <Route path="tools" element={<Tools {...{user}}/>}/>
  <Route path="tools/:toolId" element={<Tools {...{user}}/>}/>
  */
  
  return (
    <div className='app-container text-light'>
      <div className="h-100">
        <Navigation user={user}/>
        <Message text={message.text} loading={message.loading} error={message.error}/>
        { !user?null:
          <Routes>
            <Route index element={<Index/>}/>
            <Route path="schedule" element={<Schedule {...{user, navigate}} create={false}/>}/>
            <Route path="schedule/create" element={<Schedule {...{user, navigate}} create={true}/>}/>
            <Route path="training/*" element={<TrainingPage {...{navigate}}/>}/>
            <Route path="logout" element={<Logout {...{user, setUser, navigate}}/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        }
      </div>
    </div>
  );
}