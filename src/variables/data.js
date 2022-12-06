const sample_data = [
    {
        "id": 1,
        "processid": "9327793",
        "name": "Antonio Fonseca Reis Vigario",
        "gender": "M",
        "age": 76,
        "label": 0,
        "autonomy": {
            "designation": "No dependency",
            "score": 6
        },
        "hospitalization": {
            "clinic_discharge": "2018-01-02",
            "clinic_duration": 16,
            "result": 0
        },
        "diagnostics": {
            "principal_diagnostic": {
                "diagnostic": "Enfarte agudo do miocárdio sem elevação do ST (NSTEMI)",
                "diagnostic_icd10": "I21.4"
            }
        },
        "comorbidity": {
            "score": 10,
            "survival": 0.53392
        },
        "has_avc": false,
        "has_pneumonia": false,
        "pneumonia" : null,
        "has_infections": false,
        "has_cardiac_insufficiency": true
    },
    {
        "id": 2,
        "processid": "2254957",
        "name": "Isaura Santos Felix Marques",
        "gender": "F",
        "age": 79,
        "label": 0,
        "autonomy": {
            "designation": "Slight dependency",
            "score": 5
        },
        "hospitalization": {
            "clinic_discharge": "2018-01-02",
            "clinic_duration": 16,
            "result": 1
        },
        "diagnostics": {
            "principal_diagnostic": {
                "diagnostic": "Flutter e fibrilação atrial",
                "diagnostic_icd10": "I48"
            }
        },
        "comorbidity": {
            "score": 4,
            "survival": 0.53392
        },
        "has_avc": false,
        "has_pneumonia": false,
        "pneumonia" : null,
        "has_infections": true,
        "has_cardiac_insufficiency": true
    },
    {
        "id": 3,
        "processid": "15673588",
        "name": "Francisco Jose Azevedo Martins",
        "gender": "M",
        "age": 74,
        "label": 0,
        "autonomy": {
            "designation": "Morerate dependency",
            "score": 4
        },
        "hospitalization": {
            "clinic_discharge": "2018-01-05",
            "clinic_duration": 14,
            "result": 0
        },
        "diagnostics": {
            "principal_diagnostic": {
                "diagnostic": "Pneumonia devida a escherichia coli [e. coli]",
                "diagnostic_icd10": "J15.5"
            }
        },
        "comorbidity": {
            "score": 4,
            "survival": 0.53392
        },
        "has_avc": false,
        "has_pneumonia": true,
        "pneumonia" : {
            "score": 2,
            "result": "Intermediate mortality - hospitalization"
        },
        "has_infections": true,
        "has_cardiac_insufficiency": false
    },
    {
        "id": 4,
        "processid": "97201445",
        "name": "Maria Nazare Ribeiro",
        "gender": "F",
        "age": 81,
        "label": 0,
        "autonomy": {
            "designation": "Serious dependency",
            "score": 2
        },
        "hospitalization": {
            "clinic_discharge": "2018-01-03",
            "clinic_duration": 18,
            "result": 0
        },
        "diagnostics": {
            "principal_diagnostic": {
                "diagnostic": "Anemia hemoló­tica adquirida",
                "diagnostic_icd10": "D59"
            }
        },
        "comorbidity": {
            "score": 5,
            "survival": 0.53392
        },
        "has_avc": false,
        "has_pneumonia": false,
        "pneumonia" : null,
        "has_infections": true,
        "has_cardiac_insufficiency": false
    },
    {
        "id": 6,
        "processid": "6286193",
        "name": "Maria Carmo Marques Delgado Vitorino",
        "gender": "F",
        "age": 67,
        "label": 0,
        "autonomy": {
            "designation": "Total dependency",
            "score": 0
        },
        "hospitalization": {
            "clinic_discharge": "2018-01-12",
            "clinic_duration": 9,
            "result": 0
        },
        "diagnostics": {
            "principal_diagnostic": {
                "diagnostic": "Enfarte cerebral",
                "diagnostic_icd10": "I63"
            }
        },
        "comorbidity": {
            "score": 3,
            "survival": 0.53392
        },
        "has_avc": true,
        "has_pneumonia": false,
        "pneumonia" : null,
        "has_infections": false,
        "has_cardiac_insufficiency": false
    }
];

export default sample_data;
