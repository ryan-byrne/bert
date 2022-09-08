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
import GettingStarted from './routes/getting-started/GettingStarted';
import Test from './routes/test/Test';
//import {NotFound} from './components/Utilities.js';
// Internal Components
import Loading from './components/Loading';

const Feedback = ({subject, body}) => {
  useEffect(()=>{
    window.location.replace(`https://mail.google.com/mail/?view=cm&fs=1&to=rbyrne@berkeleycarroll.org&su=${subject}&body=${body}`)
  },[subject, body])
}

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
            <Route path="bugs" element={<Feedback subject="I Found a Bug in Bert" body="Describe the bug below (include screenshots!):"/>}/>
            <Route path="feature" element={<Feedback subject="I Have an Idea for a Bert Feature" body="Describe the feature below (include screenshots!):"/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="getting-started" element={<GettingStarted/>}/>
            <Route path="test" element={<Test/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
