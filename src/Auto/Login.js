import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import AOS, { refresh } from "aos";
import { GardenState } from "../Context/GardenProvider";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);
  const { setUser, user, setGarden } = GardenState();
  const history = useHistory();

  useEffect(() => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - Login";
  }, []);

  useEffect(() => {
    if (user) {
      checkGarden();
      history.push("/");
    }
  }, [user]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      loginUser();
    }
    setValidated(true);
  };

  const loginUser = async () => {
    try {
      const { data } = await axios.get(
        `https://localhost:44398/api/user/checkUser?mail=${email}&pass=${password}`,
        { mail: email, pass: password }
      );
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkGarden = async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/checkIsGarden?userId=" + user.UserId
      );
      {
        if (data) {
          setGarden(data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Container>
        <div
          data-aos="zoom-in"
          className="text-success"
          style={{ textAlign: "center" }}
        >
          <h1>
            <Badge bg="success">התחבר</Badge>
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
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>מייל</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="הכנס מייל"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הכנס מייל
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>סיסמה</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="הכנס סיסמה"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הכנס סיסמא
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div style={{ textAlign: "left" }}>
                    <Button variant="primary" type="submit">
                      התחבר
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
              src={process.env.PUBLIC_URL + "/Images/Login1.png"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
