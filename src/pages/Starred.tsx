import { Button, Toolbar } from "@material-ui/core";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";

type StarredProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

const Starred: React.FC<StarredProps> = ({ loggedIn, setLoggedIn }) => {
  const location = useLocation();
  // const [starred] = useShows();
  // const [shows, setShows] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  return (
    <div>
      <Appbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Toolbar />
      <div style={{ textAlign: "center", margin: "2em" }}>
        <Button
          variant="contained"
          color={"/" === location.pathname ? "primary" : "default"}
        >
          <NavLink
            style={{ textDecoration: "none", color: "gray" }}
            exact
            to="/"
          >
            Home
          </NavLink>
        </Button>
        <Button
          variant="contained"
          color={"/starred" === location.pathname ? "primary" : "default"}
        >
          <NavLink
            style={{ textDecoration: "none", color: "gray" }}
            exact
            to="/starred"
          >
            My favorites
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Starred;
