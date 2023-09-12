import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from 'src/app/models/contact';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  public contacts$: Observable<Contact[]> | undefined;
  public companies$: Observable<Company[]>

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService
    ) 
  {
    this.companies$ = this.companyService.getCompaniesObservable()
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(companyId: string | null = null) {
    this.contacts$ = this.contactService.getContactsObservable(companyId);
  }

}
