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
import TextField from '@material-ui/core/TextField';
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

function VniPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_vni, vni } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_vni: has_vni
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
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('VniPanel.has_vni')}
            </FormLabel>
            <RadioGroup 
              row 
              name="has_vni" 
              value={has_vni.toString()}
              onChange={handleContentChange}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
      <Box style={{display: content['has_vni'] === true ? 'block' : 'none'}} >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                required
                name="vni.motive" 
                label={t('VniPanel.motive')}
                value={vni.motive}
                onChange={setForm}
                disabled={disabled}
                disabled={disabled}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default VniPanel;
