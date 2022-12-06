/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
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

const katz_designations = {
  0: 'AutonomyPanel.total_dependency',
  1: 'AutonomyPanel.serious_dependency',
  2: 'AutonomyPanel.serious_dependency',
  3: 'AutonomyPanel.moderate_dependency',
  4: 'AutonomyPanel.moderate_dependency',
  5: 'AutonomyPanel.slight_dependency',
  6: 'AutonomyPanel.no_dependency'
}

const result = (score) => {
  return Object.values(score).reduce((a,b) => a+b, 0);
}

function AutonomyPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { autonomy } = formData;
  // hook for score
  const [score, setScore] = React.useState({
    bath: autonomy.bath,
    dress: autonomy.dress,
    sanitary: autonomy.sanitary,
    movement: autonomy.movement,
    sphincters: autonomy.sphincters,
    food: autonomy.food
  });

  // function to handle changes and score
  function handleChange(e) {
    var key = e.target.name.split('.')[1];
    var value = Number(e.target.value);
    var update = {};
    update[key] = value;
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
    <Box>
      <Grid container spacing={2}>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.bath')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.bath" 
              value={autonomy.bath.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.dress')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.dress" 
              value={autonomy.dress.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.sanitary')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.sanitary" 
              value={autonomy.sanitary.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.movement')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.movement" 
              value={autonomy.movement.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.sphincters')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.sphincters" 
              value={autonomy.sphincters.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('AutonomyPanel.food')}
            </FormLabel>
            <RadioGroup 
              row 
              name="autonomy.food" 
              value={autonomy.food.toString()}
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label={t('AutonomyPanel.dependent')} disabled={disabled} />
              <FormControlLabel value="1" control={<Radio />} label={t('AutonomyPanel.independent')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel component="legend" >
              {t('AutonomyPanel.score') + ": " + result(score) + " (" + t(katz_designations[result(score)]) + ")"}
            </FormLabel>
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
}

export default AutonomyPanel;
