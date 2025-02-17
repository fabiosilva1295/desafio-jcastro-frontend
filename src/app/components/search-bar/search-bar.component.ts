import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  styleUrl: '../../../assets/styles/search-bar.scss',
  template: `
    <div class="searchbar-container">
        <input placeholder="Busque por um contato" type="text">
        <i class="fi fi-rr-search"></i>
    </div>
  `,
})
export class SearchBarComponent {

}
