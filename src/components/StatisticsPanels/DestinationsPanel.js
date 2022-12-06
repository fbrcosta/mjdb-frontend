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
import DestinationsPiePlot from "components/StatisticsPanels/Destinations/DestinationsPiePlot";
import DestinationsBarPlot from "components/StatisticsPanels/Destinations/DestinationsBarPlot";
import DestinationsSemiCirclePlot from "components/StatisticsPanels/Destinations/DestinationsSemiCirclePlot";

const useStyles = makeStyles((theme) => ({

}));


function DestinationsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // data hook
  const [data, setData] = React.useState({
    total: null,
    discharges: null,
    destinations: null,
    last_update: new Date()
  });
  // data fetch
  React.useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.token
      };
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/destinations')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              console.log(response.data);
              setData({
                total: response.data.patients,
                discharges: response.data.discharges,
                destinations: response.data.destinations,
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
            <DestinationsSemiCirclePlot 
              total={data.total}
              title={t("DestinationsPanel.patients_chart")}
              data={data.discharges} />
          </Col>

          <Col xs={12} sm={4}>
            <DestinationsPiePlot data={data.destinations} />
          </Col>

          <Col xs={12} sm={4}>
            <DestinationsBarPlot data={data.destinations} />
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

export default connect(mapStateToProps)(DestinationsPanel);
