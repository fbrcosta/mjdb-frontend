import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// connect redux
import { connect } from 'react-redux';
// use axios for requests
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Container } from 'react-grid-system';
import { Row } from 'react-grid-system';
import { Col } from 'react-grid-system';
// custom
import RehospitalizationSemiCirclePlot from "components/StatisticsPanels/Rehospitalizations/RehospitalizationSemiCirclePlot";

const useStyles = makeStyles((theme) => ({
  
}));


function RehospitalizationsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // data hook
  const [data, setData] = React.useState({
    general: null,
    male: null,
    female: null,
    last_update: new Date()
  });
  // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.token
      };
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/rehospitalizations')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              setData({
                general: response.data.general,
                male: response.data.male,
                female: response.data.female,
                last_update: new Date()
              });
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

  return (
    <Box className={classes.root}>
      <Container>

        <Row>
          <Col xs={12} sm={4}>
            <RehospitalizationSemiCirclePlot 
              data={data.general}
              title={t("RehospitalizationsPanel.general")}
              name={t("RehospitalizationsPanel.patients_rehospitalized")}
              color='black' />
          </Col>

          <Col xs={12} sm={4}>
            <RehospitalizationSemiCirclePlot 
              data={data.male}
              title={t("RehospitalizationsPanel.male")}
              name={t("RehospitalizationsPanel.patients_rehospitalized")}
              color='lightblue' />
          </Col>

          <Col xs={12} sm={4}>
            <RehospitalizationSemiCirclePlot 
              data={data.female}
              title={t("RehospitalizationsPanel.female")}
              name={t("RehospitalizationsPanel.patients_rehospitalized")}
              color='pink' />
          </Col>
        </Row>

      </Container>
    </Box>
  );
} 

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(RehospitalizationsPanel);
