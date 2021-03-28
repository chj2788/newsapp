import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import Starred from "./pages/Starred";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isLoggedin: any = localStorage.getItem("login");
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("login") ? JSON.parse(isLoggedin) : false
  );
  const output: any = localStorage.getItem("article");
  const [starred, setStarred] = useState<any>(
    localStorage.getItem("article") ? JSON.parse(output) : []
  );

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            starred={starred}
            setStarred={setStarred}
          />
        </Route>
        <PrivateRoute exact path="/starred" loggedIn={loggedIn}>
          <Starred
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            starred={starred}
            setStarred={setStarred}
          />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
