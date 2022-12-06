/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
// data
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

const useStyles = makeStyles((theme) => ({
  
}));

export default function TestPanel(props) {
  const classes = useStyles();
  const {t, i18n} = useTranslation('global');

  return (
    <Card chart>
      <CardHeader color="success">
        <ChartistGraph
          className="ct-chart"
          data={dailySalesChart.data}
          type="Line"
          options={dailySalesChart.options}
          listener={dailySalesChart.animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Daily Sales</h4>
        <p className={classes.cardCategory}>
          <span className={classes.successText}>
            <ArrowUpward className={classes.upArrowCardCategory} /> 55%
          </span>{" "}
          increase in today sales.
        </p>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          <AccessTime /> updated 4 minutes ago
        </div>
      </CardFooter>
    </Card>
  );
} 
