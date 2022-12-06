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

function GenderPiePlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var malePct = null;
  var femalePct = null;
  if (data) {
    malePct = data.male.pct;
    femalePct = data.female.pct;
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: null,
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [
      {
        name: null,
        colorByPoint: true,
        data: [
          {
            name: t("GenderPiePlot.male"),
            y: malePct
          }, 
          {
            name: t("GenderPiePlot.female"),
            y: femalePct
          }
        ]
      }
    ],
    colors: ['lightblue', 'pink']
  };


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("GenderPiePlot.title")}
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

export default GenderPiePlot;
