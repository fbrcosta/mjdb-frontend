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

const clinicDuration = (durations) => {
  var diff = new Date(durations['clinic_discharge']) - 
    new Date(durations['start_date']);
  return Math.ceil((diff + 1)/ (1000 * 60 * 60 * 24));
}

const realDuration = (durations) => {
  var diff = new Date(durations['real_discharge']) - 
    new Date(durations['start_date']);
  return Math.ceil((diff + 1)/ (1000 * 60 * 60 * 24));
}

const unit = (duration) => {
  return Math.abs(duration) <= 1 ? 'day' : 'days';
}

function HospitalizationPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { hospitalization } = formData;
  // hook for durations
  const [durations, setDurations] = React.useState({
    start_date: hospitalization.start_date,
    clinic_discharge: hospitalization.clinic_discharge,
    real_discharge: hospitalization.real_discharge
  });
  // hooks for hide content
  const [content, setContent] = React.useState({
    social: hospitalization.social,
    previous_hospitalization: hospitalization.previous_hospitalization,
    result: hospitalization.result
  });

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  // function to handle duration state updates
  function handleDurationChange(e) {
    var key = e.target.name.split('.')[1];
    var value = e.target.value;
    var update = {};
    update[key] = value;
    // update state
    setDurations(state => ({
      ...state,
      ...update
    }));
    // update formdata
    setForm(e);
  }

  // function to handle display content state updates
  function handleContentChange(e) {
    var key = e.target.name.split('.')[1];
    var value;
    if (key === 'result') {
      value = Number(e.target.value);
    } else {
      value = (e.target.value === 'true');
    }
    var update = {};
    update[key] = value;
    // update state
    setContent(state => ({
      ...state,
      ...update
    }));
    // update formdata
    var event = {
      target: {
        name: e.target.name,
        value: value
      }
    }
    setForm(event);
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
            <TextField 
              name="hospitalization.provenance"
              label={t('HospitalizationPanel.provenance')}
              value={hospitalization.provenance}
              onChange={setForm}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              required
              name="hospitalization.start_date"
              label={t('HospitalizationPanel.start_date')}
              type="date"
              value={hospitalization.start_date}
              onChange={handleDurationChange}
              disabled={disabled}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl className={classes.paper}>
            <TextField 
              required
              name="hospitalization.clinic_discharge"
              label={t('HospitalizationPanel.clinic_discharge')}
              type="date"
              value={hospitalization.clinic_discharge}
              onChange={handleDurationChange}
              disabled={disabled}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} component="legend" >
              {t('HospitalizationPanel.clinic_duration') + ": " + clinicDuration(durations) + 
                " " + t("HospitalizationPanel."+unit(clinicDuration(durations)))}
            </FormLabel>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('HospitalizationPanel.social')}
            </FormLabel>
            <RadioGroup 
              row 
              name="hospitalization.social" 
              value={hospitalization.social.toString()}
              onChange={handleContentChange}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box style={{display: content['social'] === true ? 'block' : 'none'}} >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                required
                name="hospitalization.real_discharge"
                label={t('HospitalizationPanel.real_discharge')}
                type="date"
                value={hospitalization.real_discharge}
                onChange={handleDurationChange}
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} component="legend" >
                {t('HospitalizationPanel.real_duration') + ": " + realDuration(durations) + 
                  " " + t("HospitalizationPanel."+unit(realDuration(durations)))}
              </FormLabel>
            </FormControl>
          </Grid>

        </Grid>
      </Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl id="hospitalization.previous_hospitalization" className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('HospitalizationPanel.previous_hospitalization')}
            </FormLabel>
            <RadioGroup 
              row 
              name="hospitalization.previous_hospitalization" 
              value={hospitalization.previous_hospitalization.toString()}
              onChange={handleContentChange}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
      <Box style={{display: content['previous_hospitalization'] === true ? 'block' : 'none'}} >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                name="hospitalization.cause"
                label={t('HospitalizationPanel.cause')}
                value={hospitalization.cause}
                onChange={setForm}
                disabled={disabled}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('HospitalizationPanel.rehospitalization')}
            </FormLabel>
            <RadioGroup 
              row 
              name="hospitalization.rehospitalization" 
              value={hospitalization.rehospitalization.toString()}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('HospitalizationPanel.result')}
            </FormLabel>
            <RadioGroup 
              row 
              name="hospitalization.result" 
              value={hospitalization.result.toString()}
              onChange={handleContentChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('HospitalizationPanel.discharge')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('HospitalizationPanel.death')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
      <Box style={{display: content['result'] === 0 ? 'block' : 'none'}} >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                name="hospitalization.destination"
                label={t('HospitalizationPanel.destination')}
                value={hospitalization.destination}
                onChange={setForm}
                disabled={disabled}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default HospitalizationPanel;
  