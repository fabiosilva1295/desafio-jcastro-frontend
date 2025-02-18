import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Contact } from '../models/contacts.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _defaultContact: Contact = {
    _id: '',
    nome: '',
    email: '',
    celular: '',
    telefone: '',
    favorito: false,
    ativo: false,
  }


  public dataState = signal<Contact[]>([]);
  public contactState = signal<Contact>(this._defaultContact)

  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  update(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markFavorite(id: string, favorito: boolean): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}/favorite`, { favorito});
  }
  
  setActiveStatus(id: string, active: boolean): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}/active`, active);
  }
  
  getRecentContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/recent`);
  }

  setDefaultContact() {
    this.contactState.update(() => this._defaultContact)
  }

  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/exists/${phone}`).pipe(
      map(response => response.exists)
    );
  }
}
