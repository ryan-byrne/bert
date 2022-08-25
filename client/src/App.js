// React Dependencies
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react';
// Import Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Routes
import Index from './routes/Index';
import Navigation from './components/Navigation';
import Schedule from './routes/schedule/Schedule';
import TrainingPage from './routes/training/TrainingPage';
import Logout from './routes/logout/Logout';
import Test from './routes/test/Test';
//import {NotFound} from './components/Utilities.js';
// Internal Components
import {Message} from './components/Utilities';

function App() {

  const [user, setUser] = useState();
  const [message, setMessage] = useState({});

  useEffect(()=>{
    setMessage({text:'Contacting Bert API Server...', loading:true})
    fetch(`/auth/user`, {credentials:'include'})
      .then( resp => resp.json()
      .then( data => {
        if (data.authorizationUrl){
          window.location.href = data.authorizationUrl
        } else {
          setUser(data)
          setMessage({})
        }
      }))
      .catch( err => setMessage({text:'Redirect...', loading:true}))
  },[])

  return (
    <div className="app-container">
      <Message text={message.text} loading={message.loading} error={message.error}/>
      { !user ? null :
        <BrowserRouter>
          <Navigation user={user}/>
          <Routes>
            <Route index element={<Index/>}/>
            <Route path="schedule" element={<Schedule/>}/>
            <Route path="training/*" element={<TrainingPage/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="test" element={<Test/>}/>
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
