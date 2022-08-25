import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import jigSawLocation from '../img/jig-saws/jigSawLocation-01.png';
import jigSawLocation2 from '../img/jig-saws/jigSawLocation2-01.png'
import jigSawLocation3 from '../img/jig-saws/jigSawLocation3-01.png'
import removeJigBlade from '../img/jig-saws/removeBlade-01.png'
import addJigBlade from '../img/jig-saws/addBlade-01.png'
import pullTrigger from '../img/jig-saws/pullTrigger-01.png'

export default ({update}) =>
<Training id="jig-saws" >

    <Topic name="Jig Saw Basics" topicKey={0} >
        <h1>&#128270; Finding the Jig Saws</h1>
        <p>Jig Saws can be found hanging on the wall in the Power Tool Area</p>
        <Row className="m-3">
            <Col><Image src={jigSawLocation} fluid/></Col>
        </Row>
        <p>Replacement blades can be found underneath in the <b>Sharps Container.</b></p>
        <Row md={2} sm={1}>
            <Col><Image src={jigSawLocation2} fluid/></Col>
            <Col><Image src={jigSawLocation3} fluid/></Col>
        </Row>
        <h1>&#8635; Changing the Jig Saw Blade</h1>
        <p>
            To remove a blade from the jig saw, release the locking mechanism on the front. The blade
            should then pop out on its own.
        </p>
        <p>
            Add a blade by reversing this process, <b>making sure the teeth of the blade face outwards.</b>
        </p>
        <Row md={2} sm={1}>
            <Col>
                <Image src={removeJigBlade} fluid/>
            </Col>
            <Col>
                <Image src={addJigBlade} fluid/>
            </Col>
        </Row>
        <h1>&#128268; Operating the Saw</h1>
        <p>
            Once the saw is plugged in, operating it is as simple as pulling the trigger. The blade
            with then move up and down, providing a cuting surface.
        </p>
        <Row className="text-center">
            <Col>
                <Image src={pullTrigger} fluid/>
            </Col>
        </Row>
        <Question id="62a771a8fad687b1055ba3ed" {...{update}}>
            Replacement blades can be found on top of the tool chest in the ____________.
        </Question>
        <Question id="62a7720c295e17dddd765098" {...{update}}>
            <b>(True/False): </b> The teeth of the blade should be facing <b>away</b> from the user
            when inserted into the saw.
        </Question>
    </Topic>

    <Topic name="Before Cutting" topicKey={1} >
        <h1>&#9989; Check the Blade</h1>
        <p>Never use a bent, broken or warped saw blade.</p>
        <h1>&#9989; Ensure all guards are in place.</h1>
        <h1>&#128683; &#128268; Make sure the saw is not <b>locked on</b></h1>
        <h1>&#128274; Firmly position the saw
            plate/shoe on the workpiece.</h1>
        <h1>&#9989; Turn the tool “ON” and
            allow the blade to reach full speed. </h1>
        <Question id="62a7733426b769ea2d9760ad" {...{update}}>
            Before plugging in the tool, you should always make sure it is not locked ____.
        </Question>
    </Topic>

    <Topic name="While Cutting" topicKey={2} >
        <h1>&#128064; Concentrate on what you are doing and be aware of kickback</h1>
        <h1>&#128683; &#128556; NEVER overreach!</h1>
        <h1>&#128683; Never remove the saw from a cut while the blade is moving.</h1>
        <h1>&#128683; &#9995; Never reach under the saw or workpiece.</h1>
        <h1>&#128683; Release the trigger immediately if the blade binds or the saw stalls.</h1>
        <h1>&#128683; &#9995; Keep your hands away from all cutting edges and moving parts. Never place your fingers in line with the blade.</h1>
        <h1>&#128683; Switch the tool off after a cut is completed, and
            keep the saw away from your body until the
            blade stops. The blade may coast for a time,
            posing the risk of serious cuts</h1>
        <Question id="62a773775a0e47bc282eb64f" {...{update}}>
            Release the __________ if the blade starts to bind or the saw stalls.
        </Question>
        <Question id="62a773da16d0a78d33d12fc6" {...{update}}>
            When you release the trigger, the saw will continue to ___________, so it
            is important to keep your hands and body clear.
        </Question>
    </Topic>

</Training>