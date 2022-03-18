import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-mobile-card',
  templateUrl: './search-mobile-card.component.html',
  styleUrls: ['./search-mobile-card.component.css']
})
export class SearchMobileCardComponent {

  @Input() id: any;
  @Input() title: any;
  @Input() interventions: any;
  @Input() phase: any;
  @Input() locations: any;
  @Input() type: any;
  @Input() status: any;
  @Input() reports_as_closed: any;

  constructor(private router: Router) {};

  getInterventions = () => {
    return this.interventions.join(', ')
  }

  getPhase = () => {
    if (this.phase === "EAP") {
      return this.phase
    } else {
      return this.phase.split("Phase ")[1]
    }
  }

  goToDetails(trialId: any) {
    this.router.navigate(['/search', trialId]);
  }

}
