import { Alert, Image } from "react-bootstrap";
import Question from "../components/Question";
import Topic from "../components/Topic";
import Training from "../components/Training";

import fireTriangle from '../img/fire-extinguisher/fireTetrahedron.png'
import classA from '../img/fire-extinguisher/classA.jpg'
import classB from '../img/fire-extinguisher/classB.jpg'
import classC from '../img/fire-extinguisher/classC.jpg'
import classD from '../img/fire-extinguisher/classD.jpg'
import classK from '../img/fire-extinguisher/classK.png'
import water from '../img/fire-extinguisher/water.png'
import co2 from '../img/fire-extinguisher/co2.png'
import dryChem from '../img/fire-extinguisher/dryChem.png'
import wetChem from '../img/fire-extinguisher/wetChem.png'
import fireAlarm from '../img/fire-extinguisher/fireAlarm.jpg'
import pull from '../img/fire-extinguisher/pull.png'
import aim from '../img/fire-extinguisher/aim.png'
import squeeze from '../img/fire-extinguisher/squeeze.png'
import sweep from '../img/fire-extinguisher/sweep.png'


const FireEstinguisher = ({update}) => 
<Training id="fire-extinguisher" >
  <Topic name="What is Fire?" topicKey={0}>
    <h1>The Fire Triangle</h1>
      <p>
        Fire requires three things to exist: <b>Oxygen</b>, <b>Heat</b>, and <b>Fuel</b>, which all combine
        to form the chemical reaction we know as <b>fire</b>. These three can be thought of as a <b>Fire Triangle.</b>
      </p>
      <Image src={fireTriangle} fluid/>
      <p>
        If you are able to take away any of these, the fire will be <b>extinguished</b>. This is precisely what
        <b> fire extinguishers</b> are designed to do.
      </p>
      <Question id="631ba867d9c7f4c68adcba34" {...{update}} choices={['Oxygen','Heat','Fuel','Any','All']}>
        A fire will be extinguished if you remove:
      </Question>
  </Topic>

  <Topic name="Types of Fires & Fire Extinguishers" topicKey={2} >

      <Alert variant="danger">
        <Alert.Heading>&#9888; WARNING</Alert.Heading>
        Pay close attention to the following sections.
        Using the wrong type of <strong>fire extinguisher</strong> can often result
        in a fire getting <b>worse.</b>
      </Alert>

      <h1>Classes</h1>
      <p>
        Fires are classified by the type of combustable being consumed, or what is actually burning.
      </p>
      <h2>Class A - Ordinary Combustables</h2>
      <p className="text-center">
        <Image src={classA} height="100"/>
      </p>
      <p><b>Examples:</b> Wood, paper, cloth, trash, plastics, solids that are not metals.</p>
      <h2>Class B - Flammable Liquids</h2>
      <p className="text-center">
        <Image src={classB} height="100"/>
      </p>
      <p><b>Examples:</b> gasoline, oil, grease, acetone. Includes flammable gases.</p>
      <h2>Class C - Electrical</h2>
      <p className="text-center">
        <Image src={classC} height="100"/>
      </p>
      <p>Energized electrical equipment, or anything that is “plugged in.”</p>
      <h2>Class D - Combustable Metals</h2>
      <p className="text-center">
        <Image src={classD} height="100"/>
      </p>
      <p>Metals—potassium, sodium, aluminum, magnesium.</p>
      <h2>Class F - Cooking Oils</h2>
      <p className="text-center">
        <Image src={classK} height="100"/>
      </p>
      <p>Vegetable oils, animal oils, or fats in cooking equipment typically used in kitchens</p>

      <Question id="631baa2816ec670021b2a96c" {...{update}} choices={['Class A', 'Class B', 'Class C', 'Class D', 'Class F']}>
        A <strong>chop saw</strong> suddenly catches fire. Which Class of Fire is this considered?
      </Question>
      <Question id="631bb11e5b46fda8921ff7fc" {...{update}} choices={['Class A', 'Class B', 'Class C', 'Class D', 'Class F']}>
        You are heating up vegetable oil to make popcorn when the pan suddenly catches fire. This is a ________ fire.
      </Question>

      <h1>Types of Fire Extinguishers</h1>
      <p>
        Fire extinguishers are specially designed to combat specific classes of fire and do so in a number of ways. Some
        of the most common are:
      </p>

      <h2>Water</h2>
      <p className="text-center">
        <Image src={water}/>
      </p>
      <p>
        Filled with ordinary tap water and pressurized air. They are essentially large squirt guns, and work by removing
        <b> heat</b> from the <b>Fire Triangle.</b>
      </p>
      <p>
        They are only to be use on <Image height="30" src={classA}/> fires.
      </p>

      <h2>Carbon Dioxide (CO2)</h2>
      <p className="text-center">
        <Image src={co2}/>
      </p>
      <p>
        These work by blasting the fire with CO2, a non-flammable gas, which removes <b>oxygen</b>.
      </p>
      <p>
        Are designed for <Image height="30" src={classB}/> and <Image height="30" src={classC}/> Fires.
      </p>
      <Alert variant="warning">
        <b>&#9888;</b> CO2 Fire Extinguishers are usually not effective against <Image height="30" src={classA}/> fires,
        which have access to more oxygen and are likely to reignite.
      </Alert>

      <h2>Dry Chemical</h2>
      <p className="text-center">
        <Image src={dryChem} height="250"/>
      </p>
      <p>
        Dry chemical extinguishers put out fire by coating the fuel with a thin layer of dust. This separates the fuel from the oxygen in the air.
      </p>
      <p>
        Typically, these work against <Image height="30" src={classA}/>, <Image height="30" src={classB}/>, and <Image height="30" src={classC}/> fires.
      </p>

      <h2>Wet Chemical</h2>
      <p className="text-center">
        <Image src={wetChem}/>
      </p>
      <p>
        These fire extinguishers work on the principal of saponification. Saponification takes place when alkaline mixtures such as potassium acetate, potassium citrate or potassium carbonate are applied to burning cooking oil or fat.
      </p>
      <p>
        As you might have guessed, these are what we use against <Image height="30" src={classK}/> fires.
      </p>

      <Question id="631bbd51b4c49ebf97d242e1" choices={['CO2','Dry Chemical','Wet Chemical']}>
        For a pile of burning scrap wood, which Fire Extinguisher would work best?
      </Question>

      <Question id="631bbdc2efedf026ee1e251c" choices={['Oxygen','Heat','Fuel']}>
        CO2 Fire Extinguishers work by removing which part of the Fire Triangle?
      </Question>

  </Topic>

  <Topic name="When to Use a Fire Extinguisher" topicKey={4}>
    <h1>The Three A's</h1>
    <p>
      Fire Extinguishers should only be used after you have applied the <b>Three A's:</b>
    </p>
    <h2>Activate</h2>
    <p className="text-center">
      <Image src={fireAlarm} height="250"/>
    </p>
    <p>
      Find and activate the nearest fire alarm system or call 911 to alert emergency services.
    </p>
    <h2>Assist</h2>
    <p>
      Assist those who are in immediate danger or who are incapacitated. Do this with out risk to yourself.
    </p>
    <h2>Attempt</h2>
    <p>
      Only attempt to fight the fire after:
      <ul>
        <li>The first two "A's" have been addressed</li>
        <li>&#128077; &#129519; You feel confident in using the Fire Extinguisher</li>
        <li>&#128682; You have an exit to your back</li>
        <li>&#9729; There is not heavy smoke</li>
        <li> The fire is contained (not spreading)</li>
        <li>&#9989; The extinguisher is readily available</li>
        <li>You know how to use it properly</li>
        <li>Personal safety is not compromised</li>
        <li>There is a clear path for escape</li>
      </ul>
    </p>

    <Question id="631bc18a3cc96949f0591789" {...{update}} choices={['True','False']}>
      You should try to fight a fire that is spreading around a room:
    </Question>

    <Question id="631bc1cba820ec2584528e43" {...{update}} choices={['True','False']}>
      Risking your life is ok if it is to save your project.
    </Question>

  </Topic>

  <Topic name="P.A.S.S." topicKey={5} >
      <h1>How to Use a Fire Extinguisher (P.A.S.S.)</h1>
      <p>
        Once you have determined it is safe to use, use of a fire extinguisher is done using the following steps:
      </p>

      <h2>(P) Pull</h2>
      <p className="text-center">
        <Image src={pull}/>
      </p>
      <p><b><u>Pull</u></b> the pin. This will allow you to discharge the extinguisher</p>

      <h2>(A) Aim</h2>
      <p className="text-center">
        <Image src={aim}/>
      </p>
      <p>
        <b><u>Aim</u></b> the nozzle at the base of the fire
      </p>
      <Alert variant="warning">
        <b>NOTE: </b>Aiming at the flames themselves will <b><u>not</u></b> put out the fire.
      </Alert>
      <h2>(S) Squeeze</h2>
      <p className="text-center">
        <Image src={squeeze}/>
      </p>
      <p>
        <b><u>Squeeze</u></b> the top handle to depresses a button that releases the pressurized extinguishing agent.
      </p>
      <h2>(S) Sweep</h2>
      <p className="text-center">
        <Image src={sweep}/>
      </p>
      <p>
        <b><u>Sweep</u></b> from side to side until the fire is completely out. Start using the extinguisher
        from a safe distance away, then slowly move forward. Once the fire is out, keep an eye on the area in case
        it re-ignites.
      </p>

      <Question id="631bc50b21b62e1aba317c14" {...{update}}>
        The _____ must be pulled before the fire extinguisher can be used.
      </Question>

      <Question id="631bc53d155cafafa55df5b7" {...{update}}>
        You must aim the nozzle at the _______ of the fire. Otherwise it will not go out.
      </Question>

  </Topic>

  </Training>

export default FireEstinguisher