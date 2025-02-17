
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, SearchBarComponent],
  styleUrl: "../../../assets/styles/header.scss",
  template: `
    <div class="button-container p-2 items-center flex gap-2">
      <i class="fi fi-br-menu-burger text-xl"></i>
    </div>

    <app-search-bar></app-search-bar>

    <div class="options-container flex items-center gap-2">
      <div class="item-container">
        <i class="fi fi-rr-palette"></i>
      </div>
      <div class="item-container"></div>
      <p-avatar shape="circle" size="large"></p-avatar>
    </div>
  `,
})
export class HeaderComponent {

}
4