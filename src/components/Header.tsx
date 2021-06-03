import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const drawerWidth = 240;
const headersData = [
  {
    label: "Inicio",
    href: "/inicio",
  },
  {
    label: "Servicios",
    href: "/AcercaDeNosotros",
  },
  {
    label: "Acerca De Nosotros",
    href: "/AcercaDeNosotros",
  },
  {
    label: "Buscar",
    href: "/Buscar",
  },
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: "8px",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    title: {
      fontSize: 20,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    header: {
      backgroundColor: "#400CCC",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    drawerContainer: {
      padding: "20px 30px",
    },
  })
);

function Header() {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  const classes = useStyles();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <div>
          <p className={classes.title}>LisBank</p>
        </div>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <p className={classes.title}>LisBank</p>
      </Toolbar>
    );
  };
  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  return (
    <header>
      <AppBar position="sticky">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}

export default Header;
