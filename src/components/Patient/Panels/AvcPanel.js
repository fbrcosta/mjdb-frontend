/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
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


function AvcPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_avc, avc } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_avc: has_avc
  });
  // function to handle display content state updates
  function handleContentChange(e) {
    var value = (e.target.value === 'true');
    var update = {};
    update[e.target.name] = value;
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


  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('AvcPanel.has_avc')}
          </FormLabel>
          <RadioGroup 
            row 
            name="has_avc" 
            value={has_avc.toString()}
            onChange={handleContentChange}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('AvcPanel.greenway')}
          </FormLabel>
          <RadioGroup 
            row 
            name="avc.greenway" 
            value={avc.greenway.toString()}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            required
            type="number"
            InputProps={{
              min: "0",
              max: "150"
            }}
            name="avc.symptoms_hours" 
            label={t('AvcPanel.symptoms_hours')}
            value={avc.symptoms_hours}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="avc.localization" 
            label={t('AvcPanel.localization')}
            value={avc.localization}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('AvcPanel.treatment')}
          </FormLabel>
          <RadioGroup 
            row 
            name="avc.treatment" 
            value={avc.treatment}
            onChange={setForm}
          >
            <FormControlLabel value="T" control={<Radio />} label={t('AvcPanel.thrombolysis')} disabled={disabled} />
            <FormControlLabel value="E" control={<Radio />} label={t('AvcPanel.endovascular')} disabled={disabled} />
            <FormControlLabel value="C" control={<Radio />} label={t('AvcPanel.conservative')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="avc.probable_etiology" 
            label={t('AvcPanel.probable_etiology')}
            value={avc.probable_etiology}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_avc'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="avc.sequels" 
            label={t('AvcPanel.sequels')}
            value={avc.sequels}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default AvcPanel;
