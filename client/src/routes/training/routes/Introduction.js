import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

// Introduction Images
import spaceBlueprint from '../img/intro/spaceBlueprint.png';
import classroomArea from '../img/intro/classroomArea.png';
import classroomArea2 from '../img/intro/classroomArea2.png';
import powerToolArea from '../img/intro/powerToolArea.png';
import powerToolArea2 from '../img/intro/powerToolArea2.png';
import machineShop from '../img/intro/machineShop.png';
import rawMaterials from '../img/intro/rawMaterials.png';
import catwalkCubbies from '../img/intro/catwalkCubbies.png';
import catwalkShelves from '../img/intro/catwalkShelves.png';
import fireExtinguishers from '../img/intro/fireExtinguishers.png';
import firstAid from '../img/intro/firstAid.png';
import safetyGlasses from '../img/intro/safetyGlasses.png';

export default ({update}) => 
    <Training id="introduction">

        <Topic name="How to Complete a Training" topicKey={0}>
            <p>
                Trainings are divided into <b>Topics. </b>
                Each <b>Topic</b> contains a series of <b>Questions </b> 
                which must all be answered before a training is considered <b>completed.</b>
            </p>
            <Question id="6282b4eb90fb3d0449fe4d1c" {...{update}}>Type <i>answer</i> into the box below and press <b>Submit</b></Question>
            <p>
                Your progress in a given <b>Topic</b> can be tracked by the <b>Progress Tiles </b>
                above.
            </p>
            <p>
                Each <b>Question</b> is represented by a <b>red tile</b> (<span className="progress-tile-0"></span>)
                that will turn to a <b>green tile</b> (<span className="progress-tile-1"></span>) when the correct answer is submitted
            </p>
            <Question id="6282b50a90fb3d0449fe4d1d" {...{update}}>
                Using the <b>Progress Tiles</b>, how many <b>Questions</b> are in this <b>Training?</b>
            </Question>
            <p>
                As you complete <b>Questions</b>, your total progress within the <b>Training </b>
                will be tracked at the top right of the page.
            </p>
            <Question id="6282ba0490fb3d0449fe4d1e" {...{update}}>What color is this number?</Question>
            <p>
                When you complete all <b>Questions</b> in a <b>Training, </b>
                this number will change to <Badge bg="success">Completed</Badge>.
            </p>
        </Topic>

        <Topic name="Lab Layout" topicKey={1}>

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

            <Question id="62840cca90fb3d0449fe4d20" {...{update}}>Where are the rulers located?</Question>
            <Question id="62840d1a90fb3d0449fe4d21" {...{update}}>If you need to work on metal, which area should you reserve?</Question>

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

            <Question id="62840f0790fb3d0449fe4d22" {...{update}}>Raw Materials are located in which part of the lab?</Question>
            
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

            <Question id="6284134e90fb3d0449fe4d23" {...{update}}>
                True or False, You can store your project anywhere, as long as it's out of the way.
            </Question>
            <Question id="628f7b6ab9b607c258dd75ae" {...{update}}>
                Before beginning their work, students must place their belongings below the:
            </Question>
            


        </Topic>

        <Topic name="General Safety" topicKey={2}>
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
            <Question id="628f7ba0b9b607c258dd75af" {...{update}}>
                <b>True</b> or <b>False... </b> you are allowed to bring your Chik-Fil-A to the lab.
            </Question>
            <Question id="628f7dc9b9b607c258dd75b0" {...{update}}>
                Before using a tool, you must first complete its ________________
            </Question>
            <Question id="62841f5490fb3d0449fe4d26" {...{update}}>
                Refer to a tool's ___________ if you are unsure of whether you need to wear gloves while you use it.
            </Question>
        </Topic>

        <Topic name="Attire" topicKey={3}>

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

            <Question id="6284173d90fb3d0449fe4d24" {...{update}}>
                What is the one area of the lab where <b>Safety Glasses</b> are not required (unless using a <b>power tool</b>)?
            </Question>

            <Question id="62841ee590fb3d0449fe4d25" {...{update}}>
                If you show up to work in the lab wearing your favorite sweatshirt and don't want to get it dirty, what can you ask <b>Mr. Byrne </b>
                to borrow?
            </Question>

            <Question id="628f8807b9b607c258dd75b1" {...{update}}>
                If you have long hair, what should you ask Mr. Byrne for before beginning your work?
            </Question>

        </Topic>

    </Training>