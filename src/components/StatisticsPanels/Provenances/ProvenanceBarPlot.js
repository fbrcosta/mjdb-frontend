import React from "react";
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// creating charts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartMore from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
HighchartMore(Highcharts);
HC_exporting(Highcharts);

const useStyles = makeStyles((theme) => ({

}));

function ProvenanceBarPlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var series = null;
  var categories = null;
  if (data) {
    series = {
      name: t("ProvenanceBarPlot.provenance"), 
      data: Object.keys(data).map(function(key){
        return data[key].value
      })
    };
    // set categories
    categories = Object.keys(data).map(function(key){
      return key
    });
  }

  console.log(categories);
  console.log(series);

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: null,
    xAxis: {
      categories: categories,
      title: {
          text: null
      }
    },
    yAxis: {
      title: {
          text: null
      },
      allowDecimals: false
    },
    series: [series]
  }


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("ProvenanceBarPlot.title")}
        </CardHeader>
        <CardBody>
          {
            data ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            ) : (
              "Loading"
            )
          }
        </CardBody>
      </Card>

    </Box>
  );

}

export default ProvenanceBarPlot;
