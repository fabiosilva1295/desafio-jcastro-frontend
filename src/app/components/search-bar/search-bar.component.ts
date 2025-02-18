import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contacts.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  public searchTerm: string = '';
  public searching: boolean = false;
  public contacts: Contact[] = [];

  constructor(
    private contactsService: ContactsService
  ){

    
    effect(()=> {
      this.contacts = this.contactsService.dataState()
    });
  }

  ngOnInit(): void {
  }

  public onSearch(): void {
    this.searching = true;

    
  }


}
