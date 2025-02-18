import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-menu',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  public items: MenuItem[] = [
      {label: 'Contatos', icon: 'pi pi-user', routerLink: '/contatos'},
      {label: 'Favoritos', icon: 'pi pi-star', routerLink: '/favoritos'}
    ];

}
