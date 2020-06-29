import React, { useEffect } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
// import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./drawer.css";
import imgDoctor from "../../Images/Doctor.svg";
import imgHospital from "../../Images/Hospital.svg";
import imgLaboratoy from "../../Images/Laboratory.svg";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Route } from "react-router-dom";
import DoctorChart from "../Charts/doctorsChart";
import HospitalChart from "../Charts/hospitalChart";
import PatientChart from "../Charts/patientChart";

const drawerWidth = 200;
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "15%",
  }),
};
let options = [];
let years = [];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 4,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: "relative",
    border: "1px solid black",
    borderRadius: 30,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "40%",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function MiniDrawer({ doctorIDs, yearDates }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open] = React.useState(false);
  const [title, setTitle] = React.useState("Hospital Data");
  const [showSelect, setShowSelect] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("none");
  const [selectValue, setSelectValue] = React.useState(null);

  useEffect(() => {
    options = [];
    years = [];
    doctorIDs.forEach((element) => {
      options.push({ value: element, label: element });
    });

    yearDates.forEach((element) => {
      years.push({ value: element, label: element });
    });

    console.log(options);
  }, [doctorIDs, yearDates]);

  const handleHospitalTitle = () => {
    setTitle("Hospital Data");
    setShowSelect(false);
  };
  const handleDoctorTitle = () => {
    setTitle("Doctors Data");
    setShowSelect(true);
    setPlaceholder("Select Doctor ID");
  };
  const handlePatientsTitle = () => {
    setTitle("Patients Data");
    setShowSelect(true);
    setPlaceholder("Select Patient ID");
  };

  const handleChange = (handle) => {
    setSelectValue(handle.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color=""
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginTop: "1vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ margin: "0px", fontSize: "200%" }}>{title}</p>

              {showSelect && (
                <Select
                  styles={customStyles}
                  placeholder="Select Year"
                  onChange={handleChange}
                  options={years}
                />
              )}
              {showSelect && (
                <Select
                  styles={customStyles}
                  placeholder={placeholder}
                  onChange={handleChange}
                  options={options}
                />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/hospitalChart">
            <ListItem button onClick={handleHospitalTitle}>
              <ListItemIcon>
                <img
                  className="SearchImage"
                  src={imgHospital}
                  alt="imageNotFound"
                ></img>
              </ListItemIcon>

              <ListItemText primary="Hospital" style={{ marginLeft: "10px" }} />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/doctorChart">
            <ListItem button onClick={handleDoctorTitle}>
              <ListItemIcon>
                <img
                  className="SearchImage"
                  src={imgDoctor}
                  alt="imageNotFound"
                ></img>
              </ListItemIcon>

              <ListItemText primary="Doctors" style={{ marginLeft: "10px" }} />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/PatientChart">
            <ListItem button onClick={handlePatientsTitle}>
              <ListItemIcon>
                <img
                  className="SearchImage"
                  src={imgLaboratoy}
                  alt="imageNotFound"
                ></img>
              </ListItemIcon>
              <ListItemText primary="Patients" style={{ marginLeft: "10px" }} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={classes.content}
        style={{ marginTop: "60px", background: "#efffff" }}
      >
        <Route path="/" exact component={HospitalChart} />
        <Route path="/hospitalChart" exact component={HospitalChart} />
        <Route path="/doctorChart" exact>
          <DoctorChart selectedYear={selectValue} />
        </Route>
        <Route path="/PatientChart" exact>
          <PatientChart selectedYear={selectValue} />
        </Route>
      </main>
    </div>
  );
}
