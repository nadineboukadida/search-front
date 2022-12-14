import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchFilterHelperService } from './search-filter-helper.service';
import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private headers = { "Content-Type": "application/json" };

  private searchResults = new BehaviorSubject({});
  searchResults$ = this.searchResults.asObservable();

  private filteredResults = new BehaviorSubject({});
  filteredResults$ = this.filteredResults.asObservable();

  private trialDetails = new BehaviorSubject({});
  trialDetails$ = this.trialDetails.asObservable();

  constructor(
    private httpClient: HttpClient,
    private filterService: SearchFilterHelperService,
    private endpointService: EndpointsService
  ) {}

  private url = `https://${this.endpointService.getEndpoint()}.mytomorrows.com/gql/graphql`;

  getTrialsQuery = (trial_ids_str: string, sort_str: any) => `query {
    studies(
      where:{id_IN:${trial_ids_str}}, options: {sort: {${sort_str}}}) {
        id
        protocol_type
        phase
        overall_status
        title
        interventions
        location
        reports_as_closed
    }
  }`;

  getTrials(trial_ids: any[], sort_str = "phase: DESC") {
    let body = JSON.stringify({
      query: this.getTrialsQuery(JSON.stringify(trial_ids), sort_str),
    });
    this.httpClient
      .post(this.url, body, { headers: this.headers })
      .subscribe((response: any) => {
        this.searchResults.next(response);
      });
  }

  getTrialDetailsQuery = (trialIdStr: string) => `query {
    studies(where:{id:"${trialIdStr}"}) {
      id
      gender
      protocol_type
      phase
      overall_status
      title
      interventions
      conditions
      start_date
      end_date
      brief_summary
      reports_as_closed
      minimum_age
      maximum_age
      eligibility
      references
      countries_and_sites
      locatedAt {
        sitename
        city
        countryname
      }
    }
  }`;

  getTrialDetails(trialId: string) {
    let body = JSON.stringify({
      query: this.getTrialDetailsQuery(trialId),
    });
    this.httpClient
      .post(this.url, body, { headers: this.headers })
      .subscribe((response: any) => {
        this.trialDetails.next(response);
      });
  }

  getFilteredTrialsQuery = (condition: string, filters: any) => `query {
    aliases(where: { alias: "${condition}" }) {
      aliasStudiedIn(
        where:{AND:[
          {phase_IN: ${JSON.stringify(filters.phaseIn)}},
          {OR: [{maximum_age_GT: ${parseInt(
            filters.ageGt
          )}}, {maximum_age: null}]},
          {OR: [{minimum_age_LT: ${parseInt(
            filters.ageLt
          )}}, {minimum_age: null}]},
          {protocol_type_IN: ${JSON.stringify(filters.protocolTypeIn)}},
          {gender_IN: ${JSON.stringify(filters.genderIn)}},
          {overall_status_IN: ${JSON.stringify(filters.overallStatusIn)}}
      ]}) {
        id
      }
    }
  }`;

  getFilteredTrialsCountryQuery = (
    condition: string,
    country: string,
    filters: any
  ) => `query {
    aliases(where: { alias: "${condition}" }) {
      aliasStudiedIn(
        where:{AND:[
          {phase_IN: ${JSON.stringify(filters.phaseIn)}},
          {OR: [{maximum_age_GT: ${parseInt(
            filters.ageGt
          )}}, {maximum_age: null}]},
          {OR: [{minimum_age_LT: ${parseInt(
            filters.ageLt
          )}}, {minimum_age: null}]},
          {protocol_type_IN: ${JSON.stringify(filters.protocolTypeIn)}},
          {gender_IN: ${JSON.stringify(filters.genderIn)}},
          {overall_status_IN: ${JSON.stringify(filters.overallStatusIn)}},
          {location_INCLUDES:"${country}"}
      ]}) {
        id
      }
    }
  }`;

  getFilteredTrialsRadiusQuery = (
    condition: string,
    lat: string,
    lng: string,
    distance: string,
    filters: any
  ) => `query {
    aliases(where:{alias:"${condition}"}) {
      aliasStudiedIn   {
        id
        protocol_type
        locatedWithinMetersFrom(latitude: "${lat}", longitude: "${lng}", distance: "${distance}") {
          id
        }
      }
    }
  }`;

  getFilters(form: any) {
    let filter = this.filterService.getStudyDefaultConfiguration();
    filter = this.filterService.setFilters(filter, form);
    return filter;
  }

  getPureSubstringQuery = (substring: any, filters: any) => `query {
    fullTextSearch(substring: "${substring}") {
      id
    }
  }`;

  getFilteredTrials(
    condition: string,
    country: any,
    lat: any,
    lng: any,
    distance: any,
    filters: any,
    substring: any
  ) {
    let mappedFilters = this.getFilters(filters);

    if (substring && !condition) {
      const body = JSON.stringify({
        query: this.getPureSubstringQuery(substring, filters),
      });
      this.httpClient
        .post(this.url, body, { headers: this.headers })
        .subscribe((response: any) => {
          {
            this.searchResults.next(
              response.data.fullTextSearch.map((item: any) => item.id)
            ),
              this.getTrials(
                response.data.fullTextSearch.map((item: any) => item.id),
                "id: DESC"
              );
          }
        });
    } else {
      if (country) {
        const body = JSON.stringify({
          query: this.getFilteredTrialsCountryQuery(
            condition,
            country,
            mappedFilters
          ),
        });
        this.httpClient
          .post(this.url, body, { headers: this.headers })
          .subscribe((response: any) => {
            {
              this.searchResults.next(
                response.data.aliases[0].aliasStudiedIn.map(
                  (item: any) => item.id
                )
              ),
                this.getTrials(
                  response.data.aliases[0].aliasStudiedIn.map(
                    (item: any) => item.id
                  )
                );
            }
          });
      } else if (distance) {
        const body = JSON.stringify({
          query: this.getFilteredTrialsRadiusQuery(
            condition,
            String(lat),
            String(lng),
            String(distance),
            mappedFilters
          ),
        });
        this.httpClient
          .post(this.url, body, { headers: this.headers })
          .subscribe((response: any) => {
            {
              this.searchResults.next(
                response.data.aliases[0].aliasStudiedIn
                  .filter(
                    (study: any) =>
                      study.locatedWithinMetersFrom.length !== 0 ||
                      study.protocol_type === "Expanded Access"
                  )
                  .map((item: any) => item.id)
              ),
                this.getTrials(
                  response.data.aliases[0].aliasStudiedIn
                    .filter(
                      (study: any) =>
                        study.locatedWithinMetersFrom.length !== 0 ||
                        study.protocol_type === "Expanded Access"
                    )
                    .map((item: any) => item.id)
                );
            }
          });
      } else {
        let query = this.getFilteredTrialsQuery(condition, mappedFilters);
        const body = JSON.stringify({
          query: query,
        });
        this.httpClient
          .post(this.url, body, { headers: this.headers })
          .subscribe((response: any) => {
            {
              this.searchResults.next(
                response.data.aliases[0].aliasStudiedIn.map(
                  (item: any) => item.id
                )
              ),
                this.getTrials(
                  response.data.aliases[0].aliasStudiedIn.map(
                    (item: any) => item.id
                  )
                );
            }
          });
      }
    }
  }

  opts = [];
  getAutocompleteQuery = (substring: string) =>
    `query { autoComplete(substring: "${substring}") { alias } }`;

  getConditions(val: string) {
    let query = this.getAutocompleteQuery(val);
    let body = JSON.stringify({
      query: query,
    });
    return this.opts.length
      ? of(this.opts)
      : this.httpClient
          .post<any>(this.url, body, { headers: this.headers })
          .pipe(tap((res: any) => (this.opts = res)));
  }

  country_opts = [];
  getCountryAutocompleteQuery = (substring: string) =>
    `query { countryAutoComplete(substring: "${substring}") }`;

  getCountries(val: string) {
    let query = this.getCountryAutocompleteQuery(val);
    let body = JSON.stringify({
      query: query,
    });
    return this.country_opts.length
      ? of(this.country_opts)
      : this.httpClient
          .post<any>(this.url, body, { headers: this.headers })
          .pipe(tap((res: any) => (this.country_opts = res)));
  }

  reportFeedback(email: any, trial_id: any) {
    let endpt = `https://${this.endpointService.getEndpoint()}.mytomorrows.com/v01/community/report`;
    let body = {
      email: email,
      trial_id: trial_id,
      field: "overall_status",
      new_value: "closed",
    };
    return this.httpClient.post(endpt, body, { headers: this.headers });
  }

  getComments(studyId: string, url: string) {
    return this.httpClient.post(`${url}/get_comment`, {
      studyId,
      headers: this.headers,
    });
  }
  likeComment(commentId: string, url: string, token: string) {
    return this.httpClient.post(`${url}/like_comment`, {
      commentId,
      hcpToken:token,
      headers: this.headers,
    });
  }
  addComment(studyId: string, content: string, url: string, token: string) {
    return this.httpClient.post(`${url}/add_comment`, {
      studyId,
      hcpToken:token,
      content,
      headers: this.headers,
    });
  }
  editComment(commentId: string, newContent: string, url: string, token: string) {
    return this.httpClient.patch(`${url}/update_comment`, {
      commentId,
      hcpToken:token,
      newContent,
      headers: this.headers,
    });
  }

  deleteComment(commentId: string, token: string, url:string) {
    return this.httpClient.post(`${url}/delete_comment`, {
      commentId,
      hcpToken:token,
      headers: this.headers,
    });
  }
  getHcpId(token:string){
    return this.httpClient.post(`https://microservice.mytomorrows.com/beta-v1.2.0/api/get_user`, {token
  })}
  getLikedComments(hcpId: string,url:string){
    return this.httpClient.post(`${url}/liked_comments`, {
      hcpId
    });
  }
  getLikes(commentId:string,url:string) {
    return this.httpClient.patch(`${url}/like_comment`, {
      commentId,
      
    });
  }

  getReplies(url:string,commentId:string){
    return this.httpClient.post(`${url}/get_reply`, {
      commentId,
    });
  }
  addReply(url:string,studyId:string,hcpId:string,content:string,commentId:string,hcpToken:string){
    return this.httpClient.post(`${url}/add_reply`, {
      studyId,hcpId,content,commentId,hcpToken
    });
  }
}
