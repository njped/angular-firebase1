import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined> 

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router  
    ) {
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
    this.id ? contact.id = this.id : "default";
    console.log("Contact: " + JSON.stringify(contact))
    this.contactService.editContact(contact)
    .then(() => {
      this.router.navigate(['/contact/all'])
    })
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