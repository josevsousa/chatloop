import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  imageDataUrl!: string;
  subirImage: boolean = false;


  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    idade: new FormControl('', Validators.required),
    sexo: new FormControl('')
  })

  ngOnInit() {
    // === pegando user no db ===
    this.loadingUser();
  }

  // ===== Loading o user no db
  loadingUser() {
    let user = this.utilsSvc.getElementLocalStorage('user');
    this.imageDataUrl = user.photoUrl;

    this.form.controls.nome.setValue(user.nome);
    this.form.controls.idade.setValue(user.idade);
    this.form.controls.sexo.setValue(user.sexo);
  }

  //=========== Tirar/Selecionar Photo ==========
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Image do produto')).dataUrl;
    this.imageDataUrl = dataUrl;
    this.subirImage = true;
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let user = this.utilsSvc.getElementLocalStorage('user');
      // === Subir imagem e obeter sua URL no firestorage ====
      if (this.subirImage) {
        let dataUrl = this.imageDataUrl;
        let imagePath = `${user.uid}/fotoPerfil/${Date.now()}`;
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.imageDataUrl = imageUrl;
      }
      // === Add o link da nova imagem add o user no db
      await this.firebaseSvc.updateDocument(`user/${user.uid}`, {
        nome: this.form.value.nome,
        idade: this.form.value.idade,
        sexo: this.form.value.sexo,
        photoUrl: this.imageDataUrl,

      }).then(() => console.log("gravou user no DB")).catch(err => console.log("nao gravou user no db"))

      // === Atualizar o localStorage
      await this.utilsSvc.saveInLocalStore('user', {
        nome: this.form.value.nome,
        idade: this.form.value.idade,
        sexo: this.form.value.sexo,
        photoUrl: this.imageDataUrl,
      })

      loading.dismiss();
      this.utilsSvc.dismissModal();
    }
  }

}
