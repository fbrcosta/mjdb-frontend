import React from 'react';
// enable translations
import {useTranslation} from "react-i18next";

import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from '../components/Copyright';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let credentials = {
  username: "",
  password: ""
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(
      actions.authLogin(username, password)
    )
  }
}

function LoginView(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAuth(credentials.username, credentials.password);
  }

  let errorMessage = null;

  if (props.error) (
    errorMessage = (
      <p>{props.error.message}</p>
    )
  )

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('LoginView.signin')}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('LoginView.username')}
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => credentials.username = e.target.value}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('LoginView.password')}
              type="password"
              id="password"
              autoComplete="password"
              onChange={e => credentials.password = e.target.value}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t('LoginView.remember')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('LoginView.signin_button')}
            </Button>

            {errorMessage}
            {props.token}
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));
