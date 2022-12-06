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

function GenderBarPlot(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { data } = props;
  var maleValue = null;
  var femaleValue = null;
  if (data) {
    maleValue = data.male.value;
    femaleValue = data.female.value;
  }

  // set chart options
  const options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: null,
    xAxis: {
      categories: [t("GenderBarPlot.gender")],
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
    series: [
      {
        name: t("GenderBarPlot.male"),
        data: [maleValue]
      },
      {
        name: t("GenderBarPlot.female"),
        data: [femaleValue]
      },
    ],
    colors: ['lightblue', 'pink']
  }


  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {t("GenderBarPlot.title")}
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

export default GenderBarPlot;
