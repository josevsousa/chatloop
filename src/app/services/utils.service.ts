import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);

  // ========== Loading =========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ============ Toast =============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ============ Modal =============
  // abre modal
  async presentMotal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if( data ) return data;
  }
  // fecha modal
  dismissModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }

  // ============ Evia a qualquer pagina disponivel =============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  
  // ========= DB LOCALSTORE =========
  saveInLocalStore(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value)) //valor = JSON > string
  }
  getElementLocalStorage(key: string){
    return JSON.parse( localStorage.getItem(key) ); //resp = string > JSON
  }
  delElementLocalStorage(key: string){
    return localStorage.removeItem(key);
  }

}
