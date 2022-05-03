import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { GardenState } from "../../Context/GardenProvider";

const AddFlower = ({ f, addFlower }) => {
  const { garden, setMyFlowers, user } = GardenState();
  const [show, setShow] = useState(false);
  const [potType, setPotType] = useState();
  const [potSize, setPotSize] = useState();
  const [soil, setSoil] = useState(1);
  const [numDayes, setNumDayes] = useState(null);
  const [shmita, setShmita] = useState(null);
  const [flower, setFlower] = useState();
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    checkShmita();
    console.log(soil);
  }, []);

  useEffect(async () => {
    if (garden) {
      try {
        const { data } = await axios.get(
          "https://localhost:44398/api/flower/getGardenFlowers?id=" +
            garden.GardenId
        );
        setMyFlowers(data.$values);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [flower]);

  useEffect(() => {
    if (numDayes === 0 || null) {
      setNumDayes(null);
    }
  }, [numDayes]);

  const checkShmita = async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/isShmita"
      );
      if (data) {
        setShmita(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      AddFlower();
    }
    setValidated(true);
  };

  const AddFlower = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:44398/api/flower/addFlowerToGarden",
        {
          gardenId: garden.GardenId,
          flowerName: f.FlowerName,
          colour: f.Colour,
          description: f.Description,
          picture: f.Picture,
          potSize,
          potType,
          WateringId: soil,
        }
      );

      if (data) {
        setFlower(data);
        handleClose();
        addFlower();
        handlerNumDayes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlerNumDayes = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:44398/api/flower/calcAmount",
        {
          f: flower,
          userId: user.UserId,
          userPreference: numDayes,
          sun: garden.Sun,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlerSoil = (e) => {
    switch (e.target.value) {
      case "קלה":
        setSoil(1);
        break;
      case "בינונית":
        setSoil(2);
        break;
      case "כבדה":
        setSoil(3);
        break;
      default:
        setSoil(1);
        break;
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        הוסף פרח לגינה שלך!
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>פרטי פרח</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shmita ? (
            <>
              <span>החישוב יהיה לפי שנת שמיטה</span>
            </>
          ) : null}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                סוג עציץ
              </Form.Label>
              <Col>
                <Form.Select
                  onChange={(e) => {
                    setPotType(e.target.value);
                  }}
                  aria-label="Floating label select example"
                >
                  <option disabled>בחר מבן האפשרויות</option>
                  <option>נקוב</option>
                  <option> לא נקוב</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                גודל עציץ
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="גודל"
                  onChange={(e) => {
                    setPotSize(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                סוג אדמה
              </Form.Label>
              <Col>
                <Form.Select
                  onChange={handlerSoil}
                  aria-label="Floating label select example"
                >
                  <option disabled>בחר מבן האפשרויות</option>
                  <option>קלה</option>
                  <option>בינונית</option>
                  <option>כבדה</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                אופציונלי
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="זמני השקיה "
                  onChange={(e) => {
                    setNumDayes(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <div>
              <Button variant="primary" type="submit">
                הוסף פרח לגינה
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddFlower;
