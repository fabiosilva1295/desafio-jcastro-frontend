import { Routes } from '@angular/router';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactProfileComponent } from './pages/contact-profile/contact-profile.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'contatos',
                pathMatch: 'full'
            },
            {
                path: 'contatos',
                component: HomeComponent
            },
            {
                path: 'contato/:id',
                component: ContactProfileComponent
            },

            {
                path: 'edit/:id',
                component: ContactEditComponent
            },
            {
                path: 'contatos/new',
                component: CreateContactComponent
            },
            {
                path: 'favoritos',
                component: FavoritesComponent
            },
        ]
    }
];
