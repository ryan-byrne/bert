import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import directionOfFeed from '../img/routers/directionOfFeed.png'
import bitTypes from '../img/routers/bitTypes.jpeg'
import tableVsHandheld from '../img/routers/tableVsHandheld.jpg'
import dovetailJoint from '../img/routers/dovetailJoint.jpg'
import removeCover from '../img/routers/removeCover-01.png'
import addCover from '../img/routers/addCover-01.png'
import addScrews from '../img/routers/addScrews-01.png'
import loosenCollet from '../img/routers/loosenCollet-01.png'
import removeBit from '../img/routers/removeBit-01.png'
import newCollet from '../img/routers/newCollet-01.png'
import newBit from '../img/routers/newBit-01.png'
import heightLock from '../img/routers/heightLock-01.png'
import heightButton from '../img/routers/heightButton-01.png'
import heightKnob from '../img/routers/heightKnob-01.png'
import guideKnobs from '../img/routers/guideKnobs-01.png'
import adjustGuide from '../img/routers/adjustGuide-01.png'
import backingKnobs from '../img/routers/backingKnobs-01.png'
import adjustBacking from '../img/routers/adjustBacking-01.png'
import attachVaccum from '../img/routers/attachVaccum-01.png'
import insertPlug from '../img/routers/insertPlug-01.png'

export default function Routers({ update }) {
  return (
    <Training id="routers" >

      <Topic name="Router Basics" topicKey={0} >
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
            <Image src={bitTypes} fluid />
          </Col>
        </Row>
        <h1>Handheld vs. Table</h1>
        <p>Routers typically come in two configurations <b>handheld</b> or <b>table mounted</b>.
          Which you use depends on the task at hand.
        </p>
        <Row>
          <Col className="text-center m-3">
            <Image src={tableVsHandheld} fluid />
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

        <Question id="62aca9ea5ee1db2c6876eeaf" {...{ update }}>
          <b>(Table/Handheld)</b> routing should be used to add an edge to an 8 ft board.
        </Question>

        <Question id="62acaa7f5ee1db2c6876eeb0" {...{ update }}>
          <b>(Table/Handheld)</b> routing should be used if the desired bit is 2" in diameter.
        </Question>

        <Question id="62acbe325ee1db2c6876eeb7" {...{ update }}>
          What is the name of the <b>bit</b> that creates the shape shown below?
        </Question>

        <Row>
          <Col>
            <Image src={dovetailJoint} fluid />
          </Col>
        </Row>

      </Topic>

      <Topic name="Setting up the Router" topicKey={1} >
        <h1>General</h1>
        <h2>Changing the Bit</h2>
        <p>To change the bit, start by using <b>only the provided wrenches </b>
          to loosen the <b>collet</b>. The bit can then be easily slid out.
        </p>
        <Row>
          <Col>
            <Image src={loosenCollet} fluid />
          </Col>
          <Col>
            <Image src={removeBit} fluid />
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
            <Image src={newCollet} fluid />
          </Col>
          <Col>
            <Image src={newBit} fluid />
          </Col>
        </Row>
        <h2>Adjusting the Bit Height</h2>
        <p>It is <b><i>essential</i></b> you adjust the height of your <b>bit </b>
          to be aligned with the workpiece and ensure the tool functions properly.
          This is done by first releasing the <b>router's height lock.</b>
        </p>
        <Row>
          <Col className="text-center m-3">
            <Image src={heightLock} fluid />
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
            <Image src={heightButton} fluid />
          </Col>
          <Col>
            <Image src={heightKnob} fluid />
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
            <Image src={addScrews} fluid />
          </Col>
          <Col>
            <Image src={addCover} fluid />
          </Col>
        </Row>
        <h2>Adjust Guide</h2>
        <p>Adjusting the <b>router table's guide </b>
          is an important step in making sure the tools is ready to safely and accurate
          route the desired shape.
        </p>
        <Row>
          <Col>
            <Image src={guideKnobs} fluid />
          </Col>
          <Col>
            <Image src={adjustGuide} fluid />
          </Col>
        </Row>
        <h2>Adjust Backing</h2>
        <p>Once the guide is properly placed, slide the backings into their desired positions
          around the router bit.
        </p>
        <Row>
          <Col>
            <Image src={backingKnobs} fluid />
          </Col>
          <Col>
            <Image src={adjustBacking} fluid />
          </Col>
        </Row>
        <Note>
          The <b>backing and guides</b> should be as close to the tool as possible without
          actually touching it. This will provide maximum support and safety.
        </Note>
        <h2>Plug in the Router</h2>
        <Row className="text-center">
          <Col>
            <Image src={insertPlug} fluid />
          </Col>
        </Row>
        <h2>(Optional) Attach Vaccum</h2>
        <p>To make cleanup a bit easier, a vaccum can be attached to the back of the tool to
          collect saw dust as it is generated.
        </p>
        <Row className="text-center">
          <Col>
            <Image src={attachVaccum} fluid />
          </Col>
        </Row>
        <Question id="62acbc655ee1db2c6876eeb1" {...{ update }}>
          <b>(True/False)</b> You can use any wrench to change the bit,
          so long as it fits.
        </Question>
        <Question id="62acbc905ee1db2c6876eeb2" {...{ update }}>
          What can be attached to the back of the router to make
          cleanup easier?
        </Question>
        <Question id="62acbcd05ee1db2c6876eeb3" {...{ update }}>
          What setting of the router bit <b>must</b> be adjusted in order
          for the tool to work properly?
        </Question>
      </Topic>

      <Topic name="Before Routing" topicKey={2} >
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
        <Question id="62acbd1b5ee1db2c6876eeb4" {...{ update }}>
          What is the name of the piece that holds the router bit inside of the router itself?
        </Question>
      </Topic>

      <Topic name="While Routing" topicKey={3} >
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
            <Image src={directionOfFeed} fluid />
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

        <Question id="62acbd945ee1db2c6876eeb5" {...{ update }}>
          While routing, the workpiece must move in the <b>(Same/Opposite)</b> direction
          the bit is spinning.
        </Question>

      </Topic>

      <Topic name="After Routing" topicKey={4} >
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
        <Question id="62acbdc75ee1db2c6876eeb6" {...{ update }}>
          Don't lay down the tool until it has come to a complete ___________.
        </Question>
      </Topic>
      
      <Topic name="Additional Resources" topicKey={5}>
        <h1>Links</h1>
        <ul>
          <li><a href="https://www.powertoolinstitute.com/pti-pages/tools/Routers.asp">Power Tool Institute (Handheld)</a></li>
          <li><a href="https://www.powertoolinstitute.com/pti-pages/tools/Shapers-Router-Tables.asp">Power Tool Institute (Table)</a></li>
          <li><a href="https://www.ehs.harvard.edu/sites/default/files/machine_shop_safety_osha_guidance_shaper-router.pdf">Harvard EHS</a></li>
        </ul>
      </Topic>

    </Training>
  )
}