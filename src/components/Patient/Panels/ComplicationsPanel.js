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

function ComplicationsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_complications, complications } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_complications: has_complications
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

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <FormControl className={classes.paper}>
          <FormLabel className={classes.label} required component="legend" >
            {t('ComplicationsPanel.has_complications')}
          </FormLabel>
          <RadioGroup 
            row 
            name="has_complications" 
            value={has_complications.toString()}
            onChange={handleContentChange}
          >
            <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
            <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid 
        item xs={12}
        style={{display: content['has_complications'] === true ? 'block' : 'none'}}
      >
        <FormControl className={classes.paper}>
          <TextField 
            required
            name="complications.name" 
            label={t('ComplicationsPanel.name')}
            value={complications.name}
            onChange={setForm}
            disabled={disabled}
          />
        </FormControl>
      </Grid>

    </Grid>
  );
}

export default ComplicationsPanel;
