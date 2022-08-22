import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";

import {Training, Topic, Question, Note} from './Utils';

// Introduction Images
import spaceBlueprint from '../../img/trainings/intro/spaceBlueprint.png';
import classroomArea from '../../img/trainings/intro/classroomArea.png';
import classroomArea2 from '../../img/trainings/intro/classroomArea2.png';
import powerToolArea from '../../img/trainings/intro/powerToolArea.png';
import powerToolArea2 from '../../img/trainings/intro/powerToolArea2.png';
import machineShop from '../../img/trainings/intro/machineShop.png';
import rawMaterials from '../../img/trainings/intro/rawMaterials.png';
import catwalkCubbies from '../../img/trainings/intro/catwalkCubbies.png';
import catwalkShelves from '../../img/trainings/intro/catwalkShelves.png';
import fireExtinguishers from '../../img/trainings/intro/fireExtinguishers.png';
import firstAid from '../../img/trainings/intro/firstAid.png';
import safetyGlasses from '../../img/trainings/intro/safetyGlasses.png';

// Power Drill Images
import powerDrillLocation1 from '../../img/trainings/power-drills/location1.png'
import powerDrillLocation2 from '../../img/trainings/power-drills/location2.png'
import powerDrillLocation3 from '../../img/trainings/power-drills/location3.png'
import insertBattery from '../../img/trainings/power-drills/insertBattery.png'
import drillDirection from '../../img/trainings/power-drills/drillDirection.png'
import loosenChuck from '../../img/trainings/power-drills/loosenChuck.png'
import attachBit from '../../img/trainings/power-drills/attachBit.png'
import settingTorque from '../../img/trainings/power-drills/settingTorque.png'
import regularBit from '../../img/trainings/power-drills/regularBit.png'
import forstenerBit from '../../img/trainings/power-drills/forstenerBit.png'
import holeSaw from '../../img/trainings/power-drills/holeSaw.png'
import spadeBit from '../../img/trainings/power-drills/spadeBit.png'

// Drill Press
import drillPressLocation1 from '../../img/trainings/drill-press/location1.png'
import drillPressLocation2 from '../../img/trainings/drill-press/location2.png'
import insertBit from '../../img/trainings/drill-press/insertBit.png'
import chuckKey from '../../img/trainings/drill-press/chuckKey.png'
import pressBelts from '../../img/trainings/drill-press/belts.png'
import speedTable from '../../img/trainings/drill-press/speedTable.png'
import drillLimit from '../../img/trainings/drill-press/drillLimit.png'
import startDrill from '../../img/trainings/drill-press/startDrill.png'
import lowerDrill from '../../img/trainings/drill-press/lowerDrill.png'
import raiseTable from '../../img/trainings/drill-press/raiseTable.png'

// Sawing
import woodGrain1 from '../../img/trainings/hand-saws/woodGrain1.jpg' 
import woodGrain2 from '../../img/trainings/hand-saws/woodGrain2.png' 
import woodKnot from '../../img/trainings/hand-saws/woodKnot.png' 
import sawTeeth from '../../img/trainings/hand-saws/sawTeeth.png' 
import sawDirection from '../../img/trainings/hand-saws/sawDirection.png'
import acrossGrain from '../../img/trainings/hand-saws/acrossGrain-01.png' 
import alongGrain from '../../img/trainings/hand-saws/alongGrain-01.png'
import cutGroove from '../../img/trainings/hand-saws/cutGroove-01.png'
import angledSaw from '../../img/trainings/hand-saws/angledSaw-01.png'

// BandSaws
import cuttingSurface from '../../img/trainings/band-saws/cuttingSurface-01.png'
import cuttingSurface2 from '../../img/trainings/band-saws/cuttingSurface2-01-01.png'
import releaseBlade from '../../img/trainings/band-saws/releaseBlade-01.png'
import removeBlade from '../../img/trainings/band-saws/removeBlade-01.png'
import loosenTension1 from '../../img/trainings/band-saws/loosenTension-01.png'
import loosenTension2 from '../../img/trainings/band-saws/loosenTension-02-01.png'
import loosenTension3 from '../../img/trainings/band-saws/loosenTension-03-01.png'
import wheelTilt from '../../img/trainings/band-saws/wheelTilt-01.png'
import adjustBladeGuard from '../../img/trainings/band-saws/adjustBladeGuard-01.png'
import adjustBladeGuard2 from '../../img/trainings/band-saws/adjustBladeGuard-02-01.png'
import planYourCut from '../../img/trainings/band-saws/planYourCut-01.png'
import reliefCuts from '../../img/trainings/band-saws/reliefCuts-01.png'
import pressButton from '../../img/trainings/band-saws/pressButton-01.png'
import bandSawLocation from '../../img/trainings/band-saws/bandSawLocation-01.png'

// JigSaws
import jigSawLocation from '../../img/trainings/jig-saws/jigSawLocation-01.png';
import jigSawLocation2 from '../../img/trainings/jig-saws/jigSawLocation2-01.png'
import jigSawLocation3 from '../../img/trainings/jig-saws/jigSawLocation3-01.png'
import removeJigBlade from '../../img/trainings/jig-saws/removeBlade-01.png'
import addJigBlade from '../../img/trainings/jig-saws/addBlade-01.png'
import pullTrigger from '../../img/trainings/jig-saws/pullTrigger-01.png'

// PowerSanders
import benchDirection from '../../img/trainings/power-sanders/benchDirection-01.png'
import sandersLocation from '../../img/trainings/power-sanders/sandersLocation-01.png'
import sandersLocation2 from '../../img/trainings/power-sanders/sandersLocation2-01-01.png'
import attachOrbital from '../../img/trainings/power-sanders/attachOrbital-01.png'
import sheetWidth from '../../img/trainings/power-sanders/sheetWidth-01.png'
import sheetWidth2 from '../../img/trainings/power-sanders/sheetWidth2-01.png'
import attachSheet from '../../img/trainings/power-sanders/attachSheet-01.png'
import attachSheet2 from '../../img/trainings/power-sanders/attachSheet2-01.png'
import attachSheet3 from '../../img/trainings/power-sanders/attachSheet3-01.png'
import loosenPlatform from '../../img/trainings/power-sanders/loosenPlatform-01.png'
import removeSheet from '../../img/trainings/power-sanders/removeSheet-01.png'
import addSheet from '../../img/trainings/power-sanders/addSheet-01.png'
import tightenPlatform from '../../img/trainings/power-sanders/tightenPlatform-01.png'
import loosenBelt from '../../img/trainings/power-sanders/loosenBelt-01.png'
import removeBelt from '../../img/trainings/power-sanders/removeBelt-01.png'
import addBelt from '../../img/trainings/power-sanders/addBelt-01.png'
import tightenBelt from '../../img/trainings/power-sanders/tightenBelt-01.png'
import tiltKnob from '../../img/trainings/power-sanders/tiltKnob-01.png'
import powerSheet from '../../img/trainings/power-sanders/powerSheet-01.png'
import powerBench from '../../img/trainings/power-sanders/powerBench-01.png'
import leftSide from '../../img/trainings/power-sanders/leftSide-01.png'

// Routers
import directionOfFeed from '../../img/trainings/routers/directionOfFeed.png'
import bitTypes from '../../img/trainings/routers/bitTypes.jpeg'
import tableVsHandheld from '../../img/trainings/routers/tableVsHandheld.jpg'
import dovetailJoint from '../../img/trainings/routers/dovetailJoint.jpg'
import removeCover from '../../img/trainings/routers/removeCover-01.png'
import addCover from '../../img/trainings/routers/addCover-01.png'
import addScrews from '../../img/trainings/routers/addScrews-01.png'
import loosenCollet from '../../img/trainings/routers/loosenCollet-01.png'
import removeBit from '../../img/trainings/routers/removeBit-01.png'
import newCollet from '../../img/trainings/routers/newCollet-01.png'
import newBit from '../../img/trainings/routers/newBit-01.png'
import heightLock from '../../img/trainings/routers/heightLock-01.png'
import heightButton from '../../img/trainings/routers/heightButton-01.png'
import heightKnob from '../../img/trainings/routers/heightKnob-01.png'
import guideKnobs from '../../img/trainings/routers/guideKnobs-01.png'
import adjustGuide from '../../img/trainings/routers/adjustGuide-01.png'
import backingKnobs from '../../img/trainings/routers/backingKnobs-01.png'
import adjustBacking from '../../img/trainings/routers/adjustBacking-01.png'
import attachVaccum from '../../img/trainings/routers/attachVaccum-01.png'
import insertPlug from '../../img/trainings/routers/insertPlug-01.png'

