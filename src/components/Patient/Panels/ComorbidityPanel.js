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

const survival = (score) => {
  return Math.round(Math.pow(0.983, Math.exp(result(score)*0.9))*1000)/1000;
}

const result = (score) => {
  const age = Math.floor(Math.min(Math.max(0,(score.age/10)-4),5));
  const g1 = Object.keys(score)
    .filter(key=>{return /^g1_/.test(key)})
    .map(key=>{return score[key]===true})
    .reduce((a,b)=>a+b,0);
  const g2 = Object.keys(score)
    .filter(key=>{return /^g2_/.test(key)})
    .map(key=>{return score[key]===true})
    .reduce((a,b)=>a+b,0);
  const g3 = Object.keys(score)
    .filter(key=>{return /^g3_/.test(key)})
    .map(key=>{return score[key]===true})
    .reduce((a,b)=>a+b,0);
  const g4 = Object.keys(score)
    .filter(key=>{return /^g4_/.test(key)})
    .map(key=>{return score[key]===true})
    .reduce((a,b)=>a+b,0);
  return age+g1*1+g2*2+g3*3+g4*6;
}

function ComorbidityPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { age, comorbidity } = formData;
  // hook for score
  const [score, setScore] = React.useState({
    age: age,
    g1_eam: comorbidity.eam,
    g1_icc: comorbidity.icc,
    g1_peripheral_vascular: comorbidity.peripheral_vascular,
    g1_cerebrovascular: comorbidity.cerebrovascular,
    g1_insanity: comorbidity.insanity,
    g1_chronic_lung: comorbidity.chronic_lung,
    g1_connective_tissue: comorbidity.connective_tissue,
    g1_dyspeptic_ulcerative: comorbidity.dyspeptic_ulcerative,
    g1_mild_liver: comorbidity.mild_liver,
    g1_diabetes_wo_organ_inj: comorbidity.diabetes_wo_organ_inj,
    g2_hemiplegia: comorbidity.hemiplegia,
    g2_modsev_kidney: comorbidity.modsev_kidney,
    g2_diabetes_w_organ_inj: comorbidity.diabetes_w_organ_inj,
    g2_tumor_wo_metastases: comorbidity.tumor_wo_metastases,
    g2_leukemia: comorbidity.leukemia,
    g2_lymphoma: comorbidity.lymphoma,
    g3_modsev_liver: comorbidity.modsev_liver,
    g4_tumor_w_metastases: comorbidity.tumor_w_metastases,
    g4_hiv: comorbidity.hiv
  });

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  // function to handle changes and score
  function handleChange(e, group) {
    var key = group + "_" + e.target.name.split('.')[1];
    var value = (e.target.value === 'true');
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

  return (
    <Grid container spacing={2}>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.eam')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.eam" 
            value={comorbidity.eam.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.icc')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.icc" 
            value={comorbidity.icc.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.peripheral_vascular')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.peripheral_vascular" 
            value={comorbidity.peripheral_vascular.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.cerebrovascular')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.cerebrovascular" 
            value={comorbidity.cerebrovascular.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.insanity')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.insanity" 
            value={comorbidity.insanity.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.chronic_lung')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.chronic_lung" 
            value={comorbidity.chronic_lung.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.connective_tissue')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.connective_tissue" 
            value={comorbidity.connective_tissue.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.dyspeptic_ulcerative')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.dyspeptic_ulcerative" 
            value={comorbidity.dyspeptic_ulcerative.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.mild_liver')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.mild_liver" 
            value={comorbidity.mild_liver.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.diabetes_wo_organ_inj')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.diabetes_wo_organ_inj" 
            value={comorbidity.diabetes_wo_organ_inj.toString()}
            onChange={e => handleChange(e,'g1')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.hemiplegia')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.hemiplegia" 
            value={comorbidity.hemiplegia.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.modsev_kidney')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.modsev_kidney" 
            value={comorbidity.modsev_kidney.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.diabetes_w_organ_inj')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.diabetes_w_organ_inj" 
            value={comorbidity.diabetes_w_organ_inj.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.tumor_wo_metastases')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.tumor_wo_metastases" 
            value={comorbidity.tumor_wo_metastases.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.leukemia')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.leukemia" 
            value={comorbidity.leukemia.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.lymphoma')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.lymphoma" 
            value={comorbidity.lymphoma.toString()}
            onChange={e => handleChange(e,'g2')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.modsev_liver')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.modsev_liver" 
            value={comorbidity.modsev_liver.toString()}
            onChange={e => handleChange(e,'g3')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.tumor_w_metastases')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.tumor_w_metastases" 
            value={comorbidity.tumor_w_metastases.toString()}
            onChange={e => handleChange(e,'g4')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComorbidityPanel.hiv')}
          </FormLabel>
          <RadioGroup 
            row 
            name="comorbidity.hiv" 
            value={comorbidity.hiv.toString()}
            onChange={e => handleChange(e,'g4')}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label}>
            {t('ComorbidityPanel.score') + ": " + result(score)}
          </FormLabel>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label}>
            {t('ComorbidityPanel.survival') + ": " + survival(score)}
          </FormLabel>
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default ComorbidityPanel;
