import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  online: boolean = true;
  // userFull: boolean = true;
  // user!: any;
  constructor() { }

  ngOnInit() {
    // this.user = this.utilsSvc.getElementLocalStorage('user');

    // ver se existe um se não e criado um userFull
    // this.iniUserDocument();
  }

  // //grava o novo usuario no db
  // verifyUserFull(path){
  //   this.firebaseSvc.setDocument(path, {
  //     user: this.user.uid,
  //     nome: this.user.displayName,
  //     photoUrl: this.user.photoUrl,
  //     sexo: '',
  //     idade: '',
  //   } ) 
  // }

  // //verifica o primeiro acesso para add o user no db
  // iniUserDocument(){ 
  //   let path = `userFull/${this.user.uid}`;
  //   this.firebaseSvc.getDocument(path).then((user)=>{
  //     if(!user){
  //       this.userFull = false;
  //       console.log('dentro do verifyUserFull');
  //       this.verifyUserFull(path);
  //     }else{
  //       console.log('existe um usuario cadastrado');
  //     }
  //   }).catch((err)=>console.log(err))
  // }

}
