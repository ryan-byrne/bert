import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import cuttingSurface from '../img/band-saws/cuttingSurface-01.png'
import cuttingSurface2 from '../img/band-saws/cuttingSurface2-01-01.png'
import releaseBlade from '../img/band-saws/releaseBlade-01.png'
import removeBlade from '../img/band-saws/removeBlade-01.png'
import loosenTension1 from '../img/band-saws/loosenTension-01.png'
import loosenTension2 from '../img/band-saws/loosenTension-02-01.png'
import loosenTension3 from '../img/band-saws/loosenTension-03-01.png'
import wheelTilt from '../img/band-saws/wheelTilt-01.png'
import adjustBladeGuard from '../img/band-saws/adjustBladeGuard-01.png'
import adjustBladeGuard2 from '../img/band-saws/adjustBladeGuard-02-01.png'
import planYourCut from '../img/band-saws/planYourCut-01.png'
import reliefCuts from '../img/band-saws/reliefCuts-01.png'
import pressButton from '../img/band-saws/pressButton-01.png'
import bandSawLocation from '../img/band-saws/bandSawLocation-01.png'

export default ({update}) =>
<Training id="band-saws" >

    <Topic name="Band Saw Basics" topicKey={0} >
        <h1>&#128270; Finding the Band Saw</h1>
        <p>
            The <b>Band Saw</b> is located in the <b>Power Tool Area</b>
        </p>
        <Row className="justify-content-center">
            <Col className="mt-auto mb-auto"><Image src={bandSawLocation} fluid/></Col>
        </Row>
        <h1>How it Works</h1>
        <p>
            A <b>band saw</b> works by wrapping the band, which has teeth on one side, around
            two separate wheels, which spin and create a cutting surface. The piece can then be pressed
            into the cutting surface.
        </p>
        <Row className="text-center m-3">
            <Col>
                <Image src={cuttingSurface} fluid/>
            </Col>
            <Col>
                <Image src={cuttingSurface2} fluid/>
            </Col>
        </Row>
        <h1>Changing the Band Saw Blade</h1>
        <p>
            To remove a blade, you must first release the blade tension, which is done by pushing up the lever behind the
            band saw. Open the two wheel covers, and the blade should be able to easily slide off.
        </p>
        <p>
            Reverse the process to add a new blade.
        </p>
        <Row xs={1} md={2}>
            <Col>
                <Image src={releaseBlade} fluid/>
            </Col>
            <Col>
                <Image src={removeBlade} fluid/>
            </Col>
        </Row>
        <h1>Adjusting Blade Tension</h1>
        <p>
            When a new blade has been added, it is important to adjust the <b>blade tension</b>
            to match the new blade's thickness.
        </p>
        <p>
            This is done by releasing the set knob, then turning the tension knob until the red line
            matches the blade thickness
        </p>
        <Row xs={1} md={3}>
            <Col>
                <Image src={loosenTension1} fluid/>
            </Col>
            <Col>
                <Image src={loosenTension2} fluid/>
            </Col>
            <Col>
                <Image src={loosenTension3} fluid/>
            </Col>
        </Row>
        <h1>Adjusting Wheel Tilt</h1>
        <p>
            To make sure the blade does not fall off during operation, you must adjust the <b>wheel tilt</b> so
            that the blade stays in the center of the wheel while it spins.
        </p>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={wheelTilt} fluid/>
            </Col>
        </Row>
        <p>
            Spin the wheel a few times by hand to make sure the blade stays.
        </p>

        <h1>Adjusting the Blade Guard</h1>
        <p>
            Turn the knob on the right of the top wheel to adjust the height of the blade guard. The bottom
            of the blade guard should be <b>~1 cm</b> above the piece being cut.
        </p>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={adjustBladeGuard} fluid/>
            </Col>
            <Col>
                <Image src={adjustBladeGuard2} fluid/>
            </Col>
        </Row>
        <p>
            You are now ready to cut!
        </p>
        <Question id="62a0ca415eb5095e80b60c2a" {...{update}}>
            When you change the width of the blade being used, you must also adjust the blade
            __________.
        </Question>
        <Question id="62a0ca8191f47950a83bd985" {...{update}}>
            How far above the piece should the blade guard be?
        </Question>
    </Topic>

    <Topic name="Before Cutting" topicKey={2} >
        <h1>&#128506; Plan Your Cut</h1>
        <p>
            When planning your cut, remember there is limited clearance to the left of the blade.
        </p>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={planYourCut} fluid/>
            </Col>
        </Row>
        <p>
            Additionally, if your cut includes sharp turns, <b>relief cuts</b> must be added to
            to ensure the blade is able to spin.
        </p>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={reliefCuts} fluid/>
            </Col>
        </Row>

        <h1>&#8661; Adjust the Blade Guard</h1>
        <h1>&#128274; Secure All Guards and Doors</h1>
        <Question id="62aa2ca02cb91af05cfde8cf" {...{update}}>
            Instead of sharp turns, what type of cuts should you make instead?
        </Question>
    </Topic>

    <Topic name="While Cutting" topicKey={3} >
        <h1>&#128070; Press the <b>START</b> button</h1>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={pressButton} fluid/>
            </Col>
        </Row>
        <h1>&#10227; Allow the blade to reach full speed before cutting</h1>
        <h1>&#9995; Keep your hands away from all cutting edges</h1>
        <h1>&#128683; Turn off the saw if</h1>
        <ul>
            <li>Blade binds or saw stalls</li>
            <li>Cut is finished</li>
        </ul>
        <h1>&#128064; Remain ready for kickback or sudden movements</h1>
        <h1>&#128683; Don't reach for pieces. Use a <b>push stick</b> to clear away material.</h1>
        <Question id="62aa2d0c3258e2a549fe199a" {...{update}}>
            The saw must reach <b>(Half Speed/Full Speed)</b> before beginning your cut.
        </Question>
    </Topic>

    <Topic name="When Done" topicKey={4} >
        <h1>&#128070; Press the <b>STOP</b> button</h1>
        <Row xs={1} md={2} className="justify-content-center m-3">
            <Col>
                <Image src={pressButton} fluid/>
            </Col>
        </Row>
        <h1>&#8986; Wait for the saw to come to a complete stop</h1>
        <h1>&#129529; Clean the tool area</h1>
        <Question id="62a0d763454f562bcef11c12" {...{update}}>
            <b>(True/False)</b> The color of the button to turn off the
            <b> band saw</b> is red.
        </Question>
    </Topic>

</Training>