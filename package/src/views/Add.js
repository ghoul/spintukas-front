import React, { useState, useEffect } from 'react';
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
  Input,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [levelInput, setLevelInput] = useState('1');
  const [typeInput, setTypeInput] = useState('');
  const [furnitureInput, setFurnitureInput] = useState('');
  const [types, setTypes] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [fail, setFail] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate  = useNavigate();
  let token = localStorage.getItem('token'); 
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('http://localhost:8000/types/', {
          headers: {
            'Authorization' : `${token}`,
            "Content-Type": "application/json"
          },
        }); // Replace with your API endpoint to fetch types
        const data = await response.json();
        console.log(data);
        setTypes(data); // Assuming data is an array of type objects with 'id' and 'name' properties
        if (data.length > 0) {
          setTypeInput(data[0].id); // Set the default type to the first type fetched from the database
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    const fetchFurniture = async () => {
      try {
        const response = await fetch('http://localhost:8000/furniture/', {
          headers: {
            'Authorization' : `${token}`,
            "Content-Type": "application/json"
          },
        }); // Replace with your API endpoint to fetch types
        const data = await response.json();
        setFurniture(data); // Assuming data is an array of type objects with 'id' and 'name' properties
        if (data.length > 0) {
          setFurnitureInput(data[0].id); // Set the default type to the first type fetched from the database
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
    fetchFurniture();
  }, []); // Run the effect only once after the initial render

  const createDefect= (event) => {
    event.preventDefault();

    const defect = {
      furniture: furnitureInput,
      description: descriptionInput,
      level: levelInput,
      type: typeInput,
    };

    console.log('Request Body: ', JSON.stringify(defect));

    fetch(`http://localhost:8000/defect/`, {
      method: 'POST',
      headers: {
        'Authorization' : `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defect),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Body: ', data);
        setMessage(data.success ? 'Operacija sėkminga!' : 'Klaida! '+ data.error);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Klaida!' + error.error);
      });
  };
  const send = (event) => {
    navigate('/');
  }
  return (
    <Row>
      <Col>
      <Button style={{ backgroundColor: '#1b1c20', color: 'white', marginBottom: '10px' }} onClick={send}> ← Į pradžią</Button>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i class="bi bi-tools me-2"></i>
            Naujo defekto registracija
          </CardTitle>
          <CardBody>
          {message && <div style={{ marginBottom: '10px', color: message.includes('Klaida') ? 'red' : 'green' }}>{message}</div>}
          
            <Form onSubmit={createDefect}>
            <FormGroup>
                <Label for="furniture">Baldas</Label>
                <Input
                  id="furniture"
                  name="furniture"
                  type="select"
                  required
                  value={furnitureInput}
                  onChange={(e) => setFurnitureInput(e.target.value)}
                >
                  {furniture.map((furn) => (
                    <option key={furn.id} value={furn.id}>
                      {furn.title} {furn.code}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="type">Defekto tipas</Label>
                <Input
                  id="type"
                  name="type"
                  type="select"
                  required
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="level">Defekto stiprumo lygis</Label>
                <Input
                  id="level"
                  name="level"
                  type="select"
                  required
                  value={levelInput}
                  onChange={(e) => setLevelInput(e.target.value)}
                >
                    <option value="1">1 - labai mažas</option>
                    <option value="2">2 - mažas</option>
                    <option value="3">3 - vidutinis</option>
                    <option value="4">4 - didelis</option>
                    <option value="5">5 - labai didelis</option>
                 
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Aprašymas</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  style={{ height: '60px' }}
                  required
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
              </FormGroup>
              <Button style={{ backgroundColor: '#204963', color: 'white'}}>Įrašyti</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Add;
