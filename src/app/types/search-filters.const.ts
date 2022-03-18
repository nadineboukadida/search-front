export const MAX_AGE_THRESHOLD = '500';
export const MIN_AGE_THRESHOLD = '-1';

export enum PHASE {
    PHASE_1 = 'Phase 1',
    PHASE_2 = 'Phase 2',
    PHASE_3 = 'Phase 3',
    PHASE_4 = 'Phase 4',
    PHASE_1_OR_2 = 'Phase 1/2',
    PHASE_2_OR_3 = 'Phase 2/3',
    PHASE_3_OR_4 = 'Phase 3/4',
    PHASE_EAP = 'EAP',
    PHASENOTSPECIFIED = 'Phase Unknown'

}

export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
    All = 'All'
}

export enum STUDY_OVERALL_STATUS {
    AVAILABLE = 'Available',
    RECRUITING = 'Recruiting',
    NOT_YET_RECRUITING = 'Not yet recruiting',
    UNKNOWN = 'Unknown status'

}

export enum PROTOCOL_TYPE {
    CLINICAL_STUDY = 'Clinical Study',
    EAP = 'Expanded Access',
}

export enum AUTOCOMPLETE {
    CONDITION = 'condition',
    GENE = 'gene',
    GEO = 'geo'
}

export const FILTERS_DEFAULT_VALUES = {
    Phase1: true,
    Phase2: true,
    Phase3: true,
    Phase4: false,
    // phase_eap: true,
    PhaseNotSpecified: false,

    ClinicalStudy: true,
    ExpandedAccess: true,

    NotYetRecruiting: true,
    Recruiting: true,
    UnknownStatus: false,

    Age: null,
    Sex: 'All'
}