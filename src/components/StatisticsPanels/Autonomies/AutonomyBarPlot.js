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

function AutonomyBarPlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var generalSeries = null;
  var maleSeries = null;
  var femaleSeries = null;
  var categories = null;
  if (data) {
    generalSeries = Object.keys(data.general.distributions).map(function(key){
      return data.general.distributions[key];
    });
    maleSeries = Object.keys(data.male.distributions).map(function(key){
      return data.male.distributions[key];
    });
    femaleSeries = Object.keys(data.female.distributions).map(function(key){
      return data.female.distributions[key];
    });
    // set categories
    categories = Object.keys(data.general.distributions).map(function(key){
      return t("AutonomyBarPlot.katz_designation."+key);
    });
  }

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
    series: [
      {
        name: t("AutonomyBarPlot.all"),
        data: generalSeries
      },
      {
        name: t("AutonomyBarPlot.male"),
        data: maleSeries
      },
      {
        name: t("AutonomyBarPlot.female"),
        data: femaleSeries
      }
    ],
    colors: ['black', 'lightblue', 'pink']
  }


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("AutonomyBarPlot.title")}
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

export default AutonomyBarPlot;
