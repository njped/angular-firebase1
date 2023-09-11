import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, catchError, from, map, of, pipe, tap } from 'rxjs';
import { 
  AngularFirestore, 
  AngularFirestoreDocument, 
  AngularFirestoreCollection, 
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companiesRef: AngularFirestoreCollection<Company>;
  private companyRef: AngularFirestoreDocument

  constructor(private db: AngularFirestore) {
    this.companiesRef = this.db.collection<Company>('companies');
    this.companyRef = this.db.doc<Company>('companies/company')
  }

  getCompanyObservable(id: string | null): Observable<Company | undefined>  {
    return this.db.doc<Company>(`companies/${id}`).valueChanges();
  }

  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
      );
  }

  // ONLY FOR DOCUMENT IMPLENTMENTATION
  // saveCompany(company: Company) {
  //   from(this.company.set(company))
  //     .pipe(
  //       catchError(err => {
  //         console.log('set', err);
  //         return of('ERROR on save')
  //       })
  //     )
  // }

  saveCompany(company: Company) {
    this.companiesRef.add(company)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  // ONLY FOR DOCUMENT IMPLENTMENTATION
  // editCompany(company: any) {
  //   from(this.companyRef.update(company))
  //     .pipe(
  //       catchError(err => {
  //         console.log('edit', err);
  //         return of('Error on edit')
  //       })
  //     )
  // }

  editCompany(company: Company) {
    this.companiesRef.doc(company.id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany() {
    from(this.companyRef.delete())
      pipe(
        catchError(err => {
          console.log('delete', err)
          return of('Error on delete')
        })
      )
  }
}
