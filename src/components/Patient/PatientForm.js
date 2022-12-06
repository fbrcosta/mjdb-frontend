import React from "react";
// enable translations
import {useTranslation} from "react-i18next";
// use axios for requests
import axios from 'axios';
// connect redux
import { connect } from 'react-redux';
// use redirect for redirection
import { Redirect } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// @material-ui/icons
import ErrorIcon from '@material-ui/icons/Error';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// variables
import patientFormSteps from './PatientFormSteps';
import validateData from './PatientFormValidators';

//import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  stepper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  mobileStepper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  stepperButtonErrored: {
    color: "#f44336",
  },
  stepperButtonActive: {
    color: "#f44336",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  panel: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

function PatientForm(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // --- hooks ------------------------------------------------------------------------------------

  // extract props
  const { method, patientInfo, patientid } = props;
  // hook for edditable form, extracted from method
  // - create: all fields are enabled, buttons is submit
  // - view: all fields are disabled, buttons is edit
  // - view (editable): all fields are enabled, button is save
  const [edditable, setEdditable] = React.useState(method === "create");
  // init form hooks
  var [formData, setFormValues] = React.useState(patientInfo);
  // hook for stepper and component
  const [activeStep, setActiveStep] = React.useState({
    index: 0,
    element: patientFormSteps[0]
  });
  // hook for completed steps
  const [completed, setCompleted] = React.useState(new Set());
  // hook for errored steps
  const [errored, setErrored] = React.useState(new Set());
  // hook for redirect
  const [redirect, setRedirect] = React.useState(false);
  // hook for toast
  const [toast, setToast] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  // --- helpers ----------------------------------------------------------------------------------

  const validateStep = () => {
    const validation = validateData(formData, activeStep.index);
    if (validation.isValid) {
      // delete from errored if there
      if (errored.has(activeStep.index)) {
        errored.delete(activeStep.index);
      }
      // add to completed
      completed.add(activeStep.index);
      setCompleted(completed);
    } else {
      // delete from completed if there
      if (completed.has(activeStep.index)) {
        completed.delete(activeStep.index);
      }
      // add to completed
      errored.add(activeStep.index);
      setErrored(errored);
    }
  }

  // --- handlers ---------------------------------------------------------------------------------

  // stepper custom step
  const handleStep = (step) => () => {
    validateStep();
    setActiveStep({
      index: step,
      element: patientFormSteps[step]
    });
  };

  // stepper next
  const handleNext = () => {
    validateStep();
    setActiveStep((currentStep) => ({
      index: currentStep.index + 1,
      element: patientFormSteps[currentStep.index + 1]
    }));
  };

  // stepper prev
  const handleBack = () => {
    validateStep();
    setActiveStep((currentStep) => ({
      index: currentStep.index - 1,
      element: patientFormSteps[currentStep.index - 1]
    }));
  };

  // toast close
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({open: false});
  };


  // handle create
  const handleCreatePatient = () => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + props.token
    };
    // TODO: cleanup data
    axios.post(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patientcreate', formData)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setToast({
            open: true,
            severity: "success",
            message: t('PatientForm.add_success')
          });
          setRedirect(true);
        }
      })
      .catch(error => {
        console.log("cenas: ", error);
        setToast({
          open: true,
          severity: "error",
          message: t('PatientForm.add_error')+": "+error
        });
      });
  }

  // handle edit
  const handleEditPatient = () => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + props.token
    };
    // TODO: cleanup data
    axios.patch(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patient/' + patientid, formData)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setToast({
            open: true,
            severity: "success",
            message: t('PatientForm.edit_success')
          });
          setRedirect(true);
        }
      })
      .catch(error => {
        console.log("cenas: ", error);
        setToast({
          open: true,
          severity: "error",
          message: t('PatientForm.edit_error')+": "+error
        });
      });
  }

  // submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    var validation = validateData(formData, -1);
    // inform about errors and ok
    const newErrored = new Set();
    const newCompleted = new Set();
    for (var step in validation.steps) {
      if (validation.steps[step]) {
        newCompleted.add(parseInt(step));
      } else {
        newErrored.add(parseInt(step));
      }
    }
    setErrored(newErrored);
    setCompleted(newCompleted);
    // send data to backend
    if (validation.isValid) {
      if (patientid) {
        handleEditPatient();
      } else {
        handleCreatePatient();
      }
    } else {
      setToast({
        open: true,
        severity: "error",
        message: t('PatientForm.add_incomplete')
      });
    }
  };

  // edit button
  const handleEdit = (event) => {
    setEdditable(true);
  }

  // cancel button
  const handleCancel = (event) => {
    const r = window.confirm(t("PatientForm.cancel_confirm")); 
    if (r == true)
    {
      setEdditable(false);
      setFormValues(patientInfo);
    }
  }

  // block of code full copied from react-hooks-helper
  const getChildData = (obj, key) => obj[key];
  const cloneDeepLimited = obj => JSON.parse(JSON.stringify(obj));

  // block of code full copied from react-hooks-helper
  // keep the same function to set Form
  const setForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    const type = event.target.type;
    const isCheckbox = type === 'checkbox';

    setFormValues((data) => {
      const dataClone = cloneDeepLimited(data);
      const keys = name.split('.'); // 'a.b.c' => ['a', 'b', 'c'] | 'a' => ['a']
      const nestedSegments = keys.slice(0, -1); // ['a', 'b'] | []
      const [finalSegment] = keys.slice(-1); // 'c' | 'a'
      const finalData = nestedSegments.reduce(getChildData, dataClone);
      finalData[finalSegment] = isCheckbox ? checked : value;
      return dataClone;
    });
  }

  // --- dom --------------------------------------------------------------------------------------

  if (redirect) {
    return (<Redirect to='/mjdb/patients' />);
  } 

  return (
    <Box className={classes.root}>
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} noValidate>

        {/* stepper for step status */}
        <Stepper nonLinear className={classes.stepper} activeStep={activeStep.index}>
          {
            patientFormSteps.map((step, index) => {
              const stepperButtonProps = {};
              if (activeStep.index === index) {
                stepperButtonProps.className = classes.stepperButtonActive;
              } else if (errored.has(index)) {
                stepperButtonProps.icon = <ErrorIcon/>;
                stepperButtonProps.className = classes.stepperButtonErrored;
              }
              return (
                <Step key={step.name}>
                  <StepButton 
                    onClick={handleStep(index)} 
                    completed={activeStep.index !== index && completed.has(index)}
                    {...stepperButtonProps}
                  />
                </Step>
              );
            })
          }
        </Stepper>

        {/* stepper for step content */}
        <Box>
          <MobileStepper
            variant="text"
            steps={patientFormSteps.length}
            position="static"
            activeStep={activeStep.index}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep.index === patientFormSteps.length-1}>
                {t('PatientForm.next')}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep.index === 0}>
                <KeyboardArrowLeft />
                {t('PatientForm.back')}
              </Button>
            }
          />
          <Paper square elevation={0} className={classes.header}>
            <Typography>{t(activeStep.element.name)}</Typography>
          </Paper>
          <Paper square elevation={0} className={classes.panel}>
            <activeStep.element.component 
              formData={formData} 
              setForm={setForm} 
              edditable={edditable} 
            />
          </Paper>
        </Box>

        {
          method === "create" && 
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            {t('PatientForm.submit')}
          </Button>
        }

        {
          method === "view" && !edditable &&
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleEdit}
          >
            {t('PatientForm.edit')}
          </Button>
        }

        {
          method === "view" && edditable === true && 
          <Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              {t('PatientForm.save')}
            </Button>

            <Button
              variant="contained"
              color="secundary"
              className={classes.button}
              onClick={handleCancel}
            >
              {t('PatientForm.cancel')}
            </Button>
          </Box>
        }
      </form>
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(PatientForm);
