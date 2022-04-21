import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

    async showSuccessMessage(message: string) {
      const toast = await this.toastController.create({
        message,
        color: "success",
        position: "top",
        duration: 5000
      });

      toast.present();
    }

    async showErrorMessage(msg: string, handler: () => void) {
      const toast = await this.toastController.create({
        message: msg,
        color: "danger",
        buttons: [
          {
            icon: "refresh-outline",
            side: "start",
            handler: () => handler()
          },
          {
            icon: "close-outline",
            side: "end"
          }
        ]
      });

      toast.present();
    }
}
