// default variables for patient form

const default_patient_data = {
	processid: "",
    name: "",
    gender: "F",
    age: 0,
    institution: "",
    label: "0",
    favorite: false,
	autonomy: {
        bath: 1,
        dress: 1,
        sanitary: 1,
        movement: 1,
        sphincters: 1,
        food: 1
    },
    hospitalization: {
        provenance: "",
        start_date: new Date().toISOString().substring(0, 10),
        clinic_discharge: new Date().toISOString().substring(0, 10),
        social: false,
        real_discharge: new Date().toISOString().substring(0, 10),
        previous_hospitalization: false,
        cause: "",
        rehospitalization: false,
        result: 0,
        destination: ""
    },
    diagnostics: {
        principal_diagnostic: {
            diagnostic_icd10: ""
        },
        secundary_diagnostics: []
    },
    comorbidity: {
        eam: false,
        icc: false,
        peripheral_vascular: false,
        cerebrovascular: false,
        insanity: false,
        chronic_lung: false,
        connective_tissue: false,
        dyspeptic_ulcerative: false,
        mild_liver: false,
        diabetes_wo_organ_inj: false,
        hemiplegia: false,
        modsev_kidney: false,
        diabetes_w_organ_inj: false,
        tumor_wo_metastases: false,
        leukemia: false,
        lymphoma: false,
        modsev_liver: false,
        tumor_w_metastases: false,
        hiv: false
    },
    has_avc: false,
    avc: {
        greenway: false,
        symptoms_hours: 0,
        localization: "",
        treatment: "T",
        probable_etiology: "",
        sequels: ""
    },
    has_pneumonia: false,
    pneumonia: {
        confusion: false,
        urea: false,
        breathing: false,
        paspad: false
    },
    has_infections: false,
    infections: {
        intercorrence: false,
        sepsis: false,
        empirical_antibiotic: "",
        agent_isolation: false,
        agent: "",
        local: "",
        resistences: false,
        change_antibiotic: false,
        antibiotics: [],
        duration: 0,
        finish_home: false,
        more_infections: false,
        infection_count: 0,
        infections: []
    },
    has_complications: false,
    complications: {
        name: ""
    },
    has_cardiac_insufficiency: false,
    cardiac_insufficiency: {
        probable_etiology: "",
        acute: false,
        motive: "",
        stratification: "nyha_i",
        feve: "preserved",
        bnp: "",
        ieca: "to_do",
        blocking_beta: "to_do",
        ara: "to_do",
        spironolactone: "to_do",
        sacubitril_valsartan: "to_do",
        ivabradine: "to_do",
        diuretics: "",
        treatments_response: ""
    },
    has_vni: false,
    vni: {
        motive: ""
    },
    has_old: false,
    procedures: "",
    final_notes: ""
}

export default default_patient_data;
