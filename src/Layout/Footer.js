import React from "react";
import { Link } from "react-router-dom";
import { GardenState } from "../Context/GardenProvider";

const Footer = () => {
  const { user, setUser, garden } = GardenState();
  return (
    <div style={{ marginTop: "30px" }}>
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">טיפה עלינו</h5>
              <p>
                מערכת המאפשרת לנהל את גן הפרחים שלך בצורה הטובה ביותר תוך מתן
                יכולת השקייה, הוספת פרחים חדשים וניהול שלהם.
              </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">מידע</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/">דף הבית</Link>
                </li>
                <li>
                  <Link to="/about">טיפה עלינו</Link>
                </li>{" "}
                <li>
                  <Link to="/contact">צור קשר</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">פעולות</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/disease">מחלות פרחים</Link>
                </li>
                {user && !garden ? (
                  <>
                    <li>
                      <Link to="/addgarden">הוסף גינה</Link>
                    </li>{" "}
                  </>
                ) : null}
                {garden ? (
                  <>
                    <li>
                      <Link to="/mygarden">הגינה שלי</Link>
                    </li>{" "}
                  </>
                ) : null}

                {user ? (
                  <>
                    <li>
                      <Link
                        onClick={() => {
                          setUser(null);
                        }}
                        to="/"
                      >
                        התנתק
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login">התחבר</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="footer-copyright text-center py-3">
          © 2022 Created && Design By:
          <a target="_blank" href="https://yehuda-portfolio.herokuapp.com/">
            Yehuda Shmaria
          </a>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;
