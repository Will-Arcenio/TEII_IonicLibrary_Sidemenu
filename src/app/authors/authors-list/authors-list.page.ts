/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AuthorsApiService } from '../authors-api.service';
import { finalize } from 'rxjs/operators';
import { Authors } from '../authors';
import { MessageService } from '../../services/message.service';
import { ViewWillEnter, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.page.html',
  styleUrls: ['./authors-list.page.scss'],
})
export class AuthorsListPage implements OnInit, ViewWillEnter {
  loading = false;
  authors: Authors[];
  authorsExists = true;

  constructor(
    private authorsApiService: AuthorsApiService,
    private messageService: MessageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.listAuthors();
  }

  ionViewWillEnter(): void {
      this.listAuthors();
  }

  listAuthors() {
    this.loading = true;
    this.authorsExists = true;
    this.authorsApiService.getAuthors().pipe(finalize(() => this.loading = false)).subscribe(
      (author) => {
        this.authors = author;

        // Checks if there are authors in the list
        if (this.authors.length === 0) {
          this.authorsExists = false;
        }
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao listar autores.`, () => this.listAuthors());
      }
    );
  }

  // Confirm Author Remove
  confirmRemoveAuthor(author: Authors) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Deseja excluir o autor '${author.nome} ${author.sobrenome}'?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.removeAuthor(author)
        },
        {
          text: 'Não'
        }
      ]
    }).then((alert) => alert.present());
  }

  removeAuthor(author: Authors) {
    this.loading = true;
    this.authorsApiService.removeAuthor(author.id).subscribe(
      () => {
        this.messageService.showSuccessMessage(`Autor '${author.nome} ${author.sobrenome}' excluído com sucesso.`);
        this.listAuthors();
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao excluir o autor '${author.nome} ${author.sobrenome}'`, () => this.removeAuthor(author));
        this.loading = false;
      }
    );
  }

}
