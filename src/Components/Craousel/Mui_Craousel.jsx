import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Services",
    data: [
      "X-Ray/radiology",
      "General and Specialty Surgical",
      "Short-term Hospitalization",
      "Physical Therapy and Rehabilitation"
    ]
  },
  {
    label: "Tending Doctors",
    data: [
      "Dr. Zafar Iqbal",
      "Dr. Syed Hamid Ali Nasr",
      "Dr. Nadia Aman",
      "Dr. M. Nasir Ayub Khan"
    ]
  },
  {
    label: "Trending serices",
    data: [
      "Mental Health and Drug Treatment",
      "Dental Care",
      "X-Ray/radiology",
      "Physical Therapy and Rehabilitation"
    ]
  },
  {
    label: "Active Doctors",
    data: [
      "Brig (R). Muhammad Zameer Rajput",
      "Dr. M. Nasir Ayub Khan",
      "Dr. Saad Ahmad Naveed",
      "Dr. Naheed fatima"
    ]
  },
  {
    label: "Active Patients ",
    data: [
      "Shayan Shahid Ansari",
      "Mohammad Amin",
      "Muhammad Ashraf",
      "Mohammad Zafar Rabbani"
    ]
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 170,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label} style={{ padding: "5px 30px" }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className={classes.img}>
                {step.data.map((item, index) => (
                  <h4 key={index}>
                    {index + 1 + ".   "}
                    {item}
                  </h4>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
