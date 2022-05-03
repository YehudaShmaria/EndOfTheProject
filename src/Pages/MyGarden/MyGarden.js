import React, { useEffect, useState } from "react";
import Flower from "../../Component/Flower/Flower";
import { Col, Nav, Row } from "react-bootstrap";
import {
  Card,
  Badge,
  InputGroup,
  FormControl,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import UpdateGarden from "../../Component/Garden/UpdateGarden";
import DeleteGarden from "../../Component/Garden/DeleteGarden";
import { GardenState } from "../../Context/GardenProvider";
import axios from "axios";
import UpdateFlower from "../../Component/Flower/UpdateFlower";
import DeleteFlower from "../../Component/Flower/DeleteFlower";
import Flowers from "../../Component/Flower/Flowers";
import { useHistory } from "react-router-dom";

const MyGarden = () => {
  const { garden, myFlowers, setMyFlowers, user } = GardenState();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);

  const history = useHistory();

  useEffect(async () => {
    if (!user) {
      history.push("/login");
    } else {
      if (garden) {
        try {
          const { data } = await axios.get(
            "https://localhost:44398/api/flower/getGardenFlowers?id=" +
              garden.GardenId
          );
          setMyFlowers(data.$values);
          console.log(data.$values);
          getAllFlowers();
        } catch (error) {
          console.log(error.message);
        }
      } else history.push("/addgarden");
    }
  }, [user]);

  useEffect(() => {
    if (myFlowers) {
      let f = myFlowers;
      let r = f.filter((x) => x.FlowerName.includes(search));
      setResult(r);
    }
  }, [search]);

  const getAllFlowers = async () => {
    try {
      const { data } = await axios.get(
        "https://localhost:44398/api/flower/getAllFlowers"
      );
      console.log(data.$values);
      setAllFlowers(data.$values);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = (id) => {
    alert("Test");
    let f = allFlowers.find((x) => x.FlowerId === id);
    console.log(f);
    return f.FlowerName;
  };
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 className="text-success">
          <Badge bg="success">הגינה שלי</Badge>
        </h1>
      </div>
      <hr />
      <Row>
        <Col sm={4} md={4} xs={12}>
          <div style={{ textAlign: "right" }}>
            <Card>
              <Card.Header>פרטי גינה</Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>הגינה {garden?.Sun} מקורה</ListGroupItem>
                  <ListGroupItem>המיקום {garden?.Position}</ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                </ListGroup>
                <div style={{ display: "inline-block" }}>
                  {" "}
                  <UpdateGarden></UpdateGarden>
                </div>
                <div style={{ display: "inline-block", paddingRight: "10px" }}>
                  {" "}
                  <DeleteGarden></DeleteGarden>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col sm={8} md={8} xs={12}>
          <div style={{ backgroundColor: "whitesmoke", opacity: "0.7" }}>
            <div style={{ padding: "10px" }}>
              <h3>
                <Badge>חפש פרח בגינה שלך</Badge>
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
          <div
            style={{
              textAlign: "left",
              paddingTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Flowers />
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }}>
        {search ? (
          <>
            {result.map((item, index) => {
              return (
                <>
                  <Col style={{ marginTop: "10px" }} md={4} sm={4} xs={12}>
                    <Card style={{ width: "22rem" }}>
                      <Card.Img variant="top" src={item.Picture} />
                      <Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>{item.FlowerName}</ListGroupItem>
                          <ListGroupItem>{item.Colour}</ListGroupItem>
                          <ListGroupItem>גודל {item.PotSize}</ListGroupItem>
                          <ListGroupItem>סוג {item.PotType}</ListGroupItem>
                          <ListGroupItem></ListGroupItem>
                        </ListGroup>
                        <UpdateFlower f={item} />
                        <DeleteFlower f={item} />
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </>
        ) : (
          <>
            {myFlowers?.map((item, index) => {
              return (
                <>
                  <Col style={{ marginTop: "10px" }} md={4} sm={4} xs={12}>
                    <Card style={{ width: "22rem" }}>
                      <Card.Img variant="top" src={item.Picture} />
                      <Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>{item.FlowerName}</ListGroupItem>
                          <ListGroupItem>{item.Colour}</ListGroupItem>
                          <ListGroupItem>גודל {item.PotSize}</ListGroupItem>
                          <ListGroupItem>סוג {item.PotType}</ListGroupItem>
                          <ListGroupItem></ListGroupItem>
                        </ListGroup>
                        <UpdateFlower f={item} />
                        <DeleteFlower f={item} />
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default MyGarden;
