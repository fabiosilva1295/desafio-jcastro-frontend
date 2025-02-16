import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-menu',
  imports: [ButtonModule],
  styleUrl: '../../../assets/styles/side-menu.scss',
  template: `
    <div class="main-container">
        <p-button rounded styleClass="w-full" icon="pi pi-plus" label="Criar contato"></p-button>
    </div>
  `,
})
export class SideMenuComponent {

}
