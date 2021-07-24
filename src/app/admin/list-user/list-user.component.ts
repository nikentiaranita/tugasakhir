import { AdminComponent } from './../admin.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  
  listUser: any = [];

  constructor(
    public fs: AngularFirestore,
    public router: Router,
    private admin: AdminComponent
  ) {
    this.fs.collection('user').snapshotChanges().subscribe((resp) => {
      this.listUser = resp;
    });
   }

  ngOnInit(): void {
  }

  sideBar() {
    this.admin.toggleSideBar();
  }

}
