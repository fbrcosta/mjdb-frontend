import React from "react";
// enable translations
import {useTranslation} from "react-i18next";
// connect redux
import { connect } from 'react-redux';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// @material-ui/icons
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// variables
import statisticsSteps from '../variables/statisticsSteps';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  tabmanager: {
    "overflow-x": 'hidden',
    width: '100%',
    "flex-shrink": 0,
  }
}));

function TabPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  const { value, index, ...other } = props;

  // hook for stepper and component
  const [activeStep, setActiveStep] = React.useState({
    index: 0,
    element: statisticsSteps[0]
  });
  // handlers for stepper buttons
  const handleNext = () => {
    setActiveStep((currentStep) => ({
      index: currentStep.index + 1,
      element: statisticsSteps[currentStep.index + 1]
    }));
  };
  const handleBack = () => {
    setActiveStep((currentStep) => ({
      index: currentStep.index - 1,
      element: statisticsSteps[currentStep.index - 1]
    }));
  };

  return (
    <Box 
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <MobileStepper
            variant="text"
            steps={statisticsSteps.length}
            position="static"
            activeStep={activeStep.index}
            className={classes.stepper}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep.index === statisticsSteps.length-1}>
                {t('StatisticsPanel.next')}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep.index === 0}>
                <KeyboardArrowLeft />
                {t('StatisticsPanel.prev')}
              </Button>
            }
          />
          <Paper square elevation={0} className={classes.header}>
            <Typography>{t(activeStep.element.name)}</Typography>
          </Paper>
          <activeStep.element.component year={index}/>
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

function StatisticPanel(props) {
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
          <Tab label={t("StatisticsPanel.all")} {...a11yProps(0)} />
          <Tab label={t("StatisticsPanel.year1")} {...a11yProps(1)} />
          <Tab label={t("StatisticsPanel.year2")} {...a11yProps(2)} />
          <Tab label={t("StatisticsPanel.year3")} {...a11yProps(3)} />
          <Tab label={t("StatisticsPanel.year4")} {...a11yProps(4)} />
          <Tab label={t("StatisticsPanel.year5")} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
        <TabPanel value={activeTab} index={0} dir='x' />
        <TabPanel value={activeTab} index={1} dir='x' />
        <TabPanel value={activeTab} index={2} dir='x' />
        <TabPanel value={activeTab} index={3} dir='x' />
        <TabPanel value={activeTab} index={4} dir='x' />
        <TabPanel value={activeTab} index={5} dir='x' />
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(StatisticPanel);
