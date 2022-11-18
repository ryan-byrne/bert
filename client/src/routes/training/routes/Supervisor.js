import { useEffect, useState } from "react";
import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';
import { Query } from "../../../components/GraphQL";
import { Link } from "react-router-dom";

import authorizedUsers from '../img/supervisor/authorizedUsers.png'

export default function Supervisor({ update }) {

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    Query(`
    query GetTools {
      getUser {
        student
      }
    }
    `)
      .then(resp => resp.json())
      .then(data => setLocked(data.data.getUser.student))
  }, []);

  return ( locked ? <div>This Training is not currently available to students.</div> :
    <Training id="supervisor" >

      <Topic name="Authorized Users" topicKey={0}>
        <h1>Authorized Users</h1>
        <p>
          Although completing this training allows you to supervise others on a tool,
          you must first ensure both you and whoever you are supervising are among the
           <strong> Authorized Users</strong> of that tool.     
        </p>
        <p>
          To check whether someone is an <strong>Authorized User</strong> of a
          tool, simply select the tool from the <Link to="/tools">Tool Dashboard </Link>
          and browse the list of names.
        </p>
        <div className="text-center m-3">
          <Image src={authorizedUsers} fluid/>
        </div>
        <p>
          In short: for a tool to be used, both the following conditions must
          be met:
          <ul>
            <li>The user is an <strong>Authorized User</strong> of the tool</li>
            <li>
              There is an <strong>Authorized Supervisor</strong> present who is 
              also an <strong>Authorized User</strong> of that same tool.
            </li>
        </ul>
        </p>
        <Question id="6376c4a3db60248a50db578e" choices={['Online', 'Tool Dashboard', 'On the Tool']} {...{ update }}>
          Where can you look if you are unsure whether someone is an 
          <strong>Authorized User</strong> of the band saw?
        </Question>
        <Question id="">
          
        </Question>
      </Topic>

      <Topic name="Training Students" topicKey={1} >
        <p></p>
        <Question id="627d4fd10783abd908d257dd" {...{ update }}>Test Question</Question>
      </Topic>

    </Training>
  )
}