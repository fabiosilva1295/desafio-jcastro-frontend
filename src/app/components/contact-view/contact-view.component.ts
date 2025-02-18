import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { differenceInDays, format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contacts.model';
import { AvatarService } from '../../services/avatar.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-view',
  imports: [CommonModule,RouterModule, ToastModule, ConfirmDialogModule, ButtonModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss'
})
export class ContactViewComponent implements OnInit{

  private subscription!: Subscription

  public contact!: Contact

  constructor(
    private activatedRouter: ActivatedRoute,
    private contactsService: ContactsService,
    public avatarService: AvatarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ){

    effect(() => {
      this.contact = this.contactsService.contactState()
    })
  }

  ngOnInit(): void {
    this.subscription = this.activatedRouter.paramMap.subscribe(params => {
      const _id = params.get('id');
      _id ? this.getContactById(_id) : false;
    });
  }

  public getContactById(id: string): void {
    this.contactsService.getContactById(id).subscribe({
      next: (data) => this.contactsService.contactState.update((state) => ({...data}))
    })
  }

  public markAsFavorite() {
    this.contactsService.contactState.update((state) => ({...state, favorito: !state.favorito}));
    
    this.contactsService.markFavorite(this.contactsService.contactState()._id as string, this.contactsService.contactState().favorito as boolean).subscribe({
      next: res => {
        this.messageService.add({  severity: 'success', summary: 'Sucesso', detail: `${this.contactsService.contactState().nome} agora ${this.contactsService.contactState().favorito ? 'é um': 'não é mais um'} favorito` });
      } 
    })
  }

  public getFormatedDate(date: any): string {
    
    const dataRecebida = parseISO(date);
    
    if (isToday(dataRecebida)) {
      return `Hoje, ${format(dataRecebida, 'HH:mm', { locale: ptBR })}`;
    }

    if (isYesterday(dataRecebida)) {
      return `Ontem, ${format(dataRecebida, 'HH:mm', { locale: ptBR })}`;
    }

    const diasDeDiferenca = differenceInDays(new Date(), dataRecebida);

    if (diasDeDiferenca === 1) {
      return `Ontem, ${format(dataRecebida, 'HH:mm', { locale: ptBR })}`;
    }

    return format(dataRecebida, "dd 'de' MMM. 'de' yyyy", { locale: ptBR });
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
            setTimeout(() => {
              this.router.navigate([`/contatos`]);
            }, 1500);
          },
          error: () => {
            this.messageService.add({  severity: 'danger', summary: 'Erro', detail: 'Não foi possível excluir, tente novamente' });
          }
        })
      },
    })
  }

}
