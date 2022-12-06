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

const convert = (data) => {
  var arr = [];
  for (var key in data) {
    arr.push({
      code: key, 
      name: data[key]['name'], 
      principal: data[key]['principal'], 
      secundary: data[key]['secundary'], 
      total: data[key]['total']
    });
  }
  return arr;
}

function DiagnosticsicdPanelXXII(props) {
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
      await axios.get(process.env.REACT_APP_BACKEND_URL + '/mjdb/api/v1/statistics/diagnosticsicd/xxii')
        .then(response => {
          console.log("cenas");
          if (response.status === 200) {
            if (response.data) {
              setData({
                statistics: convert(response.data),
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
    {title: t("DiagnosticsicdPanel.code"), field: 'code'},
    {title: t("DiagnosticsicdPanel.name"), field: 'name'},
    {title: t("DiagnosticsicdPanel.principal"), field: 'principal', type: 'numeric'},
    {title: t("DiagnosticsicdPanel.secundary"), field: 'secundary', type: 'numeric'},
    {title: t("DiagnosticsicdPanel.total"),field: 'total', type: 'numeric'},
  ];

  return (
    <Box className={classes.root}>
      <GridContainer spacing={2}>

        <GridItem xs={12}>
          <CustomTable 
            title={t("DiagnosticsicdPanel.titlexxii")}
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

export default connect(mapStateToProps)(DiagnosticsicdPanelXXII);
