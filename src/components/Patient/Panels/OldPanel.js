/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
// @material-ui/icons
// core components

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  label: {
    "margin-bottom": "0px",
  },
}));

function OldPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_old } = formData;

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  function handleRadioChange(e) {
    var value = (e.target.value === 'true');
    // update formdata
    var event = {
      target: {
        name: e.target.name,
        value: value
      }
    }
    setForm(event);
  }

  return (
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('OldPanel.has_old')}
            </FormLabel>
            <RadioGroup 
              row 
              name="has_old" 
              value={has_old.toString()}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
}

export default OldPanel;
