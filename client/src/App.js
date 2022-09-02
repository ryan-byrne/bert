// React Dependencies
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react';
// Import Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// Routes
import Index from './routes/Index';
import Navigation from './components/Navigation';
import Schedule from './routes/schedule/Schedule';
import TrainingRoutes from './routes/training/Routes';
import ToolRoutes from './routes/tools/Routes';
import Logout from './routes/logout/Logout';
import Test from './routes/test/Test';
//import {NotFound} from './components/Utilities.js';
// Internal Components
import Loading from './components/Loading';
import Bugs from './routes/feedback/Bugs';

function App() {

  const [user, setUser] = useState();

  useEffect(()=>{
    fetch(`/auth/user`, {credentials:'include'})
      .then( resp => resp.json()
      .then( data => {
        if (data.authorizationUrl){
          window.location.href = data.authorizationUrl
        } else setUser(data)
      }))
      .catch( err => console.error(err))
  },[])

  return ( !user ? <Loading>Contacting Bert Server...</Loading> :
    <div className='app-container'>
        <BrowserRouter>
          <Navigation user={user}/>
          <Routes>
            <Route index element={<Index/>}/>
            <Route path="schedule" element={<Schedule create={false}/>}/>
            <Route path="schedule/create" element={<Schedule create={true}/>}/>
            <Route path="training/*" element={<TrainingRoutes/>}/>
            <Route path="tools/*" element={<ToolRoutes/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="bugs" element={<Bugs/>}/>
            <Route path="test" element={<Test/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
