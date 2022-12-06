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

function CardiacInsufficiencyPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_cardiac_insufficiency, cardiac_insufficiency } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_cardiac_insufficiency: has_cardiac_insufficiency,
    acute: has_cardiac_insufficiency && cardiac_insufficiency.acute
  });
  // function to handle display content state updates
  function handleContent(e) {
    var keys = e.target.name.split('.');
    var key = keys[keys.length-1];
    var value = (e.target.value === 'true');
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

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.has_cardiac_insufficiency')}
          </FormLabel>
          <RadioGroup 
            row 
            name="has_cardiac_insufficiency" 
            value={has_cardiac_insufficiency.toString()}
            onChange={handleContent}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField
            name="cardiac_insufficiency.probable_etiology" 
            label={t('CardiacInsufficiencyPanel.probable_etiology')}
            value={cardiac_insufficiency.probable_etiology}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.acute')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.acute" 
            value={cardiac_insufficiency.acute.toString()}
            onChange={handleContent}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['acute'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="cardiac_insufficiency.motive" 
            label={t('CardiacInsufficiencyPanel.motive')}
            value={cardiac_insufficiency.motive}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.stratification')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.stratification" 
            value={cardiac_insufficiency.stratification}
            onChange={setForm}
          >
            <FormControlLabel value="nyha_i" control={<Radio />} label={t('CardiacInsufficiencyPanel.nyha_i')} disabled={disabled} />
            <FormControlLabel value="nyha_ii" control={<Radio />} label={t('CardiacInsufficiencyPanel.nyha_ii')} disabled={disabled} />
            <FormControlLabel value="nyha_iii" control={<Radio />} label={t('CardiacInsufficiencyPanel.nyha_iii')} disabled={disabled} />
            <FormControlLabel value="nyha_iv" control={<Radio />} label={t('CardiacInsufficiencyPanel.nyha_iv')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.feve')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.feve" 
            value={cardiac_insufficiency.feve}
            onChange={setForm}
          >
            <FormControlLabel value="preserved" control={<Radio />} label={t('CardiacInsufficiencyPanel.preserved')} disabled={disabled} />
            <FormControlLabel value="intermediate" control={<Radio />} label={t('CardiacInsufficiencyPanel.intermediate')} disabled={disabled} />
            <FormControlLabel value="reduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.reduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="cardiac_insufficiency.bnp" 
            label={t('CardiacInsufficiencyPanel.bnp')}
            value={cardiac_insufficiency.bnp}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.ieca')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.ieca" 
            value={cardiac_insufficiency.ieca}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.blocking_beta')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.blocking_beta" 
            value={cardiac_insufficiency.blocking_beta}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.ara')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.ara" 
            value={cardiac_insufficiency.ara}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.spironolactone')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.spironolactone" 
            value={cardiac_insufficiency.spironolactone}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.sacubitril_valsartan')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.sacubitril_valsartan" 
            value={cardiac_insufficiency.sacubitril_valsartan}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item md={6} xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('CardiacInsufficiencyPanel.ivabradine')}
          </FormLabel>
          <RadioGroup 
            row 
            name="cardiac_insufficiency.ivabradine" 
            value={cardiac_insufficiency.ivabradine}
            onChange={setForm}
          >
            <FormControlLabel value="to_do" control={<Radio />} label={t('CardiacInsufficiencyPanel.to_do')} disabled={disabled} />
            <FormControlLabel value="introduced" control={<Radio />} label={t('CardiacInsufficiencyPanel.introduced')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="cardiac_insufficiency.diuretics" 
            label={t('CardiacInsufficiencyPanel.diuretics')}
            value={cardiac_insufficiency.diuretics}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_cardiac_insufficiency'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            name="cardiac_insufficiency.treatments_response" 
            label={t('CardiacInsufficiencyPanel.treatments_response')}
            value={cardiac_insufficiency.treatments_response}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default CardiacInsufficiencyPanel;
