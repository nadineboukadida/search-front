import { Injectable } from '@angular/core';
import { GENDER, PHASE, PROTOCOL_TYPE, STUDY_OVERALL_STATUS, MAX_AGE_THRESHOLD, MIN_AGE_THRESHOLD } from '../types/search-filters.const';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterHelperService {

  constructor() { }

  getConfigMale() {
    return [GENDER.MALE, GENDER.All];
  }

  getConfigFemale() {
    return [GENDER.FEMALE, GENDER.All];
  }

  getConfigAllGender() {
    return [GENDER.All, GENDER.FEMALE, GENDER.MALE];
  }

  getConfigPhase1() {
    return [PHASE.PHASE_1, PHASE.PHASE_1_OR_2];
  }

  getConfigPhase2() {
    return [PHASE.PHASE_2, PHASE.PHASE_1_OR_2, PHASE.PHASE_2_OR_3];
  }

  getConfigPhase3() {
    return [PHASE.PHASE_3, PHASE.PHASE_2_OR_3, PHASE.PHASE_3_OR_4];
  }

  getConfigPhase4() {
    return [PHASE.PHASE_4, PHASE.PHASE_3_OR_4];
  }

  getConfigAllPhases() {
    return [PHASE.PHASE_1, PHASE.PHASE_2, PHASE.PHASE_3, PHASE.PHASE_4,
    PHASE.PHASE_1_OR_2, PHASE.PHASE_2_OR_3, PHASE.PHASE_3_OR_4];
  }

  getConfigExpandedAccess() {
    return [PROTOCOL_TYPE.EAP];
  }

  getConfigClinicalStudy() {
    return [PROTOCOL_TYPE.CLINICAL_STUDY];
  }

  getConfigAllProtocolTypes() {
    return [PROTOCOL_TYPE.EAP, PROTOCOL_TYPE.CLINICAL_STUDY];
  }

  getConfigRecruitingStatus() {
    return [STUDY_OVERALL_STATUS.RECRUITING];
  }

  getConfigAvailableStatus() {
    return [STUDY_OVERALL_STATUS.AVAILABLE];
  }

  getConfigAllStatus() {
    return [STUDY_OVERALL_STATUS.AVAILABLE, STUDY_OVERALL_STATUS.RECRUITING, STUDY_OVERALL_STATUS.NOT_YET_RECRUITING, STUDY_OVERALL_STATUS.UNKNOWN];
  }

  getStudyDefaultConfiguration() {
    return {
      ageLt: MAX_AGE_THRESHOLD,
      ageGt: MIN_AGE_THRESHOLD,
      phaseIn: [PHASE.PHASE_EAP],
      protocolTypeIn: [],
      genderIn: [],
      overallStatusIn: [STUDY_OVERALL_STATUS.AVAILABLE]
    }
  }

  setFilters(filter: any, form: any) {
    filter = this._setFilterAge(filter, form);
    filter = this._setFilterPhases(filter, form);
    filter = this._setFilterProtocolType(filter, form);
    filter = this._setFilterGender(filter, form);
    filter = this._setTrialStatus(filter, form);
    return filter;
  }

  /**
   * =========
   * PRIVATE METHODS
   * =========
   */

  private _setFilterAge(filter: any, form: any) {
    if (form.Age) {
      var Lt = parseInt(form.Age) + 1;
      var Gt = parseInt(form.Age) - 1;
      filter.ageLt = Lt + '';
      filter.ageGt = Gt + '';
    }
    return filter;
  }

  private _setFilterPhases(filter: any, form: any) {
    if (form.Phase1) {
      filter.phaseIn.push(PHASE.PHASE_1);
    }
    if (form.Phase2) {
      filter.phaseIn.push(PHASE.PHASE_2);
    }
    if (form.Phase3) {
      filter.phaseIn.push(PHASE.PHASE_3);
    }
    if (form.Phase4) {
      filter.phaseIn.push(PHASE.PHASE_4);
    }
    if (form.PhaseNotSpecified) {
      filter.phaseIn.push(PHASE.PHASENOTSPECIFIED);
    }
    if (form.Phase1 && form.Phase2) {
      filter.phaseIn.push(PHASE.PHASE_1_OR_2);
    }
    if (form.Phase2 && form.Phase3) {
      filter.phaseIn.push(PHASE.PHASE_2_OR_3);
    }
    if (form.Phase3 !== false && form.Phase4 !== false) {
      filter.phaseIn.push(PHASE.PHASE_3_OR_4);
    }
    return filter;
  }

  private _setFilterProtocolType(filter: any, form: any) {
    if (form.ExpandedAccess) {
      filter.protocolTypeIn.push(PROTOCOL_TYPE.EAP);
    }
    if (form.ClinicalStudy) {
      filter.protocolTypeIn.push(PROTOCOL_TYPE.CLINICAL_STUDY);
    }
    return filter;
  }

  private _setTrialStatus(filter: any, form: any) {
    if (form.Available) {
      filter.overallStatusIn.push(STUDY_OVERALL_STATUS.AVAILABLE)
    }
    if (form.NotYetRecruiting) {
      filter.overallStatusIn.push(STUDY_OVERALL_STATUS.NOT_YET_RECRUITING)
    }
    if (form.Recruiting) {
      filter.overallStatusIn.push(STUDY_OVERALL_STATUS.RECRUITING)
    }
    if (form.UnknownStatus) {
      filter.overallStatusIn.push(STUDY_OVERALL_STATUS.UNKNOWN)
    }

    return filter;

  }

  private _setFilterGender(filter: any, form: any) {
    if (form.Sex) {
      if (form.Sex !== GENDER.All) {
        filter.genderIn.push(form.Sex);
        filter.genderIn.push(GENDER.All);
      }
      else {
        filter.genderIn = this.getConfigAllGender();
      }
    }
    return filter;
  }
}
