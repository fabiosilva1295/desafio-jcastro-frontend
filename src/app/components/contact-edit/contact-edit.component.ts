import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { map, Observable, Subscription } from 'rxjs';
import { Contact } from '../../models/contacts.model';
import { AvatarService } from '../../services/avatar.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-edit',
  imports: [ButtonModule, CommonModule, ToastModule, ConfirmDialogModule, ReactiveFormsModule, InputTextModule, NgxMaskDirective, SelectButtonModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit{

  @Input('mode') mode: 'create' | 'edit' = 'create'; 

  private subscription!: Subscription;
  protected stateOptions: any[] = [{ label: 'Ativo', value: true },{ label: 'Inativo', value: false }];

  public contact!: Contact;
  public contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private contactsService: ContactsService,
    public avatarService: AvatarService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {

    effect(()=> {
      this.contact = this.contactsService.contactState()
    })
    
  }

  ngOnInit(): void {
    this.subscription = this.activatedRouter.paramMap.subscribe(params => {
      const _id = params.get('id');
      _id ? this.getContactById(_id) : this.teste();
    });

    this.contactForm = this.fb.group({
      nome: [ '', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: [ '', Validators.required, [this.phoneValidator.bind(this)]],
      telefone: [ '', Validators.required],
      ativo: [true],
      favorito: [this.contactsService.contactState().favorito || false],
    });

    this.contactForm.valueChanges.subscribe(() => this.contactsService.contactState.update((state) => ( {...state, ...this.contactForm.value} )) );
    
  }

  public teste() {
    this.contactsService.setDefaultContact()
    console.log(this.contact)
  }

  public getContactById(id: string): void  {
    this.mode = 'edit'
    this.contactsService.getContactById(id).subscribe({
      next: (data) => {
        this.contactsService.contactState.update(() => ({...data}));
        this.contactForm.patchValue(data);
        this.contact = data;
      },
      error: (err) => {
        console.error('Erro ao buscar contato:', err);
      }
    });
  }

  public onSave() {
    if(this.mode == 'edit') {
        this.contactsService.update(this.contactsService.contactState()._id as string, this.contactsService.contactState()).subscribe({
          next: res => {
            this.router.navigate([`/contato/${res._id}`])
          }
        })
        return
    }

    delete this.contactsService.contactState()._id;
    this.contactsService.create(this.contactsService.contactState()).subscribe({
      next: res => {
        this.router.navigate([`/contatos`])
      }
    });
  }

  public marAsFavorite() {
    this.contactsService.contactState.update((state) => ({...state, favorito: !state.favorito}))
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

  public onNavigationBack(): void  {
    if(this.mode == 'edit') {
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
          this.router.navigate([`/contato/${this.contact._id}`])
      }
    });

      return
    }
    
    this.router.navigate(["/contatos"]);
  }
  
  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

