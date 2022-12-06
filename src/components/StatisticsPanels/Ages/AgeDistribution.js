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

function AgeDistribution(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var categories = null;
  var maleSeries = null;
  var femaleSeries = null;
  if (data) {
    categories = Object.keys(data.general.distributions);
    maleSeries = Object.keys(data.male.distributions).map(function(key){
      return data.male.distributions[key]*-1;
    });
    femaleSeries = Object.keys(data.female.distributions).map(function(key){
      return data.female.distributions[key];
    });
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: null,
    xAxis: [
      {
        categories: categories,
        reversed: false,
        labels: {
          step: 1
        }
      }, 
      { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 1
        }
      }
    ],
    yAxis: {
      title: {
          text: null
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value);
        }
      },
      allowDecimals: false
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' 
          + this.series.name + ', ' 
          + t("AgeDistribution.age") + ' '
          + this.point.category 
          + '</b><br/>' 
          + t("AgeDistribution.population") + ': '
          + Highcharts.numberFormat(Math.abs(this.point.y), 1);
      }
    },
    series: [
      {
        name: t("AgeDistribution.male"),
        data: maleSeries
      },
      {
        name: t("AgeDistribution.female"),
        data: femaleSeries
      }
    ],
    colors: ['lightblue', 'pink']
  }


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("AgeDistribution.title")}
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

export default AgeDistribution;
