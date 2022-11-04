import { useState, useEffect } from 'react';
import { Modal, Button, Row, Image, Table, Alert, Col, Badge, Accordion, ListGroup, FormText } from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Query } from '../../../components/GraphQL';

const Reserve = ({id, show}) => {

  const navigate = useNavigate();
  const [tool, setTool] = useState();

  useEffect(() => {
    if (!id) navigate('/tools')
    else {
      setTool();
      Query(`
        query GetTool($id: String!) {
          getTool(id: $id) {
            brand
            name
            quantity
            photo
            manual
            authorized_users {
              name
              email
              id
            }
            training {
              id
              completed
              name
              demo_completed
              demo
              questions {
                completed
              }
            }
          }
        }
      `, { id })
        .then(resp => resp.json())
        .then(data => {
          if (data.errors) console.error(data.errors)
          else  setTool(data.data.getTool)
        })
    }
  }, [id]);

  return (
    <Modal centered show={show} onHide={() => navigate('/tools')}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default Reserve;