import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { api } from "../api";
import {
  Account,
  Accounts,
  DebitAccount,
  CreditAccount,
} from "../types/Account";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      background: "transparent",
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
const Transactions: FC<{}> = () => {
  const initialState: Accounts = {
    debitAccounts: [],
    creditAccounts: [],
  };
  const initialStateTrans: Account[] = [];
  const [accounts, setAccounts] = React.useState<Accounts>(initialState);
  const [transactionsAccount, setTrasactionsAccount] =
    React.useState<Account[]>(initialStateTrans);

  const getAccountsReq = async () => {
    try {
      const { data } = await api.get<any>("/client/accounts");
      setAccounts(data.data);
      data.data.debitAccounts.forEach(
        (account: DebitAccount | CreditAccount) => {
          getTransactionsReq(account);
        }
      );
      data.data.creditAccounts.forEach(
        (account: DebitAccount | CreditAccount) => {
          getTransactionsReq(account);
        }
      );
    } catch (e) {
      setAccounts(initialState);
    }
  };
  const getTransactionsReq = async (account: DebitAccount | CreditAccount) => {
    try {
      const { data } = await api.get<any>(
        `/transactions/client/account/${account.account.id}/transactions`
      );
      if (data.data.length > 0) {
        account.account.transactions = data.data;
        const newList = transactionsAccount.concat(account.account);
        setTrasactionsAccount(newList);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const loadTransactions = () => {
    accounts.debitAccounts.forEach((account: DebitAccount | CreditAccount) => {
      getTransactionsReq(account);
    });
    accounts.creditAccounts.forEach((account: DebitAccount | CreditAccount) => {
      getTransactionsReq(account);
    });
  };

  React.useEffect(() => {
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
                Movimientos
              </Typography>
            </Paper>
          </Grid>
          {transactionsAccount.map((acc) => (
            <>
              {acc.transactions?.map((tran) => (
                <Grid item xs={8}>
                  <Card elevation={0}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs>
                          <Typography variant="subtitle2" color="textPrimary">
                            {tran.date}
                          </Typography>
                          <Typography variant="h6" color="textPrimary">
                            {tran.concept}
                          </Typography>
                          <Typography variant="subtitle2" color="textPrimary">
                            {tran.origin.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" color="textPrimary">
                            $ {tran.amount}
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            Cuenta
                          </Typography>
                          <Typography variant="subtitle1" color="textPrimary">
                            * {acc.number.slice(-4)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Transactions;
