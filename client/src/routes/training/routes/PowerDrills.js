import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import powerDrillLocation1 from '../img/power-drills/location1.png'
import powerDrillLocation2 from '../img/power-drills/location2.png'
import powerDrillLocation3 from '../img/power-drills/location3.png'
import insertBattery from '../img/power-drills/insertBattery.png'
import drillDirection from '../img/power-drills/drillDirection.png'
import loosenChuck from '../img/power-drills/loosenChuck.png'
import attachBit from '../img/power-drills/attachBit.png'
import settingTorque from '../img/power-drills/settingTorque.png'
import regularBit from '../img/power-drills/regularBit.png'
import forstenerBit from '../img/power-drills/forstenerBit.png'
import holeSaw from '../img/power-drills/holeSaw.png'
import spadeBit from '../img/power-drills/spadeBit.png'

export default function PowerDrills({ update }) {
  return (
    <Training id="power-drills">
      <Topic name="Location" topicKey={0}>
        <h1>&#128270; Finding the Drills</h1>
        <p>
          <b>Power Drills</b> are stored on the far wall of the <b>Power Tool Area</b>, hanging
          on the bottom right corner of the particle board.
        </p>
        <Row xs={1} md={2}>
          <Col><Image src={powerDrillLocation1} /></Col>
          <Col><Image src={powerDrillLocation2} /></Col>
        </Row>
        <h1>&#128270; Finding the Screws/Bits</h1>
        <p>
          Screws and bits are located immediately below in the first and second drawers of the <b>Tool Chest</b>
        </p>
        <Row xs={1} md={2} className="justify-content-center">
          <Col><Image src={powerDrillLocation3} /></Col>
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
        <Question {...{ update }} id="628f91ddb9b607c258dd75b6" choices={["Classroom Area", "Power Tool Area", "Machine Shop"]}>
          Power drills are hanging on the wall in which area?
        </Question>
        <Question {...{ update }} id="628f96f4b9b607c258dd75bb" choices={["Cardboard Box", "Cart", "Tool Chest"]}>
          Screws and bits are located in the __________ below where the drills are hanging.
        </Question>
      </Topic>

      <Topic name="Basic Use" topicKey={1} >
        <h1>&#128267; Attaching the Battery</h1>
        <p>
          <b>Power drills</b> are <b>cordless tools</b>, meaning they are powered by
          batteries as opposed to plugging them into the wall. Batteries for the <b>power drills </b>
          hang next to them on the particle board and are attached by simply sliding them in from the bottom.
        </p>
        <Row xs={1} md={2} className="justify-content-center p-3">
          <Col>
            <Image src={insertBattery} fluid />
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
            <Image src={drillDirection} fluid />
          </Col>
        </Row>
        <h1>Changing the Bit</h1>
        <p>
          To change the bit, the <b>chuck</b> must first be loosened. This is done by holding the <b>chuck </b>
          while the drill spins to the <b>left.</b>
        </p>
        <Row xs={1} md={2} className="justify-content-center p-3">
          <Col>
            <Image src={loosenChuck} fluid />
          </Col>
        </Row>
        <p>
          The bit can then be placed inside, and the chuck tightened around it by holding it once again, but this
          time turning the drill to the <b>right</b>
        </p>
        <Row xs={1} md={2} className="justify-content-center p-3">
          <Col>
            <Image src={attachBit} fluid />
          </Col>
        </Row>
        <h1>Setting Torque</h1>
        <p>
          Sometimes, you may want to limit the amount of force the drill is able to apply. For example, drill through
          a soft piece of wood. This is done by limiting the drill's <b>torque</b> setting.
        </p>
        <Row xs={1} md={2} className="justify-content-center p-3">
          <Col>
            <Image src={settingTorque} fluid />
          </Col>
        </Row>

        <Question id="628fae6cb9b607c258dd75bc" {...{ update }} choices={["Batteries", "Light", "Shear Force of Will"]}>
          Instead of plugging into the wall, power drills get their electricity from ______________.
        </Question>

        <Question id="628fae80b9b607c258dd75bd" {...{ update }} choices={["Speed", "Size", "Torque"]}>
          If you are afraid to drill too far into a piece, what setting can you lower?
        </Question>

        <Question id="628faec4b9b607c258dd75be" {...{ update }} choices={["Set Screw", "Chuck", "Case", "All of the Above"]}>
          Removing a bit is done by first loosening the drill's ___________.
        </Question>

      </Topic>

      <Topic name="Drilling a Hole" topicKey={2} >
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
              <td><Image src={regularBit} fluid /></td>
              <td><Image src={spadeBit} fluid /></td>
              <td><Image src={forstenerBit} fluid /></td>
              <td><Image src={holeSaw} fluid /></td>
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
        <Note>
          Instead of drawing the circle of your hole on the piece, mark the center with an <b>X</b>. This will allow you to center the drill in the desired spot.
        </Note>
        <h1>Before Drilling</h1>
        <Row className="p-3">
          <Col>
            <p>
              Before working, make sure the tool and its accessories
              are in proper working order. Failure to do so may increase your risk of injury and may result in binding, stalling, and loss of control. These situations may cause the
              tool to twist or an accessory to break, causing an injury.
            </p>
          </Col>
          <Col>
            <Image height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Drill_chucks.jpg/640px-Drill_chucks.jpg" />
          </Col>
        </Row>
        <ul>
          <li>
            &#9211; Be sure the trigger turns the tool “on” when it
            is pulled and “off” when it is released. A trigger
            “lock-on” and lock release must also work correctly.</li>
          <li>&#128274; Be sure the chuck is
            tightly secured to the spindle. This is especially
            important on reversible type drills. The chuck
            could loosen and come off the drill.</li>
          <li>&#128260; Tighten the bit securely in the chuck.</li>
        </ul>
        <Note>
          Be sure that you secure your piece so that you will not drill into the table or another surface.
        </Note>

        <h1>While Drilling</h1>
        <ul>
          <li>&#128074; Firmly grasp the trigger handle and auxiliary
            handle (if provided) to maintain control.</li>
          <li>
            &#128274; Always hold or brace the tool
            securely. Brace against stationary things for maximum
            control.
          </li>
          <li>
            &#128260; In a binding situation, the tool
            will react in the
            opposite direction of
            the turning bit. When drilling
            into the workpiece (clockwise), the tool will try to spin
            counterclockwise.
          </li>
          <li>
          &#128556; Don’t force the tool – apply enough pressure to keep the bit cutting or chipping smoothly. If the
            motor slows down, relieve the pressure. Too
            much pressure can damage the bit and cause
            you to lose control of the tool.
          </li>
          <li>
          If the bit binds in the workpiece, release the trigger immediately. Unplug the tool, and then free
          the bit from the workpiece. Do not use a lock-on
          button when drilling in warped, pitched, knotty,
          or imbedded materials (e.g., reinforcing bars in
          concrete) where binding may be more common.
          Do not try to free a jammed bit by starting and
          stopping the tool.
          </li>
          <li>
          As you get close to breaking through the work-
          piece, reduce pressure and allow the bit to pass
          through the hole easily.
          </li>
          <li>
          &#129462; Always keep a firm footing when using power
          tools. Be sure you have balance and control
          before you start the job.
          </li>
          <li>
          Remove material or debris from the area, especially if it could be ignited by hot chips or friction.
          </li>
        </ul>

        <Question id="628fc324b9b607c258dd75bf" {...{ update }}>
          Which bit would be best for a 3/4" hole through a hard piece of plywood?
        </Question>

        <Question id="628fc333b9b607c258dd75c0" {...{ update }}>
          If you only need to make a hole half way through a piece, which type of bit should you use?
        </Question>

        <Question id="628fc343b9b607c258dd75c1" {...{ update }}>
          While drilling, what should you do as you approach the end of the piece?
        </Question>

      </Topic>

      <Topic name="Attaching a Screw" topicKey={3} >
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

        <Question id="628fc826b9b607c258dd75c2" {...{ update }}>
          What should you always apply while screwing, even if you are removing a screw?
        </Question>

        <Question id="628fc835b9b607c258dd75c3" {...{ update }}>
          Before screwing pieces together, you should first drill what type of hole in each?
        </Question>

      </Topic>

      <Topic name="Sources and Additional Resources" topicKey={4}>
        <h1>Sources</h1>
        <ul>
          <li><a href="https://www.powertoolinstitute.com/pti-includes/pdfs/Tool-Specific-Files/Drills-Hammer-Drills-Rotary-Hammers-Hammers.pdf">Power Tool Institute</a></li>
        </ul>
        <h1>Videos</h1>
        <iframe className="w-100" height="315" src="https://www.youtube.com/embed/IUkj5pzjgNk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe className="w-100" height="315" src="https://www.youtube.com/embed/7p5qZ74KVqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Topic>

    </Training>
  )
}
