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

const curb65_designation_values = {
  0: 'PneumoniaPanel.curb65_designation_values.low',
  1: 'PneumoniaPanel.curb65_designation_values.low',
  2: 'PneumoniaPanel.curb65_designation_values.intermediate',
  3: 'PneumoniaPanel.curb65_designation_values.high',
  4: 'PneumoniaPanel.curb65_designation_values.high'
}

const result = (score) => {
  return Object.keys(score)
    .map(key=>{return score[key] === true})
    .reduce((a,b)=>a+b,0);
}

function PneumoniaPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_pneumonia, pneumonia } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_pneumonia: has_pneumonia
  });
  // hook for score
  const [score, setScore] = React.useState({
    confusion: pneumonia.confusion,
    urea: pneumonia.urea,
    breathing: pneumonia.breathing,
    paspad: pneumonia.paspad
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
  // function to handle display score state updates
  function handleScore(e) {
    var value = (e.target.value === 'true');
    var update = {};
    update[e.target.name] = value;
    // update state
    setScore(state => ({
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

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('PneumoniaPanel.has_pneumonia')}
          </FormLabel>
          <RadioGroup 
            row 
            name="has_pneumonia" 
            value={has_pneumonia.toString()}
            onChange={handleContentChange}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('PneumoniaPanel.confusion')}
          </FormLabel>
          <RadioGroup 
            row 
            name="pneumonia.confusion" 
            value={pneumonia.confusion.toString()}
            onChange={handleScore}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('PneumoniaPanel.urea')}
          </FormLabel>
          <RadioGroup 
            row 
            name="pneumonia.urea" 
            value={pneumonia.urea.toString()}
            onChange={handleScore}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('PneumoniaPanel.breathing')}
          </FormLabel>
          <RadioGroup 
            row 
            name="pneumonia.breathing" 
            value={pneumonia.breathing.toString()}
            onChange={handleScore}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('PneumoniaPanel.paspad')}
          </FormLabel>
          <RadioGroup 
            row 
            name="pneumonia.paspad" 
            value={pneumonia.paspad.toString()}
            onChange={handleScore}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label}>
            {t('PneumoniaPanel.curb65_result') + ": " + result(score)}
          </FormLabel>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_pneumonia'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label}>
            {t('PneumoniaPanel.curb65_designation') + ": " + t(curb65_designation_values[result(score)])}
          </FormLabel>
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default PneumoniaPanel;
