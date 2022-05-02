import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, AlertController } from '@ionic/angular';
import { Publishers } from '../publishers';
import { PublishersApiService } from '../publishers-api.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-publishers-list',
  templateUrl: './publishers-list.page.html',
  styleUrls: ['./publishers-list.page.scss'],
})
export class PublishersListPage implements OnInit, ViewWillEnter {
  publishers: Publishers[];
  loading = false;
  publishersExists = true;

  constructor(
    private publishersApiService: PublishersApiService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // console.log('Publisher List onInit');
    // this.listPublishers();
  }

  ionViewWillEnter(): void {
    // console.log('Publisher List viewWillEnter');
    this.listPublishers();
  }

  listPublishers() {
    this.loading = true;
    this.publishersApiService.getPublishers().pipe(finalize(() => this.loading = false)).subscribe(
      (publisher) => {
        this.publishers = publisher;

        // Checks if there are publishers in the list
        if (this.publishers.length === 0) {
          this.publishersExists = false;
        }
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao carregar editoras.`, () => this.listPublishers());
      }
    );
  }

   // Confirm Publisher Remove
   confirmRemovePublisher(publisher: Publishers) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Deseja excluir a editora '${publisher.nome}'?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.removePublisher(publisher)
        },
        {
          text: 'Não'
        }
      ]
    }).then((alert) => alert.present());
  }

  removePublisher(publisher: Publishers) {
    this.loading = true;
    this.publishersApiService.removePublisher(publisher.id).subscribe(
      () => {
        this.messageService.showSuccessMessage(`Editora '${publisher.nome}' excluída com sucesso.`);
        this.listPublishers();
      },
      () => {
        this.messageService.showErrorMessage(`Erro ao excluir a editora '${publisher.nome}'`, () => this.removePublisher(publisher));
        this.loading = false;
      }
    );
  }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
