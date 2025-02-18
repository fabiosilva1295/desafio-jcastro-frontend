import { Component } from '@angular/core';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';

@Component({
  selector: 'app-favorites',
  imports: [ContactListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
