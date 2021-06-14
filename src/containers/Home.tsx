import React, { FC, ReactElement, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import { api, getToken } from "../api";
import { Accounts } from "../types/Account";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
    cardright: {
      textAlign: "right",
    },
    title: {
      color: theme.palette.text.primary,
    },
    cardAccount: {
      border: "1px solid #3f51b58c",
      borderRadius: "15px",
    },
  })
);
const Home: FC<{}> = (): ReactElement => {
  const initialState: Accounts = {
    debitAccounts: [],
    creditAccounts: [],
  };

  const [open, setOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState<Accounts>(initialState);

  const getAccountsReq = async () => {
    try {
      const token = getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get<any>("/client/accounts");
      console.log(data.data);
      setAccounts(data.data);
    } catch (e) {
      setAccounts(initialState);
    }
  };

  useEffect(() => {
    getAccountsReq();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Typography className={classes.title} variant="h4" component="h1">
                Mis Cuentas
              </Typography>
            </Paper>
          </Grid>
          {accounts.debitAccounts.map((debit) => (
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" component="h2">
                        {debit.id}
                      </Typography>
                      <Typography color="textSecondary">
                        Saldo disponible
                      </Typography>
                    </Grid>
                    <Grid className={classes.cardright} item xs={12} md={6}>
                      <Typography variant="subtitle1">Débito</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Tipo de cuenta
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    size="small"
                    onClick={handleClickOpen}
                  >
                    Ver detalle
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {/* <Grid item xs={12} sm={8}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h2">
                      $1,234,095.00
                    </Typography>
                    <Typography color="textSecondary">
                      Saldo disponible
                    </Typography>
                  </Grid>
                  <Grid className={classes.cardright} item xs={12} md={6}>
                    <Typography variant="subtitle1">Débito</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tipo de cuenta
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button color="primary" size="small" onClick={handleClickOpen}>
                  Ver detalle
                </Button>
              </CardActions>
            </Card>
          </Grid> */}
        </Grid>
        <DialogAccount open={open} onClose={handleClose}></DialogAccount>
      </div>
    </>
  );
};
interface Props {
  open: boolean;
  onClose: () => void;
}
const DialogAccount: FC<Props> = ({ open, onClose }): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalle de la cuenta</DialogTitle>
        <DialogContent>
          <Card className={classes.cardAccount}>
            <CardContent>
              <Typography variant="subtitle2" color="textPrimary">
                Número de tarjeta
              </Typography>
              <Typography variant="h6" color="textPrimary">
                1234 1234 1234 1234
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                Vecha de vencimiento: <span>12/06</span>
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                CVV: <span>120</span>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                component="span"
              >
                Nombre del propietario:
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                component="span"
              >
                Victor Niño
              </Typography>
            </CardContent>
          </Card>
          <Box mt={2}>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Estado de cuenta
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Resumen adeudo
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
