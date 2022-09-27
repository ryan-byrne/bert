import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

import blueBin from '../img/sanding/blueBins.png';
import sandpaperGrit from '../img/sanding/sandpaperGrit.jpg';

const Sanding = ({ update }) =>
  <Training id="sanding">

    <Topic name="Locating the Sandpaper" topicKey={0}>
      <h1>Blue Bins</h1>
      <p>
        <b>Sandpaper</b> can be found in one of the <b>blue bins</b> hanging on the
        wall in the <b>Classroom Area.</b>
      </p>
      <p className="text-center">
        <Image src={blueBin}/>
      </p>
      <Question id="6332f5a4b7c34b28e148b32e" {...{ update }} choices={['Red', 'Yellow', 'Blue']}>
        <b>Sandpaper</b> is located in the <b>_____ bins</b> in the <b>Classroom Area</b>
      </Question>
    </Topic>

    <Topic name="Identifying Grit" topicKey={1}>
      <h1>Grit</h1>
      <p>
        Sandpapers are manufactured with a specific <b>grit</b>, which is a way to classify
        how coarse (or rough) the sandpaper is. The <b>lower</b> the grit, the <b>rougher</b> the sand paper.
        Below are some examples of common grits and their uses:
      </p>
      <p className="text-center">
        <Image src={sandpaperGrit}/>
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
              ].map(([type, grit, best], idx) =>
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
        time you sand.
      </p>
      <p>
        For example, if you have a very rough piece of wood that you want
        to make very smooth, <b>do not start with ultra-fine sandpaper.</b> Begin with
        a low grit (60-80) then slowly increase until you achieve the desired smoothness.
      </p>
      <Question id="6332f89705483c440e4dadb7" {...{ update }} choices={['High', 'Low']}>
        When sanding a piece, you should start with a _______ grit sandpaper
      </Question>
      <Question id="6332f8dd4d94027959741b26" {...{ update }} choices={['60','100','180','320']}>
        Which grit would be best for getting a surface to be as smooth as possible?
      </Question>
      <Question id="6332f95a68880ccb125b484f" {...{ update }} choices={['Smoother','Rougher']}>
        200 grit sandpaper is _______ than 100 grit sandpaper.
      </Question>
    </Topic>

  </Training>

export default Sanding;