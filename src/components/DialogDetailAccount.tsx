import React, { FC, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { Account } from "../types/Account";
import { Transactions } from "../types/Transactions";
import { api } from "../api";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: "15px",
      margin: "10px 0px 10px 0px",
      backgroundColor: "hsl(210,50%,80%)",
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
      margin: "10px",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

interface Props {
  account: Account;
}

const DialogDetailAccount: FC<Props> = ({ account }) => {
  const initialState: Transactions = {
    data: [],
  };
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [transactions, setTransactions] =
    React.useState<Transactions>(initialState);

  const getTransactionsReq = async () => {
    try {
      const { data } = await api.get<any>(
        `/transactions/client/account/${account.id}/transactions`
      );
      setTransactions(data);
    } catch (e) {
      setTransactions(initialState);
    }
  };

  useEffect(() => {
    getTransactionsReq();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Ver detalle
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth="sm">
        <DialogTitle>Detalle de la cuenta</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                CLABE
                <Typography variant="subtitle1" color="textPrimary">
                  {account.clabe}
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Número de cuenta
                <Typography variant="subtitle1" color="textPrimary">
                  {account.number}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Número de tarjeta
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      {account.card.number}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle2" color="textSecondary">
                      Fecha:
                      <Typography
                        variant="subtitle1"
                        component="span"
                        color="textPrimary"
                      >
                        {account.card.dueDate}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" color="textSecondary">
                      CVV:
                      <Typography
                        variant="subtitle1"
                        component="span"
                        color="textPrimary"
                      >
                        {account.card.cvv}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

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
            <Grid item xs>
              <Box display="flex">
                <Typography variant="h6" color="textPrimary">
                  Últimos movimientos
                </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {transactions.data?.map((tran) => (
                <div key={tran.id}>
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
                    </Grid>
                  </Grid>
                  <Divider light />
                </div>
              ))}
            </CardContent>
          </Collapse>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogDetailAccount;
