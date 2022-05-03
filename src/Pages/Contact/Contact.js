import React, { useState, useEffect } from "react";
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

const Contact = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - Contact";
  }, []);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
    }
    setValidated(true);
  };

  return (
    <div>
      <Container>
        <div data-aos="zoom-in" style={{ marginBottom: "20px" }}>
          <h1 className="text-success">
            <Badge bg="success">צור קשר</Badge>
          </h1>
        </div>
        <hr />
        <Row>
          <Col style={{ marginTop: "10px" }} sm={6} md={6} xs={12}>
            <div
              data-aos="zoom-in-left"
              style={{ textAlign: "right", backgroundColor: "whitesmoke" }}
            >
              <div style={{ padding: "15px" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>שם</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="הכנס שם"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הכנס שם
                    </Form.Control.Feedback>
                  </Form.Group>
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>במה נוכל לעזור</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      placeholder="הכנס הודעה"
                      as="textarea"
                      rows={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הכנס הודעה
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div style={{ textAlign: "left" }}>
                    <Button variant="primary" type="submit">
                      שלח
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>

          <Col style={{ marginTop: "10px" }} sm={6} md={6} xs={12}>
            <Image
              data-aos="zoom-in-right"
              rounded
              style={{ height: "auto", width: "100%" }}
              src={process.env.PUBLIC_URL + "/Images/contact1.jpg"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
