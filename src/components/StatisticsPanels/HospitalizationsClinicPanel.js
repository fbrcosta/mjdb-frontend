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
import MetricBox from "components/StatisticsPanels/Common/MetricBox";
import HospitalizationBoxPlot from "components/StatisticsPanels/Hospitalizations/HospitalizationBoxPlot";


const useStyles = makeStyles((theme) => ({
  
}));


function HospitalizationsClinicPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // data hook
  const [data, setData] = React.useState({
    statistics: null,
    last_update: new Date()
  });
  // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.token
      };
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/hospitalizationsclinic')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              setData({
                statistics: response.data,
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
          <Col xs={12} sm={6}>
            <HospitalizationBoxPlot data={data.statistics} />
          </Col>
          <Col xs={12} sm={6}>
            <Container>
              <Row>
                <Col xs={12} sm={6}>
                  <MetricBox 
                    metric={t('HospitalizationsClinicPanel.average')} 
                    enabled={data.statistics !== null}
                    total={data.statistics ? data.statistics.general.average : null}
                    male={data.statistics ? data.statistics.male.average : null}
                    female={data.statistics ? data.statistics.female.average : null}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <MetricBox 
                    metric={t('HospitalizationsClinicPanel.median')} 
                    enabled={data.statistics !== null}
                    total={data.statistics ? data.statistics.general.median : null}
                    male={data.statistics ? data.statistics.male.median : null}
                    female={data.statistics ? data.statistics.female.median : null}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
          <MetricBox 
            metric={t('HospitalizationsClinicPanel.min')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.min : null}
            male={data.statistics ? data.statistics.male.min : null}
            female={data.statistics ? data.statistics.female.min : null}
            />
                </Col>
                <Col xs={12} sm={6}>
          <MetricBox 
            metric={t('HospitalizationsClinicPanel.max')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.max : null}
            male={data.statistics ? data.statistics.male.max : null}
            female={data.statistics ? data.statistics.female.max : null}
            />
                </Col>
              </Row>
            </Container>
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

export default connect(mapStateToProps)(HospitalizationsClinicPanel);
