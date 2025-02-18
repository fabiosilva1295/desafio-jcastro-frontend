import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { differenceInDays, format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contacts.model';
import { AvatarService } from '../../services/avatar.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-view',
  imports: [CommonModule, ButtonModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss'
})
export class ContactViewComponent implements OnInit{

  private subscription!: Subscription

  public contact!: Contact

  constructor(
    private activatedRouter: ActivatedRoute,
    private contactsService: ContactsService,
    public avatarService: AvatarService
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

}
