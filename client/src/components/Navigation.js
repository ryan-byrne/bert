import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import brandImg from '../img/logos/whiteBrand.png'

import './styles/navigation.css'

const Glossary = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Schedule",
    children:[
      {
        name:"View",
        link:"/schedule"
      }, null, {
        name:'Create an Event',
        link:"/schedule/create"
      }
    ]
  }, {
    name: "Trainings",
    link: "/training"
  }, {
    name: "Tools",
    link: "/tools"
  }, {
    name: "Feeback",
    children:[
      {
        name:"Report a Bug",
        link:"/bugs"
      },{
        name:"Feature Request",
        link:'/feature'
      }
    ]
  }
]

const Navigation = ({ user }) => {

  /*
      {Object.entries(Glossary).map(([key, content], idx)=>
      <NavDropdown title={key} key={idx} menuVariant='dark'>
          {Object.entries(content).map(([title, link], jdx)=>
              title.length === 0 ? <NavDropdown.Divider key={jdx}/> :
                  <NavDropdown.Item as={Link} key={jdx} to={link}>
                      {title}
                  </NavDropdown.Item>
              
          )}
      </NavDropdown>
  )}
  */

  return (!user ? null :
    <Navbar bg="dark" variant="dark" expand="lg" className="navigation-container" fixed>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image src={brandImg} height="40" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {Glossary.map(item=>
              item.link?
              <Nav.Link as={Link} to={item.link}>{item.name}</Nav.Link>:
              <NavDropdown title={item.name} menuVariant="dark">
                {item.children.map(child=>
                  !child?<NavDropdown.Divider/>:
                  <NavDropdown.Item as={Link} to={child.link}>
                    {child.name}
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        <NavDropdown menuVariant="dark"
          title={
            <span className="user-nav-icon">
              <Image src={user.picture} height="40" />{user.name}
            </span>
          }
        >
          <NavDropdown.Item as={Link} to="/logout">
            Sign Out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>)
}

export default Navigation;