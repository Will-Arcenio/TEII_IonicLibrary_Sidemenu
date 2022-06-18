import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsApiService } from '../authors-api.service';
import { MessageService } from '../../services/message.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-authors-register',
  templateUrl: './authors-register.page.html',
  styleUrls: ['./authors-register.page.scss'],
})
export class AuthorsRegisterPage implements OnInit {
  form: FormGroup;
  loading = false;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authorsApiService: AuthorsApiService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [0],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      nacionalidade: ['BRASIL', Validators.required],
      redes: [''],
      nascimento: [''],
      retrato: [''],
    });

    // "+" para converter para número
    const id =+ this.activatedRoute.snapshot.params.id;

    this.edit = false;
    if (id) {
      this.edit = true;
      this.findAuthorById(id);
    }
  }

  findAuthorById(id: number) {
    this.loading = true;
    this.authorsApiService.findAuthorById(id).pipe(finalize(() => this.loading = false)).subscribe(
      (author) => {
        if (author) {
          this.form.patchValue({
            ...author,
          });
        }
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao buscar autor(a) '${id}'`, () => this.findAuthorById(id));
      }
    );
  }

  saveAuthor() {
    const {nome, sobrenome} = this.form.value;
    this.loading = true;
    let formValue = this.form.value;
    formValue.nascimento = formValue.nascimento.split('T')[0];

    this.authorsApiService.saveAuthor(formValue).pipe(finalize(() => this.loading = false)).subscribe(
      () => {

        // Se tudo ocorrer conforme esperado, verifica se o Autor é editado ou Adicionado
        if(this.edit) {
          this.messageService.showSuccessMessage(`Autor(a) '${nome} ${sobrenome}' editado(a) com sucesso!`);
        } else {
          this.messageService.showSuccessMessage(`Autor(a) '${nome} ${sobrenome}' adicionado(a) com sucesso!`);
        }
        this.router.navigate(['authors-list']);
      },
      ({error}) => {
        const erro = error?.erro ?? '';
        const message = `Erro ao salvar o Autor.<br> ${erro ? '<strong>ERRO:</strong> ' + erro : ''}`;
        this.messageService.showErrorMessage(message, () => this.saveAuthor());
      }
    );
  }

}
