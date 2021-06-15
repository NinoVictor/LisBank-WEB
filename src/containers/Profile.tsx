import React, { FC, useContext, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    paperInfo:{
      textAlign: "left",
      color: theme.palette.text.primary,
    },
    title: {
      color: theme.palette.text.primary,
    },
    avatar: {
      margin: theme.spacing(1),
      width: "120px",
      height: "120px",
      textAlign: "center",
    },
  })
);

const Profile: FC<{}> = () => {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  
  
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.title} variant="h4">
                Tu Perfil
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                <AccountCircleIcon
                  className={classes.avatar}
                ></AccountCircleIcon>
              </Grid>
              <Grid item xs={12} className={classes.avatar} component="h2">
                Datos Personales
              </Grid>
            </Grid>

            <Grid container direction="row-reverse" justify="space-around" alignItems="center">
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperInfo} variant="h6">
                    Teléfono
                  </Typography>
                  <Typography className={classes.paperInfo} variant="body1">
                  {user?.phoneNumber}
                  </Typography>
                </Paper>
              </Grid>
           
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperInfo} variant="h6" >
                    Nombre
                  </Typography>
                  <Typography className={classes.paperInfo} variant="body1">
                    {user?.name}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row-reverse" justify="space-around" alignItems="center">
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperInfo} variant="h6">
                    Correo electrónico
                  </Typography>
                  <Typography className={classes.paperInfo} variant="body1">
                    {user?.email}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperInfo} variant="h6" >
                    Dirección
                  </Typography>
                  <Typography className={classes.paperInfo} variant="body1">
                    {user?.address}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
