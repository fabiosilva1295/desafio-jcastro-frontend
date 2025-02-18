import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ContactProfileComponent } from './pages/contact-profile/contact-profile.component';
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
                path: 'contato/new/:mode',
                component: ContactProfileComponent
            },
        ]
    }
];
