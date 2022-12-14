import { useRef } from "react"
import {Row, Col, Container} from 'react-bootstrap'
import ReactEmbedGist from 'react-embed-gist';
import Loading from "../../components/Loading";

import './style.css'

export default function GettingStarted(){
  return(
    <Container className="mt-3 gist-container">
      <ReactEmbedGist 
        gist="ryan-byrne/3d65a58ee8c9fef5d0c5037c489c757e"
        loadingFallback={<Loading>Loading Getting Started...</Loading>}
      />
    </Container>

  )
}