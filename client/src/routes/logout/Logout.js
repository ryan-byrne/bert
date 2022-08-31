import { useState } from 'react';
import {Alert, Button, Card} from 'react-bootstrap'
import{useNavigate} from 'react-router-dom'
import Loading from '../../components/Loading';

export default function Logout(){

    const [status, setStatus] = useState();
    const navigate = useNavigate();

    const handleLogout = () => {
      setStatus("loading")
      fetch(`/auth/logout`)
        .then( resp => {
          setStatus();
          window.location.href = '/'
        })
        .catch( err => {
          console.log(err);
          setStatus(err.message)
        } ) 
    }

    return(
      <Card className="m-5" bg="dark">
        {
          status === 'loading' ? 
          <Loading>Signing Out...</Loading> : 
          <Card.Body className="text-center">
            <Card.Title>Are you sure you want to sign out?</Card.Title>
            <Button variant="secondary" onClick={()=>navigate(-1)}>No, Go Back</Button>
            <Button variant="danger" className="m-3" onClick={handleLogout}>Yes, Sign Out</Button>
          </Card.Body>
        }
        {
          status === 'error' ? <Alert variant="danger">{status}</Alert> : null
        }
      </Card>
    )
}