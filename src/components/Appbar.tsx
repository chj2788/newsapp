import {
  AppBar,
  Button,
  makeStyles,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0 3em",
  },
  title: {
    flexGrow: 1,
    marginLeft: "1.5em",
  },
}));

type AppbarProps = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

const Appbar: React.FC<AppbarProps> = ({ loggedIn, setLoggedIn }) => {
  const classes = useStyles();
  const account = {
    id: "alyce",
    password: "alyce123",
  };
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) {
      return;
    }
    setLoggedIn(false);
    localStorage.setItem("login", JSON.stringify(false));

    alert(
      "successfully logged out! You can't access the starred page anymore :("
    );
  };

  const onSubmit = () => {
    if (id === account.id && password === account.password) {
      setLoggedIn(true);
      alert("successfully logged in! You can now access the starred page");
      setOpen(false);
      localStorage.setItem("login", JSON.stringify(true));
    } else {
      alert(
        "The id and password you entered did not match our Records. Please double-check and try again"
      );
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News App
          </Typography>
          {loggedIn && (
            <Button
              color="inherit"
              onClick={signOut}
              style={{ marginRight: "2em" }}
            >
              Sign Out
            </Button>
          )}
          {!loggedIn && (
            <Button
              onClick={handleOpen}
              color="inherit"
              style={{ marginRight: "2em" }}
            >
              Login
            </Button>
          )}
          <Modal
            style={{
              display: "flex",
              padding: "2em",
              alignItems: "center",
              justifyContent: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            <div
              style={{
                position: "absolute",
                width: 400,
                backgroundColor: "white",
                border: "1px solid black",
                padding: "2em 3em",
              }}
            >
              <h2>LogIn</h2>
              <div style={{ marginTop: "2em" }}>
                <TextField
                  name="id"
                  label="id"
                  variant="outlined"
                  value={id}
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                  fullWidth
                  required
                  error={id === "" ? true : false}
                  helperText="please enter your id"
                />
              </div>
              <div style={{ margin: "1em 0 2em" }}>
                <TextField
                  name="password"
                  label="password"
                  variant="outlined"
                  value={password}
                  fullWidth
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  error={password === "" ? true : false}
                  helperText="please enter your password"
                  type="password"
                />
              </div>
              <div>
                <Button
                  fullWidth
                  onClick={onSubmit}
                  disabled={
                    id === "" ? true : false || password === "" ? true : false
                  }
                >
                  Login
                </Button>
              </div>
            </div>
          </Modal>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
