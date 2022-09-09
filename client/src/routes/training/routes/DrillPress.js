import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import drillPressLocation1 from '../img/drill-press/location1.png'
import drillPressLocation2 from '../img/drill-press/location2.png'
import powerDrillLocation3 from '../img/power-drills/location3.png'
import insertBit from '../img/drill-press/insertBit.png'
import chuckKey from '../img/drill-press/chuckKey.png'
import pressBelts from '../img/drill-press/belts.png'
import speedTable from '../img/drill-press/speedTable.png'
import drillLimit from '../img/drill-press/drillLimit.png'
import startDrill from '../img/drill-press/startDrill.png'
import lowerDrill from '../img/drill-press/lowerDrill.png'
import raiseTable from '../img/drill-press/raiseTable.png'

const PowerDrills = ({update}) =>
<Training id="drill-press" >
    
    <Topic name="Location" topicKey={0} >
        <h1>&#128270; Finding the Drill Press</h1>
        <p>
            The <b>Drill Press</b> is located in the <b>Power Tool Area</b>
        </p>
        <Row xs={1} md={2}>
            <Col className="mt-auto mb-auto"><Image src={drillPressLocation1} fluid/></Col>
            <Col><Image src={drillPressLocation2} fluid/></Col>
        </Row>
        <h1>&#128270; Finding the Drill Bits</h1>
        <p>
            As shown in the <a href="/#/power-drill">Power Drill Training</a>,
            drill bits are stored in the tool chest below the handheld tools.
        </p>
        <Image src={powerDrillLocation3} fluid/>
        <Question id="6290d12ab9b607c258dd75dd" {...{update}} choices={['Classroom Area', 'Power Tools Area','Machine Shop']}>
            What area is the drill press located in?
        </Question>
        <Question id="6290d113b9b607c258dd75dc" {...{update}} choices={['Cart', 'Tool Chest', 'Filing Cabinet']}>
            Drill bits can be found in what below the handheld tools?
        </Question>
    </Topic>
    
    <Topic name="Before Drilling" topicKey={1} >

        <h2>Select a Drill Bit</h2>
        <p>
            As shown in the <a href="/#/power-drill">Power Drill Training</a>,
            there are a variety of drill bits to chose from. It is important you select
            the correct bit for your material and size.
        </p>
        <h2>Attach Bit to Chuck</h2>
        <p>
            Loosen the <b>chuck</b> by turning the metal piece shown below, then insert
            your bit and tighten the chuck by turning it in the opposite direction.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={insertBit} fluid/></Col>
        </Row>
        <p>
            Finish tightening the chuck by using the <b>chuck key</b> to
            further tighten all three teeth.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={chuckKey} fluid/></Col>
        </Row>

        <h2>Set Drill Press Speed</h2>
        <p>
            Adjusting the speed of the press is done by reconfiguring the drive belts,
            which can be accessed by opening the lid.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={pressBelts} fluid/></Col>
        </Row>
        <p>
            Given your <b>drill bit size</b> and <b>material</b>,
            adjust the belt configuration to match the desired speed (in RPM), using
            the table below for reference.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={speedTable} fluid/></Col>
        </Row>

        <h2>(Optional) Set Drill Limit</h2>
        <p>
            Occasionally, you may want to limit how far the drill is able to travel. (For example, if
            you only intend to drill half-way through the workpiece.)
            This can be done by adjusting the screw shown below:
        </p>
        <Row xs={1} md={2} className="justify-content-center p-3">
            <Col><Image src={drillLimit} fluid/></Col>
        </Row>

        <h2>(Optional) Adjust Table Height</h2>
        <p>
            Additionally, you can reposition the table by first loosening it, then using the crank lever to raise or lower it.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={raiseTable} fluid/></Col>
        </Row>

        <Question id="629134817752370324f53c4f" {...{update}}>
            Using the provided table, what <b>RPM</b> should you set the drill press to for a <b>1/2" hole</b> in <b>acryllic</b> using a <b>forstener bit</b>?
        </Question>

        <Question id="629134c87752370324f53c50" {...{update}}>
            What tool do you use to finish tightening the drill bit?
        </Question>

    </Topic>

    <Topic name="During Drilling" topicKey={2} >
        <h1>Reminders</h1>
        <h2>&#9989; &#128274; Secure your piece using either a clamp or vice</h2>
        <h2>&#9940; &#9995;Never reach around or under the working head, or grab the chuck to stop a drill press!</h2>
        <h2>&#9940; &#128556; Don’t force drilling. The tool will do the job better and safer at the rate for which it was intended.</h2>
        <h2>&#9888; As you get close to breaking through the bottom of the workpiece, reduce pressure</h2>
        <h2>&#128161; (Optional) Use the light for better visibility of your piece</h2>
        <h1>Turn On the Drill</h1>
        <p>
            Start the drill by removing the lock, then turning switching the drill on
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={startDrill} fluid/></Col>
        </Row>
        <h1>Lower the Drill</h1>
        <p>
            Slowly pull the lever on the right to lower the drill onto your work piece.
        </p>
        <Row xs={1} className="justify-content-center p-3">
            <Col><Image src={lowerDrill} fluid/></Col>
        </Row>

        <Question id="62913f887752370324f53c55" {...{update}}>
            You should never grab the _________ to stop the drill.
        </Question>

        <Question id="62913f947752370324f53c56" {...{update}}>
            Always secure your piece with a clamp or ___________.
        </Question>

    </Topic>
    <Topic name="After Drilling"  topicKey={3}>
        <h1>&#128683; &#9757; Don't Touch!</h1>
        <p>
        Don’t touch the drill bit or cuttings. The drill bit and cuttings are hot immediately after drilling.
        </p>
        <h1>&#128274; Lock Up</h1>
        <p>
        Always shut off, unplug, and lock the drill press
        </p>
        <h1>&#129529; Clean Up</h1>
        <p>
            Once cooled, put away the drill bit and clean the table.
        </p>
        <Question id="629140c27752370324f53c57" {...{update}}>
            You shouldn't touch the drill bit immediatly after drilling because it is ______________.
        </Question>
    </Topic>
</Training>

export default PowerDrills