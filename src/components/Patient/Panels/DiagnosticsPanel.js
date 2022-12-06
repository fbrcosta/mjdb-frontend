/*eslint-disable*/
import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";
// 
import { VariableSizeList } from "react-window";
// @material-ui/core components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";

import { useTheme, makeStyles } from '@material-ui/core/styles';
// core components

// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';

// variables
import ICD10_CODES from '../icd10';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  label: {
    "margin-bottom": "0px",
  },
  code: {
    "font-size": '12px',
    "font-weight": 'bold',
    "width": "40px",
    "display": "inline-block",
  },
  subpanel: {
    "padding": theme.spacing(1),
    "margin-top": theme.spacing(1),
    "margin-bottom": theme.spacing(1),
    "background-color": "rgba(255, 255, 255, 0.5)",
  },
}));

const LISTBOX_PADDING = 8; // px

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
  });
}

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const OptionList = React.forwardRef(function OptionList(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = child => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

function DiagnosticsPanel(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // extract props
  const { formData, setForm, edditable } = props;
  const { diagnostics } = formData;

  var disabled = "";
  if (!edditable) {
    disabled = "disabled";
  }

  // function to handle display content state updates
  function handlePDContent(event, newValue) {
    var value = null;
    if (newValue != null) {
      value = newValue.code;
    }
    setForm({
      target: {
        name: 'diagnostics.principal_diagnostic.diagnostic_icd10',
        value: value
      }
    });
  }

  // function to handle display content state updates
  function handleSDContent(event, newValue, index) {
    var value = null;
    if (newValue != null) {
      value = newValue.code;
    }
    const newList = formData['diagnostics']['secundary_diagnostics'];
    newList[index]['diagnostic_icd10'] = value;
    // update
    setForm({
      target: {
        name: 'diagnostics.secundary_diagnostics',
        value: newList
      }
    });
  }
  // handle click event of the Remove button
  const handleSDRemoveClick = index => {
    const newList = formData['diagnostics']['secundary_diagnostics'].filter((item, j) => index !== j);
    // update
    setForm({
      target: {
        name: 'diagnostics.secundary_diagnostics',
        value: newList
      }
    });
  };
  // handle click event of the Add button
  const handleSDAddClick = () => {
    const newList = formData['diagnostics']['secundary_diagnostics'];
    newList.push({
      diagnostic_icd10: ""
    });
    // update
    setForm({
      target: {
        name: 'diagnostics.secundary_diagnostics',
        value: newList
      }
    });
  };

  // 
  function lookup_diagnostic (code) {
    var found = false;
    var value = {"code": "","message":""};
    for (var i = 0; i < ICD10_CODES.length && !found; i++) {
      if (ICD10_CODES[i].code === code) {
        value = ICD10_CODES[i];
        found = true;
      }
    } 
    return value;
  }

  return (
    <Box>

      <Grid container spacing={2}>

        <Grid item md={8} xs={12}>
          <FormControl className={classes.paper}>
            <Autocomplete
              name="diagnostics.principal_diagnostic.diagnostic_icd10"
              value={lookup_diagnostic(diagnostics.principal_diagnostic.diagnostic_icd10)}
              options={ICD10_CODES}
              autoHighlight
              ListboxComponent={OptionList}
              getOptionLabel={(option) => option.message}
              disabled={disabled}
              renderOption={(option) => (
                <Typography noWrap>
                  <span className={classes.code}>{option.code}</span> 
                  {option.message}
                </Typography>
              )}
              onChange={handlePDContent}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  name="diagnostics.principal_diagnostic.diagnostic_icd10_impl"
                  label={t('DiagnosticsPanel.principal_diagnostic')}
                  disabled={disabled}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label}>
              {t('DiagnosticsPanel.icd10')}
            </FormLabel>
            <FormLabel className={classes.label}>
              { diagnostics.principal_diagnostic.diagnostic_icd10 }
            </FormLabel>
          </FormControl>
        </Grid>

        <Grid item xs={12} >
          <FormControl className={classes.paper}>
            <FormLabel className={classes.label} component="legend" >
              {t('DiagnosticsPanel.secundary_diagnostics')}
            </FormLabel>
          </FormControl>
        </Grid>

      </Grid>

      <Box> 
        {
          diagnostics.secundary_diagnostics.map((item, i) => {
            return (
              <Card variant="outlined" className={classes.subpanel}>
                <Grid container spacing={2}>

                  <Grid item xs={11} >
                    <FormControl className={classes.paper}>
                      <FormLabel className={classes.label} component="legend" >
                        {t('DiagnosticsPanel.secundary_diagnostic')+" "+(i+1)}
                      </FormLabel>
                    </FormControl>
                  </Grid>

                  <Grid item xs={1} >
                    <Button
                      color="secondary"
                      style={{ height: '100%' }}
                      disabled={disabled}
                      onClick={() => handleSDRemoveClick(i)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>

                  <Grid item md={8} xs={12}>
                    <FormControl className={classes.paper}>
                      <Autocomplete
                        name={"diagnostics.secundary_diagnostics.diagnostic_icd10."+i}
                        value={lookup_diagnostic(item.diagnostic_icd10)}
                        options={ICD10_CODES}
                        autoHighlight
                        ListboxComponent={OptionList}
                        disabled={disabled}
                        getOptionLabel={(option) => option.message}
                        renderOption={(option) => (
                          <Typography noWrap>
                            <span className={classes.code}>{option.code}</span> 
                            {option.message}
                          </Typography>
                        )}
                        onChange={(e, newValue) => handleSDContent(e,newValue,i)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            name={"diagnostics.secundary_diagnostics.diagnostic_icd10_impl."+i}
                            label={t('DiagnosticsPanel.secundary_diagnostic')}
                            disabled={disabled}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControl className={classes.paper}>
                      <FormLabel className={classes.label}>
                        {t('DiagnosticsPanel.icd10')}
                      </FormLabel>
                      <FormLabel className={classes.label}>
                        { diagnostics.secundary_diagnostics[i].diagnostic_icd10 }
                      </FormLabel>
                    </FormControl>
                  </Grid>

                </Grid>
              </Card>
            );
          })
        }
      </Box>

      <Box>
        {
          diagnostics.secundary_diagnostics.length < 10 &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                disabled={disabled}
                onClick={handleSDAddClick}
              >
                {t('DiagnosticsPanel.add')}
              </Button>
            </Grid>
          </Grid>
        }
      </Box>
    </Box>
  );
}

export default DiagnosticsPanel;
