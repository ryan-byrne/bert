import { Alert, Modal, Row, Spinner, Col } from "react-bootstrap"

const NotFound = () => 
    <div className="m-5">
        <Alert variant="danger">
            <h3>Uh oh...</h3>
            <p>It looks like <strong>Bert</strong> couldn't find what you were looking for. <a href="/#/">Go back</a></p>
        </Alert>
    </div>

const Message = ({text, error, loading}) => 
  <Modal show={text?true:false} centered>
      <Alert variant={error?'danger':'info'} className="mt-auto mb-auto">
        <Row>
            {loading?<Col xs={2}><Spinner animation="grow" className="p-1"/></Col>:null}
          <Col className="mt-auto mb-auto">
            {text}
          </Col>
            {error?<Col xs={3}><a href="/">Refresh</a></Col>:null}
        </Row>
      </Alert>
  </Modal>

export {NotFound, Message}