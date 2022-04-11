import { Component } from '@angular/core';

@Component({
  selector: 'app-poem-rules',
  templateUrl: './poem-rules.component.html',
  styleUrls: ['./poem-rules.component.scss']
})
export class PoemRulesComponent {

  non_poem = ["Diagnostic trials", "Observational trials", "Surgical trials", "Aesthetic trials (e.g.subcutaneous fat removal)", "Dental trials", "Anasthetical trials", "Trials including only healthy volunteers", "Trials switching from approved therapy to another approved therapy (e.g.HIV trials)", "Extension studies", "Vaccine studies", "Trials investigating supplements", "Trials investigating homeopathy", "Studies aimed only to improve easiness (e.g.hypofractioned radiation therapy compared to radiation therapy)", "Preventive antibiotic trials", "Trials with no scientific rationale (e.g.oral curcumin)", "Studies preventing a complication", "Studies comparing two state of the art drugs (e.g.morphine vs tramadol in chronic pain)", "Pharmacokinetic studies with approved drugs", "ICU studies(removed since 23APR2021)", "Approved therapies studied in children", "Trials investigating lowered dosing regimens of approved drugs (e.g.de-escalating chemotherapy regimens)", "Studies investigating post operative pain(removed since 23APR2021)", "Ex vivo / pre clinical studies", "Acute trials (e.g.MI trials)", "Trials investigating metabolomic treatments (e.g.adding statin to chemotherapy)", "Trials investigating cannabis for pain", "Trials investigating traditional Chinese medicine", "Trials investigating reduction of therapy (e.g.immunosuppresive drugs in stable remission autoimmune diseases)", "Trials investigating a temporary intervention (e.g.Entresto in relation to postprandial glucose peaks)", "Trials not treating the disease itself (e.g.filgastrim on recovery time after HSCT in multiple myeloma)", "Non inferiority trials"]

  non_poem_conditions = [
    'Missed abortion',
    "Prevention of materinal peripartum infection",
    "Labour induction",
    "Organ transplantation",
    "Conditioning regimens",
    "Wound healing",
    "Poor ovarian reserve"
  ]

  re_evaluation = [
    "COVID-19",
    "Helicobacter Pylori Infection",
    "Post-operative pain"
  ]
}
