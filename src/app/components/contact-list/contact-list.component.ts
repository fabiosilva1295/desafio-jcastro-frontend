import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contacts.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, TableModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit{

  private subscription!: Subscription;

  public contacts: Contact[] = [];
  public selectedContact!: Contact;

  constructor(
    private router: Router,
    private contactsService: ContactsService
  ){
    effect(()=> {
      this.contacts = this.contactsService.dataState()
    })
    

  }

  ngOnInit(): void {
    this.subscription = this.contactsService.getAllContacts().subscribe({
      next: (data) => {
        this.contactsService.dataState.update(() => data);
      }
    }); 

    
  }

  onRowSelect(contact: Contact) {
    this.contactsService.contactState.update(() => contact);
    this.router.navigate([`/contato/${contact._id}`]);
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}