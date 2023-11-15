import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';

import { getFirestore, setDoc, getDoc, addDoc, doc, updateDoc, collection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  router = inject(Router);
  utilsSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);

  user$ = this.auth.authState.pipe(
    map(user => ({ user }))
  )

  constructor(private auth: AngularFireAuth) { };

  // =========== AUTH ============
  getAuth(){
    return getAuth();
  }

 
  // ====== Conectar ====
  loginGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.router.navigate(['main']);

        // ==== caminho do db ==== 
        let path = `user/${user.user.uid}`;
        // ==== usuario ==== 
        let userLS: User = {
          uid: user.user.uid,
          nome: user.user.displayName,
          idade: '',
          sexo: '',
          photoUrl: user.user.photoURL,
          ativo: true
        }
        
        // verificar se o user ja existe
        this.getDocument(path)
          .then(resp=>{
            if (resp) {
              console.log('existe o user no db!')
              //=== atualizar que o user esta on ===
              this.updateDocument(path, {
                ativo: true
              });
              // === gravar no localStorage
              this.utilsSvc.saveInLocalStore('user', resp);
            }else{
              console.log('nao existe o user no db!');
              // === gravar o user no db
              this.setDocument(path, userLS);
              // === gravar no localStorage
              this.utilsSvc.saveInLocalStore('user', userLS);
            }
          })
          .catch(err=>console.log(err))
          .finally()

      })
      .catch(error => console.log(error));
  }


  // ====== desconectar Usuario ====
  desconectarGoogle() {
    const user = getAuth().currentUser; //pegando o user ativo
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
      const path = `user/${user.uid}`;
      //=== atualizar que o user esta off ===
      this.updateDocument(path, {
        ativo: false
      })
      //=== revomer user do localStorage
      this.utilsSvc.delElementLocalStorage('user');

    });
  }

  // =============== BASE DE DADOS FIRESTORE ================
  // ==== Setar um documento ====
  async setDocument(path: string, data: any) {
    return await setDoc(doc(getFirestore(), path), data);
  }
  // ==== Obter um documento ====
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  // ==== Atualizar um documento ====
  async updateDocument(path: string, data: any) {
    return await updateDoc(doc(getFirestore(), path), data);
  }
  // ==== Agregar um documento ====
  addDocument(path: string = "user", data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  
    // =============== upload de image ================
    async uploadImage(path: string, data_url: string){
      return uploadString(ref(getStorage(), path), data_url, 'data_url').then(()=>{
        return getDownloadURL(ref(getStorage(), path))
      })
    }


}
