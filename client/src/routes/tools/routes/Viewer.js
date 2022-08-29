import { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

const Viewer = () => {

  const navigate = useNavigate();
  const id = useParams().id;
  const [tool, setTool] = useState();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return ( !id ? navigate('/tools') :
    <Modal centered show={id} onHide={()=>navigate('/tools')}>
      <Modal.Header closeButton>
        <Modal.Title>{tool ? `Viewing ${tool.brand} ${tool.name}` : "Loading..."}</Modal.Title>
      </Modal.Header>
      {
        !tool ? null :
        <Modal.Body>
          <p>Modal body text</p>
        </Modal.Body>
      }
    </Modal>
  );
}
 
export default Viewer;