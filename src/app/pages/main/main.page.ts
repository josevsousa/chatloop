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

  users$: User[] = [];
  myUid: string;

  constructor() {
    this.myUid = this.firebaseSvc.getAuth().currentUser.uid;
  }

  ngOnInit() {
    this.getColletionData();
    console.log("ngOnInit main ok : " + this.myUid + "--" + this.users$);
  }

  ionViewWillEnter() {
    this.getColletionData();   
    console.log("ionViewWillEnter main ok : " + this.myUid );
  }

  getColletionData() {
    let path = "user";
    let sub = this.firebaseSvc.getColletionData(path)
      .subscribe({
        next: (resp: any) => {
          console.log("entrei na page main: ");
          this.users$ = resp;
        }
      })

  }

  // isUidDuo(uid){
  //   if(uid === this.user.uid){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }

}
