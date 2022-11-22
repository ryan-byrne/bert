import { useEffect, useState } from "react";
import { Col, Row, Badge, Image, Alert, Table } from "react-bootstrap";
import Training from "../components/Training";
import Topic from "../components/Topic";
import Question from "../components/Question";
import Note from '../components/Note';
import { Query } from "../../../components/GraphQL";
import { Link } from "react-router-dom";

import authorizedUsers from '../img/supervisor/authorizedUsers.png'
import startDemo from '../img/supervisor/startDemo.png'
import selectUser from '../img/supervisor/selectUser.png'
import completeTasks from '../img/supervisor/completeTasks.png'


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
          Although completing this training allows you to <u>supervise</u> others on a tool,
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
        <p>
          Once you have confirmed both you and the student are <strong>Authorized Users</strong> of
          the tool, the work is ready to begin!
        </p>
        <Question id="6376c4a3db60248a50db578e" choices={['Ask Them', 'Tool Dashboard', 'Ask Mr. Byrne']} {...{ update }}>
          Where can you look if you are unsure whether someone is an 
          <strong> Authorized User</strong> of the <strong>band saw</strong>?
        </Question>
        <Question id="637b860c4c7fb0e890c635e3" choices={['True', 'False']} {...{ update }}>
          You can use the <strong>Power Drill</strong> if you are an <strong>Authorized User </strong>
          but the person supervising you is <u>not</u> an <strong>Authorized User.</strong>
        </Question>
        <Question id="637b86a3d929018edcd68643" choices={['True','False']} {...{ update }}>
          You may <u>not</u> supervise a student using a tool you are not an <strong>Authorized User</strong> for,
          even if you have completed this training, and they are an <strong>Authorized User.</strong>
        </Question>
      </Topic>

      <Topic name="Supervising Students" topicKey={1}>
        <h1>Attire</h1>
        <p>
          Once students enter the lab, it is important to remind them of proper attire, mainly:
          <ul>
            <li><Image height="40" src="https://cdn-icons-png.flaticon.com/512/580/580552.png"/> Avoid Loose Clothing</li>
            <li><Image height="40" src="https://cdn-icons-png.flaticon.com/512/3684/3684517.png"/> Tie Back Long Hair</li>
            <li><Image height="40" src="https://cdn-icons-png.flaticon.com/512/1785/1785348.png"/> Wear Closed-Toed Shoes</li>
          </ul>
        </p>
        <p>
          Reiterate to them that wearing the proper attire is a <strong>low effort</strong> but <strong>high impact </strong>
          way to keep themselves safe while in the lab.
        </p>
        <Alert variant="warning">
          <strong>NOTE:</strong> In addition to the steps above,
          if they will be using a <strong>Power Tool</strong> or be working in the <strong>Power Tool Area </strong>
          they <u>must</u> wear safety glasses.
        </Alert>
        <div className="text-center">
          <Image fluid src="https://cdn-icons-png.flaticon.com/512/3032/3032416.png"/>
        </div>
        <h1>Preparing for Your Visit</h1>
        <p>
          It is important that before students arrive, both you and the space are prepared for the work they will be doing. This
          includes:
        </p>
        <h2>
          <Image height="40" src="https://cdn-icons-png.flaticon.com/512/2460/2460875.png"/> - Reserve
        </h2>
        <p>
          To prevent conflicts with other activities, be sure to reserve both
          the space and tools through <Link to="/schedule/create">Bert</Link> and/or
          <strong> Google Calendar</strong>
        </p>
        <h2><Image height="40" src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"/> - Get Trained</h2>
        <p>
          Make sure both you and your students have completed the requisite trainings for
              the tools you plan to use.
        </p>
        <h2><Image height="40" src="https://cdn-icons-png.flaticon.com/512/826/826073.png"/> - Setup</h2>
        <p>
          If you know particular materials or tools will be used, it is suggested you make them more readily
              accessible to students to prevent unnecessary movement about the lab.
        </p>
        <h1>Class Size</h1>
        <p>
          Another important safety consideration while in the lab is ensuring you are supervising a manageable amount of students.
          A general rule is:
        </p>
        <Alert>
          The <strong>higher the danger</strong> of a tool, the <strong>lower number</strong> of students who should use that tool
        </Alert>
        <Row className="m-3" xs={5}>
          <Col><Image fluid src="https://cdn-icons-png.flaticon.com/512/5198/5198491.png"/></Col>
          <Col><Image fluid src="https://cdn-icons-png.flaticon.com/512/1028/1028690.png"/></Col>
          <Col><Image fluid src="https://cdn-icons-png.flaticon.com/512/3593/3593431.png"/></Col>
          <Col><Image fluid src="https://cdn-icons-png.flaticon.com/512/6067/6067245.png"/></Col>
          <Col><Image fluid src="https://cdn-icons-png.flaticon.com/512/4133/4133641.png"/></Col>
        </Row>
        <p>
          This can be difficult to gauge on your own, so you should use the following table as a guide:
        </p>
        <p className="justify-content-center w-100">
          <Table variant="dark">
            <thead>
              <tr>
                <th>Tool Danger</th>
                <th># of Students</th>
                <th>Example Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Badge bg="success">Low</Badge></td>
                <td>8</td>
                <td>
                  <Link to="/tools/view/60e6469458e61d0b3d60fe2c">Hand Saws</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe30"> Sandpaper</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe2d"> Hammers</Link>
                </td>
              </tr>
              <tr>
                <td><Badge bg="warning">Medium</Badge></td>
                <td>4</td>
                <td>
                  <Link to="/tools/view/60e6469458e61d0b3d60fe3b">Jig Saws</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe36"> Band Saw</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe37"> Drill Press</Link>
                </td>
              </tr>
              <tr>
                <td><Badge bg="danger">High</Badge></td>
                <td>2</td>
                <td>
                  <Link to="/tools/view/60e6469458e61d0b3d60fe3d">Nail Gun</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe42"> Router</Link>,
                  <Link to="/tools/view/60e6469458e61d0b3d60fe43"> Table Saw</Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </p>
        <h1>Different Tools</h1>
        <p>
          Most times, students will be using a similar tier of tools, therefore making
          the table above simple to use. However, there are occasions where you will have
          to supervise a mixture of tool complexity.
        </p>
        <p>
          For example, if a student is using the <strong>table saw</strong> you may wonder:
          <i> How many student(s) can use the hand saws?</i>
        </p>
        <p>
          The answer is: <strong>1</strong>. Once one student uses a <Badge bg="danger">high</Badge> danger tool,
          you may only supervise <strong>one</strong> other student, even if they are using a <Badge bg="success">low</Badge> danger tool,
          the reason being that the complexity and danger presented by the <Badge bg="danger">high</Badge> danger tool requires
          close supervision, which is not possible if there are too many other students working.
        </p>
        <h1>Seeking Help</h1>
        <p>
          There may be instances where the work and tools required are beyond what you are capable of supervising alone.
          It is important in these moments to seek help from another <strong>Authorized Supervisor</strong>, or adjust
          your lesson plans accordingly if one can not be found.
        </p>
        <p>
          For example, if you are the only supervisor in the lab and 20 students need to cut using the hand saws, you
          should set up stations, and only allow 8 students to cut at once.
        </p>
        <Question id="637bc6b9fd8801ced3cee0ae" choices={[1, 3, 7]} {...{ update }}>
          One student decides to use a <Link to="/tools/view/60e6469458e61d0b3d60fe3b">Jig Saw</Link> to 
          make a cut. How many students can 
          use <Link to="/tools/view/60e6469458e61d0b3d60fe2c">Hand Saws</Link> if you 
          are the only supervisor present?
        </Question>
        <Question id="637bc76aad98b3cfe066b4d9" choices={['Reserve the Lab', "Reserve Tools", "Complete Trainings Yourself", "Have Your Students Complete Trainings", "Setup the Area", "All of the Above"]} {...{update}}>
          Before your visit, you should:
        </Question>
        <Question id="637bc8308306a02157a3bc5a" choices={['Low', "Medium", "High"]} {...{ update }}>
          Wearing the proper attire to the lab is: <strong>low effort</strong> and <strong>________ impact</strong>
        </Question>
        <Question id="637bc89e6a88cda1fd76b9d7" choices={['Coveralls', 'Hair Ties', 'Safety Glasses', "Long Sleeve Shirts"]} {...{ update }}>
          All students are required to wear ___________ while working in the <strong>Power Tool Area.</strong>
        </Question>
      </Topic>

      <Topic name="Training Students" topicKey={2}>
        <h1>In-Person Demo</h1>
        <p>
          Although <Link to="/">Bert</Link> has online trainings, many tools also require an <strong>In-Person Demo</strong> before
          someone is considered an <strong>Authorized User.</strong> Occasionally, as an <strong>Authorized Supervisor</strong>,
          it will be up to you to conduct these demos. 
        </p>
        <p>
          As you might have guessed, you can only perform an <strong>In-Person Demo</strong> if:
          <ul>
            <li>You are an <strong>Authorized User</strong> of the tool</li>
            <li>You are an <strong>Authorized Supervisor</strong> (completed this training)</li>
            <li>The student has completed the <strong>Online Training</strong> for the tool</li>
          </ul>
        </p>
        <h1>Demo Checklist</h1>
        <p>
          Each tool that requires a demo comes with its own <strong>Demo Checklist</strong>, which should be
          used to conduct the <strong>In-Person Demo</strong> for a specified tool.
        </p>
        <p>
          Once you are an <strong>Authorized Supervisor</strong> and an <strong>Authorized User</strong> of
          a tool, you will be able to access the <strong>Demo Checklist</strong> from the <strong>Tool Dashboard.</strong>
        </p>
        <div className="text-center m-3">
          <Image fluid src={startDemo}/>
        </div>
        <p>
          Start by entering the student's name into the search bar at the top
          of the screen and selecting it from the dropdown menu.
        </p>
        <div className="text-center m-3">
          <Image fluid src={selectUser}/>
        </div>
        <p>
          Have the student perform each item listed, checking off when a task
          is completed. Once each task has been completed, press <strong>Submit</strong>.
        </p>
        <div className="text-center m-3">
          <Image fluid src={completeTasks}/>
        </div>
        <p>
          The <strong>demo</strong> is now complete, and the student is now
          an <strong>Authorized User</strong> of the tool!
        </p>
        <Question id="637c2b3f280ffc912800fd59" choices={['More Trainings', 'Demo Checklist', 'Other User Data']} {...{ update }}>
          Once you become an Authorized Supervisor of a tool, what will you be able to access from the Tool Dashboard?
        </Question>
        <Question id="637c2af5d99b380f5e318237" choices={["True", "False"]} {...{ update }}>
          You will be able to submit a demo before all checklist items have
          been marked as "Complete".
        </Question>
        <Question id="637c2becd98f7bf45eec414b" choices={["Student's Name", 'Training ID', 'Your Name', 'All of the Above']} {...{ update }}>
          What must be entered before completing checklist items?
        </Question>
      </Topic>

    </Training>
  )
}