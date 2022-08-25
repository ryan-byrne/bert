import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import woodGrain1 from '../img/hand-saws/woodGrain1.jpg' 
import woodGrain2 from '../img/hand-saws/woodGrain2.png' 
import woodKnot from '../img/hand-saws/woodKnot.png' 
import sawTeeth from '../img/hand-saws/sawTeeth.png' 
import sawDirection from '../img/hand-saws/sawDirection.png'
import acrossGrain from '../img/hand-saws/acrossGrain-01.png' 
import alongGrain from '../img/hand-saws/alongGrain-01.png'
import cutGroove from '../img/hand-saws/cutGroove-01.png'
import angledSaw from '../img/hand-saws/angledSaw-01.png'

export default ({update}) =>
    <Training id="hand-saws" >

    <Topic name="Wood Basics" topicKey={0} >
        <h1>Grain Direction</h1>
        <p>
            Before discussing <b>saws</b>, it is important to understand the idea of <b>grain direction.</b>
        </p>
        <p>
            Each piece of wood is made up of <b>grains</b>, which are what allow the tree
            to transport resources. Think of them like a bundle of straws.
        </p>
        <Row className="text-center m-3">
            <Col>
                <Image src={woodGrain1} fluid/>
            </Col>
        </Row>
        <p>
            It is fairly easy to identify the grain direction of a piece of wood by the marks
            that they leave behind.
        </p>
        <Row className="text-center m-3">
            <Col>
                <Image src={woodGrain2} fluid/>
            </Col>
        </Row>
        <h1>Knots</h1>
        <p>
            Oftentimes, these <b>grains</b> become blocked, causing the sap to collect and creating
            <b> knots.</b>
        </p>
        <Row className="text-center m-3">
            <Col>
                <Image src={woodKnot} fluid/>
            </Col>
        </Row>
        <Note>
            Avoid cutting, drilling, or screwing through <b>knots</b> wherever possible, as this often
            results in breaking the piece, the tool, or simply being too difficult to do.
        </Note>
        <Question id="629e5aaf6f8c0ec1e48c13d1" {...{update}}>
            <b>Grains</b> of wood, which carry resources throughout the tree, are similar to a bundle
            of ________.
        </Question>
        <Question id="629e5ac829c99c231baa643f" {...{update}}>
            Wherever possible, you should do your best to avoid cutting through what?
        </Question>
    </Topic>

    <Topic name="Saw Basics" topicKey={1} >
        <h1>Saw Teeth</h1>
        <p>
            One of the most important things to remember while using a <b>saw</b> is <b>"how"</b> it cuts.
        </p>
        <p>
            Unlike knives, which rely on a blade moving <b>into</b> the material,
            <b> saws</b> cut by moving their <b>teeth across</b> the material.
        </p>
        <Row className="text-center m-3" xs={1} md={2}>
            <Col>
                <Image src={sawTeeth} fluid/>
            </Col>
            <Col>
                <Image src={sawDirection} fluid/>
            </Col>
        </Row>
        <h1>Tooth Size</h1>
        <p>
            Occasionally, saws will have multiple teeth configurations. Which teeth you use is determined
            by the grain direction.
        </p>
        <Table variant="dark">
            <thead><tr><th>Grain Direction</th><th>Teeth Size</th></tr></thead>
            <tbody>
                <tr><td>Along</td><td>Larger</td></tr>
                <tr><td>Across</td><td>Smaller</td></tr>
            </tbody>
        </Table>
        <Row className="text-center m-3" sm={1} md={2}>
            <Col>
                <Image src={alongGrain} fluid/>
            </Col>
            <Col>
                <Image src={acrossGrain} fluid/>
            </Col>
        </Row>
        <Question id="629f5a8b21609add9e117386" {...{update}}>
            Saws cut by moving their teeth _______ a material.
        </Question>
        <Question id="629f5aeeaaabad6e8547faf0" {...{update}}>
            <b>(Larger/Smaller)</b> teeth should be used while cutting <b>along</b> the grain.
        </Question>
    </Topic>

    <Topic name="Before Your Cut" topicKey={2} >
        <h1>&#9999; Mark the Cutline</h1>
        <p>
            Always remember to <b><i>"Measure Twice, Cut Once"</i></b>
        </p>
        <h1>&#9759; Secure Your Piece</h1>
        <p>
            Secure your piece by using either a <a href="/#/tools/60e6469458e61d0b3d60fe2e">C-Clamp</a>,
            <a href="/#/tools/60e6469458e61d0b3d60fe2f"> Quick-Grip Clamp</a>, or <a href="/#/tools">vice</a>.
        </p>
        <Question id="629f70b103e6f04893882529" {...{update}}>
            <b>(True/False)</b> You only need to measure your cut once.
        </Question>
    </Topic>

    <Topic name="During Your Cut" topicKey={3} >
        <h1>&#129690; Start Your Cut</h1>
        <p>
            When beginning your cut, angle your saw so it rests against the edge of your piece
            and give a long pull. This will create a small groove for you to continue your cut
            without veering off the cutline.
        </p>
        <Row className="text-center m-3" sm={1} md={2}>
            <Col>
                <Image src={angledSaw} fluid/>
            </Col>
            <Col>
                <Image src={cutGroove} fluid/>
            </Col>
        </Row>
        <h1>&#8660; Long Strokes</h1>
        <p>
            Long, smooth strokes allow you to use each tooth of the saw, cutting faster and straighter.
        </p>
        <Question id="629f702fed7645e6bb3eed36" {...{update}}>
            Before beginning your cut, you should create a small _________.
        </Question>
    </Topic>

</Training>