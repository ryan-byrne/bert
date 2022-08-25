import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';

export default ({user, update}) =>
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