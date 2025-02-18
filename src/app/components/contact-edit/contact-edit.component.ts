import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { map, Observable, Subscription } from 'rxjs';
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
    public avatarService: AvatarService,
    private router: Router
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
      celular: [ '', Validators.required, [this.phoneValidator.bind(this)]],
      telefone: [ '', Validators.required],
      ativo: [true],
      favorito: [this.contactsService.contactState() || false],
    });

    this.contactForm.valueChanges.subscribe(() => this.contactsService.contactState.update((state) => ( {...state, ...this.contactForm.value} )) );
    
  }

  public getContactById(id: string): void  {
    this.contactsService.getContactById(id).subscribe({
      next: (data) => {
        this.contactsService.contactState.update(() => ({...data}));
        this.contact = data;
        this.contactForm.patchValue(data);
      },
      error: (err) => {
        console.error('Erro ao buscar contato:', err);
      }
    });
  }

  public onCreateContact() {
    const phone = this.contactForm.value.celular;
  
    this.contactsService.checkPhoneExists(phone).subscribe({
      next: (exists) => {
        if (exists) {
          alert('Este número já está cadastrado.');
        } else {
          this.contactsService.create(this.contactForm.value).subscribe({
            next: () => {
              alert('Contato criado com sucesso!');
              this.router.navigate(['/contatos']);
            },
            error: () => alert('Erro ao criar contato. Tente novamente.')
          });
        }
      },
      error: () => alert('Erro ao verificar número. Tente novamente.')
    });
  }

  phoneValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.contactsService.checkPhoneExists(control.value).pipe(
      map(exists => (exists ? { phoneExists: true } : null))
    );
  }
  
  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

