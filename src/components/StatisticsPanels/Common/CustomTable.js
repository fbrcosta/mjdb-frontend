import React from "react";
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';


const useStyles = makeStyles((theme) => ({

}));

function CustomTable(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  // extract data from props
  const { title, header, data} = props;

  return (
    <Box>

      <Card chart>
        <CardHeader color="success">
          {title}
        </CardHeader>
        <CardBody>
          {
            data ? (
              <MaterialTable
                className={classes.table}
                title=""
                columns={header}
                data={data}
                options={{
                  sorting: true,
                  exportButton: true,
                  search: false,
                  paging: false,
                  rowStyle: {
                    padding: '4px',
                  }
                }}
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

export default CustomTable;
