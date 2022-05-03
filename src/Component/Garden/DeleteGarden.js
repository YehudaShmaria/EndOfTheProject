import axios from "axios";
import React, { useState } from "react";
import { Button, Offcanvas, Col, Row, Toast } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GardenState } from "../../Context/GardenProvider";

const DeleteGarden = () => {
  const { setGarden, garden } = GardenState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  const deleteGarden = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:44398/api/flower/deletGarden",
        garden
      );

      setGarden(null);

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Button variant="warning" onClick={handleShow} className="mb-2">
        <strong>מחיקת גינה</strong>
      </Button>
      <Offcanvas placement="top" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>תחשוב רגע לפני</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          אתה בטוח שאתה רוצה למחוק את הגינה כל הנתונים ימחקו?
          <br />
          <Button variant="danger" onClick={deleteGarden}>
            מחק
          </Button>
          <Button onClick={handleClose}>סגור</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DeleteGarden;
