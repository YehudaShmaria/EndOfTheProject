import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Form,
  Row,
  Col,
  Container,
  Badge,
  Alert,
  Card,
  ListGroup,
  Offcanvas,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import { GardenState } from "../../Context/GardenProvider";
import Flower from "../../Component/Flower/Flower";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import AOS, { refresh } from "aos";

const Home = () => {
  const { user, garden } = GardenState();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [image, setImage] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const [flower, setFlower] = useState(null);
  const [showB, setShowB] = useState(false);
  const [show1, setShow1] = useState(true);
  const [show, setShow] = useState(true);
  const [showFlower, setShowFlower] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [urlImage, setUrlImage] = useState();

  useEffect(async () => {
    AOS.init({ duration: 3000 });
    document.title = "Garden - Home";
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/getAllFlowers"
      );
      setFlowers(data.$values);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    let f = flowers;
    let r = f.filter((x) => x.FlowerName.includes(search));
    setResult(r);
  }, [search]);

  useEffect(() => {
    if (flower) {
      setShowFlower(true);
    }
  }, [flower]);

  const sendImage = async () => {
    const data = {
      api_key: "oVGZrwtCqbPW4OovouZknhLfPtPnSSU4x2fRVCjxiiQ7WCGMvT",
      images: [image],
      modifiers: ["crops_fast", "similar_images"],
      language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
      disease_details: ["common_names", "url", "description"],
    };
    axios
      .post("https://api.plant.id/v2/identify", data)
      .then((res) => {
        console.log("Success:", res.data);
        setResultData(res.data.suggestions);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

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

  const toggleShowB = () => setShowB(!showB);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <Container>
        <div data-aos="zoom-in" style={{ marginBottom: "20px" }}>
          <h1 className="text-success">
            <Badge bg="success">
              {user?.UserMail} דף הבית ברוכים הבאים <br />
            </Badge>
          </h1>
        </div>
        <hr />
        <div style={{ padding: "10px" }}>
          <Slider {...settings}>
            {flowers.map((item, index) => {
              return (
                <>
                  <div>
                    <Image
                      style={{ height: "200px", width: "auto" }}
                      src={item.Picture}
                    />
                  </div>
                </>
              );
            })}
          </Slider>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Row>
            <Col sm={6} md={6} xs={12}>
              <div style={{ backgroundColor: "gray", opacity: "0.7" }}>
                <div style={{ padding: "10px" }}>
                  <h3>
                    <Badge>חפש פרח במערכות המידע</Badge>
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
              {search ? (
                <>
                  <div className="d-grid gap-2">
                    {result.map((item, index) => {
                      return (
                        <>
                          <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => {
                              setFlower(item);
                            }}
                          >
                            {item.FlowerName}
                          </Button>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <Alert show={show} variant="success">
                    <Alert.Heading>תוצאות חיפוש</Alert.Heading>
                    <p>
                      החיפוש נעשה על כל הפרחים הקיימים במערכת הפרמטר אותו הוא
                      מחפש הוא שם הפרח...
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          setShow(false);
                        }}
                        variant="outline-success"
                      >
                        אם הבנת אתה גם יכול לסגור אותי
                      </Button>
                    </div>
                  </Alert>
                </>
              )}
            </Col>
            <Col sm={6} md={6} xs={12}>
              <div style={{ backgroundColor: "gray", opacity: "0.7" }}>
                <div style={{ padding: "10px" }}>
                  <h3>
                    <Badge>העלה תמונה של פרח וקבל מידע</Badge>
                  </h3>
                  <Form.Group controlId="formFileLg">
                    <Row>
                      <Col md={10} sm={10} xs={10}>
                        {" "}
                        <Form.Control
                          type="file"
                          size="lg"
                          onChange={imageHandler}
                        />
                      </Col>
                      <Col md={2} sm={2} xs={2}>
                        <Button onClick={sendImage}>חפש</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
              </div>
              <hr />
              {resultData ? (
                <>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      roundedCircle
                      style={{ height: "auto", width: "100%" }}
                      src={urlImage}
                    />
                    <h3>{resultData[0].plant_name}</h3>
                    <hr></hr>
                    <p>{resultData[0].plant_details.wiki_description.value}</p>
                  </div>
                </>
              ) : (
                <>
                  <Alert show={show1} variant="success">
                    <Alert.Heading>נתוני הפרח שבתמונה</Alert.Heading>
                    <p>
                      החיפוש נעשה על כל הפרחים הקיימים במערכות נתונים שלנו
                      והנתון אותו הוא מאתר הוא לפי שם הפרח
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          setShow1(false);
                        }}
                        variant="outline-success"
                      >
                        אם הבנת אתה גם יכול לסגור אותי
                      </Button>
                    </div>
                  </Alert>
                </>
              )}
            </Col>
          </Row>
        </div>
        <Offcanvas
          show={showFlower}
          onHide={() => {
            setShowFlower(false);
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>פרטי הפרח</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card style={{ width: "22rem" }}>
              <Card.Img variant="top" src={flower?.Picture} />
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>{flower?.FlowerName}</ListGroupItem>
                  <ListGroupItem>{flower?.Colour}</ListGroupItem>
                  <ListGroupItem>{flower?.Description}</ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default Home;
