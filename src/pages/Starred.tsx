import { Button, Toolbar } from "@material-ui/core";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import NewsCard from "../components/NewsCard";

type StarredProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  starred: any;
  setStarred: (starred: any) => void;
};

const Starred: React.FC<StarredProps> = ({
  loggedIn,
  setLoggedIn,
  starred,
  setStarred,
}) => {
  const location = useLocation();
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
      {starred.map((item: any) => (
        <NewsCard
          news={item}
          key={item.url + item.publishedAt}
          starred={starred}
          setStarred={setStarred}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  );
};

export default Starred;
