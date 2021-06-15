import React, { FC, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
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
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalle de la cuenta</DialogTitle>
        <DialogContent>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="subtitle1" color="textPrimary">
                CLABE: <span> {account.clabe} </span>
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                Número de cuenta: <span> {account.number} </span>
              </Typography>
            </CardContent>
            <CardContent className={classes.cardAccount}>
              <Typography variant="subtitle2" color="textPrimary">
                Número de tarjeta
              </Typography>
              <Typography variant="h6" color="textPrimary">
                {account.card.number}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                Vecha de vencimiento: <span> {account.card.dueDate} </span>
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                CVV: <span> {account.card.cvv} </span>
              </Typography>
            </CardContent>
          </Card>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
            >
              Estado de cuenta
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
            >
              Resumen adeudo
            </Button>
            <Typography>Últimos movimientos </Typography>
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
          </CardActions>
          <CardActions></CardActions>
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
