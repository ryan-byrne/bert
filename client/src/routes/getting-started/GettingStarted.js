import { useRef } from "react"
import {Row, Col} from 'react-bootstrap'

export default function GettingStarted(){

  const ref = useRef()

  return (
    <Row className="h-100 w-100 justify-content-center">
      <Col md={12} lg={8} className="text-center">
        <iframe
          ref={ref}
          title="Getting Started"
          height="100%"
          width="100%"
          src="https://docs.google.com/document/d/e/2PACX-1vSqccPfC0YVAKcWhuwBCKdfdF-sSatSP6I7VUOPYFputE_4i4mxV42tmWqCGuDMOUFTdeUVfYujy0lt/pub?embedded=true"
        />
      </Col>
    </Row>
  )
}