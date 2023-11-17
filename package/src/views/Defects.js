import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Modal } from './Modal.js';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const DefectsList = () => {
  const [defects, setDefects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDefectId, setSelectedDefectId] = useState(null);
  let token = localStorage.getItem('token'); 
  const decodedToken = jwtDecode(token);
  const usernameFromToken = decodedToken.username;
  let admin = localStorage.getItem('admin'); 
  admin = admin=== "true";
  const navigate  = useNavigate();
  useEffect(() => {
    const fetchDefects = async () => {
      try {
        const response = await fetch('http://localhost:8000/defects/', {
          method: 'GET',
          headers: {
            'Authorization' : `${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setDefects(data);
      } catch (error) {
        console.error('Error fetching defects:', error);
      }
    };

    fetchDefects();
  }, []);

  const deleteDefect = () => {
    fetch(`http://localhost:8000/defect/${selectedDefectId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle success, update defects state, and close the modal
        const updatedDefects = defects.filter(defect => defect.id !== selectedDefectId);
        setDefects(updatedDefects);
        hideModalHandler(); // Move hideModalHandler inside the .then() block
        window.location.reload();
      })
      .catch(error => {
        // Handle error
        window.location.reload();
        console.error('Error deleting defect:', error);
      });
  };
  

  const showModalHandler = (defectId) => {
    setSelectedDefectId(defectId);
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  const send = (event) => {
    navigate('/');
  }
  return (
    <div className="video-page">
      <Modal show={showModal} hide={hideModalHandler} onRemoveProduct={deleteDefect}></Modal>
      <Table>
        <thead>
          <tr>
            <th>Baldas</th>
            <th>Defekto tipas</th>
            <th>Defekto stiprumas</th>
            <th>Data</th>
            <th>Darbuotojas</th>
            <th>Būsena</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {defects.map((defect) => (
            <tr key={defect.id}>
              <td>{defect.furniture_title}</td>
              <td>{defect.type_title}</td>
              <td>{defect.level}</td>
              <td>{defect.date}</td>
              <td>{defect.user_assigned ? defect.user_assigned : 'Nepaskirta'}</td>
              <td>{defect.state}</td>
              <td>
              {!defect.user_assigned ? (
                  <Button style={{ backgroundColor: '#204963', marginRight: '10px' }}>
                    <Link to={`/defect/${defect.id}/edit`} className="nav-link" style={{ color: 'white' }}>
                      Pasirinkti
                    </Link>
                  </Button>
                ) : defect.user_assigned === usernameFromToken ? (
                  <Button style={{ backgroundColor: '#204963', marginRight: '10px' }}>
                    <Link to={`/defect/${defect.id}/edit`} className="nav-link" style={{ color: 'white' }}>
                      Keisti
                    </Link>
                  </Button>
                ) : (
                  null // Or any placeholder content when conditions are not met
                )}

                {((defect.user_reported === usernameFromToken ) || (admin))&& (<Button style={{ backgroundColor: 'orange', color: '#204963' }} onClick={() => showModalHandler(defect.id)}>
                  Šalinti
                </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DefectsList;
