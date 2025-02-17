import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Contact } from '../../models/contacts.model';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, TableModule],
  styleUrl: '../../../assets/styles/contact-list.scss',
  template: `

  <div class=" flex rounded-xl overflow-hidden size-full">
    <p-table class="size-full" selectionMode="multiple" [scrollable]="true" scrollHeight="flex" [value]="contacts" [tableStyle]="{ 'min-width': '100%' }">
        <ng-template #header>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Telefone</th>
            </tr>
        </ng-template>
        <ng-template #body let-contact>
            <tr>
                <td>{{ contact.nome }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.celular }}</td>
                <td>{{ contact.telefone }}</td>
            </tr>
        </ng-template>
    </p-table>
  </div>

    

  `,
})
export class ContactListComponent implements OnInit{

  public contacts: Contact[] = []

  constructor(){

    this.contacts = [
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},
      { nome: 'Fabio Francisco', email: 'Fabio@Email.com', celular: '8199999999', ativo: true, favorito: false},
      { nome: 'Maria da silva', email: 'maria@email.com', celular: '8199988889', ativo: true, favorito: true},

    ]

  }

  ngOnInit(): void {
    
  }
}
