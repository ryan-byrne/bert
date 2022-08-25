import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

export default ({update}) =>
<Training id="test" >

    <Topic name="test topic" topicKey={0} >
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{update}}>Test Question</Question>
    </Topic>

    <Topic name="test topic" topicKey={1} >
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{update}}>Test Question</Question>
    </Topic>

</Training>