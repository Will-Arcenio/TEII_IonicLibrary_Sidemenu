import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { PublishersApiService } from '../publishers-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-publishers-register',
  templateUrl: './publishers-register.page.html',
  styleUrls: ['./publishers-register.page.scss'],
})
export class PublishersRegisterPage implements OnInit {
  form: FormGroup;
  loading = false;
  edit; false;

  constructor(
    private formBiulder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private publishersApiService: PublishersApiService
  ) { }

  ngOnInit() {
    this.form = this.formBiulder.group({
      id: [''],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: [''],
      foto: ['', Validators.required],
      site: [''],
      email: ['', Validators.required],
      localizacao: [''],
      iframeMap: ['']
    });

    // "+" para converter para número
    const id =+ this.activatedRoute.snapshot.params.id;

    this.edit = false;
    if (id) {
      this.edit = true;
      this.findPublisherById(id);
    }
  }

  findPublisherById(id: number) {
    this.loading = true;
    this.publishersApiService.findPublisherById(id).pipe(finalize(() => this.loading = false)).subscribe(
      (publisher) => {
        if (publisher) {
          this.form.patchValue({
            ...publisher,
          });
        }
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao buscar editor(a) '${id}'`, () => this.findPublisherById(id));
      }
    );
  }

  savePublisher() {
    const {nome} = this.form.value;
    this.loading = true;

    this.publishersApiService.savePublisher(this.form.value).pipe(finalize(() => this.loading = false)).subscribe(
      () => {

        // Se tudo ocorrer conforme esperado, verifica se a Editora é editada ou Adicionada
        if(this.edit) {
          this.messageService.showSuccessMessage(`Editora '${nome}' editada com sucesso!`);
        } else {
          this.messageService.showSuccessMessage(`Editora '${nome}' adicionada com sucesso!`);
        }
        this.router.navigate(['publishers-list']);
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao salvar a Editora '${nome}'.`, () => this.savePublisher());
      }
    );
  }

}
