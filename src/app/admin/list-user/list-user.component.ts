import { ModalUserComponent } from './../../components/modal-user/modal-user.component';
import { AdminComponent } from './../admin.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  
  listUser: any = [];
  isAdmin: boolean = false;

  constructor(
    public fs: AngularFirestore,
    public router: Router,
    private admin: AdminComponent,
    public modalService: NgbModal,
    config: NgbModalConfig,    
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.fs.collection('user').snapshotChanges().subscribe((resp) => {
      this.listUser = resp;
      if(this.listUser.role == "admin") {
        this.isAdmin = true;
      }
    });
   }

  ngOnInit(): void {
  }

  getDetail(id: string) {
    if(this.isAdmin) {
      const modalRef = this.modalService.open(ModalUserComponent);
      modalRef.componentInstance.id = id;
    }
  }

  sideBar() {
    this.admin.toggleSideBar();
  }

}
