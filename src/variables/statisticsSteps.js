// custom components
import TestPanel from '../components/StatisticsPanels/TestPanel';
import AgesPanel from '../components/StatisticsPanels/AgesPanel';
import GendersPanel from '../components/StatisticsPanels/GendersPanel';
import AutonomiesPanel from '../components/StatisticsPanels/AutonomiesPanel';
import ProvenancesPanel from '../components/StatisticsPanels/ProvenancesPanel';
import HospitalizationsClinicPanel from '../components/StatisticsPanels/HospitalizationsClinicPanel';
import HospitalizationsRealPanel from '../components/StatisticsPanels/HospitalizationsRealPanel';
import SocialsPanel from '../components/StatisticsPanels/SocialsPanel';
import RehospitalizationsPanel from '../components/StatisticsPanels/RehospitalizationsPanel';
import DestinationsPanel from '../components/StatisticsPanels/DestinationsPanel';
import DiagnosticsngPanel from '../components/StatisticsPanels/DiagnosticsngPanel';
import DiagnosticsicdPanelI from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelI';
import DiagnosticsicdPanelII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelII';
import DiagnosticsicdPanelIII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelIII';
import DiagnosticsicdPanelIV from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelIV';
import DiagnosticsicdPanelV from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelV';
import DiagnosticsicdPanelVI from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelVI';
import DiagnosticsicdPanelVII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelVII';
import DiagnosticsicdPanelVIII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelVIII';
import DiagnosticsicdPanelIX from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelIX';
import DiagnosticsicdPanelX from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelX';
import DiagnosticsicdPanelXI from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXI';
import DiagnosticsicdPanelXII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXII';
import DiagnosticsicdPanelXIII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXIII';
import DiagnosticsicdPanelXIV from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXIV';
import DiagnosticsicdPanelXV from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXV';
import DiagnosticsicdPanelXVI from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXVI';
import DiagnosticsicdPanelXVII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXVII';
import DiagnosticsicdPanelXVIII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXVIII';
import DiagnosticsicdPanelXIX from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXIX';
import DiagnosticsicdPanelXX from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXX';
import DiagnosticsicdPanelXXI from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXXI';
import DiagnosticsicdPanelXXII from '../components/StatisticsPanels/Diagnosticsicd/DiagnosticsicdPanelXXII';

const statisticsSteps = [
  {
    name: 'StatisticsPanel.age',
    component: AgesPanel
  },
  {
    name: 'StatisticsPanel.genders',
    component: GendersPanel 
  },
  {
    name: 'StatisticsPanel.katz',
    component: AutonomiesPanel 
  },
  {
    name: 'StatisticsPanel.provenance',
    component: ProvenancesPanel 
  },
  {
    name: 'StatisticsPanel.hospitalizations_clinic',
    component: HospitalizationsClinicPanel 
  },
  {
    name: 'StatisticsPanel.hospitalizations_real',
    component: HospitalizationsRealPanel 
  },
  {
    name: 'StatisticsPanel.socials',
    component: SocialsPanel 
  },
  {
    name: 'StatisticsPanel.rehospitalizations',
    component: RehospitalizationsPanel 
  },
  {
    name: 'StatisticsPanel.destinations',
    component: DestinationsPanel 
  },
  {
    name: 'StatisticsPanel.diagnosticsng',
    component: DiagnosticsngPanel 
  },
  {
    name: 'StatisticsPanel.diagnosticsicdi',
    component: DiagnosticsicdPanelI
  },
  {
    name: 'StatisticsPanel.diagnosticsicdii',
    component: DiagnosticsicdPanelII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdiii',
    component: DiagnosticsicdPanelIII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdiv',
    component: DiagnosticsicdPanelIV
  },
  {
    name: 'StatisticsPanel.diagnosticsicdv',
    component: DiagnosticsicdPanelV
  },
  {
    name: 'StatisticsPanel.diagnosticsicdvi',
    component: DiagnosticsicdPanelVI
  },
  {
    name: 'StatisticsPanel.diagnosticsicdvii',
    component: DiagnosticsicdPanelVII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdviii',
    component: DiagnosticsicdPanelVIII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdix',
    component: DiagnosticsicdPanelIX
  },
  {
    name: 'StatisticsPanel.diagnosticsicdx',
    component: DiagnosticsicdPanelX
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxi',
    component: DiagnosticsicdPanelXI
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxii',
    component: DiagnosticsicdPanelXII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxiii',
    component: DiagnosticsicdPanelXIII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxiv',
    component: DiagnosticsicdPanelXIV
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxv',
    component: DiagnosticsicdPanelXV
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxvi',
    component: DiagnosticsicdPanelXVI
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxvii',
    component: DiagnosticsicdPanelXVII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdixviii',
    component: DiagnosticsicdPanelXVIII
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxix',
    component: DiagnosticsicdPanelXIX
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxx',
    component: DiagnosticsicdPanelXX
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxxi',
    component: DiagnosticsicdPanelXXI
  },
  {
    name: 'StatisticsPanel.diagnosticsicdxxii',
    component: DiagnosticsicdPanelXXII
  },
];

export default statisticsSteps;