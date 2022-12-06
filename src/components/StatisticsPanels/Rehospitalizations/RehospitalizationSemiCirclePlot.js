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

function RehospitalizationSemiCirclePlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data, title, name, color } = props;
  var series = null;
  var colors = null;
  var total = null;
  if (data) {
    total = data.patients;
    series = [
      {
        name: t("RehospitalizationSemiCirclePlot.rehospitalized"),
        y: data.rehospitalizations.value,
        dataLabels: {
          enabled: true,
          format: '<b>{point.y}</b>'
        }
      },
      {
        name: t("RehospitalizationSemiCirclePlot.notrehospitalized"),
        y: data.patients - data.rehospitalizations.value,
        dataLabels: {
          enabled: false
        }
      },
    ];
    if (color === "lightblue") {
      colors = ["lightblue", "rgba(173,216,230,0.2)"]
    } else if (color === "pink") {
      colors = ["pink", "rgba(255,192,203,0.2)"]
    } else {
      colors = ["black", "rgba(0,0,0,0.2)"]
    }
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
        text: t("RehospitalizationSemiCirclePlot.total") + ": " + total,
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
        name: name,
        innerSize: '50%',
        data: series
      }
    ],
    colors: colors
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

export default RehospitalizationSemiCirclePlot;
