import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

const Soldering = ({ update }) =>
  <Training id="soldering">

    <Topic name="Soldering" topicKey={0}>
      <div>Hello</div>
      <div>Hello</div>
    </Topic>

    <Topic name="Soldering" topicKey={1}>
      <div>Hello</div>
      <div>Hello</div>
    </Topic>

  </Training>

export default Soldering;