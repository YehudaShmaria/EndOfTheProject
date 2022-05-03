import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Col,
  Row,
  Image,
  Badge,
} from "react-bootstrap";
import AOS, { refresh } from "aos";
import { GardenState } from "../Context/GardenProvider";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { setUser } = GardenState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confriem, setConfriem] = useState();
  const [address, setAddress] = useState("צפון");
  const [validated, setValidated] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - Register";
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    })
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      registerUser();
    }
    setValidated(true);
  };

  const registerUser = async () => {
    try {
      if (password === confriem) {
        const { data } = await axios.post(
          "https://localhost:44398/api/user/addUser",
          { UserMail: email, UserPass: password, LivingArea: address, UserLat: lat, UserLon: lon }
        );
        setUser(data);
        history.push('/')
      } else alert("Password not Match!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPosition = async () => {
    try {
      const { data } = await axios.get(
        `https://localhost:44398/api/flower/weatherForcast?lat=${lat}?lon=${lon}`);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <Container>
        <div
          data-aos="zoom-in"
          className="text-success"
          style={{ textAlign: "center" }}
        >
          <h1>
            <Badge bg="success">צור חשבון</Badge>
          </h1>
        </div>
        <hr />
        <Row>
          <Col sm={6} md={6} xs={12}>
            <div
              data-aos="zoom-in-left"
              style={{ textAlign: "right", backgroundColor: "whitesmoke" }}
            >
              <div
                style={{
                  padding: "5px",
                  color: "blue",
                  backgroundColor: "white",
                }}
              >
                <h2 style={{ padding: "5px" }}>מידע משתמש</h2>
              </div>
              <div style={{ padding: "15px" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label column sm="3">
                      מייל
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        required
                        type="email"
                        placeholder="הכנס מייל"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        אנא הכנס מייל תקין
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label column sm="3">
                      כתובת
                    </Form.Label>
                    <Col>
                      <Form.Select
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        aria-label="Floating label select example"
                      >
                        <option disabled>בחר מבן האפשרויות</option>
                        <option key="צפון">צפון</option>
                        <option key="השפלה">השפלה</option>
                        <option key="הרי יהודה">הרי יהודה</option>
                        <option key="דרום">דרום</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label column sm="3">
                      סיסמה
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        required
                        type={show ? "text" : "password"}
                        placeholder="הכנס סיסמה"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        אנא הכנס סיסמא
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <div style={{ textAlign: "left" }}>
                    <i
                      onMouseOver={() => setShow(true)}
                      onMouseLeave={() => {
                        setShow(false);
                      }}
                      style={{ fontSize: "24px" }}
                      className="far fa-eye"
                    ></i>
                  </div>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label column sm="3">
                      אימות סיסמא
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        required
                        type={show ? "text" : "password"}
                        placeholder="אמת סיסמה"
                        onChange={(e) => {
                          setConfriem(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        אנא אמת סיסמא
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <div style={{ textAlign: "left" }}>
                    <Button variant="primary" type="submit">
                      הירשם
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col sm={6} md={6} xs={12}>
            <Image
              data-aos="zoom-in-right"
              rounded
              style={{ height: "auto", width: "100%" }}
              src={process.env.PUBLIC_URL + "/Images/register.jpg"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
