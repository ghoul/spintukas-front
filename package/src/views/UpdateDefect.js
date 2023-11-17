import React from "react";
import { Redirect } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
// import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
// import Forms from "./ui/Forms";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useNavigate } from 'react-router-dom';

export default function UpdateDefect() {
  const { defectId } = useParams();
  const navigate  = useNavigate();
  const [message, setMessage] = useState(''); 
  console.log("id: ", defectId);

  const [stateInput, setstateInput] = useState("1");
  const [states, setstates] = useState([]);
  const [defect, setdefect] = useState('');
  const [fail, setFail] = useState("");
  let token = localStorage.getItem('token'); 

  const getDefect = (defectId) => {
    fetch(
      `http://localhost:8000/defect/${defectId}/`,
      {
        method: "GET",
        headers: {
          'Authorization' : `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setstateInput(data.state);
        setdefect(data);
        console.log("grazino" + data);
      });
  };

  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:8000/states/', {
        method: 'GET',
        headers: {
          'Authorization' : `${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("states:" + data);
      setstates(data);
    } catch (error) {
      console.error('Error fetching defects:', error);
    }
  };

  useEffect(() => {
    const id = defectId;
    getDefect(id);
    fetchStates();
  }, []);

  useEffect(() => {
    // Do something when titleInput changes, e.g., log the value
    console.log("stateInput changed:", stateInput);
  }, [stateInput]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const defect = {
      pk: defectId,
      state: stateInput,
    };
    fetch(`http://localhost:8000/defect/${defectId}/`, {
      method: "PUT", 
      headers: {
        'Authorization' : `${token}`,
        "Content-Type": "application/json",
        // "mode": "no-cors"
      },
      body: JSON.stringify(defect),
      
    })
    .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setMessage(data.success ? 'Operacija sėkminga!' : 'Klaida! '+ data.error);
        setTimeout(() => {
          setMessage('');
        }, 3000);
        //window.location.href = `http://localhost:3000/categories`;
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage('Klaida!' + error.error);
      });
  };
  
  const send = (event) => {
    navigate('/defects');
  }
  return (
    // onSubmit={Click}
    <Row>
          <Col>
          <Button style={{ backgroundColor: '#1b1c20', color: 'white', marginBottom: '10px' }} onClick={send}> ← Atgal</Button>
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i class="bi bi-tools me-2"></i>
                Būsenos keitimas
              </CardTitle>
              <CardBody>
              {message && <div style={{ marginBottom: '10px', color: message.includes('Klaida') ? 'red' : 'green' }}>{message}</div>}
                <Form onSubmit={handleSubmit}> 
                <FormGroup>
                <Label for="furniture">Baldas</Label>
                <Input
                  id="furniture"
                  name="furniture"
                  type="text"
                  readOnly
                  value={defect.furniture}/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Aprašymas</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  readOnly
                  value={defect.description}/>
              </FormGroup>
                  <FormGroup>
                    <Label for="state">Būsena</Label>
                    <Input id="state" name="state" type="select" style={{ height: '40px' }}
                    required value={stateInput} onChange={(e) => setstateInput(e.target.value)}>
                     {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.title}
                    </option>
                  ))}
                  </Input>
                  </FormGroup>
                  <Button style={{ backgroundColor: '#204963', color: 'white'}}>Įrašyti</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
  );
}
