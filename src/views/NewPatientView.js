import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// custom components
import PatientForm from '../components/Patient/PatientForm';
// variables
import default_patient_data from '../variables/defaultPatientData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

function CreatePatientView(props) {
  const classes = useStyles();

  return (
    <PatientForm 
      className={classes.root} 
      method="create" 
      patientInfo={default_patient_data} 
      patientid={null}
    />
  );
}

export default CreatePatientView;