// FDM 3D Printing
import timelapse from '../../img/trainings/fdm-3d-printing/timelapse.gif'
import FDMdiagram from '../../img/trainings/fdm-3d-printing/FDMdiagram.jpeg'
import slicing from '../../img/trainings/fdm-3d-printing/slicing.jpeg'
import layerHeight from '../../img/trainings/fdm-3d-printing/layerHeight.jpeg'
import infill from '../../img/trainings/fdm-3d-printing/infill.jpeg'
import supports from '../../img/trainings/fdm-3d-printing/supports.jpeg'
import supports2 from '../../img/trainings/fdm-3d-printing/supports2.png'
import horseExample from '../../img/trainings/fdm-3d-printing/horseExample.jpeg'

// Laser Cutting
import laserExample from '../../img/trainings/laser-cutting/example.gif'

// TODO Move Images to external links

/*

Useful Characters:

Check: &#9989;
No: &#128683;
Hand: &#9995;
Both Hands: &#128080;
Lock: &#128274;
Construction Worker: &#128119;
Left Arrow Bar: &#8676;
Right Arrow: &#8594;
Clockwise: &#10227;
*/

const Introduction = ({user, update}) => 
    <Training id="introduction" user={user}>

        <Topic name="How to Complete a Training" topicKey={0} user={user}>
            <p>
                Trainings are divided into <b>Topics. </b>
                Each <b>Topic</b> contains a series of <b>Questions </b> 
                which must all be answered before a training is considered <b>completed.</b>
            </p>
            <Question id="6282b4eb90fb3d0449fe4d1c" {...{user, update}}>Type <i>answer</i> into the box below and press <b>Submit</b></Question>
            <p>
                Your progress in a given <b>Topic</b> can be tracked by the <b>Progress Tiles </b>
                above.
            </p>
            <p>
                Each <b>Question</b> is represented by a <b>red tile</b> (<span className="progress-tile-0"></span>)
                that will turn to a <b>green tile</b> (<span className="progress-tile-1"></span>) when the correct answer is submitted
            </p>
            <Question id="6282b50a90fb3d0449fe4d1d" {...{user, update}}>
                Using the <b>Progress Tiles</b>, how many <b>Questions</b> are in this <b>Training?</b>
            </Question>
            <p>
                As you complete <b>Questions</b>, your total progress within the <b>Training </b>
                will be tracked at the top right of the page.
            </p>
            <Question id="6282ba0490fb3d0449fe4d1e" {...{user, update}}>What color is this number?</Question>
            <p>
                When you complete all <b>Questions</b> in a <b>Training, </b>
                this number will change to <Badge bg="success">Completed</Badge>.
            </p>
        </Topic>

        <Topic name="Lab Layout" topicKey={1} user={user}>

            <h1>&#129519; Fire Extinguisher Locations</h1>
            <Row xs={1} md={2} className="justify-content-center">
                <Col><Image src={fireExtinguishers} fluid/></Col>
            </Row>

            <h1>&#127973; First Aid Stations</h1>
            <Row xs={1} md={2} className="justify-content-center">
                <Col><Image src={firstAid} fluid/></Col>
            </Row>

            <h1>&#9874; Work Spaces</h1>
            <p>The lab has three separate spaces that can be booked.</p>
            <ol>
                <li>Classroom Area</li>
                <li>Power Tool Area</li>
                <li>Machine Shop</li>
            </ol>
            <p>Here is a map of where they all can be found:</p>
            <Row md={2} xs={1} className="justify-content-center p-3">
                <Image src={spaceBlueprint} fluid/>
            </Row>

            <h2>&#128221; Classroom Area</h2>
            <Row md={2} xs={1} className="p-3">
                <Col><Image src={classroomArea2} fluid/></Col>
                <Col><Image src={classroomArea} fluid/></Col>
            </Row>
            <p className="mt-3">
                 The largest of the three. The <b>Classroom Area </b> is able to to accomodate large classes at its benches and tables. 
            </p>
            <h3>Available Tools</h3>
            <Row md={4} xs={2}>
                <Col>
                    Classroom supplies
                    <ul>
                        <li>Paper</li>
                        <li>Pencils</li>
                        <li>Rulers</li>
                    </ul>
                </Col>
                <Col>
                    Robotics supplies
                    <ul>
                        <li>Motors</li>
                        <li>Aluminum</li>
                        <li>Controllers</li>
                    </ul>
                </Col>
                <Col>
                    3D Printing Supplies
                    <ul>
                        <li>Printers</li>
                        <li>Filament</li>
                        <li>Tools</li>
                    </ul>
                </Col>
                <Col>
                    Misc Supplies
                    <ul>
                        <li>Sand</li>
                        <li>Whiteboards</li>
                        <li>Projector</li>
                    </ul>
                </Col>
            </Row>

            <p><a href="/#/tools/">Click here for a complete inventory of the <b>Classroom Area</b></a></p>

            <h2>&#128268; Power Tool Area</h2>
            <Row md={2} xs={1}>
                <Col><Image src={powerToolArea2} fluid/></Col>
                <Col><Image src={powerToolArea} fluid/></Col>
            </Row>
            <p className="mt-3">
                Where you will find most tools and materials inside the lab.
            </p>
            <h3>Available Tools</h3>
            <Row md={4} xs={2}>
                <Col>
                    Handheld Tools
                    <ul>
                        <li>Saws</li>
                        <li>Clamps</li>
                        <li>Drills</li>
                    </ul>
                </Col>
                <Col>
                    Power Tools
                    <ul>
                        <li>Drills</li>
                        <li>Jig Saws</li>
                        <li>Sanders</li>
                    </ul>
                </Col>
                <Col>
                    Stationary Tools
                    <ul>
                        <li>Band Saw</li>
                        <li>Drill Press</li>
                        <li>Belt Sander</li>
                    </ul>
                </Col>
                <Col>
                    Advanced Tools
                    <ul>
                        <li>Lathe</li>
                        <li>Router</li>
                        <li>Table Saw</li>
                    </ul>
                </Col>
            </Row>

            <p><a href="/#/tools/">Click here for a complete inventory of the <b>Power Tool Area</b></a></p>

            <h2>&#9881; Machine Shop</h2>
            <Row md={2} xs={1} className="justify-content-center">
                <Col><Image src={machineShop} fluid/></Col>
            </Row>
            <p className="mt-3">
                A separate room where you will find most metalworking equipment, as well as the Laser Cutter.
            </p>
            <h3>Available Tools</h3>
            <Row md={4} xs={2}>
                <Col>
                    Metalworking
                    <ul>
                        <li>Horizontal Band Saw</li>
                        <li>Grinder</li>
                        <li>Chop Saw</li>
                    </ul>
                </Col>
                <Col>
                    Welding
                    <ul>
                        <li>Welder</li>
                        <li>Welding Masks</li>
                        <li>Gloves</li>
                    </ul>
                </Col>
                <Col>
                    Laser Cutter
                    <ul>
                        <li>Filter</li>
                        <li>Acryllic and Plywood</li>
                        <li>Assistance Pump</li>
                    </ul>
                </Col>
                <Col>
                    Resin 3D Printing
                    <ul>
                        <li>Resin Printer</li>
                        <li>Wash Station</li>
                        <li>PPE</li>
                    </ul>
                </Col>
            </Row>

            <p><a href="/#/tools/">Click here for a complete inventory of the <b>Machine Shop</b></a></p>

            <Question id="62840cca90fb3d0449fe4d20" {...{user, update}}>Where are the rulers located?</Question>
            <Question id="62840d1a90fb3d0449fe4d21" {...{user, update}}>If you need to work on metal, which area should you reserve?</Question>

            <h1>&#129717; Raw Materials</h1>
            <p><b>Raw Materials</b> are located in the <b>Power Tool Area</b>, to the left along the far wall.</p>
            <Row md={2} xs={1} className="justify-content-center">
                    <Col><Image fluid src={rawMaterials}/></Col>
            </Row>
            <p>Here you will be able to find:</p>
            <Row>
                <Col>
                    <ul>
                        <li>Plywood</li>
                        <li>PVC Piping</li>
                        <li>Miscelaneous Lumber</li>
                    </ul>
                </Col>
                <Col>
                    <ul>
                        <li>Cardboard</li>
                        <li>Foam</li>
                        <li>Cinder Blocks</li>
                    </ul>
                </Col>
                <Col>
                    And much more!
                </Col>
            </Row>

            <Note>
                If you can not find the material you need, let <b>Mr. Byrne </b>
                know and he would be happy to order it for you.
            </Note>

            <Question id="62840f0790fb3d0449fe4d22" {...{user, update}}>Raw Materials are located in which part of the lab?</Question>
            
            <h1>&#128452; Storage</h1>

            <p>There are two options for storing projects.</p>

            <Row className="text-center" md={2} xs={1}>
                <Col>
                    <h2>Cubbies under the Cat Walk Stairs</h2>
                    <Image fluid src={catwalkCubbies}/>
                </Col>
                <Col>
                    <h2>On the Cat Walk Shelves</h2>
                    <Image fluid src={catwalkShelves}/>
                </Col>
            </Row>

            <p>
                If you require storage for your project, you must get permission from <b>Mr. Byrne </b>
                ahead of time.
            </p>
            <p>
                Additionally, students must <b>always </b> hang their bags and jackets on the hooks
                below the stairs.
            </p>

            <Question id="6284134e90fb3d0449fe4d23" {...{user, update}}>
                True or False, You can store your project anywhere, as long as it's out of the way.
            </Question>
            <Question id="628f7b6ab9b607c258dd75ae" {...{user, update}}>
                Before beginning their work, students must place their belongings below the:
            </Question>
            


        </Topic>

        <Topic name="General Safety" topicKey={2} user={user}>
            <h1>&#128683; &#127828; No Food &#128683; &#129380; No Beverages</h1>
            <p>
                There are no food or beverages (including water) allowed in the lab.
            </p>
            <h1>&#128683; &#129331; Avoid Distrations</h1>
            <p>
                Whether it's making TikToks or waving to your friends in the class next door,
                getting distracted while in the lab can be <b>very dangerous. </b>
                Always stay focused on your work, and allow others to do the same.
            </p>
            <h1>&#129520; Never Use a Tool Without Being Trained</h1>
            <p>
                Before using a tool, you must first complete it's <a href="/#/tools">Safety Training</a>, then schedule a 
                time to show your proficiency to Mr. Byrne.
            </p>
            <p>
                Once you have completed a tool's training, you can then reserve it from the <a href="/#/tools">Tools Dashboard.</a>
            </p>
            <p>
                Additionally, each tool has a <b>Safety Document,</b> which provides additional precautions for that particular tool.
            </p>
            <h1>&#128226; Report Injuries, Accidents, or Broken Tools <i>Immediately</i> </h1>
            <Question id="628f7ba0b9b607c258dd75af" {...{user, update}}>
                <b>True</b> or <b>False... </b> you are allowed to bring your Chik-Fil-A to the lab.
            </Question>
            <Question id="628f7dc9b9b607c258dd75b0" {...{user, update}}>
                Before using a tool, you must first complete its ________________
            </Question>
            <Question id="62841f5490fb3d0449fe4d26" {...{user, update}}>
                Refer to a tool's ___________ if you are unsure of whether you need to wear gloves while you use it.
            </Question>
        </Topic>

        <Topic name="General Safety: Clothing" topicKey={3} user={user}>

            <h1>&#129405; Wear Safety Glasses</h1>
            <p>
                If you are using <b>power tools</b>, or working in the <b>Power Tool Area</b> or <b>Machine Shop, </b>
                you must always be wearing <b>safety glasses,</b> which are available in the following locations:
            </p>

            <Row xs={1} md={2} className="justify-content-center">
                <Col><Image src={safetyGlasses} fluid/></Col>
            </Row>
            
            <h1>&#128683; &#129507; Remove or secure loose hair and clothing</h1>
            <p>
                Things such as long sleeves, ties, braids, and loose jewelry can all get in the way of your work, and become dangerous while using a tool.
                Be sure to remove any jewelry/clothing you can, and tie back your hair.
            </p>
            <Note>
                <b>Hair ties</b> are available upon request.
            </Note>
            <h1>&#128095; Wear closed toed shoes</h1>
            <p>
                Remember to plan ahead (especially in the warm months).
            </p>
            <h1>&#9888; &#128088; Wear Clothing You Don't Mind Getting Dirty</h1>
            <p>
                If you are concerned about your clothing, ask <b>Mr. Byrne </b>
                for a set of coveralls, which you will be able to borrow for the period/day.
            </p>

            <Question id="6284173d90fb3d0449fe4d24" {...{user, update}}>
                What is the one area of the lab where <b>Safety Glasses</b> are not required (unless using a <b>power tool</b>)?
            </Question>

            <Question id="62841ee590fb3d0449fe4d25" {...{user, update}}>
                If you show up to work in the lab wearing your favorite sweatshirt and don't want to get it dirty, what can you ask <b>Mr. Byrne </b>
                to borrow?
            </Question>

            <Question id="628f8807b9b607c258dd75b1" {...{user, update}}>
                If you have long hair, what should you ask Mr. Byrne for before beginning your work?
            </Question>

        </Topic>

    </Training>

