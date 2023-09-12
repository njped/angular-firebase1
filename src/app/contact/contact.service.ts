import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, catchError, from, map, of, pipe, tap, throwError } from 'rxjs';
import { 
  AngularFirestore, 
  AngularFirestoreDocument, 
  AngularFirestoreCollection, 
  DocumentChangeAction,
  CollectionReference,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsRef: AngularFirestoreCollection<Contact>;
  private contactRef: AngularFirestoreDocument

  constructor(private db: AngularFirestore) {
    this.contactsRef = this.db.collection<Contact>('contacts');
    this.contactRef = this.db.doc<Contact>('contacts/contact')
  }

  getContactObservable(id: string | null): Observable<Contact | undefined>  {
    return this.db.doc<Contact>(`contacts/${id}`)
    .valueChanges()
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getContactsObservable(companyId: string | null): Observable<Contact[]> {
    const filteredContacts = companyId != null ?
      this.db.collection<Contact>('contacts', (ref: CollectionReference) => ref.where('companyId', '==', companyId))
      : this.contactsRef;

    return filteredContacts.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              companyId: item.payload.doc.data().companyId,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }


  // ONLY FOR DOCUMENT IMPLENTMENTATION
  // saveContact(contact: Contact) {
  //   from(this.contact.set(contact))
  //     .pipe(
  //       catchError(err => {
  //         console.log('set', err);
  //         return of('ERROR on save')
  //       })
  //     )
  // }

  saveContact(contact: Contact) {
    return this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  // ONLY FOR DOCUMENT IMPLENTMENTATION
  // editContact(contact: any) {
  //   from(this.contactRef.update(contact))
  //     .pipe(
  //       catchError(err => {
  //         console.log('edit', err);
  //         return of('Error on edit')
  //       })
  //     )
  // }

    editContact(contact: Contact) {
    return this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string) {
    id ? id : ''
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error: Error) {
    console.log(error);
    return throwError(error);
  }
}
