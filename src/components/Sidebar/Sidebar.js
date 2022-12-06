/*eslint-disable*/
import React from "react";
// enable translations
import {useTranslation} from "react-i18next";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

function Sidebar(props) {
  const classes = useStyles();
  const {t} = useTranslation('global');
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { logo, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        // highlight current selected item
        var listItemClasses = classNames({
          [" " + classes["green"]]: activeRoute(prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={t(prop.name)}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="/" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  var user = (
    <div>
      <div className={classes.user}>
        <div className={classNames(classes.userAvatarBox)}>
          <div className={classes.userAvatarLogo}>
            <Avatar className={classNames(classes.green, classes.userAvatar)}>
              {props.first_name[0] + props.last_name[0]}
            </Avatar>
          </div>
          {props.first_name + " " + props.last_name}
        </div>
        <List className={classes.userList}>
          <NavLink
            to="/logout"
            className={classes.item}
            activeClassName="active"
          >
            <ListItem button className={classes.userItemLink}>
              <ExitToAppIcon className={classNames(classes.itemIcon)} />
              <ListItemText
                  primary={t('Sidebar.logout')}
                  className={classNames(classes.itemText)}
                  disableTypography={true}
                />
            </ListItem>
          </NavLink>
        </List>
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          {user}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>  
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          {user}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logo: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    first_name: state.first_name,
    last_name: state.last_name,
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps, null)(Sidebar);