const PowerDrills = ({user, update}) =>
    <Training id="power-drills" user={user}>
        <Topic name="Location" topicKey={0} user={user}>
            <h1>&#128270; Finding the Drills</h1>
            <p>
                <b>Power Drills</b> are stored on the far wall of the <b>Power Tool Area</b>, hanging
                on the bottom right corner of the particle board.
            </p>
            <Row xs={1} md={2}>
                <Col><Image src={powerDrillLocation1}/></Col>
                <Col><Image src={powerDrillLocation2}/></Col>
            </Row>
            <h1>&#128270; Finding the Screws/Bits</h1>
            <p>
                Screws and bits are located immediately below in the first and second drawers of the <b>Tool Chest</b>
            </p>
            <Row xs={1} md={2} className="justify-content-center">
                <Col><Image src={powerDrillLocation3}/></Col>
            </Row>
            <h1>&#9166; Returning the Drills</h1>
            <p>
                The particle board has pictures showing where the drills are to be placed on the particle board. When returning the drills
                 be sure to:
                 <ol>
                     <li>Remove the Battery</li>
                     <li>Remove any drill/bits</li>
                     <li>Ensure it is hanging in the correct orientation</li>
                 </ol>
            </p>
            <Question {...{user, update}} id="628f91ddb9b607c258dd75b6">
                Power drills are hanging on the wall in which area?
            </Question>
            <Question {...{user, update}} id="628f96f4b9b607c258dd75bb">
                Screws and bits are located in the __________ below where the drills are hanging.
            </Question>
        </Topic>

        <Topic name="Basic Use" topicKey={1} user={user}>
            <h1>&#128267; Attaching the Battery</h1>
            <p>
                <b>Power drills</b> are <b>cordless tools</b>, meaning they are powered by
                batteries as opposed to plugging them into the wall. Batteries for the <b>power drills </b> 
                hang next to them on the particle board and are attached by simply sliding them in from the bottom.
            </p>
            <Row xs={1} md={2} className="justify-content-center p-3">
                <Col>
                    <Image src={insertBattery} fluid/>
                </Col>
            </Row>
            <Note>
                Remove the battery by pressing in the buttons on either side.
            </Note>
            <h1>&#128260; Switching Direction</h1>
            <p>
                Switching the direction the drill is spinning can be done by pressing the buttons on either
                side of the trigger.
            </p>
            <Row xs={1} md={2} className="justify-content-center p-3">
                <Col>
                    <Image src={drillDirection} fluid/>
                </Col>
            </Row>
            <h1>Changing the Bit</h1>
            <p>
                To change the bit, the <b>chuck</b> must first be loosened. This is done by holding the <b>chuck </b> 
                while the drill spins to the <b>left.</b>
            </p>
            <Row xs={1} md={2} className="justify-content-center p-3">
                <Col>
                    <Image src={loosenChuck} fluid/>
                </Col>
            </Row>
            <p>
                The bit can then be placed inside, and the chuck tightened around it by holding it once again, but this
                time turning the drill to the <b>right</b>
            </p>
            <Row xs={1} md={2} className="justify-content-center p-3">
                <Col>
                    <Image src={attachBit} fluid/>
                </Col>
            </Row>
            <h1>Setting Torque</h1>
            <p>
                Sometimes, you may want to limit the amount of force the drill is able to apply. For example, drill through
                a soft piece of wood. This is done by limiting the drill's <b>torque</b> setting.
            </p>
            <Row xs={1} md={2} className="justify-content-center p-3">
                <Col>
                    <Image src={settingTorque} fluid/>
                </Col>
            </Row>

            <Question id="628fae6cb9b607c258dd75bc" {...{user, update}}>
                Instead of plugging into the wall, power drills get their electricity from ______________.
            </Question>

            <Question id="628fae80b9b607c258dd75bd" {...{user, update}}>
                If you are afraid to drill too far into a piece, what setting can you lower?
            </Question>

            <Question id="628faec4b9b607c258dd75be" {...{user, update}}>
                Removing a bit is done by first loosening the drill's ___________.
            </Question>

        </Topic>

        <Topic name="Drilling a Hole" topicKey={2} user={user}>
            <h1>Selecting a Drill Bit</h1>
            <p>
                Drill bits come in a variety of sizes and styles. Which bit you use depends on both the <b>size of the hole</b>,
                and the material being drilled into.
            </p>
            <Table variant="dark" className="text-center">
                <thead>
                    <tr><th></th><th>Regular</th><th>Spade</th><th>Forstener</th><th>Hole Saw</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <td><Image src={regularBit} fluid/></td>
                        <td><Image src={spadeBit} fluid/></td>
                        <td><Image src={forstenerBit} fluid/></td>
                        <td><Image src={holeSaw} fluid/></td>
                    </tr>
                    <tr>
                        <th>Hole Sizes</th>
                        <td>1/64" - 1/2"</td>
                        <td>1/4" - 1-1/2"</td>
                        <td>1/4" - 1-1/2"</td>
                        <td>1" - 1-3/4"</td>
                    </tr>
                    <tr>
                        <th>Materials</th>
                        <td>Any</td>
                        <td>Harder Woods</td>
                        <td>Softer Woods</td>
                        <td>Softer Woods</td>
                    </tr>
                    <tr>
                        <th>Additional Info</th>
                        <td></td>
                        <td></td>
                        <td>Good for partial holes</td>
                        <td>Good for clean holes</td>
                    </tr>
                    
                </tbody>
            </Table>
            <h1>Before Drilling</h1>
            <h2>&#9989; Secure your piece with a vice or clamp</h2>
            <h2>&#9989; Chuck is tightly secured to the bit</h2>
            <h2>&#9989; Trigger turns the drill to the "right" when it is pulled and “off” when it is released</h2>
            <Note>
                Instead of drawing the circle of your hole on the piece, mark the center with an <b>X</b>. This will allow you to center the drill in the desired spot.
            </Note>
            <Note>
                Be sure that you secure your piece so that you will not drill into the table or another surface.
            </Note>
            <h1>While Drilling</h1>
            <h2>&#9989; Firmly grasp the trigger handle</h2>
            <h2>&#9989; Hold or brace the tool securely</h2>
            <h2>&#9989; Keep a firm footing</h2>
            <h2>&#9989; Don’t force the tool</h2>
            <h2>&#9989; As you get close to breaking through the workpiece, reduce pressure</h2>
            <h1>After Drilling</h1>
            <h2>&#9989; Remove bit and battery</h2>
            <h2>&#9989; Return drill and supplies to storage</h2>
            <h2>&#9989; Clean your work area</h2>

            <Question id="628fc324b9b607c258dd75bf" {...{user, update}}>
                Which bit would be best for a 3/4" hole through a hard piece of plywood?
            </Question>

            <Question id="628fc333b9b607c258dd75c0" {...{user, update}}>
                If you only need to make a hole half way through a piece, which type of bit should you use?
            </Question>

            <Question id="628fc343b9b607c258dd75c1" {...{user, update}}>
                While drilling, what should you do as you approach the end of the piece?
            </Question>

        </Topic>

        <Topic name="Attaching a Screw" topicKey={3} user={user}>
            <h1>Before Screwing</h1>
            <h2>&#9989; Select the right screw size/variety for your needs</h2>
            <h2>&#9989; Replace the drill bit</h2>
            <h2>&#9989; Secure the pieces to be screwed together</h2>
            <h2>&#9989; Set a proper torque setting</h2>
            <h2>&#9989; Drill a pilot hole</h2>
            <h1>While Screwing</h1>
            <h2>&#9989; Apply constant pressure</h2>
            <h2>&#9989; Firmly grasp the trigger handle</h2>
            <h2>&#9989; Hold or brace the tool securely</h2>
            <h2>&#9989; Keep a firm footing</h2>
            <h2>&#9989; Don’t force the tool</h2>
            <Note>
                If you need to remove a screw, although it seem counterintuitive, continue applying downward pressure
                to ensure the bit has good contact with the screw
            </Note>
            <Note>
                If the drill is unable to spin and simply clicks, you may need to increase the <b>Torque Setting</b>
            </Note>
            <h1>After Screwing</h1>
            <h2>&#9989; Remove bit and battery</h2>
            <h2>&#9989; Return drill and supplies to storage</h2>
            <h2>&#9989; Clean your work area</h2>

            <Question id="628fc826b9b607c258dd75c2" {...{user, update}}>
                What should you always apply while screwing, even if you are removing a screw?
            </Question>

            <Question id="628fc835b9b607c258dd75c3" {...{user, update}}>
                Before screwing pieces together, you should first drill what type of hole in each?
            </Question>

        </Topic>

    </Training>

