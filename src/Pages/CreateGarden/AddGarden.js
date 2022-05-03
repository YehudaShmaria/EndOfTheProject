import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Badge,
  Accordion,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { GardenState } from "../../Context/GardenProvider";

const AddGarden = () => {
  const { user, setGarden } = GardenState();
  const [userId, setUserId] = useState();
  const [sun, setSun] = useState("כן");
  const [position, setPosition] = useState("באדמה");
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else console.log(user);
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      createGarden();
    }
    setValidated(true);
  };

  const createGarden = async () => {
    console.log({
      userId: user.UserId,
      sun: sun,
      position: position,
    });
    try {
      const { data } = await axios.post(
        "https://localhost:44398/api/flower/createGarden",
        {
          userId: user.UserId,
          sun: sun,
          position: position,
        }
      );
      console.log(data);
      setGarden(data);
      history.push("/mygarden");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <div className="text-success" style={{ textAlign: "center" }}>
          <h1>
            <Badge bg="success">צור גינה</Badge>
          </h1>
        </div>
        <hr />
        <Row>
          <Col sm={6} md={6} xs={12}>
            <div style={{ textAlign: "right", backgroundColor: "whitesmoke" }}>
              <div
                style={{
                  padding: "5px",
                  color: "blue",
                  backgroundColor: "white",
                }}
              >
                <h2 style={{ padding: "5px" }}>פרטי גינה</h2>
              </div>
              <div style={{ padding: "15px" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label column sm="3">
                      מקורה?
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={(e) => {
                          setSun(e.target.value);
                        }}
                        aria-label="Floating label select example"
                      >
                        <option disabled>בחר מבן האפשרויות</option>
                        <option>כן</option>
                        <option>לא</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label column sm="3">
                      מיקום
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                        aria-label="Floating label select example"
                      >
                        <option disabled>בחר מבן האפשרויות</option>
                        <option key="צפון">אדמה</option>
                        <option key="השפלה">לא באדמה</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <div style={{ textAlign: "left" }}>
                    <Button variant="primary" type="submit">
                      צור גינה
                    </Button>
                  </div>
                </Form>
              </div>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>למה ליצור גינה?</Accordion.Header>
                  <Accordion.Body>
                    ניתן להוסיף פרחים, לעקוב אחר ההשקיה שלהם, ובעיקר לנהל את
                    הפרחים אשר נמצאים בגינה שלך.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col sm={6} md={6} xs={12}>
            <div
              style={{
                opacity: "0.8",
                borderRadius: "10px",
                borderStyle: "solid",
              }}
            >
              <ReactPlayer
                width="auto"
                volume={0.1}
                playing={true}
                loop={true}
                url="https://www.youtube.com/watch?v=ryUxrFUk6MY"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddGarden;
