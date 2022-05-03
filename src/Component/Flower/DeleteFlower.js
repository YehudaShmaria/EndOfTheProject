import axios from "axios";
import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { GardenState } from "../../Context/GardenProvider";

const DeleteFlower = ({ f }) => {
  const { setMyFlowers, garden } = GardenState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteFlower = async () => {
    try {
      console.log(f);
      const { data } = await axios.post(
        "https://localhost:44398/api/flower/deletFlowerFromGarden",
        f
      );
      console.log(data);
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
      <Button onClick={handleShow}>מחק פרח</Button>
      <Offcanvas placement="top" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>תחשוב רגע לפני</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          אתה בטוח שאתה רוצה למחוק את הפרח כל הנתונים ימחקו?
          <br />
          <Button variant="danger" onClick={deleteFlower}>
            מחק
          </Button>
          <Button onClick={handleClose}>סגור</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DeleteFlower;
