import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ContactEditComponent } from '../../components/contact-edit/contact-edit.component';
import { ContactViewComponent } from '../../components/contact-view/contact-view.component';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-create-contact',
  imports: [ContactViewComponent, ToastModule, ConfirmDialogModule, ContactEditComponent, RouterModule, ButtonModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.scss'
})
export class CreateContactComponent implements OnInit{

  constructor(
    public contactsService: ContactsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.contactsService.setDefaultContact()
  }


  public onNavigationBack(): void  {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja sair? Voce perderá sua edição',
        header: 'Atenção',
        closable: false,
        closeOnEscape: false,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Continuar editando',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
          label: 'Sim',
        },
        accept: () => {
          this.contactsService.setDefaultContact()
          this.router.navigate(["/contatos"])
      }
    });

      return
    }

    public markAsFavorite(): void {

      this.contactsService.contactState.update((state) => ({...state, favorito: !state.favorito}));
    }
    
    public onCreate() {
      delete this.contactsService.contactState()._id;
      this.contactsService.create(this.contactsService.contactState()).subscribe({
        next: res =>  {
          this.contactsService.dataState.update(state => ({...state, res}));
          this.router.navigate(["/contatos"])
        }
      });
    }

}
