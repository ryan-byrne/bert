import {Navbar, Nav, Container, Image, NavDropdown, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import brandImg from '../img/logos/whiteBrand.png'

import '../styles/navigation.css'

const Glossary = {
    "create":{
        title:"Create",
        contents:{
            "Available Tools":"/tools",
            "":null,
            "Request a 3D Print":"/printing/request",
            "View My Prints":"/printing"
        }
    },
    "learn":{
        title:"Learn",
        contents:{
            "Tool Trainings":"/trainings",
            "Arduino":"https://arduino.thebetalab.org"
        }
    },
    "visit":{
        title:"Visit",
        contents:{
            "View Schedule":"/schedule",
            "":null,
            "Book the Lab":"/schedule/book"
        }
    }
}

const Navigation = ({user}) => {

    return (!user?null:
    <Navbar bg="dark" variant="dark" expand="lg" className="navigation-container" fixed>
        <Container>
            <Navbar.Brand>
                <Link to="/">
                    <Image src={brandImg} height="40"/>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    {Object.entries(Glossary).map(([key, data], idx)=>
                        data.contents?
                        <NavDropdown title={data.title} key={idx} menuVariant='dark'>
                            {Object.entries(data.contents).map(([title, link], jdx)=>
                                title.length === 0 ? <NavDropdown.Divider key={jdx}/> :
                                <NavDropdown.Item key={jdx}>
                                    <Link to={link}>{title}</Link>
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>:
                        <Link to={data.link}>{data.title}</Link>
                    )}
                </Nav>
            </Navbar.Collapse>
            <NavDropdown menuVariant="dark"
                title={
                    <span className="user-nav-icon">
                        <Image src={user.picture} height="40"/>{user.name}
                    </span>
                }
                >
                <NavDropdown.Item>
                    <Link to="/logout">Sign Out</Link>
                </NavDropdown.Item>
            </NavDropdown>
        </Container>
    </Navbar>)}

export default Navigation;