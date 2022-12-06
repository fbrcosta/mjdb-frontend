// custom components
import InfoPanel from './Panels/InfoPanel';
import AutonomyPanel from './Panels/AutonomyPanel';
import HospitalizationPanel from './Panels/HospitalizationPanel';
import DiagnosticsPanel from './Panels/DiagnosticsPanel';
import ComorbidityPanel from './Panels/ComorbidityPanel';
import AvcPanel from './Panels/AvcPanel';
import PneumoniaPanel from './Panels/PneumoniaPanel';
import InfectionsPanel from './Panels/InfectionsPanel';
import ComplicationsPanel from './Panels/ComplicationsPanel';
import CardiacInsufficiencyPanel from './Panels/CardiacInsufficiencyPanel';
import VniPanel from './Panels/VniPanel';
import OldPanel from './Panels/OldPanel';
import ProceduresPanel from './Panels/ProceduresPanel';
import FinalNotesPanel from './Panels/FinalNotesPanel';

const patientFormSteps = [
  {
    name: 'NewPatientView.patient_info',
    component: InfoPanel
  },
  {
    name: 'NewPatientView.autonomy',
    component: AutonomyPanel 
  },
  {
    name: 'NewPatientView.hospitalization',
    component: HospitalizationPanel 
  },
  {
    name: 'NewPatientView.diagnostics',
    component: DiagnosticsPanel 
  },
  {
    name: 'NewPatientView.comorbidity',
    component: ComorbidityPanel 
  },
  {
    name: 'NewPatientView.avc',
    component: AvcPanel 
  },
  {
    name: 'NewPatientView.pneumonia',
    component: PneumoniaPanel 
  },
  {
    name: 'NewPatientView.infections',
    component: InfectionsPanel 
  },
  {
    name: 'NewPatientView.complications',
    component: ComplicationsPanel 
  },
  {
    name: 'NewPatientView.cardiac_insufficiency',
    component: CardiacInsufficiencyPanel 
  },
  {
    name: 'NewPatientView.vni',
    component: VniPanel 
  },
  {
    name: 'NewPatientView.old',
    component: OldPanel 
  },
  {
    name: 'NewPatientView.procedures',
    component: ProceduresPanel 
  },
  {
    name: 'NewPatientView.final_notes',
    component: FinalNotesPanel 
  }
];

export default patientFormSteps;