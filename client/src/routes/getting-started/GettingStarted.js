import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import googleLogin from './img/googleLogin.png'
import navBar from './img/navBar.png'
import jumpTo from './img/jumpTo.png'

export default function GettingStarted(){
  return (
    <Container className="mt-3 markdown-body">
      <h1 id="getting-started">Getting Started</h1>
      <p>
        This page is to help get you familiar with <Link to="/">Bert</Link>, and show you 
        how to best utilize it for your class and/or project.
      </p>
      <h2 id="logging-in">Logging In</h2>
      <p>
        The first time you open <Link to="/">Bert</Link>, you will be redirected to the 
        Google Authentication portal where it will ask you to select an email.
        <b> Be sure to select your Berkeley Carroll Email.</b>
      </p>
      <p className="text-center">
        <Image src={googleLogin}/>
      </p>
      <h2 id="navigating-bert">Navigating Bert</h2>
      <p>
        Once logged in, you will be brought to the main landing page.
      </p>
      <p>
        Here, you can navigate to other parts of the site by using the:
      </p>
      <h3>1. Navigation Bar</h3>
      <p className="text-center"><Image src={navBar} fluid/></p>
      <h3>2. "Jump to..." Button</h3>
      <p className="text-center"><Image src={jumpTo} fluid/></p>
      
    </Container>
  )
}
