// variables
import ICD10_CODES from './icd10';

const validatePatientInfo = (formData) => {
  const { processid, name, gender, age } = formData;
  return processid !== "" &&
    name !== "" && 
    age > 0 && 
    (gender === "M" || gender === "F");
}

const validateAutonomy = (formData) => {
  const { autonomy } = formData;
  return (autonomy.bath === 0 || autonomy.bath === 1) && 
    (autonomy.dress === 0 || autonomy.dress === 1) &&
    (autonomy.sanitary === 0 || autonomy.sanitary === 1) &&
    (autonomy.movement === 0 || autonomy.movement === 1) &&
    (autonomy.sphincters === 0 || autonomy.sphincters === 1) &&
    (autonomy.food === 0 || autonomy.food === 1);
}

const validateHospitalization = (formData) => {
  const { hospitalization } = formData;
  var isValid = true;
  isValid = isValid && hospitalization.clinic_discharge >= hospitalization.start_date;
  if (hospitalization.social === true) {
    isValid = isValid && hospitalization.real_discharge >= hospitalization.start_date;
  }
  return isValid;
}

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

const validateDiagnostics = (formData) => {
  const { diagnostics } = formData;
  var isValid = true;
  var value = lookup_diagnostic(diagnostics.principal_diagnostic.diagnostic_icd10);
  isValid = isValid && value["code"] !== "";
  for (var i = 0; i < diagnostics.secundary_diagnostics.length; i++) {
    value = lookup_diagnostic(diagnostics.secundary_diagnostics[i].diagnostic_icd10);
    isValid = isValid && value["code"] !== "";
  }
  return isValid;
}

const validateComorbidity = (formData) => {
  const { comorbidity } = formData;
  return (comorbidity.eam === false || comorbidity.eam === true) &&
    (comorbidity.icc === false || comorbidity.icc === true) &&
    (comorbidity.peripheral_vascular === false || comorbidity.peripheral_vascular === true) &&
    (comorbidity.cerebrovascular === false || comorbidity.cerebrovascular === true) &&
    (comorbidity.insanity === false || comorbidity.insanity === true) &&
    (comorbidity.chronic_lung === false || comorbidity.chronic_lung === true) &&
    (comorbidity.connective_tissue === false || comorbidity.connective_tissue === true) &&
    (comorbidity.dyspeptic_ulcerative === false || comorbidity.dyspeptic_ulcerative === true) &&
    (comorbidity.mild_liver === false || comorbidity.mild_liver === true) &&
    (comorbidity.diabetes_wo_organ_inj === false || comorbidity.diabetes_wo_organ_inj === true) &&
    (comorbidity.hemiplegia === false || comorbidity.hemiplegia === true) &&
    (comorbidity.modsev_kidney === false || comorbidity.modsev_kidney === true) &&
    (comorbidity.diabetes_w_organ_inj === false || comorbidity.diabetes_w_organ_inj === true) &&
    (comorbidity.tumor_wo_metastases === false || comorbidity.tumor_wo_metastases === true) &&
    (comorbidity.leukemia === false || comorbidity.leukemia === true) &&
    (comorbidity.lymphoma === false || comorbidity.lymphoma === true) &&
    (comorbidity.modsev_liver === false || comorbidity.modsev_liver === true) &&
    (comorbidity.tumor_w_metastases === false || comorbidity.tumor_w_metastases === true) &&
    (comorbidity.hiv === false || comorbidity.hiv === true); 
}

const validateAvc = (formData) => {
  const { has_avc, avc } = formData;
  var isValid = true;
  isValid = isValid && (has_avc === true || has_avc === false);
  if (has_avc === true) {
    isValid = isValid && (avc.greenway === true || avc.greenway === false);
    isValid = isValid && avc.symptoms_hours >= 0;
    isValid = isValid && (avc.treatment === "T" || avc.treatment === "E" || avc.treatment === "C");
  }
  return isValid;
}

const validatePneumonia = (formData) => {
  const { has_pneumonia, pneumonia } = formData;
  var isValid = true;
  isValid = isValid && (has_pneumonia === true || has_pneumonia === false);
  if (has_pneumonia === true) {
    isValid = isValid && (pneumonia.confusion === true || pneumonia.confusion === false);
    isValid = isValid && (pneumonia.urea === true || pneumonia.urea === false);
    isValid = isValid && (pneumonia.breathing === true || pneumonia.breathing === false);
    isValid = isValid && (pneumonia.paspad === true || pneumonia.paspad === false);
  }
  return isValid;
}

const validateInfections = (formData) => {
  const { has_infections, infections } = formData;
  var isValid = true;
  isValid = isValid && (has_infections === true || has_infections === false);
  if (has_infections === true) {
    isValid = isValid && (infections.intercorrence === true || infections.intercorrence === false);
    isValid = isValid && (infections.sepsis === true || infections.sepsis === false);
    isValid = isValid && (infections.agent_isolation === true || infections.agent_isolation === false);
    isValid = isValid && (infections.resistences === true || infections.resistences === false);
    isValid = isValid && (infections.change_antibiotic === true || infections.change_antibiotic === false);
    if (infections.change_antibiotic === true) {
      for (var i = 0; i < infections.antibiotics.length; i++) {
        isValid = isValid && infections.antibiotics[i] !== "";
      }
    }
    isValid = isValid && infections.duration >= 0;
    isValid = isValid && (infections.finish_home === true || infections.finish_home === false);
    isValid = isValid && (infections.more_infections === true || infections.more_infections === false);
    if (infections.more_infections === true) {
      isValid = isValid && infections.infection_count > 0;
      for (var j = 0; j < infections.infections.length; j++) {
        isValid = isValid && infections.infections[j].duration >= 0;
      }
    }
  }
  return isValid;
}

