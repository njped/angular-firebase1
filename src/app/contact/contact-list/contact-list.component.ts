import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  public contacts$: Observable<Contact[]> | undefined;

  constructor(
    private contactService: ContactService,
    ) {
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.contacts$ = this.contactService.getCompaniesObservable();
  }

}
