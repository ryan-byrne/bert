import { Alert, Row, Spinner, Col } from "react-bootstrap";

const Loading = ({children}) => {
  return (
    <Row className="h-100 mt-3">
      <Col className="mt-auto mb-auto">
        <Alert className="m-1 text-center">
          <Spinner animation="border" size="sm"/>
          <span className="p-1">
            <strong>{children}</strong>
          </span>
        </Alert>
      </Col>
    </Row>
   );
}
 
export default Loading;