import {Navbar, Nav, Container, Image, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import brandImg from '../img/logos/whiteBrand.png'

import './styles/navigation.css'

const Glossary = {

    "Schedule":{
        "View":"/schedule",
        "":null,
        "Create Event":"/schedule/create"
    },

    "Training":{
        "View":"/training"
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
                    {Object.entries(Glossary).map(([key, content], idx)=>
                        <NavDropdown title={key} key={idx} menuVariant='dark'>
                            {Object.entries(content).map(([title, link], jdx)=>
                                title.length === 0 ? <NavDropdown.Divider key={jdx}/> :
                                <NavDropdown.Item key={jdx}>
                                    <Link to={link}>{title}</Link>
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
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