import {Button, Card} from 'react-bootstrap'
import{useNavigate} from 'react-router-dom'

export default ({}) => {

    const navigate = useNavigate();

    const handleLogout = () => fetch(`/auth/logout`)
      .then( resp => {
        window.location.href = '/'
      })
      .catch( err => console.error(err) )

    return(
      <Card className="m-5" bg="dark">
        <Card.Body className="text-center">
            <Card.Title>Are you sure you want to sign out?</Card.Title>
            <Button variant="secondary" onClick={()=>navigate(-1)}>No, Go Back</Button>
            <Button variant="danger" className="m-3" onClick={handleLogout}>Yes, Sign Out</Button>
        </Card.Body>
      </Card>
    )
}