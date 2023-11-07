import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  // ========== Loading =========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ============ Toast =============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


  // ============ Guarda um elemento no localstore  =============  
  saveInLocalStore(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value)) //valor = JSON > string
  }

  // ========= DB LOCALSTORE =========
  getElementLocalStorage(key: string){
    return JSON.parse( localStorage.getItem(key) ); //resp = string > JSON
  }

}
