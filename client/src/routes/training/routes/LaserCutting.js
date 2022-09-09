import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import laserExample from '../img/laser-cutting/example.gif'

const LaserCutting = ({user, update}) =>
<Training id="laser-cutting" user={user}>

    <Topic name="Basics of Laser Cutting" topicKey={0} user={user}>
        <h1>How it Works</h1>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

    <Topic name="Setting up your File" topicKey={1} user={user}>
        <h1>How it Works</h1>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

    <Topic name="Setting up the Laser Cutter" topicKey={2} user={user}>
        <h1>How it Works</h1>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

    <Topic name="Before Cutting" topicKey={3} user={user}>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

    <Topic name="During Cut" topicKey={4} user={user}>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

    <Topic name="After Cut" topicKey={5} user={user}>
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
    </Topic>

</Training>

export default LaserCutting;