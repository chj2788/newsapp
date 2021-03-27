import Home from "./pages/Home";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Starred from "./pages/Starred";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/starred">
            <Starred loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
