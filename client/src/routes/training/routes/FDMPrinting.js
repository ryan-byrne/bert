import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import timelapse from '../img/fdm-3d-printing/timelapse.gif'
import FDMdiagram from '../img/fdm-3d-printing/FDMdiagram.jpeg'
import slicing from '../img/fdm-3d-printing/slicing.jpeg'
import layerHeight from '../img/fdm-3d-printing/layerHeight.jpeg'
import infill from '../img/fdm-3d-printing/infill.jpeg'
import supports from '../img/fdm-3d-printing/supports.jpeg'
import supports2 from '../img/fdm-3d-printing/supports2.png'
import horseExample from '../img/fdm-3d-printing/horseExample.jpeg'

export default function FDMPrinting({ update }) {
  return (
    <Training id="fdm-3d-printing" >

      <Topic name="Introduction to 3D Printing" topicKey={0} >
        <h1>How Does a 3D Printer Work?</h1>
        <p>
          <b>3D Printing</b> works by placing successive layers of <b>uncured</b> plastic on top
          of one another, then curing them to make a 3-dimensional shape.
        </p>
        <Row>
          <Col className="text-center m-3">
            <Image src={timelapse} fluid />
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
          <iframe className="w-100" height="500" src="https://www.youtube.com/embed/m_QhY1aABsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <li className="m-3">
            <b>Stereolithography (SLA)</b> - Another common technology that uses a Laser
            to cure a liquid resin in the desired shape. Although SLA provides a higher level
            of precision to FDM, handling the resin and curing it can sometimes be laborious.
          </li>
          <Row>
            <Col>
              <iframe className="w-100" height="500" src="https://www.youtube.com/embed/yW4EbCWaJHE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Col>
          </Row>
          <li className="m-3">
            <b>Powder Bed Fusion (SLS)</b> - Like building a steel sandcastle out of metallic
            powder.
          </li>
          <iframe className="w-100" height="500" src="https://www.youtube.com/embed/yiUUZxp7bLQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </ul>
        <Question id="62b0866c66a743ab817e4d53" {...{ update }}>
          <b>3D Printing</b> is a <b>(Additive/Reductive)</b> manufacturing process.
        </Question>
        <Question id="62b08aaaad376e41cc77718e" {...{ update }}>
          <b>(FDM/SLA/SLS)</b> uses a laser to cure a liquid resin.
        </Question>
      </Topic>

      <Topic name="Basics of FDM" topicKey={1} >
        <h1>Working Principle</h1>
        <p>
          In this training, we will focus on <b>FDM</b> printing, which, as we learned in the previous
          section, works by feeding a plastic filamenet through a series of rollers and motors into
          a hot nozzle, which melts the plastic on a platform.
        </p>
        <Row>
          <Col className="text-center m-3">
            <Image src={FDMdiagram} fluid />
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
        <Question id="62b0a837897fd4c5433743a9" {...{ update }}>
          <b>(PLA/ABS/TPU)</b> is a rubber-like plastic that creates flexible 3D printed parts.
        </Question>
        <Question id="62b0ab054d0bf53e8255c1f5" {...{ update }}>
          3D printing filament is pushed through a hot __________ to melt plastic the plastic and
          fuse it to the next layer.
        </Question>
      </Topic>

      <Topic name="Creating a 3D Model" topicKey={2} >
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
        <Question id="62b0ad3efbfeea5d554dec78" {...{ update }}>
          What extension should you always export your 3D CAD files as?
        </Question>
      </Topic>

      <Topic name="Slicing Your Model" topicKey={3} >
        <h1>What is Slicing?</h1>
        <p>
          Slicing is the process of turning your generated 3D model into
          layered <b>GCODE</b> instructions for the 3D printer
        </p>
        <Row>
          <Col className="text-center m-3">
            <Image src={slicing} fluid />
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
            <Image src={layerHeight} fluid />
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
            <Image src={infill} fluid />
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
            <Image src={supports} fluid />
          </Col>
          <Col className="text-center">
            <Image src={supports2} fluid />
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
        <Question id="62b0d8d3e9229982648ed8af" {...{ update }}>
          Increasing the <b>(Infill/Layer Height)</b> also increases the time required to print.
        </Question>
        <Question id="62b0d945de01f3a7ff9f54cc" {...{ update }}>
          What setting needs to be added in order to print the 3D model shown below?
          <Image src={horseExample} fluid />
        </Question>
        <Question id="62b0da09652fe2051de84fc3" {...{ update }}>
          If you want your model to look as detailed as possible, you want a <b>(Higher/Lower) </b>
          Layer Height.
        </Question>
      </Topic>

      <Topic name="Before Printing" topicKey={4} >
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
        <Question id="62b318155ee1db2c6876eeba" {...{ update }}>
          What temperature (in °C) does the nozzle need to reach before filament can
          be removed?
        </Question>

      </Topic>

      <Topic name="While Printing" topicKey={5} >
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
        <Question id="62b31ad35ee1db2c6876eebb" {...{ update }}>
          <b>(True/False)</b> you must sit with the printer for the entirity of your print.
        </Question>
        <Question id="62b31b475ee1db2c6876eebc" {...{ update }}>
          If the filament on the first layer is not sticking to the bed, then the nozzle is too
          <b> (High/Low)</b>
        </Question>
      </Topic>

      <Topic name="After Printing" topicKey={6} >
        <h1>Remove Model from the Bed</h1>
        <p>
          Each printer has a magnetic print bed, meaning it can be removed from the printer,
          then peeled off of your model(s).
        </p>
        <h1>(Optional) Remove Supports</h1>
        <p>
          If your model includes supports, remove them using pliers and wire cutters.
        </p>
        <Question id="62b31c0d5ee1db2c6876eebd" {...{ update }}>
          Each printer has a __________ bed, which makes removing parts easier.
        </Question>
      </Topic>

    </Training>
  )
}