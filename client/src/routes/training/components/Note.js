import { Row, Alert, Col} from 'react-bootstrap'

export default ({children}) =>
<Row className="justify-content-center p-3">
    <Col xs={12} md={10} lg={8}>
        <Alert variant="warning">
            <Alert.Heading>Note</Alert.Heading>
            {children}
        </Alert>
    </Col>
</Row>