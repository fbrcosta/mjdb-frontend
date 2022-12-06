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
import GenderPiePlot from "components/StatisticsPanels/Genders/GenderPiePlot";
import GenderBarPlot from "components/StatisticsPanels/Genders/GenderBarPlot";


const useStyles = makeStyles((theme) => ({

}));


function GendersPanel(props) {
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
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/genders')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              console.log(response.data);
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

        <GridItem xs={12} sm={6} md={6}>
          <GenderPiePlot data={data.statistics} />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <GenderBarPlot data={data.statistics} />
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

export default connect(mapStateToProps)(GendersPanel);
