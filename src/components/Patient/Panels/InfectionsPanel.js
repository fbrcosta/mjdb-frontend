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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';
// core components

const useStyles = makeStyles((theme) => ({
  subpanel: {
    "padding": theme.spacing(1),
    "margin-top": theme.spacing(1),
    "margin-bottom": theme.spacing(1),
    "background-color": "rgba(255, 255, 255, 0.5)",
  },
  paper: {
    width: '100%',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  label: {
    "margin-bottom": "0px",
  },
}));

function InfectionsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { has_infections, infections } = formData;
  // hooks for hide content
  const [content, setContent] = React.useState({
    has_infections: has_infections,
    agent_isolation: infections.agent_isolation,
    change_antibiotic: infections.change_antibiotic,
    more_infections: infections.more_infections
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

  // handle input change
  const handleAntibioticsChange = (e, index) => {
    const newList = formData['infections']['antibiotics'];
    newList[index]["antibiotic"] = e.target.value;
    // update
    setForm({
      target: {
        name: 'infections.antibiotics',
        value: newList
      }
    });
  };
  // handle click event of the Remove button
  const handleAntibioticsRemoveClick = index => {
    const newList = formData['infections']['antibiotics'].filter((item, j) => index !== j);
    // update
    setForm({
      target: {
        name: 'infections.antibiotics',
        value: newList
      }
    });
  };
  // handle click event of the Add button
  const handleAntibioticsAddClick = () => {
    const newList = formData['infections']['antibiotics'];
    newList.push({
      antibiotic: ""
    });
    // update
    setForm({
      target: {
        name: 'infections.antibiotics',
        value: newList
      }
    });
  };

  // handle input change
  const handleInfectionsChange = (e, index) => {
    const newList = formData['infections']['infections'];
    newList[index][e.target.name] = e.target.value;
    // update
    setForm({
      target: {
        name: 'infections.infections',
        value: newList
      }
    });
  };
  // handle click event of the Remove button
  const handleInfectionsRemoveClick = index => {
    const newList = formData['infections']['infections'].filter((item, j) => index !== j);
    // update
    setForm({
      target: {
        name: 'infections.infections',
        value: newList
      }
    });
  };
  // handle click event of the Add button
  const handleInfectionsAddClick = () => {
    const newList = formData['infections']['infections'];
    newList.push({
      infection: "",
      agent: "",
      antibiotic: "",
      duration: 0
    });
    // update
    setForm({
      target: {
        name: 'infections.infections',
        value: newList
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} required component="legend" >
              {t('InfectionsPanel.has_infections')}
            </FormLabel>
            <RadioGroup 
              row 
              name="has_infections" 
              value={has_infections.toString()}
              onChange={handleContent}
            >
              <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
              <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
      <Box style={{display: content['has_infections'] === true ? 'block' : 'none'}} >
        <Grid container spacing={2}>

          <Grid item md={6} xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} required component="legend" >
                {t('InfectionsPanel.intercorrence')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.intercorrence" 
                value={infections.intercorrence.toString()}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
                <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} required component="legend" >
                {t('InfectionsPanel.sepsis')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.sepsis" 
                value={infections.sepsis.toString()}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
                <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                name="infections.empirical_antibiotic" 
                label={t('InfectionsPanel.empirical_antibiotic')}
                value={infections.empirical_antibiotic}
                onChange={setForm}
                disabled={disabled}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} required component="legend" >
                {t('InfectionsPanel.agent_isolation')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.agent_isolation" 
                value={infections.agent_isolation.toString()}
                onChange={handleContent}
              >
                <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
                <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
        <Box style={{display: content['agent_isolation'] === true ? 'block' : 'none'}} >
          <Grid container spacing={2}>

            <Grid item md={6} xs={12}>
              <FormControl className={classes.paper}>
                <TextField 
                  name="infections.agent" 
                  label={t('InfectionsPanel.agent')}
                  value={infections.agent}
                  onChange={setForm}
                  disabled={disabled}
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl className={classes.paper}>
                <TextField 
                  name="infections.local" 
                  label={t('InfectionsPanel.local')}
                  value={infections.local}
                  onChange={setForm}
                  disabled={disabled}
                />
              </FormControl>
            </Grid>

          </Grid>
        </Box>
        <Grid container spacing={2}>

          <Grid item md={6} xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} required component="legend" >
                {t('InfectionsPanel.resistences')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.resistences" 
                value={infections.resistences.toString()}
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
                {t('InfectionsPanel.change_antibiotic')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.change_antibiotic" 
                value={infections.change_antibiotic.toString()}
                onChange={handleContent}
              >
                <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
                <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
        <Box style={{display: content['change_antibiotic'] === true ? 'block' : 'none'}} >
          {
            infections.antibiotics.map((item, i) => {
              return (
                <Card variant="outlined" className={classes.subpanel}>
                  <Grid container spacing={2}>
                    <Grid item xs={11} >
                      <FormControl className={classes.paper}>
                        <TextField 
                          required
                          name={"antibiotics." + i}
                          label={t('InfectionsPanel.antibiotic')+" "+(i+1)}
                          value={item.antibiotic}
                          onChange={e => handleAntibioticsChange(e, i)}
                          disabled={disabled}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} >
                      <Button
                        color="secondary"
                        style={{ height: '100%' }}
                        onClick={() => handleAntibioticsRemoveClick(i)}
                        disabled={disabled}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              );
            })
          }
          {
            infections.antibiotics.length < 5 &&
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleAntibioticsAddClick}
                  disabled={disabled}
                >
                  {t('InfectionsPanel.add')}
                </Button>
              </Grid>
            </Grid>
          }
        </Box>
        <Grid container spacing={2}>

          <Grid item md={6} xs={12}>
            <FormControl className={classes.paper}>
              <TextField 
                required
                type="number"
                InputProps={{
                  min: "0"
                }}
                name="infections.duration" 
                label={t('InfectionsPanel.duration')}
                value={infections.duration}
                onChange={setForm}
                disabled={disabled}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl className={classes.paper}>
              <FormLabel className={classes.label} required component="legend" >
                {t('InfectionsPanel.finish_home')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.finish_home" 
                value={infections.finish_home.toString()}
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
                {t('InfectionsPanel.more_infections')}
              </FormLabel>
              <RadioGroup 
                row 
                name="infections.more_infections" 
                value={infections.more_infections.toString()}
                onChange={handleContent}
              >
                <FormControlLabel value="false" control={<Radio />} label={t('no')} disabled={disabled} />
                <FormControlLabel value="true" control={<Radio />} label={t('yes')} disabled={disabled} />
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
        <Box style={{display: content['more_infections'] === true ? 'block' : 'none'}} >

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.paper}>
                <TextField 
                  required
                  type="number"
                  InputProps={{
                    min: "0"
                  }}
                  name="infections.infection_count" 
                  label={t('InfectionsPanel.infection_count')}
                  value={infections.infection_count}
                  onChange={setForm}
                  disabled={disabled}
                />
              </FormControl>
            </Grid>
          </Grid>

          {
            infections.infections.map((item, i) => {
              return (
                <Card variant="outlined" className={classes.subpanel}>
                  <Grid container spacing={2} >

                    <Grid item xs={11} >
                      <FormControl className={classes.paper}>
                        <FormLabel className={classes.label} component="legend" >
                          {t('InfectionsPanel.antibiotic') + " " + (i+1)}
                        </FormLabel>
                      </FormControl>
                    </Grid>

                    <Grid item xs={1} >
                      <Button
                        color="secondary"
                        style={{ height: '100%' }}
                        onClick={() => handleInfectionsRemoveClick(i)}
                        disabled={disabled}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>

                    <Grid item md={6} xs={12} >
                      <FormControl className={classes.paper}>
                        <TextField 
                          name="infection"
                          label={t('InfectionsPanel.infection')}
                          value={item.infection}
                          onChange={e => handleInfectionsChange(e, i)}
                          disabled={disabled}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12} >
                      <FormControl className={classes.paper}>
                        <TextField 
                          name="agent"
                          label={t('InfectionsPanel.agent')}
                          value={item.agent}
                          onChange={e => handleInfectionsChange(e, i)}
                          disabled={disabled}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12} >
                      <FormControl className={classes.paper}>
                        <TextField 
                          name="antibiotic"
                          label={t('InfectionsPanel.antibiotic')}
                          value={item.antibiotic}
                          onChange={e => handleInfectionsChange(e, i)}
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
                            min: "0"
                          }}
                          name="duration"
                          label={t('InfectionsPanel.duration')}
                          value={item.duration}
                          onChange={e => handleInfectionsChange(e, i)}
                          disabled={disabled}
                        />
                      </FormControl>
                    </Grid>

                  </Grid>
                </Card>
              );
            })
          }
          {
            infections.infections.length < 5 &&
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleInfectionsAddClick}
                  disabled={disabled}
                >
                  {t('InfectionsPanel.add')}
                </Button>
              </Grid>
            </Grid>
          }
        </Box>

      </Box>
    </Box>
  );
}

export default InfectionsPanel;
