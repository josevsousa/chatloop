import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth } from '@angular/fire/auth';
import { getFirestore, setDoc, getDoc, doc } from '@angular/fire/firestore';
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
  // ====== Conectar ====
  loginGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.router.navigate(['main']);

        // ==== grava usuario no db ==== 
        let path = `user/${user.user.uid}`;
        this.setDocument(path, {
          uid: user.user.uid,
          name: user.user.displayName,
          ativo: true
        })
      })
      .catch(error => console.log(error));
  }

  // ====== desconectar Usuario ====
  desconectarGoogle() {
    const user = getAuth().currentUser;
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
      const path = `user/${user.uid}`;
      //=== gravar que o user esta off ===
      this.setDocument(path, {
        uid: user.uid,
        name: user.displayName,
        ativo: false
      })
    });
  }


  // =============== BASE DE DADOS ================
  // ==== Setar um documento ====
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
  // ==== Obter um documento ====
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }


}
