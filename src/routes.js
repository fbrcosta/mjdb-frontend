/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// core components/views for Admin layout
//import DashboardView from "views/DashboardView";
import StatisticPanel from "views/StatisticPanel";
import PatientsView from "views/PatientsView";
import NewPatientView from "views/NewPatientView";

const mjdbRoutes = [
/*
  {
    path: "/mjdb/dashboard",
    name: 'Sidebar.dashboard',
    icon: Dashboard,
    component: DashboardView
  },
*/
  {
    path: "/mjdb/statistics",
    name: 'Sidebar.dashboard',
    icon: Dashboard,
    component: StatisticPanel
  },
  {
    path: "/mjdb/patients",
    name: 'Sidebar.patients',
    icon: Person,
    component: PatientsView
  },
  {
    path: "/mjdb/addpatient",
    name: 'Sidebar.new_patient',
    icon: PersonAddIcon,
    component: NewPatientView
  }
];

export default mjdbRoutes;
