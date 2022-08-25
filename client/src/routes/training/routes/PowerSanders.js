import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import benchDirection from '../img/power-sanders/benchDirection-01.png'
import sandersLocation from '../img/power-sanders/sandersLocation-01.png'
import sandersLocation2 from '../img/power-sanders/sandersLocation2-01-01.png'
import attachOrbital from '../img/power-sanders/attachOrbital-01.png'
import sheetWidth from '../img/power-sanders/sheetWidth-01.png'
import sheetWidth2 from '../img/power-sanders/sheetWidth2-01.png'
import attachSheet from '../img/power-sanders/attachSheet-01.png'
import attachSheet2 from '../img/power-sanders/attachSheet2-01.png'
import attachSheet3 from '../img/power-sanders/attachSheet3-01.png'
import loosenPlatform from '../img/power-sanders/loosenPlatform-01.png'
import removeSheet from '../img/power-sanders/removeSheet-01.png'
import addSheet from '../img/power-sanders/addSheet-01.png'
import tightenPlatform from '../img/power-sanders/tightenPlatform-01.png'
import loosenBelt from '../img/power-sanders/loosenBelt-01.png'
import removeBelt from '../img/power-sanders/removeBelt-01.png'
import addBelt from '../img/power-sanders/addBelt-01.png'
import tightenBelt from '../img/power-sanders/tightenBelt-01.png'
import tiltKnob from '../img/power-sanders/tiltKnob-01.png'
import powerSheet from '../img/power-sanders/powerSheet-01.png'
import powerBench from '../img/power-sanders/powerBench-01.png'
import leftSide from '../img/power-sanders/leftSide-01.png'

