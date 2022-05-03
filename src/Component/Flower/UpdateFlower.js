import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GardenState } from "../../Context/GardenProvider";

const UpdateFlower = ({ f }) => {
  const { setMyFlowers, garden } = GardenState();
  const [updateFlower, setUpdateFlower] = useState();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setUpdateFlower(f);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      sendUpdateFlower();
    }
    setValidated(true);
  };

  const sendUpdateFlower = async () => {
    try {
      console.log(updateFlower);
      const { data } = await axios.put(
        "https://localhost:44398/api/flower/updateFlower",
        updateFlower
      );
      getMyFlowers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMyFlowers = async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/getGardenFlowers?id=" +
          garden.GardenId
      );
      setMyFlowers(data.$values);
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleShow}>עדכן פרח</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>עדכן פרח</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                סוג עציץ
              </Form.Label>
              <Col>
                <Form.Select
                  value={updateFlower?.PotType}
                  onChange={(e) => {
                    setUpdateFlower({
                      ...updateFlower,
                      PotType: e.target.value,
                    });
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
                  value={updateFlower?.PotSize}
                  onChange={(e) => {
                    setUpdateFlower({
                      ...updateFlower,
                      PotSize: e.target.value,
                    });
                  }}
                />
              </Col>
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                עדכן פרח
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

export default UpdateFlower;
