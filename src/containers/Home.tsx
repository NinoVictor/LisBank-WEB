import React, { FC, ReactElement, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogDetailAccount from "../components/DialogDetailAccount";

import { api } from "../api";
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
      const { data } = await api.get<any>("/client/accounts");
      setAccounts(data.data);
    } catch (e) {
      setAccounts(initialState);
    }
  };

  useEffect(() => {
    getAccountsReq();
  }, []);

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
            <Grid item xs={12} sm={8} key={debit.id}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" component="h2">
                        $ {debit.account.availableBalance}
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
                  <DialogDetailAccount account={debit.account} />
                </CardActions>
              </Card>
            </Grid>
          ))}
          {accounts.creditAccounts.map((credit) => (
            <Grid item xs={12} sm={8} key={credit.id}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" component="h2">
                        $ {credit.account.availableBalance}
                      </Typography>
                      <Typography color="textSecondary">
                        Saldo disponible
                      </Typography>
                    </Grid>
                    <Grid className={classes.cardright} item xs={12} md={6}>
                      <Typography variant="subtitle1">Crédito</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Tipo de cuenta
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <DialogDetailAccount account={credit.account} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
