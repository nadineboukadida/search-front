import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-local-save-checkbox',
  templateUrl: './local-save-checkbox.component.html',
  styleUrls: ['./local-save-checkbox.component.css']
})
export class LocalSaveCheckboxComponent {

  @Input() id: any;

  handleSelection(trialId: any) {
    let currentSaved = localStorage.getItem('saved_trials')
    if (!currentSaved) {
      localStorage.setItem('saved_trials', JSON.stringify([trialId]))
    } else {
      let currentSavedLst = JSON.parse(currentSaved)
      if (currentSavedLst.includes(trialId)) {
        currentSavedLst.splice(currentSavedLst.indexOf(trialId), 1);
        localStorage.setItem('saved_trials', JSON.stringify(currentSavedLst))
      } else {
        currentSavedLst.push(trialId)
        localStorage.setItem('saved_trials', JSON.stringify(currentSavedLst))
      }
    }
  }

  inLocalStorage(trialId: any) {
    let currentSaved = localStorage.getItem('saved_trials')
    if (!currentSaved) {
      return false
    } else {
      return JSON.parse(currentSaved).includes(trialId)
    }
  }

}
