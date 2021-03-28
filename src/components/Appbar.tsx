import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: "15%",
    fontFamily: "Pattaya",
    color: theme.palette.primary.light,
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
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };
  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const signOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) {
      return;
    }
    setLoggedIn(false);
    localStorage.setItem("login", JSON.stringify(false));

    setOpenProfile(false);
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
    <div className={classes.root}>
      <AppBar style={{ padding: "0.3em 0" }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            News App
          </Typography>
          {loggedIn && (
            <div onClick={handleProfileOpen} style={{ marginRight: "15%" }}>
              <Avatar alt={"Alyce"}>A</Avatar>
            </div>
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
            open={openProfile}
            onClose={handleProfileClose}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Hello, {account.id}</h2>
                <IconButton onClick={handleProfileClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <p>You can now add or edit your favorite articles.</p>
              <div style={{ marginTop: "3em" }}>
                <Button fullWidth onClick={signOut}>
                  Sign out
                </Button>
              </div>
            </div>
          </Modal>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>LogIn</h2>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
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
    </div>
  );
};

export default Appbar;
