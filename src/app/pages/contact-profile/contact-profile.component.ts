import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ContactEditComponent } from '../../components/contact-edit/contact-edit.component';
import { ContactViewComponent } from '../../components/contact-view/contact-view.component';
import { Contact } from '../../models/contacts.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-profile',
  imports: [ContactViewComponent, ToastModule, ConfirmDialogModule, ContactEditComponent, RouterModule, ButtonModule],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss'
})
export class ContactProfileComponent implements OnInit {

  public isEditing: boolean = false;

  constructor(
    private rotuer: Router,
    public contactsService: ContactsService,
    private activatedRouter: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
  }

  public onNavigationBack(): void  {
    if(this.isEditing) {
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
          this.rotuer.navigate(["/contatos"])
      }
    });

      return
    }
    
    this.isEditing ? this.isEditing = false : this.rotuer.navigate(["/contatos"]);
  }

  public markAsFavorite(): void {

    this.contactsService.contactState.update((state) => ({...state, favorito: !state.favorito}));
    if(!this.isEditing) this.contactsService.markFavorite(this.contactsService.contactState()._id as string, this.contactsService.contactState().favorito as boolean).subscribe({
      next: () => {
        this.messageService.add({  severity: 'success', summary: 'Sucesso', detail: `${this.contactsService.contactState().nome} agora ${this.contactsService.contactState().favorito ? 'é um': 'não é mais um'} favorito` });
      }
    })
  }

  public onUpdate():  void { 
    
    if(!this.isEditing) {
      this.isEditing = true;
      return
    }

    this.contactsService.update(this.contactsService.contactState()._id as string, this.contactsService.contactState()).subscribe({
      next: (contact: Contact) => {
        this.contactsService.contactState.update(() => contact);
        this.isEditing = false;
      }
    })

  }

  public onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente excluir este contato?',
      header: 'Confirmação',
      closable: false,
      closeOnEscape: false,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim',
      },
      accept: () => {
        this.contactsService.deleteContact(this.contactsService.contactState()._id as string).subscribe({
          next: () => {
            this.messageService.add({  severity: 'success', summary: 'Sucesso', detail: 'Contato deletado' });
            this.rotuer.navigate([`/contatos`]);
          },
          error: () => {
            this.messageService.add({  severity: 'danger', summary: 'Erro', detail: 'Não foi possível excluir, tente novamente' });
          }
        })
      },
    })
  }
}
