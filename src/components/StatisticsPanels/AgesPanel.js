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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// custom
import AgeDistribution from "components/StatisticsPanels/Ages/AgeDistribution";
import AgeBoxPlot from "components/StatisticsPanels/Ages/AgeBoxPlot";
import MetricBox from "components/StatisticsPanels/Common/MetricBox";

const useStyles = makeStyles((theme) => ({
  
}));


function AgesPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  const { year } = props;

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
      var sufix = '';
      if (year !== 0) {
        sufix = '/' + year;
      }
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/ages' + sufix)
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
      <GridContainer spacing={2}>

        <GridItem xs={12} sm={6} md={3}>
          <MetricBox 
            metric={t('AgesPanel.average')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.average : null}
            male={data.statistics ? data.statistics.male.average : null}
            female={data.statistics ? data.statistics.female.average : null}
            />
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <MetricBox 
            metric={t('AgesPanel.median')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.median : null}
            male={data.statistics ? data.statistics.male.median : null}
            female={data.statistics ? data.statistics.female.median : null}
            />
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <MetricBox 
            metric={t('AgesPanel.min')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.min : null}
            male={data.statistics ? data.statistics.male.min : null}
            female={data.statistics ? data.statistics.female.min : null}
            />
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <MetricBox 
            metric={t('AgesPanel.max')} 
            enabled={data.statistics !== null}
            total={data.statistics ? data.statistics.general.max : null}
            male={data.statistics ? data.statistics.male.max : null}
            female={data.statistics ? data.statistics.female.max : null}
            />
        </GridItem>

      </GridContainer>

      <GridContainer spacing={2}>

        <GridItem xs={12} sm={6} md={6}>
          <AgeDistribution data={data.statistics} />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <AgeBoxPlot data={data.statistics} />
        </GridItem>

      </GridContainer>

    </Box>
  );
} 

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(AgesPanel);
