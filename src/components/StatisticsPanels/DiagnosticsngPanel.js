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
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// custom
import CustomTable from "components/StatisticsPanels/Common/CustomTable";

const useStyles = makeStyles((theme) => ({
  
}));

const convert = (t, data) => {
  var arr = [];
  for (var key in data) {
    arr.push({
      group: t("DiagnosticsngPanel."+key), 
      principal: data[key]['principal'], 
      secundary: data[key]['secundary'], 
      total: data[key]['total']
    });
  }
  return arr;
}

function DiagnosticsngPanel(props) {
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
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/diagnosticsng')
        .then(response => {
          if (response.status === 200) {
            if (response.data) {
              setData({
                statistics: convert(t, response.data),
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

  const header = [
    {title: t("DiagnosticsngPanel.group"), field: 'group'},
    {title: t("DiagnosticsngPanel.principal"), field: 'principal', type: 'numeric'},
    {title: t("DiagnosticsngPanel.secundary"), field: 'secundary', type: 'numeric'},
    {title: t("DiagnosticsngPanel.total"),field: 'total', type: 'numeric'},
  ];

  return (
    <Box className={classes.root}>
      <GridContainer spacing={2}>

        <GridItem xs={12}>
          <CustomTable 
            title={t("DiagnosticsngPanel.title")}
            header={header}
            data={data.statistics}
          />
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

export default connect(mapStateToProps)(DiagnosticsngPanel);
