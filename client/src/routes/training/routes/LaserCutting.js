import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import cutting from '../img/laser-cutting/cutting.gif'
import scoring from '../img/laser-cutting/scoring.gif'
import engraving from '../img/laser-cutting/engraving.gif'
import coasters from '../img/laser-cutting/coasters.jpeg'
import plywood from '../img/laser-cutting/plywood.png'
import acryllic from '../img/laser-cutting/acryllic.jpeg'
import glassEngrave from '../img/laser-cutting/glassEngrave.jpg'

const LaserCutting = ({ update }) =>
  <Training id="laser-cutting">

    <Topic name="Basics of Laser Cutting" topicKey={0}>

      <h1>How Does it Work?</h1>
      <p>
        <b>Laser cutting</b> works by focusing a laser onto a particular surface and,
        given particular settings, doing one of the following:
      </p>
      <h2>Cutting</h2>
      <p>
        Tool follows a particular path and is provided enough power to cut
        <b> through</b> the given material.
      </p>
      <p className="text-center">
        <Image src={cutting} />
      </p>
      <h2>Scoring</h2>
      <p>
        Similar to cutting, in that the tool follows a specified path, but it
        is not provided enough power to pass entirely through the material,
        and only removes material from the surface.
      </p>
      <p className="text-center">
        <Image src={scoring} />
      </p>
      <h2>Engraving</h2>
      <p>
        Instead of following a specific path, the laser instead sweeps back and
        forth, only firing when there is a pixel in the image being printed.
        This process takes <b>much longer</b> than the other two, but also allows
        for more complex patterns.
      </p>
      <p className="text-center">
        <Image src={engraving} />
      </p>

      <Question id="631cb54b1ed0b236fbaef15c" {...{ update }} choices={['Cutting', 'Scoring', 'Engraving']}>
        Which technique should you use to put a picture of <b>Pikachu</b> on your phone case?
      </Question>

      <Question id="631cb6ab8c780d785dc1da15" {...{ update }} choices={['Cutting', 'Scoring', 'Engraving']}>
        <p>
          Which technique was used to make the items below?
        </p>
        <p>
          <Image src={coasters} />
        </p>
      </Question>

    </Topic>

    <Topic name="Materials" topicKey={1}>
      <h1>Common Materials</h1>
      <p>
        A variety of materials are able to be laser cut, but far and
        away the most common are:
      </p>
      <h2>Wood</h2>
      <p className="text-center">
        <Image src={plywood} />
      </p>
      <p>
        Usually coming in the form of plywood sheets, virtually all types
        of wood are able to be laser cut or engraved with the typical
        laser cutter.
      </p>
      <h2>Acryllic</h2>
      <p className="text-center">
        <Image src={acryllic} />
      </p>
      <p>
        Another common material for laser cutting is acryllic sheets, which is
        a variety of hard plastic which comes in sheets of a variety of colors
        and styles.
      </p>
      <Alert variant="danger">
        <strong>&#9888; Warning:</strong> Be sure the material you are
        cutting or engraving is, in fact, acryllic. Other types of common
        plastics, like polycarbonate or Plexiglass, give off <b><u>harmful fumes</u> </b>
        when laser cut.
      </Alert>
      <h2>Glass (Engraving Only)</h2>
      <p className="text-center">
        <Image src={glassEngrave} />
      </p>
      <p>
        Lastly, most common types of <b>glass</b> are able to be laser engraved as well. This
        will usually be done in conjunction with a <b>Rotary Table</b> attachment to engrave
        glasses, vases, and other cylindrical objects.
      </p>
      <Question id="632201991849c9f508be87e5" choices={['True', 'False']}>
        All types of plastic are able to be laser cut.
      </Question>
      <Question id="632201f4c0ab105a1a0ca4ee">
        What attachment is needed if you would like to laser engrave a baseball bat?
      </Question>
    </Topic>

    <Topic name="Before Cutting" topicKey={3}>
      <h1>&#129519; Locate the Nearest Fire Extinguisher</h1>
      <h1>&#9989; Ensure the Material is Safe to Cut</h1>
      <p>
        As previously mentioned, most plastics give off harmful fumes when cut. Make
        sure any plastic you use is specifically acryllic.
      </p>
      <h1>&#128168; Turn on the Exhaust System</h1>
      <p>
        This will ensure the fumes generated from the cut are properly directed to either
        outside or the fume extraction filter.
      </p>
      <h1>&#128203; Consult Laser Cutter's Manual</h1>
      <p>
        Each laser cutter has their own Setup and Shutdown Procedure, which can be found 
        in their <u><b>Manual</b></u> and must be consulted before <u><b>each</b></u> use.
      </p>
      <h2><a href="https://www.epiloglaser.com/assets/downloads/manuals/fusion-manual-web.pdf">Epilog Fusion M2</a></h2>
      <h2><a href="https://assets.ctfassets.net/ljtyf78xujn2/4iPdXekCDpHE58x27ntx9P/ca299106e36d7575b8df6cda4dd0a415/Glowforge_Manual_v3.3.pdf">Glowforge Pro</a></h2>
      <Question id="63221df8e0c0d5784ec6c9f1" choices={['Manual', 'Instagram Page', 'Website']}>
        Each laser cutter has a specific _______ that must always be consulted before use.
      </Question>
      <Question id="632210253e34956d107d4901" choices={['Polycarbonate', 'Polyethylene', 'Acryllic']}>
        The only type of plastic that can be cut using a laser cutter is:
      </Question>
    </Topic>

    <Topic name="While Cutting" topicKey={4}>
      <h1>&#128064; Watch the Cut</h1>
      <p>
        <b><u>Never</u></b> leave a cut while it is in progress. If you have applied incorrect settings,
        the process can create a flame, and can cause a fire hazard if you are not there to stop it.
      </p>
      <p>
        <u><b>Small flames</b></u> are common, and usually necessary for a cut. However, if you notice the 
        flame start to grow, or other parts of the piece catch fire, <b><u>stop the laser immediately</u></b>
      </p>
      <p>
        Additionally, if you notice smoke filling up the laser cutter or being released to the rest of the room,
        <b> <u>shut down the laser immediately</u></b>
      </p>
      <Question id="63221c471eae6ca1284fb5f0" choices={["True","False"]}>
        Small flames are ok, as long as they do not grow.
      </Question>
    </Topic>

    <Topic name="After Cutting" topicKey={5}>
      <h1>&#9202; Wait</h1>
      <p>
        Wait until the laser cutter has stopped moving and all fumes have been extracted.
      </p>
      <h1>Remove your Piece</h1>
      <p>
        Remove your piece from the printer, being careful not to leave any small pieces that may
        have fallen.
      </p>
      <h1>&#129529; Clean the Print Bed</h1>
      <p>
        Be sure to remove any and all excess material from the printer, as this can cause a fire
        hazard if left for the next person.
      </p>
      <Question id="6322211e06bc47f755bf69ae" choices={["Chemical", "Fire", "UV"]}>
        Cleaning the print bed after use prevents what type of hazard for the next person who uses it?
      </Question>
    </Topic>

  </Training>

export default LaserCutting;