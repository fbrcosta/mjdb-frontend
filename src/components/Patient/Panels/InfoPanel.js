/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
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

function InfoPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { processid, name, gender, age, institution } = formData;

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              required
              name="name"
              label={t('InfoPanel.name')}
              value={name}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              required
              name="processid"
              label={t('InfoPanel.processid')}
              value={processid}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              required
              type="number"
              InputProps={{
                min: "0",
                max: "150",
                step: "4"
              }}
              name="age" 
              label={t('InfoPanel.age')}
              value={age}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('InfoPanel.gender')}
            </FormLabel>
            <RadioGroup 
              row 
              name="gender" 
              value={gender}
              onChange={setForm}
            >
              <FormControlLabel value="F" control={<Radio />} label={t('InfoPanel.female')} disabled={disabled} />
              <FormControlLabel value="M" control={<Radio />} label={t('InfoPanel.male')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              name="institution" 
              label={t('InfoPanel.institution')}
              value={institution}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
}

export default InfoPanel;
