import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Subscription } from 'rxjs';
import { Contact } from '../../models/contacts.model';
import { AvatarService } from '../../services/avatar.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-edit',
  imports: [ButtonModule, CommonModule, ReactiveFormsModule, InputTextModule, SelectButtonModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit{

  private subscription!: Subscription;
  
  private id: string | null = null;
  protected mode: 'create' | 'update' = 'update';
  protected stateOptions: any[] = [{ label: 'Ativo', value: true },{ label: 'Inativo', value: false }];

  public contact!: Contact;
  public contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private contactsService: ContactsService,
    public avatarService: AvatarService
  ) {
    
  }

  ngOnInit(): void {
    this.subscription = this.activatedRouter.paramMap.subscribe(params => {
      const _id = params.get('id');
      _id ? this.getContactById(_id) : this.mode = 'create';
    });

    this.contactForm = this.fb.group({
      nome: [ '', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: [ '', Validators.required],
      telefone: [ '', Validators.required],
      ativo: [true],
      favorito: [false],
    });

    this.contactForm.valueChanges.subscribe(() => this.contactsService.contactState.update((state) => ( {...state, ...this.contactForm.value} )) );
    
  }

  public getContactById(id: string): void  {
    this.contactsService.getContactById(id).subscribe({
      next: (data) => {
        this.contact = data;
        this.contactForm.patchValue(data);
      },
      error: (err) => {
        console.error('Erro ao buscar contato:', err);
      }
    });
  }

  public onCreateContact() {
    this.contactsService.create(this.contactForm.value).subscribe({
      next: (res ) => {
        console.log(res)
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

