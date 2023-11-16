import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.models';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  user = {} as User;
  users$: any;

  constructor() { }

  ngOnInit() {
    this.getUsers();
    this.user = this.utilsSvc.getElementLocalStorage('user');
    // this.getUsers();
    // console.log(this.userProfile.uid);
    // console.log(this.users$)
  }

  ionViewWillEnter(){
    this.getUsers();
  }

  getUsers(){
    let path = "user";
    let sub = this.firebaseSvc.getColletionData(path)
      .subscribe({
        next: (resp: any)=>{
          console.log("entrei na page main: ");
          this.users$ = resp;
          console.log(resp);
        }
      })
  }

  isUidDuo(uid){
    if(uid === this.user.uid){
      return false;
    }else{
      return true;
    }
  }

}
