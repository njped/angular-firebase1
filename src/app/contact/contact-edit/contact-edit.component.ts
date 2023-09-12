import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined> 
  companies$: Observable<Company[] | undefined> 


  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService  
    ) {
      this.companies$ = companyService.getCompaniesObservable();
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }
  }

  ngOnInit() {
    this.contact$.subscribe((res: any) => {
      console.log("Id: " + this.id)
      console.log("Response: " + JSON.stringify(res))
    })
  }

  saveContact(contact: Contact) {
    this.contactService.saveContact(contact)
    .then(() => {
      this.router.navigate(['/contact/all'])
    })
  }

  editContact(contact: Contact) {
    this.id ? contact.id = this.id : ""
    this.contactService.editContact(contact) // step 4
      .then(_ => this.router.navigate(['/contact/all']));
  }

  deleteContact() {
    if(this.id) {
      this.contactService.deleteContact(this.id)
      .then(() => {
        this.router.navigate(['/contact/all']);
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