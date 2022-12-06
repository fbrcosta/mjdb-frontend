import React from "react";
// id from link
import { useParams } from "react-router-dom";
// connect redux
import { connect } from 'react-redux';
// use axios for requests
import axios from 'axios';
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

const parseResult = (data) => {
  var result = data;
  if (result.hospitalization.social === false){
    result.hospitalization.real_discharge = default_patient_data.hospitalization.real_discharge;
  }
  if (result.hospitalization.previous_hospitalization === false){
    result.hospitalization.cause = default_patient_data.hospitalization.real_discharge;
  }
  if (result.has_avc === false){
    result.avc = default_patient_data.avc;
  }
  if (result.has_pneumonia === false){
    result.pneumonia = default_patient_data.pneumonia;
  }
  if (result.has_infections === false){
    result.infections = default_patient_data.infections;
  } else if (result.has_infections === true){
    if (result.infections.agent_isolation === false) {
      result.infections.agent = default_patient_data.infections.agent;
      result.infections.local = default_patient_data.infections.local;
    }
    if (result.infections.change_antibiotic === false) {
      result.infections.antibiotics = default_patient_data.infections.antibiotics;
    }
    if (result.infections.more_infections === false) {
      result.infections.infection_count = default_patient_data.infections.infection_count;
      result.infections.infections = default_patient_data.infections.infections;
    }
  }
  if (result.has_complications === false){
    result.complications = default_patient_data.complications;
  }
  if (result.has_cardiac_insufficiency === false){
    result.cardiac_insufficiency = default_patient_data.cardiac_insufficiency;
  } else if (result.has_cardiac_insufficiency === true){
    if (result.cardiac_insufficiency.acute === false) {
      result.cardiac_insufficiency.motive = default_patient_data.cardiac_insufficiency.motive;
    }
  }
  if (result.has_vni === false){
    result.vni = default_patient_data.vni;
  }
  return result;
}

function ViewPatientView(props) {
  const classes = useStyles();
  const { token } = props;

  let { id } = useParams();

  // data hook
  const [data, setData] = React.useState(null);

   // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      };
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patient/' + id)
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              console.log(response.data);
              setData(parseResult(response.data));
            }
          }
        })
        .catch(error => {
          console.log("cenas: ", error);
        });
      //setData(sample_data);
    };
    fetchData();
  }, [props.token]);

  if (data !== null){
    return (
      <PatientForm 
        className={classes.root} 
        method="view" 
        patientInfo={data} 
        patientid={id}
      />
    );
  } else {
    return ("Loading");
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(ViewPatientView);
