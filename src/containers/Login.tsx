import { Container } from "@material-ui/core";
import { FC } from "react";
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper:{
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    backgroundColor:"#0091A2",
    margin: theme.spacing(4, 0, 4),
    '&:hover': {
      backgroundColor: "#007C8B",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
  text:{
    color: "#0091A2",
  }
}));



const Login: FC<{}> = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Iniciar sesión</Typography>
        <form>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email"  autoComplete="email" autoFocus/>
          <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password"  autoComplete="current-password" type="password"/>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Iniciar sesión</Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.text}>¿Olvidaste tu contraseña?</Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" className={classes.text}>
                {"¿No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
