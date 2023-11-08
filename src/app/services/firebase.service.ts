import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth } from '@angular/fire/auth';
import { getFirestore, setDoc, getDoc, doc, updateDoc } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  router = inject(Router);

  user$ = this.auth.authState.pipe(
    map(user => ({ user }))
  )
  constructor(private auth: AngularFireAuth) { };

  // =========== AUTH ============
  // getAuth(){
  //   return getAuth();
  // }

  // ====== Conectar ====
  loginGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.router.navigate(['main']);
        // ==== grava usuario no db ==== 
        let path = `user/${user.user.uid}`;
        this.setDocument(path, {
          uid: user.user.uid,
          ativo: true
        })
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
    return await updateDoc(doc(getFirestore(), path ), data );
  }

  //=== TEMP teste de uso do getDocument
  // mostrarUser(){
  //   const user = getAuth().currentUser; //pegando o user ativo
  //   const path = `user/${user.uid}`;
  //   console.log(user.displayName);
  //   this.getDocument(path).then(user => {
  //       console.log(user)   
  //     })
  // }

}
