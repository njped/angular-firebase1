import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined> 

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router  
    ) {
      if (!this.isNew) {
        this.company$ = companyService.getCompanyObservable(this.id);
      } else {
        this.company$ = of({}) as Observable<Company>;
      }
  }

  ngOnInit() {
    this.company$.subscribe((res: any) => {
      console.log("Id: " + this.id)
      console.log("Response: " + JSON.stringify(res))
    })
  }

  saveCompany(company: Company) {
    this.companyService.saveCompany(company)
    .then(() => {
      this.router.navigate(['/company/all'])
    })
  }

  editCompany(company: Company) {
    this.id ? company.id = this.id : "default";
    console.log("Company: " + JSON.stringify(company))
    this.companyService.editCompany(company)
    .then(() => {
      this.router.navigate(['/company/all'])
    })
  }

  deleteCompany() {
    if(this.id) {
      this.companyService.deleteCompany(this.id)
      .then(() => {
        this.router.navigate(['/company/all']);
      })
    }
  }


  get id(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }
}