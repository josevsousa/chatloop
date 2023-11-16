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

  userProfile!: User;
  users$: User[];

  constructor() { }

  ngOnInit() {
    let users = this.firebaseSvc.listUsers();
    users.subscribe(users=>{
       this.users$ = users;
    });
    this.userProfile = this.utilsSvc.getElementLocalStorage('user');
    console.log(this.userProfile.uid)
  }


}
