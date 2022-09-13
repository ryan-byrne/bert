import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import laserExample from '../img/laser-cutting/example.gif'
import cutting from '../img/laser-cutting/cutting.gif'
import scoring from '../img/laser-cutting/scoring.gif'
import engraving from '../img/laser-cutting/engraving.gif'
import coasters from '../img/laser-cutting/coasters.jpeg'

const LaserCutting = ({ user, update }) =>
  <Training id="laser-cutting" user={user}>

    <Topic name="Basics of Laser Cutting" topicKey={0} user={user}>

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
        <Image src={cutting}/>
      </p>
      <h2>Scoring</h2>
      <p>
        Similar to cutting, in that the tool follows a specified path, but it 
        is not provided enough power to pass entirely through the material,
        and only removes material from the surface.
      </p>
      <p className="text-center">
        <Image src={scoring}/>
      </p>
      <h2>Engraving</h2>
      <p>
        Instead of following a specific path, the laser instead sweeps back and
        forth, only firing when there is a pixel in the image being printed.
        This process takes <b>much longer</b> than the other two, but also allows
        for more complex patterns.
      </p>
      <p className="text-center">
        <Image src={engraving}/>
      </p>

      <Question id="631cb54b1ed0b236fbaef15c" {...{ update }} choices={['Cutting','Scoring','Engraving']}>
        Which technique should you use to put a picture of <b>Pikachu</b> on your phone case?
      </Question>

      <Question id="631cb6ab8c780d785dc1da15" {...{ update }} choices={['Cutting','Scoring','Engraving']}>
        <p>
          Which technique was used to make the items below?
        </p>
        <p>
          <Image src={coasters}/>
        </p>
      </Question>
    
    </Topic>

    <Topic name="Setup Procedures" topicKey={1} user={user}>
      <h1>How Does it Work?</h1>
      <p></p>
      <Question id="627d4fd10783abd908d257dd" {...{ user, update }}>Test Question</Question>
    </Topic>

  </Training>

export default LaserCutting;