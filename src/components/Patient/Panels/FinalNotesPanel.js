/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// @material-ui/icons
// core components

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function validate(props){
  console.log(props);
  return true;
}

function FinalNotesPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { final_notes } = formData;

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <TextareaAutosize  
              name="final_notes"
              rowsMin={3}
              label={t('FinalNotesPanel.final_notes')}
              value={final_notes}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
}

export default FinalNotesPanel;
