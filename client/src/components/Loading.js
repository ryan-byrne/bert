import { Alert, Row, Spinner, Col } from "react-bootstrap";

const Loading = ({children}) => {
  return (
    <Row className="h-100">
      <Col className="mt-auto mb-auto">
        <Alert className="m-3 text-center">
          <Spinner animation="border" size="sm"/>
          <span className="p-3">
            <strong>{children}</strong>
          </span>
        </Alert>
      </Col>
    </Row>
   );
}
 
export default Loading;