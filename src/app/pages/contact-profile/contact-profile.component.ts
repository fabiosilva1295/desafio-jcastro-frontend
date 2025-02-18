import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ContactViewComponent } from '../../components/contact-view/contact-view.component';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-profile',
  imports: [ContactViewComponent, ToastModule, ConfirmDialogModule, RouterModule, ButtonModule],
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

  

  
}
