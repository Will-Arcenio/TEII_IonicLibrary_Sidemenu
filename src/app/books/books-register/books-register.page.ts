import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Authors } from '../../authors/authors';
import { AuthorsApiService } from '../../authors/authors-api.service';
import { MessageService } from '../../services/message.service';
import { BooksApiService } from '../books-api.service';
import { Publishers } from '../../publishers/publishers';
import { PublishersApiService } from '../../publishers/publishers-api.service';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.page.html',
  styleUrls: ['./books-register.page.scss'],
})
export class BooksRegisterPage implements OnInit {
  form: FormGroup;
  loading = false;
  authors: Authors[];
  publishers: Publishers[];
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private booksApiService: BooksApiService,
    private router: Router,
    private messageService: MessageService,
    private authorsApiService: AuthorsApiService,
    private publishersApiService: PublishersApiService
  ) { }

  ngOnInit() {
    this.authorsApiService.getAuthors().subscribe((author) => this.authors = author);
    this.publishersApiService.getPublishers().subscribe((publisher) => this.publishers = publisher);

    this.form = this.formBuilder.group({
      id: [0],
      referencia: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', Validators.required],
      sinopse: ['', Validators.required],
      genero: ['FICCAO_CIENTIFICA', Validators.required],
      autor: ['', Validators.required],
      editora: ['', Validators.required],
      publicacao: [''],
      preco: ['', Validators.required],
      imagem: ['', Validators.required],
    });

    // "+" para converter para número
    const id =+ this.activatedRoute.snapshot.params.id;

    this.edit = false;
    if (id) {
      this.edit = true;
      this.findBookById(id);
    }
  }

  findBookById(id: number) {
    this.loading = true;
    this.booksApiService.findBookById(id).pipe(finalize(() => this.loading = false)).subscribe(
      (book) => {
        if(book) {
          this.form.patchValue({
            ...book,
          });
        }
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao buscar o livro '${id}'`, () => this.findBookById(id));
      }
    );
  }

  saveBook() {
    const {nome} = this.form.value;
    this.loading = true;
    let formValue = this.form.value;
    formValue.publicacao = formValue.publicacao.split('T')[0];

    this.booksApiService.saveBook(formValue).pipe(finalize(() => this.loading = false)).subscribe(
      () => {

        // Se tudo ocorrer conforme esperado, verifica se o Livro é editado ou Adicionado
        if(this.edit) {
          this.messageService.showSuccessMessage(`Livro '${nome}' editado com sucesso!`);
        } else {
          this.messageService.showSuccessMessage(`Livro '${nome}' adicionado com sucesso!`);
        }
        this.router.navigate(['books-list']);
      },
      ({error}) => {
        const erro = error?.erro ?? '';
        const message = `Erro ao salvar o Livro.<br> ${erro ? '<strong>ERRO:</strong> ' + erro : ''}`;
        this.messageService.showErrorMessage(message, () => this.saveBook());
      }
    );
  }

  compareWithAuthors(a1: Authors, a2: Authors | Authors[]) {
    if (!a1 || !a2) {
      return a1 === a2;
    }

    if (Array.isArray(a2)) {
      return a2.some((a: Authors) => a.id === a1.id);
    }

    return a1.id === a2.id;
  }

  compareWithPublishers(p1: Publishers, p2: Publishers) {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

}
