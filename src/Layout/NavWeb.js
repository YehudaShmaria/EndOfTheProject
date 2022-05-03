import React from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { GardenState } from "../Context/GardenProvider";

const NavWeb = () => {
  const { user, garden, setUser, setGarden } = GardenState();

  const logout = () => {
    setGarden(null);
    setUser(null);
  };
  return (
    <div style={{ marginBottom: "70px" }}>
      <Navbar fixed="top" variant="dark" bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand>flowers twenty four seven</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link> דף הבית</Nav.Link>
              </LinkContainer>
              {garden && user ? (
                <>
                  {" "}
                  <LinkContainer to="/mygarden">
                    <Nav.Link>הגינה שלי</Nav.Link>
                  </LinkContainer>
                </>
              ) : null}
              {user && !garden ? (
                <>
                  <LinkContainer to="/addgarden">
                    <Nav.Link>צור גינה</Nav.Link>
                  </LinkContainer>
                </>
              ) : null}

              <LinkContainer to="/disease">
                <Nav.Link>מחלות פרחים</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>טיפה עלינו</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>צור קשר</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="me-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="חפש"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-warning">חפש</Button>
              </Form>
              {user ? (
                <>
                  {" "}
                  <Nav.Link onClick={logout}>
                    התנתק{" "}
                    <i
                      style={{ fontSize: "24px" }}
                      className="fas fa-share-square"
                    ></i>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer className="icon" to="/login">
                    <Nav.Link>
                      התחבר{" "}
                      <i
                        style={{ fontSize: "24px" }}
                        className="fas fa-sign-in-alt"
                      ></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer className="icon" to="/register">
                    <Nav.Link>
                      צור חשבון{" "}
                      <i
                        style={{ fontSize: "24px" }}
                        className="fas fa-edit"
                      ></i>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavWeb;
