import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../components/header/header.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';

@Component({
  selector: 'app-layout',
  imports: [ButtonModule, RouterModule, SideMenuComponent, HeaderComponent],
  styleUrl: "../../assets/styles/layout.scss",
  template: `
      <header>
        <app-header></app-header>
      </header>
      <main>
        <app-side-menu></app-side-menu>
        <section class="main-content pr-0 p-2 pb-0">
          <router-outlet></router-outlet>
        </section>
      </main>
  `,
})
export class LayoutComponent {

}
