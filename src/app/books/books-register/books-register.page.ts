import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BooksApiService } from '../books-api.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.page.html',
  styleUrls: ['./books-register.page.scss'],
})
export class BooksRegisterPage implements OnInit {
  form: FormGroup;
  loading = false;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private booksApiService: BooksApiService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      referencia: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', Validators.required],
      sinopse: ['', Validators.required],
      genero: ['Ficção Científica', Validators.required],
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

    this.booksApiService.saveBook(this.form.value).pipe(finalize(() => this.loading = false)).subscribe(
      () => {

        // Se tudo ocorrer conforme esperado, verifica se o Livro é editado ou Adicionado
        if(this.edit) {
          this.messageService.showSuccessMessage(`Livro '${nome}' editado com sucesso!`);
        } else {
          this.messageService.showSuccessMessage(`Livro '${nome}' adicionado com sucesso!`);
        }
        this.router.navigate(['books-list']);
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao salvar o Livro '${nome}'.`, () => this.saveBook());
      }
    );
  }

}
