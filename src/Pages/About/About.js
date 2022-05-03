import React, { useEffect } from "react";
import { Container, Badge, Row, Col, Image, Card } from "react-bootstrap";
import AOS, { refresh } from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - About";
  }, []);

  return (
    <div style={{ backgroundColor: "whitesmoke", opacity: "0.8" }}>
      <Container>
        <div style={{ paddingTop: "20px" }}>
          <h1 className="text-success">
            <Badge bg="success">טיפה עלינו </Badge>
          </h1>
        </div>
        <hr
          style={{ color: "black", marginBottom: "50px", marginTop: "20px" }}
        />
        <Row>
          <Col data-aos="slide-right" sm={6} md={6} xs={12}>
            <p>
              ישנם אלפי סוגים שונים של פרחים המגיעים בגדלים וצבעים רבים. סוגים
              שונים של פרחים שנתיים פופולריים יכולים לפרוח באביב ובקיץ. זה יכול
              לתת לגינה שלך פרחים לבנים, ורודים, אדומים או צהובים יפהפיים. סוגים
              רבים של צמחים רב שנתיים מייצרים פריחה של פרחים, בעיקר באביב ובקיץ.
              ישנם אלפי סוגים שונים של פרחים המגיעים בגדלים וצבעים רבים. סוגים
              שונים של פרחים שנתיים פופולריים יכולים לפרוח באביב ובקיץ. זה יכול
              לתת לגינה שלך פרחים לבנים, ורודים, אדומים או צהובים יפהפיים. סוגים
              רבים של צמחים רב שנתיים מייצרים פריחה של פרחים, בעיקר באביב ובקיץ.
              ישנם אלפי סוגים שונים של פרחים המגיעים בגדלים וצבעים רבים. סוגים
              שונים של פרחים שנתיים פופולריים יכולים לפרוח באביב ובקיץ. זה יכול
              לתת לגינה שלך פרחים לבנים, ורודים, אדומים או צהובים יפהפיים. סוגים
              רבים של צמחים רב שנתיים מייצרים פריחה של פרחים, בעיקר באביב ובקיץ.
            </p>
          </Col>
          <Col sm={1} md={1} xs={0}></Col>
          <Col sm={4} md={4} xs={12}>
            <Image
              data-aos="zoom-in"
              roundedCircle
              style={{ height: "auto", width: "100%" }}
              src={process.env.PUBLIC_URL + "/Images/AboutGarden1.jpg"}
            />
          </Col>
        </Row>
        <hr style={{ marginTop: "30px", marginBottom: "40px" }} />
        <div data-aos="zoom-in-down">
          {" "}
          <h3 className="text-success">
            <Badge bg="warning">הצוות </Badge>
          </h3>{" "}
          <div className="text-center" style={{ padding: "20px" }}>
            <Row>
              <Col style={{ marginTop: "10px" }} sm={4} md={4} xs={12}>
                <Card border="warning" style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + "/Images/AvatarW.png"}
                  />
                  <Card.Body>
                    <Card.Title>צילי מנצר</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} xs={0}></Col>

              <Col style={{ marginTop: "10px" }} sm={4} md={4} xs={12}>
                <Card border="warning" style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + "/Images/AvatarW.png"}
                  />
                  <Card.Body>
                    <Card.Title>מיכל אוחנונה</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
