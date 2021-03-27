import Home from "./pages/Home";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Starred from "./pages/Starred";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <PrivateRoute exact path="/starred" loggedIn={loggedIn}>
            <Starred loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