const DrillPress = ({user, update}) =>
    <Training id="drill-press" user={user}>
        
        <Topic name="Location" topicKey={0} user={user}>
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
                As shown in the <a href="/#/trainings/power-drill">Power Drill Training</a>,
                drill bits are stored in the tool chest below the handheld tools.
            </p>
            <Row xs={1} md={2} className="justify-content-center">
                <Col><Image src={powerDrillLocation3} fluid/></Col>
            </Row>
            <Question id="6290d12ab9b607c258dd75dd" {...{user, update}}>
                What area is the drill press located in?
            </Question>
            <Question id="6290d113b9b607c258dd75dc" {...{user, update}}>
                Drill bits can be found in what below the handheld tools?
            </Question>
        </Topic>
        
        <Topic name="Before Drilling" topicKey={1} user={user}>

            <h2>Select a Drill Bit</h2>
            <p>
                As shown in the <a href="/#/trainings/power-drill">Power Drill Training</a>,
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

            <Question id="629134817752370324f53c4f" {...{user, update}}>
                Using the provided table, what <b>RPM</b> should you set the drill press to for a <b>1/2" hole</b> in <b>acryllic</b> using a <b>forstener bit</b>?
            </Question>

            <Question id="629134c87752370324f53c50" {...{user, update}}>
                What tool do you use to finish tightening the drill bit?
            </Question>

        </Topic>

        <Topic name="During Drilling" topicKey={2} user={user}>
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

            <Question id="62913f887752370324f53c55" {...{user, update}}>
                You should never grab the _________ to stop the drill.
            </Question>

            <Question id="62913f947752370324f53c56" {...{user, update}}>
                Always secure your piece with a clamp or ___________.
            </Question>

        </Topic>
        <Topic name="After Drilling" user={user} topicKey={3}>
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
            <Question id="629140c27752370324f53c57" {...{user, update}}>
                You shouldn't touch the drill bit immediatly after drilling because it is ______________.
            </Question>
        </Topic>
    </Training>

