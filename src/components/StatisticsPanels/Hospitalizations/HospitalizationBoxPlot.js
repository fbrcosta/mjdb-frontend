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

function HospitalizationBoxPlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var generalSeries = null;
  var maleSeries = null;
  var femaleSeries = null;
  if (data) {
    generalSeries = [data.general.min, data.general.q1, data.general.median, data.general.q3, data.general.max];
    maleSeries = [data.male.min, data.male.q1, data.male.median, data.male.q3, data.male.max];
    femaleSeries = [data.female.min, data.female.q1, data.female.median, data.female.q3, data.female.max];
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      type: 'boxplot'
    },
    title: null,
    xAxis: {
      categories: [t("HospitalizationBoxPlot.category")],
      title: null
    },
    yAxis: {
      title: {
        text: t("HospitalizationBoxPlot.duration")
      }
    },
    series: [
      {
        name: t("HospitalizationBoxPlot.all"),
        data: [generalSeries]
      },
      {
        name: t("HospitalizationBoxPlot.male"),
        data: [maleSeries]
      },
      {
        name: t("HospitalizationBoxPlot.female"),
        data: [femaleSeries]
      }
    ],
    colors: ['black', 'lightblue', 'pink']
  }


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("HospitalizationBoxPlot.title")}
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

export default HospitalizationBoxPlot;
