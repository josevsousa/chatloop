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
  // uidUser!: string;
  subirImage: boolean = false;
  user!: User;

  form = new FormGroup({
    nome: new FormControl('' , Validators.required),
    idade: new FormControl(''),
    sexo: new FormControl(''),
    email: new FormControl('')

  })
  
  ngOnInit() {
    // === pegando user no db ===
    this.loadingUser();
  }

  // ===== Loading o user no db
  loadingUser(){
    let uid = this.utilsSvc.getElementLocalStorage('uid');
    return this.firebaseSvc.getDocument(`user/${uid}`)
    .then(user => {
       this.user = user;
    })
    .catch(err=>console.log(err));

    // this.imageDataUrl = this.user.photoUrl;

    console.log("-------------- " + this.user)
    
    // this.form.controls.nome.setValue(this.user.nome);
    // this.form.controls.idade.setValue(this.user.idade);
    // this.form.controls.sexo.setValue(this.user.sexo);
    // this.form.controls.email.setValue(this.user.email);
  }

  //=========== Tirar/Selecionar Photo ==========
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Image do produto')).dataUrl;
    this.imageDataUrl = dataUrl;
    this.subirImage = true;
  }

  async submit(){
    if(this.form.valid){
      
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // === Subir imagem e obeter sua URL no firestorage ====
      if(this.subirImage){
        let dataUrl = this.imageDataUrl;
        let imagePath = `${this.user.uid}/fotoPerfil/${Date.now()}`;
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

      }

      // === Add o link da nova imagem add o user no db
      this.firebaseSvc.updateDocument(`user/${this.user.uid}`, {
        nome: this.form.value.nome,
        email: this.form.value.email,
        idade: this.form.value.idade,
        sexo: this.form.value.sexo,
        photoUrl: this.imageDataUrl,

      })

    //   // === Atualizar o localStorage
    //   this.utilsSvc.saveInLocalStore('user', {
    //     nome: this.form.value.nome,
    //     email: this.form.value.email,
    //     idade: this.form.value.idade,
    //     sexo: this.form.value.sexo,
    //     photoUrl: this.imageDataUrl,
    // })
    
  }
    console.log("saindo do edit")
  }

}
