import { useState, useContext } from "react";
import { Container } from "@material-ui/core";
import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import { api } from "../api";
import { LoginResponse } from "../types/Auth";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: "#007C8B",
    width: "80px",
    height: "80px",
  },
  icon: {
    width: "80px",
    height: "80px",
  },
  submit: {
    backgroundColor: "#0091A2",
    margin: theme.spacing(4, 0, 4),
    "&:hover": {
      backgroundColor: "#007C8B",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  text: {
    color: "#0091A2",
  },
}));

const Login: FC<{}> = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let history = useHistory();

  const context = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //LoginRequest();
    loginReq();
  };

  const loginReq = async () => {
    try {
      var data = { user: `${email}`, password: `${password}` };
      const resp = await api.post<LoginResponse>("/token", data);
      context.login(resp.data);
      history.push("/home");
    } catch (e) {
      setError(true);
      if (e.request.status === 404) {
        setErrorMsg("Usuario o contraseña incorrecta");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon className={classes.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            autoComplete="current-password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.text}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" className={classes.text}>
                {"¿No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>

        {error === true && (
          <div>
            <br />
            <br />
            <Alert variant="outlined" severity="error">
              {errorMsg}
            </Alert>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;
