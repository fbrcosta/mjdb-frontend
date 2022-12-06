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
import SocialsSemiCirclePlot from "components/StatisticsPanels/Socials/SocialsSemiCirclePlot";
import SimpleMetricBox from "components/StatisticsPanels/Common/SimpleMetricBox";

const useStyles = makeStyles((theme) => ({
  
}));


function SocialsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // data hook
  const [data, setData] = React.useState({
    patients: null,
    socials: null,
    real_duration: null,
    social_duration: null,
    min: null,
    max: null,
    avg: null,
    last_update: new Date()
  });
  // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.token
      };
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/socials')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              setData({
                patients: response.data.patients,
                socials: response.data.socials,
                real_duration: response.data.real_duration,
                social_duration: response.data.social_duration,
                min: response.data.min,
                max: response.data.max,
                avg: response.data.average,
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
            <SimpleMetricBox 
              metric={t('SocialsPanel.min')} 
              enabled={data.min !== null}
              total={data.min ? data.min : null}
              unit={t('SocialsPanel.unit')} 
            />
          </Col>

          <Col xs={12} sm={4}>
            <SimpleMetricBox 
              metric={t('SocialsPanel.max')} 
              enabled={data.max !== null}
              total={data.max ? data.max : null}
              unit={t('SocialsPanel.unit')} 
            />
          </Col>

          <Col xs={12} sm={4}>
            <SimpleMetricBox 
              metric={t('SocialsPanel.average')} 
              enabled={data.avg !== null}
              total={data.avg ? data.avg : null}
              unit={t('SocialsPanel.unit')} 
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <SocialsSemiCirclePlot 
              total={data.patients}
              title={t("SocialsPanel.patients_chart")}
              name={t("SocialsPanel.patients")}
              data={data.socials} />
          </Col>

          <Col xs={12} sm={6}>
            <SocialsSemiCirclePlot 
              total={data.real_duration}
              title={t("SocialsPanel.durations_chart")}
              name={t("SocialsPanel.duration")}
              data={data.social_duration} />
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

export default connect(mapStateToProps)(SocialsPanel);
