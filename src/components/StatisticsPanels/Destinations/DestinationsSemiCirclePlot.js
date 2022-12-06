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

function DestinationsSemiCirclePlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { total, title, data } = props;
  var series = null;
  if (data) {
    series = [
      {
        name: t("DestinationsSemiCirclePlot.discharge"),
        y: data.value,
        dataLabels: {
          enabled: true,
          format: '<b>{point.y}</b>'
        }
      },
      {
        name: t("DestinationsSemiCirclePlot.death"),
        y: total-data.value,
        dataLabels: {
          enabled: false
        }
      },
    ]
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
        text: t("DestinationsSemiCirclePlot.total") + ": " + total,
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
      pointFormat: '<b>{point.y} ({point.percentage:.1f}%)</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [
      {
        type: 'pie',
        name: null,
        innerSize: '50%',
        data: series
      }
    ],
    colors: ['black', 'rgba(0,0,0,0.2)']
  };


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {title}
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

export default DestinationsSemiCirclePlot;
