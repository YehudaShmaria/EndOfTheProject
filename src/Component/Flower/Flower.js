import React from "react";
import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";

const Flower = ({ f }) => {
  return (
    <div>
      <Card style={{ width: "22rem" }}>
        <Card.Img
          variant="top"
          src={process.env.PUBLIC_URL + "/Images/gardenLogin.jpg"}
        />
        <Card.Body>
          <Card.Title>{f.name}</Card.Title>
          <Card.Text>{f.instructions}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Category: {f.category}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Flower;
