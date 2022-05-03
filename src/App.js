import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./Layout/Footer";
import NavWeb from "./Layout/NavWeb";
import WebRouter from "./Component/WebRouter";
import { GardenState } from "./Context/GardenProvider";
import ScrollToTop from "./Component/ScrollToTop";

function App() {
  const {setUser, setGarden} = GardenState();
  return (
    <div className="App">
      <NavWeb />
      <Container>
        <ScrollToTop />
        <WebRouter />
        <hr style={{ marginTop: "50px" }} />
        <Footer />
        <Button
          onClick={() => {
            setUser("Yehuda");
          }}
        >
          set User
        </Button>
        <Button
          onClick={() => {
            setGarden("Garden");
          }}
        >
          set Garden
        </Button>
      </Container>
    </div>
  );
}

export default App;
