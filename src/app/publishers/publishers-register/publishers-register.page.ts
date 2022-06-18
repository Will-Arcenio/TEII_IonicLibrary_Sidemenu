/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { PublishersApiService } from '../publishers-api.service';
import { finalize } from 'rxjs/operators';
import { MasksService } from '../../services/masks.service';

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
    private maskService: MasksService,
    private activatedRoute: ActivatedRoute,
    private publishersApiService: PublishersApiService
  ) { }

  ngOnInit() {
    this.form = this.formBiulder.group({
      id: [0],
      nome: ['', Validators.required],
      endereco: ['', [Validators.maxLength(40)]],
      telefone: ['', [Validators.minLength(13)]],
      foto: [''],
      site: [''],
      email: [''],
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
      ({error}) => {
        const erro = error?.erro ?? '';
        const message = `Erro ao salvar a Editora.<br> ${erro ? '<strong>ERRO:</strong> ' + erro : ''}`;
        this.messageService.showErrorMessage(message, () => this.savePublisher());
      }
    );
  }

  getIframeValue() {
    const {iframeMap} = this.form.value;
    let iframeReady = this.replaceCharacters(iframeMap);

    // Altera o valor do formulário do campo 'iframeMap'
    this.form.get('iframeMap').setValue(iframeReady);
  }

  replaceCharacters(iframe: string) {
    const iframeNewWidth = iframe.replace('width=\"600\"', 'width=\"100%\"');
    const iframeNew = iframeNewWidth.replaceAll('\"', '\'');
    return iframeNew;
  }

  phoneFormat() {
    let phone = this.form.get('telefone').value;
    this.form.get('telefone').setValue(this.maskService.formatPhoneNumber(phone));
  }

}
