import React from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/icons
import BarChartIcon from '@material-ui/icons/BarChart';
import Update from "@material-ui/icons/Update";
// fontawsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faFemale } from "@fortawesome/free-solid-svg-icons";

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
  const { metric, enabled, total, male, female } = props;
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
                total.toFixed(1)
              ) : (
                <Update />
              )
            }
          </h3>
        </CardHeader>

        <CardBody>
          <GridContainer>
            <GridItem xs={6} className={classes.iconHolder}>
              <Box className={classes.iconHolder}>
                <FontAwesomeIcon className={classes.icon} icon={faMale}
                  style={{color: "lightblue"}} title="male" />
              </Box>
            </GridItem>
            <GridItem xs={6}>
              <Box className={classes.iconHolder}>
                <FontAwesomeIcon className={classes.icon} icon={faFemale}
                  style={{color: "pink"}} title="female" />
              </Box>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={6}>
              <h4 className={classes.iconText}>
                {
                  enabled ? (
                    male.toFixed(1)
                  ) : (
                    <Update />
                  )
                }
              </h4>
            </GridItem>
            <GridItem xs={6}>
              <h4 className={classes.iconText}>
                {
                  enabled ? (
                    female.toFixed(1)
                  ) : (
                    <Update />
                  )
                }
              </h4>
            </GridItem>
          </GridContainer>
        </CardBody>

{/*
        <CardFooter stats>
          <div className={classes.stats}>
            <Update />
            {t('AgesPanel.update') + " " + format_datetime(data.last_update)}
          </div>
        </CardFooter>
*/}

      </Card>

    </Box>
  );

}

export default MetricBox;
