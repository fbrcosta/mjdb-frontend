import React from "react";
// link to other page
import { useHistory } from 'react-router-dom';
// enable translations
import {useTranslation} from "react-i18next";
// connect redux
import { connect } from 'react-redux';
// use axios for requests
import axios from 'axios';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import MaterialTable from 'material-table';

// font awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faFemale } from "@fortawesome/free-solid-svg-icons";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { faLungs } from "@fortawesome/free-solid-svg-icons";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  table: {
    "fontSize": "14px",
    "padding": "8px",
    "text-align": "center"
  },
  "icon-start": {
    "font-size": "1.5em"
  },
  "icon": {
    "margin-left": '5px',
    "font-size": "1.5em"
  },
}));

const HospitalizationState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { clinic_duration, result } = props;
  // set vars
  const color = result === 0 ? "green" : "red";
  const icon = result === 0 ? faFileMedicalAlt : faSkull;
  const title = t("PatientsView.hs_result." + result);
  const unit = clinic_duration > 1 ? t("PatientsView.days") : t("PatientsView.day");
  // return content
  return (
    <div>
      {clinic_duration + " " + unit}
      <FontAwesomeIcon className={classes.icon} icon={icon} 
        style={{color:color}} title={title} />
    </div>
  );
}

const GenderKatzState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { gender, score, designation } = props;
  // set vars
  var color;
  const icon = gender === 'M' ? faMale : faFemale;
  const title = t("PatientsView.katz") + ": " + score + " - " + 
    t("PatientsView.katz_designation." + designation);
  switch (score) {
    case 0 : color = 'red'; break;
    case 1: case 2: color = 'orange'; break;
    case 3: case 4: color = 'yellow'; break;
    case 5: color = 'lime'; break;
    case 6: color = 'green'; break;
    default: color = 'gray'; break;
  }
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
        style={{color:color}} title={title} />
  );
}

const ComorbidityState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { score, survival } = props;
  // set vars
  const color = "rgb(calc(15*" + score + "), calc(255 - 15*" + score + "), 0)";
  const icon = faAsterisk;
  const title = t("PatientsView.cci") + ": " + score + "\n" + 
    t("PatientsView.cci_survival") + ": " + survival;
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
      style={{color:color}} title={title} />
  );
}

const AVCState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { avc } = props;
  // set vars
  const color = avc ? "red" : "gray"; 
  const icon = faBrain;
  const title = t("PatientsView.avc") + ": " + (avc ? t("yes") : t("no"));
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
      style={{color:color}} title={title} />
  );
}

const PneumoniaState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { pneumonia, score, result } = props;
  // set vars
  var color = 'gray';
  const icon = faLungs;
  var title = t("PatientsView.pneumonia") + ": " + (pneumonia ? t("yes") : t("no"));
  title += pneumonia ? ("\n" + t("PatientsView.pneumonia_score") + ": " + score + " - " + 
    t("PatientsView.pneumonia_designation." + result)) : "";
  switch (score) {
    case 0 : color = 'red'; break;
    case 1: case 2: color = 'orange'; break;
    case 3: case 4: color = 'yellow'; break;
    case 5: color = 'lime'; break;
    case 6: color = 'green'; break;
    default: color = "gray";
  }
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
      style={{color:color}} title={title} />
  );
}

const InfectionsState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { infections } = props;
  // set vars
  const color = infections ? "red" : "gray"; 
  const icon = faBiohazard;
  const title = t("PatientsView.infections") + ": " + (infections ? t("yes") : t("no"));
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
      style={{color:color}} title={title} />
  );
}

const CardiacInsufficiencyState = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // custom props
  const { cardiac_insufficiency } = props;
  // set vars
  const color = cardiac_insufficiency ? "red" : "gray"; 
  const icon = faHeartbeat;
  const title = t("PatientsView.cardiac_insufficiency") + ": " + (cardiac_insufficiency ? t("yes") : t("no"));
  // return content
  return (
    <FontAwesomeIcon className={classes.icon} icon={icon} 
      style={{color:color}} title={title} />
  );
}

const States = (props) => {
  // custom props
  const { 
    gender,
    autonomy_score,
    autonomy_designation,
    comorbidity_score,
    comorbidity_survival,
    avc,
    pneumonia,
    pneumonia_score,
    pneumonia_result,
    infections,
    cardiac_insufficiency
  } = props;
  // return content
  return (
    <div>
      <GenderKatzState gender={gender} score={autonomy_score} 
        designation={autonomy_designation}/>
      <ComorbidityState score={comorbidity_score} survival={comorbidity_survival}/>
      <AVCState avc={avc}/>
      <PneumoniaState pneumonia={pneumonia} score={pneumonia_score} 
        result={pneumonia_result}/>
      <InfectionsState infections={infections}/>
      <CardiacInsufficiencyState cardiac_insufficiency={cardiac_insufficiency}/>
    </div>
  );
}

const Actions = (props) => {
  const classes = useStyles();
  // return content
  return (
    <div>
      <FontAwesomeIcon className={classes.icon} icon={faEye} />
      <FontAwesomeIcon className={classes.icon} icon={faTrash} />
    </div>
  );
}

