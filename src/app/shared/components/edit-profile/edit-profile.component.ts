import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {

  utilsSvc = inject(UtilsService);
  user!: any;

    //=========== Tirar/Selecionar Photo ==========
    async takeImage(){
      const dataUrl = (await this.utilsSvc.takePicture('Image do produto')).dataUrl;
      this.form.controls.image.setValue(dataUrl);
    }

  form = new FormGroup({
    displayName: new FormControl('joooo', Validators.required),
    image: new FormControl('')
  })

  ngOnInit() {
     this.user = this.utilsSvc.getElementLocalStorage('user');
  }
}
