import React from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
// @material-ui/icons
import BarChartIcon from '@material-ui/icons/BarChart';
import Update from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) => ({
  cardCategory : {
    color: "black",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardTitle: {
    color: "black",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  icon: {
    padding: theme.spacing(0),
    fontSize: "3em"
  },
  iconHolder: {
    textAlign: "center",
  },
  iconText: {
    color: "black",
    textAlign: "center",
    margin: "0px",
  }
}));

function MetricBox(props) {
  const classes = useStyles();

  // extract data from props
  const { metric, enabled, total, unit } = props;
  // 

  return (
    <Box>
      <Card>

        <CardHeader color="success" stats icon>
          <CardIcon color="success">
            <BarChartIcon />
          </CardIcon>
          <p className={classes.cardCategory}>{metric}</p>
          <h3 className={classes.cardTitle}>
            {
              enabled ? (
                total.toFixed(1) + " " + unit
              ) : (
                <Update />
              )
            }
          </h3>
        </CardHeader>

      </Card>

    </Box>
  );

}

export default MetricBox;
