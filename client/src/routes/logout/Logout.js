import {Button, Card} from 'react-bootstrap'

export default ({navigate}) => {
  
    return(
      <Card className="m-5" bg="dark">
        <Card.Body className="text-center">
            <Card.Title>Are you sure you want to sign out?</Card.Title>
            <Button variant="secondary" onClick={()=>navigate(-1)}>No, Go Back</Button>
            <Button variant="danger" className="m-3" href={`/auth/logout`}>Yes, Sign Out</Button>
        </Card.Body>
      </Card>
    )
}