const Sanding = ({user, update}) =>
    <Training id="sanding" user={user}>

        <Topic name="Locating the Sandpaper" topicKey={0} user={user}>
            <p>
                <b>Sandpaper</b> can be found in one of the <b>blue bins</b> hanging on the 
                wall in the <b>Classroom Area.</b>
            </p>
            <Question id="629e1a2b2cda6544f2f4bdcb" {...{user, update}}>
                <b>Sandpaper</b> is located in the <b>_____ bins</b> in the <b>Classroom Area</b>
            </Question>
        </Topic>

        <Topic name="Identifying Grit" topicKey={1} user={user}>
            <p>
                Sandpapers are manufactured with a specific <b>grit</b>, which is a way to classify
                how coarse (or rough) the sandpaper is. The <b>lower</b> the grit, the <b>rougher</b> the sand paper.
                Below are some examples of common grits and their uses:
            </p>
            <Table variant="dark">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Grit</th>
                        <th>Best For</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [
                            ['Coarse (Rough)', '60-80', 'Reshaping'],
                            ['Medium', '100-150', 'Reshaping and Smoothing'],
                            ['Fine', '180-220', 'Smoothing'],
                            ['Ultra-Fine', '320', 'Super Smooth']
                        ].map( ([type, grit, best], idx) =>
                            <tr key={idx}>
                                <td>{type}</td>
                                <td>{grit}</td>
                                <td>{best}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <p>
                When <b>sanding</b> a piece, it is important to <b>increase the grit</b> each
                time you sand. For example, if you have a very rough piece of wood that you want
                to make very smooth, <b>do not start with ultra-fine sandpaper.</b> Begin with
                a low grit (60-80) then slowly increase until you achieve the desired smoothness.
            </p>
            <Question id="629e1e50df42577b5eb3b941" {...{user, update}}>
                <b>Sandpaper</b> with a <b>grit</b> of <b>200</b> would probably be best for _______.
            </Question>

            <Question id="629e1d48f29f709591002922" {...{user, update}}>
                When sanding a piece, you should start with a ________ <b>(low/high)</b> grit.
            </Question>
        </Topic>

    </Training>

const PowerSanders = ({user, update}) =>
    <Training id="power-sanders" user={user}>

        <Topic name="Intro to Sanders" topicKey={0} user={user}>
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
            <Question id="62a87cf693df89fff24da2da" {...{user, update}}>
                Because it can use any type of sandpaper, which type of <b>sander</b> is
                considered the most flexible? 
            </Question>
            <Question id="62a87dfa5b764f65020357cf" {...{user, update}}>
                <b>Sheet</b> and <b>orbital</b> sanders ____________, whereas bench sanders
                spin continuously.
            </Question>
        </Topic>

        <Topic name="Attaching Sandpaper" topicKey={1} user={user}>

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
            <Question id="62a87e63690dd456e0193639" {...{user, update}}>
                When attaching sandpaper to the orbital sander, what do you have to ensure
                are aligned?
            </Question>
            <Question id="62a8855257c92404c356efa9" {...{user, update}}>
                If the belt of the bench sander is slipping off, you must adjust the __________
                of the top roller.
            </Question>
        </Topic>

        <Topic name="Before Sanding" topicKey={2} user={user}>
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
            <Question id="62a886ca6d9fab90decc263c" {...{user, update}}>
                <b>(True/False)</b> Sanders should be turned on before being plugged in.
            </Question>
        </Topic>

        <Topic name="While Sanding" topicKey={3} user={user}>
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
            <Question id="62aa2b98d85f9a4d3edc56a5" {...{user, update}}>
                While using the disc on the bench sander, which side of the disc should you press your work piece against?
            </Question>
        </Topic>

        <Topic name="After Sanding" topicKey={4} user={user}>
            <h1>&#9940; &#8635; Switch the tool off and wait for it to stop moving</h1>
            <h1>Never lay down the portable tool until the sanding pad or belt has come to a complete stop.</h1>
            <Question id="62aa2bf9567936cc17fda73d" {...{user, update}}>
                <b>(True/False)</b> Before moving on to your next task, you must wait for the sander to come to a complete stop.
            </Question>
        </Topic>

    </Training>

const Sawing = ({user, update}) =>
    <Training id="hand-saws" user={user}>

        <Topic name="Wood Basics" topicKey={0} user={user}>
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
            <Question id="629e5aaf6f8c0ec1e48c13d1" {...{user, update}}>
                <b>Grains</b> of wood, which carry resources throughout the tree, are similar to a bundle
                of ________.
            </Question>
            <Question id="629e5ac829c99c231baa643f" {...{user, update}}>
                Wherever possible, you should do your best to avoid cutting through what?
            </Question>
        </Topic>

        <Topic name="Saw Basics" topicKey={1} user={user}>
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
            <Question id="629f5a8b21609add9e117386" {...{user, update}}>
                Saws cut by moving their teeth _______ a material.
            </Question>
            <Question id="629f5aeeaaabad6e8547faf0" {...{user, update}}>
                <b>(Larger/Smaller)</b> teeth should be used while cutting <b>along</b> the grain.
            </Question>
        </Topic>

        <Topic name="Before Your Cut" topicKey={2} user={user}>
            <h1>&#9999; Mark the Cutline</h1>
            <p>
                Always remember to <b><i>"Measure Twice, Cut Once"</i></b>
            </p>
            <h1>&#9759; Secure Your Piece</h1>
            <p>
                Secure your piece by using either a <a href="/#/tools/60e6469458e61d0b3d60fe2e">C-Clamp</a>,
                <a href="/#/tools/60e6469458e61d0b3d60fe2f"> Quick-Grip Clamp</a>, or <a href="/#/tools">vice</a>.
            </p>
            <Question id="629f70b103e6f04893882529" {...{user, update}}>
                <b>(True/False)</b> You only need to measure your cut once.
            </Question>
        </Topic>

        <Topic name="During Your Cut" topicKey={3} user={user}>
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
            <Question id="629f702fed7645e6bb3eed36" {...{user, update}}>
                Before beginning your cut, you should create a small _________.
            </Question>
        </Topic>

    </Training>

const BandSaws = ({user, update}) =>
    <Training id="band-saws" user={user}>

        <Topic name="Band Saw Basics" topicKey={0} user={user}>
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
            <Question id="62a0ca415eb5095e80b60c2a" {...{user, update}}>
                When you change the width of the blade being used, you must also adjust the blade
                __________.
            </Question>
            <Question id="62a0ca8191f47950a83bd985" {...{user, update}}>
                How far above the piece should the blade guard be?
            </Question>
        </Topic>

        <Topic name="Before Cutting" topicKey={2} user={user}>
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
            <Question id="62aa2ca02cb91af05cfde8cf" {...{user, update}}>
                Instead of sharp turns, what type of cuts should you make instead?
            </Question>
        </Topic>

        <Topic name="While Cutting" topicKey={3} user={user}>
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
            <Question id="62aa2d0c3258e2a549fe199a" {...{user, update}}>
                The saw must reach <b>(Half Speed/Full Speed)</b> before beginning your cut.
            </Question>
        </Topic>

        <Topic name="When Done" topicKey={4} user={user}>
            <h1>&#128070; Press the <b>STOP</b> button</h1>
            <Row xs={1} md={2} className="justify-content-center m-3">
                <Col>
                    <Image src={pressButton} fluid/>
                </Col>
            </Row>
            <h1>&#8986; Wait for the saw to come to a complete stop</h1>
            <h1>&#129529; Clean the tool area</h1>
            <Question id="62a0d763454f562bcef11c12" {...{user, update}}>
                <b>(True/False)</b> The color of the button to turn off the
                <b> band saw</b> is red.
            </Question>
        </Topic>

    </Training>

const JigSaws = ({user, update}) =>
    <Training id="jig-saws" user={user}>

        <Topic name="Jig Saw Basics" topicKey={0} user={user}>
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
            <Question id="62a771a8fad687b1055ba3ed" {...{user, update}}>
                Replacement blades can be found on top of the tool chest in the ____________.
            </Question>
            <Question id="62a7720c295e17dddd765098" {...{user, update}}>
                <b>(True/False): </b> The teeth of the blade should be facing <b>away</b> from the user
                when inserted into the saw.
            </Question>
        </Topic>

        <Topic name="Before Cutting" topicKey={1} user={user}>
            <h1>&#9989; Check the Blade</h1>
            <p>Never use a bent, broken or warped saw blade.</p>
            <h1>&#9989; Ensure all guards are in place.</h1>
            <h1>&#128683; &#128268; Make sure the saw is not <b>locked on</b></h1>
            <h1>&#128274; Firmly position the saw
                plate/shoe on the workpiece.</h1>
            <h1>&#9989; Turn the tool “ON” and
                allow the blade to reach full speed. </h1>
            <Question id="62a7733426b769ea2d9760ad" {...{user, update}}>
                Before plugging in the tool, you should always make sure it is not locked ____.
            </Question>
        </Topic>

        <Topic name="While Cutting" topicKey={2} user={user}>
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
            <Question id="62a773775a0e47bc282eb64f" {...{user, update}}>
                Release the __________ if the blade starts to bind or the saw stalls.
            </Question>
            <Question id="62a773da16d0a78d33d12fc6" {...{user, update}}>
                When you release the trigger, the saw will continue to ___________, so it
                is important to keep your hands and body clear.
            </Question>
        </Topic>

    </Training>

const Routers = ({user, update}) =>
    <Training id="routers" user={user}>

        <Topic name="Router Basics" topicKey={0} user={user}>
            <h1>What is a Router?</h1>
            <p><b>Routers</b> are used to shape edges, create grooves, and perform a variety of
            other tasks on a workpiece.
            </p>
            <p>The tool uses a rotating <b>bit</b> of a particular shape, 
                    which is then guided along a particular path.
            </p>
            <h1>Types of Bits</h1>
            <p>Router bits come in a variety of shapes and sizes. Below are some
                common examples.
            </p>
            <Row>
                <Col>
                    <Image src={bitTypes} fluid/>
                </Col>
            </Row>
            <h1>Handheld vs. Table</h1>
            <p>Routers typically come in two configurations <b>handheld</b> or <b>table mounted</b>.
                    Which you use depends on the task at hand.
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={tableVsHandheld} fluid/>
                </Col>
            </Row>
            <p>
                <b>Handheld Routing</b> is typically better for:
            </p>
            <ul>
                <li>Flexibility</li>
                <li>Larger Pieces</li>
                <li>Improved Visibility of your Route</li>
            </ul>
            <p>
                Whereas <b>Table Routing</b> is better for:
            </p>
            <ul>
                <li>Smaller Pieces</li>
                <li>Larger ({`<`} 1.75" in diameter) Routing Bits</li>
                <li>Safety</li>
            </ul>

            <Question id="62aca9ea5ee1db2c6876eeaf" {...{user, update}}>
                <b>(Table/Handheld)</b> routing should be used to add an edge to an 8 ft board.
            </Question>
            
            <Question id="62acaa7f5ee1db2c6876eeb0" {...{user, update}}>
                <b>(Table/Handheld)</b> routing should be used if the desired bit is 2" in diameter.
            </Question>

            <Question id="62acbe325ee1db2c6876eeb7" {...{user, update}}>
                What is the name of the <b>bit</b> that creates the shape shown below?
                <Row>
                    <Col>
                        <Image src={dovetailJoint} fluid/>
                    </Col>
                </Row>
            </Question>

        </Topic>

        <Topic name="Setting up the Router" topicKey={1} user={user}>
            <h1>General</h1>
            <h2>Changing the Bit</h2>
            <p>To change the bit, start by using <b>only the provided wrenches </b>
                    to loosen the <b>collet</b>. The bit can then be easily slid out.
            </p>
            <Row>
                <Col>
                    <Image src={loosenCollet} fluid/>
                </Col>
                <Col>
                    <Image src={removeBit} fluid/>
                </Col>
            </Row>
            <Note>
                Be careful while removing the <b>router bit</b>, as their sharp edges
                can easily cause cuts.
            </Note>
            <p>Occasionally, a <b>router bit</b> requires a different sized <b>collet. </b>
                    To remove the <b>collet</b>, simply continue loosening until the <b>collet </b>
                    itself comes off. Screw the new <b>collet</b> into place, and add your new <b>bit.</b>
            </p>
            <Row>
                <Col>
                    <Image src={newCollet} fluid/>
                </Col>
                <Col>
                    <Image src={newBit} fluid/>
                </Col>
            </Row>
            <h2>Adjusting the Bit Height</h2>
            <p>It is <b><i>essential</i></b> you adjust the height of your <b>bit </b>
                    to be aligned with the workpiece and ensure the tool functions properly.
                    This is done by first releasing the <b>router's height lock.</b> 
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={heightLock} fluid/>
                </Col>
            </Row>
            <p>
                The height can then be adjusted in one of two ways:
            </p>
            <ul>
                <li>Pressing the height releasing and manually sliding the tool (shown on the left), or</li>
                <li>Turning the <b>height adjustment knob</b> for more precise control (shown right)</li>
            </ul>
            <Row>
                <Col>
                    <Image src={heightButton} fluid/>
                </Col>
                <Col>
                    <Image src={heightKnob} fluid/>
                </Col>
            </Row>
            <h1>Using the Table</h1>
            <h2>Mounting to the Table</h2>
            <p>
                Hold the <b>Router</b> under the table and attach it using the three screws shown below,
                then press the router cover into place.
            </p>
            <Row>
                <Col>
                    <Image src={addScrews} fluid/>
                </Col>
                <Col>
                    <Image src={addCover} fluid/>
                </Col>
            </Row>
            <h2>Adjust Guide</h2>
            <p>Adjusting the <b>router table's guide </b>
                    is an important step in making sure the tools is ready to safely and accurate
                    route the desired shape. 
            </p>
            <Row>
                <Col>
                    <Image src={guideKnobs} fluid/>
                </Col>
                <Col>
                    <Image src={adjustGuide} fluid/>
                </Col>
            </Row>
            <h2>Adjust Backing</h2>
            <p>Once the guide is properly placed, slide the backings into their desired positions
                around the router bit.
            </p>
            <Row>
                <Col>
                    <Image src={backingKnobs} fluid/>
                </Col>
                <Col>
                    <Image src={adjustBacking} fluid/>
                </Col>
            </Row>
            <Note>
                The <b>backing and guides</b> should be as close to the tool as possible without
                actually touching it. This will provide maximum support and safety.
            </Note>
            <h2>Plug in the Router</h2>
            <Row className="text-center">
                <Col>
                    <Image src={insertPlug} fluid/>
                </Col>
            </Row>
            <h2>(Optional) Attach Vaccum</h2>
            <p>To make cleanup a bit easier, a vaccum can be attached to the back of the tool to
                collect saw dust as it is generated.
            </p>
            <Row className="text-center">
                <Col>
                    <Image src={attachVaccum} fluid/>
                </Col>
            </Row>
            <Question id="62acbc655ee1db2c6876eeb1" {...{user, update}}>
                <b>(True/False)</b> You can use any wrench to change the bit,
                so long as it fits.
            </Question>
            <Question id="62acbc905ee1db2c6876eeb2" {...{user, update}}>
                What can be attached to the back of the router to make
                cleanup easier?
            </Question>
            <Question id="62acbcd05ee1db2c6876eeb3" {...{user, update}}>
                What setting of the router bit <b>must</b> be adjusted in order
                for the tool to work properly?
            </Question>
        </Topic>

        <Topic name="Before Routing" topicKey={2} user={user}>
            <h1>&#9989; Check the tool</h1>
            <p>Make sure the tool and its accessories are in proper working order.</p>
            <h1>&#128274; Secure the bit</h1>
            <p>After changing the bits or making any adjustments, make sure the collet nut 
                and any other adjustment devices are securely tightened.</p>
            <h1>&#9989; Use the Provided Wrench</h1>
            <p>Always use the wrenches provided with the tool to make adjustments. Using the correct wrench
                enables a more secure grip on the tool and may prevent slipping leading to potential injury</p>
            <h1>&#9989; Keep the Workpiece Clear</h1>
            <p>Never start the tool when the bit is touching the workpiece.</p>
            <Question id="62acbd1b5ee1db2c6876eeb4" {...{user, update}}>
                What is the name of the piece that holds the router bit inside of the router itself?
            </Question>
        </Topic>

        <Topic name="While Routing" topicKey={3} user={user}>
            <h1>&#128683; &#128119; &#8676; Never use a router with the bit pointing toward you.</h1>
            <h1>&#128064; Watch for Issues</h1>
            <p>If the router does not run smoothly, the bit may be bent or out of balance. 
                Replace the bit immediately.</p>
            <h1>&#128080; Use Both Hands</h1>
            <p>
                Hold the router (or workpiece if using a table router) firmly with both hands.
                The reaction torque of the motor can cause the tool to twist.
            </p>
            <h1>&#128683; &#9995; Keep Hands Clear</h1>
            <p>
            Keep your hands and fingers away from the work area. Contact with the bit will cause serious
            injury.
            </p>
            <h1>&#8594; &#10227; Feed in the Same Direction as Rotation</h1>
            <Row>
                <Col className="text-center m-3">
                    <Image src={directionOfFeed} fluid/>
                </Col>
            </Row>
            <p>
                Always feed the bit into the workpiece in the
                same direction as the bit rotation (same direction
                as the chips are being thrown). When the router
                is positioned between your body and the side of
                the routed workpiece, the direction of the router
                feed is to the right. If the router is positioned on
                the side of the workpiece away from your body
                the direction of the router feed is to the left.
            </p>
            <Note>
                Feeding the tool in the wrong direction causes
                the cutting edge of the bit to climb out of the
                work piece and pull the tool toward the operator,
                and may result in loss of control and injury
            </Note>

            <Question id="62acbd945ee1db2c6876eeb5" {...{user, update}}>
                While routing, the workpiece must move in the <b>(Same/Opposite)</b> direction
                the bit is spinning.
            </Question>

        </Topic>

        <Topic name="After Routing" topicKey={4} user={user}>
            <h1>&#128683; &#9995; Don't Touch!</h1>
            <p>
                Never touch the bit during or immediately after
                use. The bit is too hot to be touched with bare
                hands.
            </p>
            <h1>&#8986; Wait for the tool to stop</h1>
            <p>
                Never lay the tool down until the motor and bit
                have come to a complete standstill. The spinning
                bit can grab a surface and pull the tool out of
                your control.
            </p>
            <h1>&#129529; Clean Up!</h1>
            <p>
                Unplug, clean and store the tool in a safe, dry
                place after use.
            </p>
            <Question id="62acbdc75ee1db2c6876eeb6" {...{user, update}}>
                Don't lay down the tool until it has come to a complete ___________.
            </Question>
        </Topic>

    </Training>

const FDMPrinting = ({user, update}) =>
    <Training id="fdm-3d-printing" user={user}>

        <Topic name="Introduction to 3D Printing" topicKey={0} user={user}>
            <h1>How Does a 3D Printer Work?</h1>
            <p>
                <b>3D Printing</b> works by placing successive layers of <b>uncured</b> plastic on top
                of one another, then curing them to make a 3-dimensional shape.
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={timelapse} fluid/>
                </Col>
            </Row>
            <h1>Why 3D Printing Though?</h1>
            <p>
                <b>3D Printing</b> is unique in that it is an <b>additive manufacturing</b> process,
                as opoosed to sanding, for example, which is a <b>reductive manufacturing</b> process.
                Material is <b>added</b> to the workpiece as opposed to <b>removed.</b>
            </p>
            <p>
                This can be beneficial in making complex geometries and limiting waste.
            </p>
            <h1>Types of 3D Printing</h1>
            <p>Some common types of 3D printing include:</p>
            <ul>
                <li className="m-3">
                    <b>Fused Deposition Modeling (FDM)</b> - Far and away the most common 3D printing
                    technique for its durability and ease-of-use. Works similar to a tiny hot glue gun
                    sculpting a shape.
                </li>
                <iframe className="w-100" src="https://www.youtube.com/embed/m_QhY1aABsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <li className="m-3">
                    <b>Stereolithography (SLA)</b> - Another common technology that uses a Laser
                    to cure a liquid resin in the desired shape. Although SLA provides a higher level
                    of precision to FDM, handling the resin and curing it can sometimes be laborious.
                </li>
                <Row>
                    <Col>
                    <iframe className="w-100" src="https://www.youtube.com/embed/yW4EbCWaJHE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Col>
                </Row>
                <li className="m-3">
                    <b>Powder Bed Fusion (SLS)</b> - Like building a steel sandcastle out of metallic
                    powder.
                </li>
                <iframe className="w-100" src="https://www.youtube.com/embed/yiUUZxp7bLQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </ul>
            <Question id="62b0866c66a743ab817e4d53" {...{user, update}}>
                <b>3D Printing</b> is a <b>(Additive/Reductive)</b> manufacturing process.
            </Question>
            <Question id="62b08aaaad376e41cc77718e" {...{user, update}}>
                <b>(FDM/SLA/SLS)</b> uses a laser to cure a liquid resin.
            </Question>
        </Topic>

        <Topic name="Basics of FDM" topicKey={1} user={user}>
            <h1>Working Principle</h1>
            <p>
                In this training, we will focus on <b>FDM</b> printing, which, as we learned in the previous
                section, works by feeding a plastic filamenet through a series of rollers and motors into
                a hot nozzle, which melts the plastic on a platform. 
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={FDMdiagram} fluid/>
                </Col>
            </Row>
            <h1>Advantages</h1>
            <ul>
                <li>&#128176; Printers and required filament are extremely affordable</li>
                <li>&#9757; Easily upgradable</li>
                <li>Relatively simple compared to other 3D printing technologies</li>
            </ul>
            <h1>Disadvantages</h1>
            <ul>
                <li><b>Inaccurate</b> compared to other technologies</li>
                <li>Some shapes require <b>supports</b></li>
                <li>Layers are usually visible on the surface</li>
            </ul>
            <h1>Materials</h1>
            <p>Below are some common materials used in FDM printing:</p>
            <ul>
                <li>
                    <b>Polylactic Acid (PLA)</b> - a biodegradable and bioactive thermoplastic polyester
                    that is the most common FDM printing material.
                </li>
                <li>
                    <b>Acrylonitrile butadiene styrene (ABS)</b> -
                    It’s widely used in producing a multitude of everyday goods like your keyboard keycaps,
                    and is a bit <b>stronger</b> than PLA.
                </li>
                <li>
                    <b>Thermoplastic polyurethane (TPU)</b> -
                    Rubber-like material used in 3D printing to produce semi-flexible parts.
                </li>
            </ul>
            <Question id="62b0a837897fd4c5433743a9" {...{user, update}}>
                <b>(PLA/ABS/TPU)</b> is a rubber-like plastic that creates flexible 3D printed parts.
            </Question>
            <Question id="62b0ab054d0bf53e8255c1f5" {...{user, update}}>
                3D printing filament is pushed through a hot __________ to melt plastic the plastic and
                fuse it to the next layer.
            </Question>
        </Topic>

        <Topic name="Creating a 3D Model" topicKey={2} user={user}>
            <h1>Available Software</h1>
            <p>
                There are a multitude of options when it comes to creating 3D files. Some of the most
                common are:
            </p>
            <ul>
                <li>
                    <b><a href="https://www.tinkercad.com/">Tinkercad</a></b> -
                    A simple, light-weight 3D modeling program that runs in a web browser.
                </li>
                <li>
                    <b><a href="https://fusion.online.autodesk.com/">Fusion 360</a></b> -
                    A more robust computer-aided design, computer-aided manufacturing, computer-aided engineering 
                    and printed circuit board design software application. (Requires License)
                </li>
                <li>
                    <b><a href="https://www.blender.org/">Blender</a></b> -
                    Used for creating animated films, visual effects, art, 3D-printed models, 
                    motion graphics, interactive 3D applications, virtual reality, and, formerly, 
                    video games.
                </li>
            </ul>
            <h1>.STL Files</h1>
            <p>
                No matter which software you use, it is important to export your models as
                <b> stereolithography (STL)</b> files, which are easily read by <b>slicing</b> software,
                which we will touch on in the next section.
            </p>
            <Question id="62b0ad3efbfeea5d554dec78" {...{user, update}}>
                What extension should you always export your 3D CAD files as?
            </Question>
        </Topic>

        <Topic name="Slicing Your Model" topicKey={3} user={user}>
            <h1>What is Slicing?</h1>
            <p>
                Slicing is the process of turning your generated 3D model into
                layered <b>GCODE</b> instructions for the 3D printer
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={slicing} fluid/>
                </Col>
            </Row>
            <h1>Available Software</h1>
            <p>
                Like 3D CAD, there are many different options to do this:
            </p>
            <ul>
                <li>
                    <b><a href="https://www.prusa3d.com/page/prusaslicer_424/">Prusa Slicer</a></b>
                </li>
                <li>
                    <b><a href="https://ultimaker.com/software/ultimaker-cura">Ultimaker Cura</a></b>
                </li>
                <li>
                    <b><a href="https://slic3r.org/">Slic3r</a></b>
                </li>
            </ul>
            <h1>Slicing Settings</h1>
            <p>
                There are various settings that can be changed in your slicing software which will
                affect everything from the print time to model resolution.
            </p>
            <h2>Layer Height</h2>
            <p>
                Arguably the most important setting is <b>layer height</b>, which changes the thickness
                of each successive layer placed by the 3D printer.
            </p>
            <p>
                <b>Decreasing</b> the layer height allows for a better quality print, but drastically
                <b> increases</b> the time required to complete it.
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={layerHeight} fluid/>
                </Col>
            </Row>
            <h2>Infill</h2>
            <p>
                Infill adjusts the amount of material inside the outer bounds of your 3D model. For
                example, an infill of <b>0%</b> would mean a <b>completely hollow</b> shape, whereas an
                <b> infill of 100%</b> would be <b>completely solid.</b>
            </p>
            <p>
                As you might have guess, adding infill <b>increases the strength</b> of a part, but also
                <b> increase the time</b> it takes to complete.
            </p>
            <Row>
                <Col className="text-center m-3">
                    <Image src={infill} fluid/>
                </Col>
            </Row>
            <h2>Supports</h2>
            <p>
                Occasionally, the geometry of your 3D model will prevent successive layers from being
                added. In these cases, <b>supports</b> must be added and then removed later in order for
                the model to print.
            </p>
            <Row sm={1} md={2} className="m-3">
                <Col className="text-center">
                    <Image src={supports} fluid/>
                </Col>
                <Col className="text-center">
                    <Image src={supports2} fluid/>
                </Col>
            </Row>
            <h2>Additional Settings</h2>
            <p>
                Most other settings, such as nozzle temperature and travel speed are determined by your 
                printer and material. Rarely will you have to change these.
            </p>
            <h1>Exporting as GCODE</h1>
            <p>
                The file then generated by the slicing software, and what will be sent to the printer
                is GCODE, which will act as instructions for the printer, controlling everything from the
                bed temperature to the printer's movements in the XYZ coordinate system.
            </p>
            <Question id="62b0d8d3e9229982648ed8af" {...{user, update}}>
                Increasing the <b>(Infill/Layer Height)</b> also increases the time required to print.
            </Question>
            <Question id="62b0d945de01f3a7ff9f54cc" {...{user, update}}>
                What setting needs to be added in order to print the 3D model shown below?
                <Image src={horseExample} fluid/>
            </Question>
            <Question id="62b0da09652fe2051de84fc3" {...{user, update}}>
                If you want your model to look as detailed as possible, you want a <b>(Higher/Lower) </b>
                Layer Height.
            </Question>
        </Topic>

        <Topic name="Before Printing" topicKey={4} user={user}>
            <h1>&#11014; Upload your GCODE</h1>
            <p>
                Place the generated GCODE file onto the SD Card for the printer you wish to use.
            </p>
            <h1>&#8693; Level the Bed</h1>
            <p>Using the knobs at each corner, level the bed so that a standard piece of paper
                is barely able to slide under the nozzle.
            </p>
            <h1>&#128293; Preheat the Nozzle and Bed</h1>
            <p>
                Each material must be printed at a specified temperature. Be sure to select the
                proper one when preheating. For example, <b>PLA</b> should have a <b>nozzle at 215°C </b>
                and a <b>bed at 60°C.</b>
            </p>
            <h1>&#8635; Change to the Desired Filament</h1>
            <p>
                Once the nozzle has reached 100°C, you can pull out the current filament. 
            </p>
            <Question id="62b318155ee1db2c6876eeba" {...{user, update}}>
                What temperature (in °C) does the nozzle need to reach before filament can
                be removed?
            </Question>
            
        </Topic>

        <Topic name="While Printing" topicKey={5} user={user}>
            <h1>Select the GCODE File to start your Print</h1>
            <h1>&#128064; Monitor the First Layer</h1>
            <p>
                Watch closely for:
            </p>
            <ul>
                <li><b>Nozzle Too High</b> - Filament not fused to the bed</li>
                <li><b>Nozzle Too Low</b> - No filament is able to come out</li>
            </ul>
            <p>
                If either of these occur: cancel your print, and try leveling the build plate again.
            </p>
            <h1>&#9202; Check Periodically</h1>
            <p>
                After the first layer is complete, the printer operates on its own, and can sometimes take
                over 24 hours for a single model. There is no need to sit there the whole time, but
                periodic checks help to catch issues (missed supports, filament runout), and prevent wasted
                materials or broken printers.
            </p>
            <Question id="62b31ad35ee1db2c6876eebb" {...{user, update}}>
                <b>(True/False)</b> you must sit with the printer for the entirity of your print.
            </Question>
            <Question id="62b31b475ee1db2c6876eebc" {...{user, update}}>
                If the filament on the first layer is not sticking to the bed, then the nozzle is too
                <b> (High/Low)</b>
            </Question>
        </Topic>

        <Topic name="After Printing" topicKey={6} user={user}>
            <h1>Remove Model from the Bed</h1>
            <p>
                Each printer has a magnetic print bed, meaning it can be removed from the printer,
                then peeled off of your model(s).
            </p>
            <h1>(Optional) Remove Supports</h1>
            <p>
                If your model includes supports, remove them using pliers and wire cutters.
            </p>
            <Question id="62b31c0d5ee1db2c6876eebd" {...{user, update}}>
                Each printer has a __________ bed, which makes removing parts easier.
            </Question>
        </Topic>

    </Training>

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

const Template = ({user, update}) =>
    <Training id="test" user={user}>

        <Topic name="test topic" topicKey={0} user={user}>
            <p></p>
            <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
        </Topic>

        <Topic name="test topic" topicKey={1} user={user}>
            <p></p>
            <Question id="627d4fd10783abd908d257dd" {...{user, update}}>Test Question</Question>
        </Topic>

    </Training>

export {
    Introduction, 
    PowerDrills, 
    DrillPress, 
    Sanding, 
    PowerSanders, 
    Sawing, 
    BandSaws, 
    JigSaws,
    Routers,
    FDMPrinting,
    LaserCutting
};