import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-menu',
  imports: [ButtonModule, RouterModule, CommonModule],
  styleUrl: '../../../assets/styles/side-menu.scss',
  template: `
    <div class="main-container">
        <p-button rounded styleClass="w-full" icon="pi pi-plus" label="Criar contato"></p-button>

        <ul class="items-container flex flex-col mt-4 gap-2">
          @for (item of items; track $index) {
            <li routerLinkActive="active" [routerLink]="item.routerLink" class="item-container"> 
              <i [ngClass]="item.icon"></i>
              <span>{{item.label}}</span>
            </li>
          }
        </ul>
    </div>
  `,
})
export class SideMenuComponent {

  public items: MenuItem[] = [
    {label: 'Contatos', icon: 'pi pi-user', routerLink: '/contatos'},
    {label: 'Recentes', icon: 'pi pi-clock', routerLink: '/recentes'},
    {label: 'Favoritos', icon: 'pi pi-star', routerLink: '/favoritos'}
  ];

}
