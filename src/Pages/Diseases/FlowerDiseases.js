import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Badge,
  Container,
  Image,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import AOS, { refresh } from "aos";

const FlowerDiseases = () => {
  const [image, setImage] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [urlImage, setUrlImage] = useState();

  useEffect(() => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - Flower Diseases";
  }, []);

  const imageHandler = async (e) => {
    setUrlImage(URL.createObjectURL(e.target.files[0]));
    const base64 = await convertToBase64(e.target.files[0]);
    setImage(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
    });
  };

  const sendImage = async () => {
    const data = {
      api_key: "oVGZrwtCqbPW4OovouZknhLfPtPnSSU4x2fRVCjxiiQ7WCGMvT",
      images: [image],
      modifiers: ["crops_fast", "similar_images"],
      language: "en",
      disease_details: [
        "cause",
        "common_names",
        "classification",
        "description",
        "treatment",
        "url",
      ],
    };
    axios
      .post("https://api.plant.id/v2/health_assessment", data)
      .then((res) => {
        console.log("Success:", res.data.health_assessment);
        setResultData(res.data.health_assessment);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div>
      <Container>
        <div data-aos="zoom-in" style={{ marginBottom: "20px" }}>
          <h1 className="text-success">
            <Badge bg="success">מחלות פרחים </Badge>
          </h1>
        </div>
        <Row>
          <Col data-aos="zoom-in" md={6} sm={6} xs={12}>
            {" "}
            <div style={{ padding: "10px", color: "black" }}>
              <h3 style={{ color: "black" }}>
                {" "}
                <Badge text="dark" bg="warning">
                  העלה תמונה של פרח
                </Badge>
              </h3>
              <Form.Group controlId="formFileLg">
                <Form.Control onChange={imageHandler} type="file" />
              </Form.Group>
              <div style={{ paddingTop: "10px", textAlign: "left" }}>
                <Button onClick={sendImage}>חפש</Button>
              </div>
              <span>Original Image: </span>
              <Image
                height="50px"
                width="50px"
                variant="top"
                roundedCircle
                src={urlImage}
              />
            </div>
          </Col>
          <Col data-aos="slide-left" md={6} sm={6} xs={12}>
            <Alert variant="success">
              <Alert.Heading>אוקיי אז מה אנחנו עושים פה</Alert.Heading>
              <p>
                המטרה שלנו היא לספק שירות שמספק מידע על מחלות של פרחים על סמך
                התמונה אותה אתם מספקים, מקווים שהכל יעבוד חלק ושיהיה המון
                בהצלחה!!
              </p>
              <hr />
              <p className="mb-0">
                השירות אותו אנו מספקים בשפה האנגלית מקווים שתסתדרו....
              </p>
            </Alert>
          </Col>
        </Row>

        {resultData ? (
          <>
            <Row>
              {resultData?.diseases.map((item, index) => {
                return (
                  <>
                    <Col style={{ marginTop: "15px" }} md={6} sm={6} xs={12}>
                      <Card className="text-center">
                        <Card.Header>
                          <b>Name:</b> {item.name}
                        </Card.Header>
                        <div>
                          <h3
                            style={{ fontStyle: "italic", color: "goldenrod" }}
                          >
                            Similar Image
                          </h3>
                          <Image
                            height="100px"
                            width="100px"
                            variant="top"
                            roundedCircle
                            src={item.similar_images[0].url}
                          />
                        </div>
                        <Card.Body>
                          <Card.Text>
                            <b>Description:</b>{" "}
                            {item.disease_details.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );
              })}
            </Row>{" "}
          </>
        ) : null}
      </Container>
    </div>
  );
};
export default FlowerDiseases;
