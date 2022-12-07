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

export default function JigSaws({ update }) {
  return (
    <Training id="jig-saws" >

      <Topic name="Jig Saw Basics" topicKey={0} >
        <h1>&#128270; Finding the Jig Saws</h1>
        <p>Jig Saws can be found hanging on the wall in the Power Tool Area</p>
        <Row className="m-3">
          <Col><Image src={jigSawLocation} fluid /></Col>
        </Row>
        <p>Replacement blades can be found underneath in the <b>Sharps Container.</b></p>
        <Row md={2} sm={1}>
          <Col><Image src={jigSawLocation2} fluid /></Col>
          <Col><Image src={jigSawLocation3} fluid /></Col>
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
            <Image src={removeJigBlade} fluid />
          </Col>
          <Col>
            <Image src={addJigBlade} fluid />
          </Col>
        </Row>
        <h1>&#128268; Operating the Saw</h1>
        <p>
          Once the saw is plugged in, operating it is as simple as pulling the trigger. The blade
          with then move up and down, providing a cuting surface.
        </p>
        <Row className="text-center">
          <Col>
            <Image src={pullTrigger} fluid />
          </Col>
        </Row>
        <Question id="62a771a8fad687b1055ba3ed" {...{ update }} choices={["Sharps Container", "Plastic Bin", "Cardboard Box"]}>
          Replacement blades can be found on top of the tool chest in the ____________.
        </Question>
        <Question id="62a7720c295e17dddd765098" {...{ update }} choices={["True", "False"]}>
          The teeth of the blade should be facing <b>away</b> from the user
          when inserted into the saw.
        </Question>
      </Topic>

      <Topic name="Before Cutting" topicKey={1}>
        <h1>Choose the Right Tool and Blade</h1>
        <p>
          Choosing the correct tool and the proper accessory
          for your application can help to reduce the risk of serious injury. When used according to the manufacturer’s
          instructions, the proper tool and accessory will do the job
          safer and faster.
        </p>
        <ul>
          <li>&#128268; Unplug the tool before checking or installing blades or accessories.</li>
          <li>
            &#129690; Use sharp blades. Dull blades can produce
            excessive heat, make cutting difficult, result in
            forcing the saw, and possibly cause an accident.
          </li>
          <li>
            &#10024; Make sure the blade is clean. Buildup on the
            surface of the blade could cause excessive friction.
          </li>
        </ul>
        <h1>Know your Workpiece</h1>
        <p>
          Take time to review your work and make sure that all
          necessary precautions have been taken before making
          a cut.
        </p>
        <ul>
          <li>
            &#9888; Know what is behind a workpiece before you do
            the job. Do not cut into existing walls or other
            blind areas where electrical wiring may exist. If
            this situation is unavoidable, disconnect all fuses
            or circuit breakers feeding this work site.
          </li>
          <li>
            Support long workpieces at the same height as
            the saw.
          </li>
          <li>
            &#128274; Always place the workpiece securely in a vise or
            clamp when making cuts. <b><u>Never make freehand cuts.</u></b>
          </li>
          <li>
            Holding the workpiece by hand is unstable and
            may lead to loss of control.
          </li>
          <li>
            Never try to remove or clamp the workpiece
            while the blade is moving.
          </li>
        </ul>
        <h1>Before Cutting</h1>
        <p>
          Before cutting with a jig saw, make sure the tool and its
          accessories are in proper working order. Failure to do so
          may increase your risk of injury, blade pinching, binding or stalling, and loss of control. These situations may
          result in an injury.
        </p>
        <ul>
          <li>
            Check blades carefully before each use for
            proper alignment and possible defects. Never
            use a bent, broken or warped saw blade.
          </li>
          <li>
            Never attempt to cut materials larger than the
            rated capacity listed in the jig saw operator’s
            manual, as this may result in personal injury
          </li>
          <li>
            Never unplug the tool with the trigger locked on.
            Before plugging in the tool, be sure the “lock-on”
            switch is off. Accidental start-ups could cause
            injury.
          </li>
          <li>
            If the “lock-on” switch cannot be turned off with
            the trigger while the tool is running, unplug it and
            have it repaired by a qualified service technician.
          </li>
          <li>
            Be sure all guards are in place and working
            properly before each use. Do not defeat guards.
          </li>
          <li>
            Be sure all adjusting screws (knobs) and the
            blade clamp are tight before making a cut.
            Loose adjusting screws and blade clamps can
            cause the saw or blade to slip and
            loss of control may result.
          </li>
          <li>
            <Row>
              <Col>
                Make sure the blade has adequate
                blade set. Blade set provides clearance between the sides of the blade
                and the workpiece, thus minimizing
                binding. Some saw blades have
                hollow ground sides instead of blade
                set to provide clearance.
              </Col>
              <Col>
                <Image style={{ filter: "invert(100%)", background: "none" }} height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Saw_blade.svg/640px-Saw_blade.svg.png" />
              </Col>
            </Row>
          </li>
        </ul>
        <Question id="6390c9b944501334eaeb9f2b" {...{ update }} choices={['Sharp', 'Has the Right Set', "Is Clean", "All of the Above"]}>
          Before inserting a blade, make sure it is:
        </Question>
        <Question id="62a7733426b769ea2d9760ad" {...{ update }} choices={['On', 'Off']}>
          Before plugging in the tool, you should always make sure it is not locked ____.
        </Question>
        <Question id="6390c96892cf0df721f3cf5d" {...{ update }} choices={["Your Waist", "The Table", "The Saw"]}>
          Long workpieces should be supported at the same height as ____________.
        </Question>
        <Question id="6390ca8b989a7e0464bec14e" {...{ update }} choices={["Friction", "Clearance", "Lubrication"]}>
          <u>Blade set</u> provides ___________ between the sides of the blade and the workpiece.
        </Question>
        <Question id="6390cad015ae6c4687da926c" {...{ update }} choices={["True", "False"]}>
          Using a dull or broken blade is allowed, so long as you operate the saw at a lower speed.
        </Question>
      </Topic>

      <Topic name="While Cutting" topicKey={2} >
        <h1>While Cutting</h1>
        <Row>
          <Col xs={2}>
            <Image fluid src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Caution_sign_used_on_roads_pn.svg/640px-Caution_sign_used_on_roads_pn.svg.png" />
          </Col>
          <Col xs={10}>
            Concentrate on what you are doing and be
            aware of kickback (a sudden reaction to a
            pinched, bound or misaligned blade). Kickback
            can cause an uncontrolled tool to lift up and out
            of the workpiece toward the operator and is the result
            of tool misuse and/or incorrect operating procedures or
            conditions. Take these specific precautions to help prevent kickback when using a jig saw:
          </Col>
        </Row>
        <ul>
          <li>&#128400; NEVER overreach! For maximum control, hold
            the saw firmly after securing the workpiece.</li>
          <li>&#128680; Be alert to the possibility of the blade binding
            and kickback occurring.</li>
          <li>
            &#9889; Never remove the saw from a cut while the
            blade is moving. When making a partial cut, or if
            power is interrupted, release the trigger immediately and don’t remove the saw from the work
            piece until the blade has come to a complete
            stop. A saw tooth could grab the work piece,
            causing loss of control.
          </li>
          <li>
            &#128075; Never reach under the saw or workpiece. The
            blade is exposed under the work piece and the
            saw guard cannot protect your body here.
          </li>
          <li>
            Release the trigger immediately if the blade
            binds or the saw stalls.
          </li>
          <li>
            &#127777; Overheating a saw blade can cause it to warp
            and result in kickback. Buildup of sap on the
            blade, insufficient blade set, dullness, and unguided cuts, can all cause an overheated blade
            and kickback.
          </li>
          <li>
            When starting the cut, firmly position the saw
            plate/shoe on the workpiece before turning on
            the tool. Always keep firm contact between the
            plate/shoe and the workpiece. Small or thin ma-
            terial may flex or vibrate with the blade, causing
            loss of control.
          </li>
          <li>
            Before starting a cut, turn the tool “ON” and
            allow the blade to reach full speed. The saw can
            chatter or vibrate if the blade speed is too slow
            when beginning the cut and kickback may occur.
          </li>
          <li>
            &#128075; Keep your hands away from all cutting edges
            and moving parts. Never place your fingers in
            line with the blade.
          </li>
          <li>
            When plunge (pocket) cutting, use a blade
            designed for that purpose and follow the tool
            manufacturer’s instructions.
          </li>
          <li>
            &#129295; Pinch Points! Keep hands from between the
            gear housing and saw blade clamp (plunger).
            The reciprocating blade clamp (blade plunger)
            can pinch your fingers.
          </li>
          <li>
            &#9211; Switch the tool off after a cut is completed, and
            keep the saw away from your body until the
            blade stops. The blade may coast for a time,
            posing the risk of serious cuts.
          </li>
        </ul>
        <Question id="62a773775a0e47bc282eb64f" {...{ update }} choices={["Tool", "Chord", "Trigger", "All of the Above"]}>
          Release the __________  immediatly if the blade starts to bind or the saw stalls.
        </Question>
        <Question id="62a773da16d0a78d33d12fc6" {...{ update }} choices={["Coast", "Move Quickly","Stay Still", "Make Noise"]}>
          When you release the trigger, the saw will continue to ___________, so it
          is important to keep your hands and body clear.
        </Question>
        <Question id="6390c8540497f0ad86650e05" {...{ update }} choices={[" Buildup of Sap", "Insufficient Blade Set", "Dullness", "Unguided Cuts", "All of the Above"]}>
          <u>Overheating</u> can be caused by:
        </Question>
      </Topic>

      <Topic name="After Cutting" topicKey={3}>
        <h1>
          &#128268; &#129529; Unplug, clean and store the tool back on the wall.
        </h1>
        <p></p>
      </Topic>

      <Topic name="Sources" topicKey={4}>
        <h1>Sources:</h1>
        <ul>
          <li><a href="https://www.powertoolinstitute.com/pti-includes/pdfs/Tool-Specific-Files/Jig-Saw.pdf">Power Tool Institute</a></li>
          <li><a href="https://www.ehs.harvard.edu/sites/default/files/machine_shop_safety_osha_guidance_portable_tools.pdf">Harvard EHS</a></li>
        </ul>
      </Topic>

    </Training>
  )
}