export default ({update}) =>
<Training id="power-sanders" >

    <Topic name="Intro to Sanders" topicKey={0} >
        <h1>&#128270; Finding the Sanders</h1>
        <p>The sanders are located on the wall in the <b>Power Tool Area</b></p>
        <Row className="text-center">
            <Col className="mt-auto mb-auto">
                <Image src={sandersLocation} fluid/>
            </Col>
            <Col>
                <Image src={sandersLocation2} fluid/>
            </Col>
        </Row>
        <h1>Types of Sanders</h1>
        <p>
            This training will cover three different types of sanders:
        </p>
        <h2>Orbital Sander</h2>
        <Row className="text-center">
            <Col>
                <Image src="https://i.imgur.com/pbjbfeh.png" fluid/>
            </Col>
        </Row>
        <h2>Sheet Sanders</h2>
        <Row className="text-center">
            <Col>
                <Image src="https://i.imgur.com/q6vYrAd.png" fluid/>
            </Col>
        </Row>
        <h2>Orbital vs. Sheet Sanders</h2>
        <p>
            These two sanders operate in nearly the same way, with vibrations causing the sandpaper
            to move quickly over a surface and remove material.
        </p>
        <p>
            The one difference is the types of paper each of them use. <b>Orbital sanders</b> require
            a special type of sandpaper with a <b>velcro back</b>, whereas <b>sheet sanders</b> can
            use any sandpaper that is cut to the correct size. Therefore, <b>sheet sanders</b> tend to be
            a bit more flexible, whereas <b>orbital sanders</b> tend to be a bit more precise.
        </p>
        <h2>Bench Sander</h2>
        <Row className="text-center m-3">
            <Col className="mt-auto mb-auto">
                <Image src="https://i.imgur.com/BUp9zIq.png" fluid/>
            </Col>
        </Row>
        <p>
            The <b>bench sander</b> is equipped with two separate sanding surfaces, which are shown below.
            Unlike the <b>sheet</b> and <b>orbital</b> sanders which vibrate, the bench sander has
            a disc and belt which spin continuously while running.
        </p>
        <Row className="text-center">
            <Col className="mt-auto mb-auto">
                <Image src={benchDirection} fluid/>
            </Col>
        </Row>
        <Question id="62a87cf693df89fff24da2da" {...{update}}>
            Because it can use any type of sandpaper, which type of <b>sander</b> is
            considered the most flexible? 
        </Question>
        <Question id="62a87dfa5b764f65020357cf" {...{update}}>
            <b>Sheet</b> and <b>orbital</b> sanders ____________, whereas bench sanders
            spin continuously.
        </Question>
    </Topic>

    <Topic name="Attaching Sandpaper" topicKey={1} >

        <h1>
            Orbital Sander
        </h1>
        <p>
            Sandpaper is attached to the <b>orbital sander</b> by velcro. Simply attach the sandpaper,
            ensuring that the ventilation holes match with the ones on the tool.
        </p>
        <Row className="text-center">
            <Col>
                <Image src={attachOrbital} fluid/>
            </Col>
        </Row>

        <h1>
            Sheet Sander
        </h1>
        <p>
            Changing the sandpaper on the sheet sander is a bit more involved. Start by making sure
            the desired sandpaper is the same thickness as the sander itself. If it is too large, cut
            it down to size.
        </p>
        <Row className="m-3">
            <Col><Image src={sheetWidth} fluid/></Col>
            <Col><Image src={sheetWidth2} fluid/></Col>
        </Row>
        <p>Next, clip one end of the sanding paper to the sander using the fastener show, then cut
            the sheet to the required length.
        </p>
        <Row className="m-3">
            <Col><Image src={attachSheet} fluid/></Col>
            <Col><Image src={attachSheet2} fluid/></Col>
        </Row>
        <p>
            Lastly, clip the other end of the sandpaper in the same manner as before, but on
            the other side.
        </p>
        <Row className="text-center">
            <Col>
                <Image src={attachSheet3} fluid/>
            </Col>
        </Row>

        <h1>Bench Sander</h1>

        <h2>Replacing the Circular Sheet</h2>
        <p>Start by loosening the platform, then carefully peel the current sheet off of the wheel.</p>
        <Row md={2} sm={1} className="m-3">
            <Col>
                <Image src={loosenPlatform} fluid/>
            </Col>
            <Col>
                <Image src={removeSheet} fluid/>
            </Col>
        </Row>
        <p>
            Then, place the new sheet onto the disc, making sure there are no gaps. Retighten the
            platform.
        </p>
        <Row md={2} sm={1} className="m-3">
            <Col>
                <Image src={addSheet} fluid/>
            </Col>
            <Col>
                <Image src={tightenPlatform} fluid/>
            </Col>
        </Row>
        <h2>Replacing the Belt</h2>
        <p>To replace the belt on the bench sander, first loosen it by pulling the lever shown below.
            Then simply slide the belt of each of the rollers.
        </p>
        <Row md={2} sm={1} className="m-3">
            <Col>
                <Image src={loosenBelt} fluid/>
            </Col>
            <Col>
                <Image src={removeBelt} fluid/>
            </Col>
        </Row>
        <p>
            Reverse this process to add a new belt. Make sure the lever is pressed firmly in, and the belt
            is centered on each of the rollers.
        </p>
        <Row md={2} sm={1} className="m-3">
            <Col>
                <Image src={addBelt} fluid/>
            </Col>
            <Col>
                <Image src={tightenBelt} fluid/>
            </Col>
        </Row>
        <p>
            If the belt is slipping off the rollers, adjust the <b>tilt</b> of the top roller by turning
            the know shown below.
        </p>
        <Row md={2} sm={1} className="m-3 justify-content-center">
            <Col>
                <Image src={tiltKnob} fluid/>
            </Col>
        </Row>
        <Question id="62a87e63690dd456e0193639" {...{update}}>
            When attaching sandpaper to the orbital sander, what do you have to ensure
            are aligned?
        </Question>
        <Question id="62a8855257c92404c356efa9" {...{update}}>
            If the belt of the bench sander is slipping off, you must adjust the __________
            of the top roller.
        </Question>
    </Topic>

    <Topic name="Before Sanding" topicKey={2} >
        <h1>&#128168; Make sure you have adequate ventilation</h1>
        <h1>&#9889; &#128683; Turn the sander <b>off </b>before plugging it in</h1>
        <h1>Ensure the power cord will not collide with the moving parts of the sander</h1>
        <h1>Powering on the Sheet/Orbital Sanders</h1>
        <Row md={2} sm={1} className="m-3 justify-content-center">
            <Col>
                <Image src={powerSheet} fluid/>
            </Col>
        </Row>
        <h1>Powering on the Bench Sander</h1>
        <Row md={2} sm={1} className="m-3 justify-content-center">
            <Col>
                <Image src={powerBench} fluid/>
            </Col>
        </Row>
        <Question id="62a886ca6d9fab90decc263c" {...{update}}>
            <b>(True/False)</b> Sanders should be turned on before being plugged in.
        </Question>
    </Topic>

    <Topic name="While Sanding" topicKey={3} >
        <h1>&#9995;Keep your body well clear of moving parts</h1>
        <h1>&#129308; Hold portable sanders firmly with both hands</h1>
        <h1>&#9940; &#128556; Don't apply too much pressure -- let the tool do the work!</h1>
        <h1>&#128168; If sander is equipped with a dust bag, empty it frequently</h1>
        <h1>When using the disc on the bench sander, press your piece against the left side</h1>
        <Row md={2} sm={1} className="m-3 justify-content-center">
            <Col>
                <Image src={leftSide} fluid/>
            </Col>
        </Row>
        <Question id="62aa2b98d85f9a4d3edc56a5" {...{update}}>
            While using the disc on the bench sander, which side of the disc should you press your work piece against?
        </Question>
    </Topic>

    <Topic name="After Sanding" topicKey={4} >
        <h1>&#9940; &#8635; Switch the tool off and wait for it to stop moving</h1>
        <h1>Never lay down the portable tool until the sanding pad or belt has come to a complete stop.</h1>
        <Question id="62aa2bf9567936cc17fda73d" {...{update}}>
            <b>(True/False)</b> Before moving on to your next task, you must wait for the sander to come to a complete stop.
        </Question>
    </Topic>

</Training>