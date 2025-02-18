import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../components/header/header.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';

@Component({
  selector: 'app-layout',
  imports: [ButtonModule, RouterModule, SideMenuComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
