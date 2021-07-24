import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data?: User | any;

  constructor(
    public af: AngularFireAuth,
    public fs: AngularFirestore,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.af.authState.subscribe(resp =>{
        if (resp) {
          this.fs.collection('user').ref.where('email', '==', resp.email).onSnapshot(snapshot => {
            snapshot.forEach(ref => {
              this.data = ref.data();
            })
          })
        } else {
          this.router.navigateByUrl('auth/login')
        }
      })
    } catch(e) {
      console.log(e);
    }
  }

  logOut() {
    this.af.signOut().then(resp => {
      this.router.navigateByUrl('auth');
    });
  }

}