const PatientTableTab = (props) => {
  const classes = useStyles();
  const {t} = useTranslation('global');
  const { children, value, index, token, ...other } = props;
  const history = useHistory();

  // data hook
  const [data, setData] = React.useState([]);

  // hook for toast
  const [toast, setToast] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  // toast close
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({open: false});
  };

  // actions handlers - edit
  function handleEdit(e, row) {
    console.log("hello: "+row.id);
    history.push("/mjdb/patients/" + row.id);
  }
  // actions handlers - delete
  function handleDelete(e, row) {
    const r = window.confirm(t("PatientsView.delete_confirm")); 
    if (r == true)
    {
      const deleteData = async () => {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        };
        await axios.delete(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patient/' + row.id)
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              setToast({
                open: true,
                severity: "success",
                message: t('PatientsView.delete_success')
              });
              const fetchData = async () => {
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + token
                };
                var sufix = '';
                if (index !== 0) {
                  sufix = '/' + index;
                }
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patientlist' + sufix)
                  .then(response => {
                    if (response.status === 200) {
                      if (response.data.results) {
                        setData(response.data.results);
                      }
                    }
                  })
                  .catch(error => {
                    console.log("cenas: ", error);
                  });
              };
              fetchData();
            }
          })
          .catch(error => {
            setToast({
              open: true,
              severity: "error",
              message: t('PatientsView.delete_error')+": "+error
            });
          });
      };
      deleteData();
    }
  }

  // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      };
      var sufix = '';
      if (index !== 0) {
        sufix = '/' + index;
      }
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/patientlist' + sufix)
        .then(response => {
          if (response.status === 200) {
            if (response.data.results) {
              setData(response.data.results);
            }
          }
        })
        .catch(error => {
          console.log("cenas: ", error);
        });
    };
    fetchData();
  }, [props.token]);

  const tableColumns = [
    { 
      title: t('PatientsView.id'), 
      field: 'id', 
      width:'5%',
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      },
      grouping: false
    },
    {
      title: t('PatientsView.discharge_date'), 
      field: 'hospitalization.clinic_discharge', 
      width:'10%',
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      }
    },
    { 
      title: t('PatientsView.processid'), 
      field: 'processid', 
      width:'10%',
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      }
    },
    { 
      title: t('PatientsView.age'), 
      field: 'age', 
      width:'5%',
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      }
    },
    { 
      title: t('PatientsView.main_diagnostic'), 
      field: 'diagnostics.principal_diagnostic.diagnostic', 
      width:'45%',
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "left"
      }
    },
    { 
      title: t('PatientsView.hospitalization'), 
      width:'5%',
      field: 'hospitalization.clinic_duration',
      render: rowData => (
        <HospitalizationState 
          clinic_duration={rowData.hospitalization.clinic_duration}
          result={rowData.hospitalization.result}
        />
      ),
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      },
      grouping: false
    },
    { 
      title: t('PatientsView.states'), 
      width:'20%',
      render: rowData => (
        <States
          gender={rowData.gender}
          autonomy_score={rowData.autonomy.score}
          autonomy_designation={rowData.autonomy.designation}
          comorbidity_score={rowData.comorbidity.score}
          comorbidity_survival={rowData.comorbidity.survival}
          avc={rowData.has_avc}
          pneumonia={rowData.has_pneumonia}
          pneumonia_score={rowData.has_pneumonia ? rowData.pneumonia.score : ""}
          pneumonia_result={rowData.has_pneumonia ? rowData.pneumonia.result : ""}
          infections={rowData.has_infections}
          cardiac_insufficiency={rowData.has_cardiac_insufficiency}
        />
      ),
      cellStyle: {
        "fontSize": "14px",
        "padding": "8px",
        "text-align": "center"
      },
      grouping: false,
      sorting: false
    },
    // { 
    //   title: '', 
    //   width:'10%',
    //   render: rowData => (
    //     <Actions />
    //   ),
    //   cellStyle: {
    //     "fontSize": "14px",
    //     "padding": "8px",
    //     "text-align": "center"
    //   },
    //   grouping: false,
    //   sorting: false
    // }
  ];

  return (
    <Box 
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
      {value === index && (
        <Box>
          <MaterialTable
            className={classes.table}
            title=""
            columns={tableColumns}
            data={data}
            options={{
              sorting: true,
              exportButton: true,
              actionsColumnIndex: -1,
              pageSize:10,
              pageSizeOptions:[10,20,50]
            }}
            actions={[
              {
                icon: 'edit',
                tooltip: t("PatientsView.edit"),
                onClick: handleEdit
              },
              {
                icon: 'delete',
                tooltip: t("PatientsView.delete"),
                onClick: handleDelete
              }
            ]}
          />
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function PatientView(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // hook for tab
  const [activeTab, setActiveTab] = React.useState(0);
  // handlers for tabs change
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  const handleTabChangeIndex = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={t("PatientsView.all")} {...a11yProps(0)} />
          <Tab label={t("PatientsView.year1")} {...a11yProps(1)} />
          <Tab label={t("PatientsView.year2")} {...a11yProps(2)} />
          <Tab label={t("PatientsView.year3")} {...a11yProps(3)} />
          <Tab label={t("PatientsView.year4")} {...a11yProps(4)} />
          <Tab label={t("PatientsView.year5")} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
        <PatientTableTab value={activeTab} index={0} dir='x' token={props.token} />
        <PatientTableTab value={activeTab} index={1} dir='x' token={props.token} />
        <PatientTableTab value={activeTab} index={2} dir='x' token={props.token} />
        <PatientTableTab value={activeTab} index={3} dir='x' token={props.token} />
        <PatientTableTab value={activeTab} index={4} dir='x' token={props.token} />
        <PatientTableTab value={activeTab} index={5} dir='x' token={props.token} />
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(PatientView);
