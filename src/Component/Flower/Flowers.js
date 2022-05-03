import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Card,
  ListGroup,
  Badge,
  FormControl,
  InputGroup,
  Col,
  Row,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { GardenState } from "../../Context/GardenProvider";
import AddFlower from "./AddFlower";

const Flowers = () => {
  const { myFlowers } = GardenState();
  const [flowers, setFlowers] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/getAllFlowers"
      );
      console.log(data.$values);
      setFlowers(data.$values);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    setSearch("");
  }, [show]);

  useEffect(() => {
    let f = flowers;
    let r = f.filter((x) => x.FlowerName.includes(search));
    setResult(r);
  }, [search]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Image
        roundedCircle
        style={{ height: "auto", width: "50px" }}
        src={process.env.PUBLIC_URL + "/Images/Flower.jpg"}
      />
      <br />
      <Button variant="info" onClick={handleShow}>
        הוסף פרח לגינה
      </Button>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            בחר מרשימת הפרחים
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ backgroundColor: "whitesmoke", opacity: "0.7" }}>
            <div style={{ padding: "10px" }}>
              <h3>
                <Badge>חפש פרח</Badge>
              </h3>
              <InputGroup size="lg">
                <FormControl
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
            </div>
          </div>
          <hr />
          <Row>
            {search ? (
              <>
                {result.map((item, index) => {
                  return (
                    <>
                      <Col md={4} sm={4} xs={12}>
                        <Card style={{ width: "22rem" }}>
                          <Card.Img variant="top" src={item.Picture} />
                          <Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem>{item.FlowerName}</ListGroupItem>
                              <ListGroupItem>{item.Colour}</ListGroupItem>
                              <ListGroupItem>{item.Description}</ListGroupItem>
                              <ListGroupItem></ListGroupItem>
                            </ListGroup>
                            <AddFlower f={item} />
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {flowers.map((item, index) => {
                  return (
                    <>
                      <Col md={4} sm={4} xs={12}>
                        <Card style={{ width: "22rem" }}>
                          <Card.Img variant="top" src={item.Picture} />
                          <Card.Body>
                            <ListGroupItem>{item.FlowerName}</ListGroupItem>
                            <ListGroupItem>{item.Colour}</ListGroupItem>
                            <ListGroupItem>{item.Description}</ListGroupItem>
                            <AddFlower
                              f={item}
                              addFlower={() => {
                                setShow(false);
                              }}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Flowers;