const validateComplications = (formData) => {
  const { has_complications, complications } = formData;
  var isValid = true;
  isValid = isValid && (has_complications === true || has_complications === false);
  if (has_complications === true) {
    isValid = isValid && complications.name !== "";
  }
  return isValid;
}

const validateCardiacInsufficiency = (formData) => {
  const { has_cardiac_insufficiency, cardiac_insufficiency } = formData;
  var isValid = true;
  isValid = isValid && (has_cardiac_insufficiency === true || has_cardiac_insufficiency === false);
  if (has_cardiac_insufficiency === true) {
    isValid = isValid && (cardiac_insufficiency.acute === true || cardiac_insufficiency.acute === false);
    isValid = isValid && (cardiac_insufficiency.stratification === "nyha_i" || cardiac_insufficiency.stratification === "nyha_ii" || cardiac_insufficiency.stratification === "nyha_iii" || cardiac_insufficiency.stratification === "nyha_iv");
    isValid = isValid && (cardiac_insufficiency.feve === "preserved" || cardiac_insufficiency.feve === "intermediate" || cardiac_insufficiency.feve === "reduced");
    isValid = isValid && (cardiac_insufficiency.ieca === "to_do" || cardiac_insufficiency.ieca === "introduced");
    isValid = isValid && (cardiac_insufficiency.blocking_beta === "to_do" || cardiac_insufficiency.blocking_beta === "introduced");
    isValid = isValid && (cardiac_insufficiency.ara === "to_do" || cardiac_insufficiency.ara === "introduced");
    isValid = isValid && (cardiac_insufficiency.spironolactone === "to_do" || cardiac_insufficiency.spironolactone === "introduced");
    isValid = isValid && (cardiac_insufficiency.sacubitril_valsartan === "to_do" || cardiac_insufficiency.sacubitril_valsartan === "introduced");
    isValid = isValid && (cardiac_insufficiency.ivabradine === "to_do" || cardiac_insufficiency.ivabradine === "introduced");
  }
  return isValid;
}

const validateVni = (formData) => {
  const { has_vni, vni } = formData;
  var isValid = true;
  isValid = isValid && (has_vni === true || has_vni === false);
  if (has_vni === true) {
    isValid = isValid && vni.motive !== "";
  }
  return isValid;
}

const validateOld = (formData) => {
  const { has_old } = formData;
  return (has_old === true || has_old === false);
}

const validateProcedures = (formData) => {
  return true;
}

const validateFinalNotes = (formData) => {
  return true;
}

const validateData = (formData, panelIndex = -1) => {
  var isValid = true;
  var stepCheck;
  var steps = {}
  if (panelIndex === 0 || panelIndex === -1) {
    stepCheck = validatePatientInfo(formData);
    isValid = isValid && stepCheck;
    steps[0] = stepCheck;
  }
  if (panelIndex === 1 || panelIndex === -1) {
    stepCheck = validateAutonomy(formData);
    isValid = isValid && stepCheck;
    steps[1] = stepCheck;
  }
  if (panelIndex === 2 || panelIndex === -1) {
    stepCheck = validateHospitalization(formData);
    isValid = isValid && stepCheck;
    steps[2] = stepCheck;
  }
  if (panelIndex === 3 || panelIndex === -1) {
    stepCheck = validateDiagnostics(formData);
    isValid = isValid && stepCheck;
    steps[3] = stepCheck;
  }
  if (panelIndex === 4 || panelIndex === -1) {
    stepCheck = validateComorbidity(formData);
    isValid = isValid && stepCheck;
    steps[4] = stepCheck;
  }
  if (panelIndex === 5 || panelIndex === -1) {
    stepCheck = validateAvc(formData);
    isValid = isValid && stepCheck;
    steps[5] = stepCheck;
  }
  if (panelIndex === 6 || panelIndex === -1) {
    stepCheck = validatePneumonia(formData);
    isValid = isValid && stepCheck;
    steps[6] = stepCheck;
  }
  if (panelIndex === 7 || panelIndex === -1) {
    stepCheck = validateInfections(formData);
    isValid = isValid && stepCheck;
    steps[7] = stepCheck;
  }
  if (panelIndex === 8 || panelIndex === -1) {
    stepCheck = validateComplications(formData);
    isValid = isValid && stepCheck;
    steps[8] = stepCheck;
  }
  if (panelIndex === 9 || panelIndex === -1) {
    stepCheck = validateCardiacInsufficiency(formData);
    isValid = isValid && stepCheck;
    steps[9] = stepCheck;
  }
  if (panelIndex === 10 || panelIndex === -1) {
    stepCheck = validateVni(formData);
    isValid = isValid && stepCheck;
    steps[10] = stepCheck;
  }
  if (panelIndex === 11 || panelIndex === -1) {
    stepCheck = validateOld(formData);
    isValid = isValid && stepCheck;
    steps[11] = stepCheck;
  }
  if (panelIndex === 12 || panelIndex === -1) {
    stepCheck = validateProcedures(formData);
    isValid = isValid && stepCheck;
    steps[12] = stepCheck;
  }
  if (panelIndex === 13 || panelIndex === -1) {
    stepCheck = validateFinalNotes(formData);
    isValid = isValid && stepCheck;
    steps[13] = stepCheck;
  }
  return {
    isValid: isValid,
    steps: steps
  };
}

export default validateData;