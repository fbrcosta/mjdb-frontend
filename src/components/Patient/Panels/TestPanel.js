/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// core components

import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  
}));

export default function TestPanel(props) {
  const classes = useStyles();
  const {t, i18n} = useTranslation('global');

  return (
    <div>
      <TextField 
        id="standard-basic" 
        label={t('welcome.title', {framework:'React'})} />
    </div>
  );
} 
