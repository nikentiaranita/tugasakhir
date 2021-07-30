import { ModalProductComponent } from './../../components/modal-product/modal-product.component';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataUser: any = {}

  getId?: string;
  nameResep?: string;
  listResep: any = [];

  empty: boolean = true;
  isAdmin: boolean = false;

  constructor(
    public af: AngularFireAuth,
    public fs: AngularFirestore,
    public router: Router,
    public modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.checkUser();
  }

  ngOnInit(): void {
  }

  checkUser() {
    this.af.authState.subscribe(resp => {
      if (!resp) {
        this.router.navigateByUrl('/auth')
      } else {
        this.fs.collection('user').ref.where('email', '==', resp!.email).onSnapshot(snapshot => {
          snapshot.forEach(ref => {
            this.dataUser = ref.data();
            if(this.dataUser.role == 'admin') {
              this.isAdmin = true;
            }
            this.getResep();
          })
        })
      }
    })
  }

  getDetail(id: string) {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.id = id;
  }

  getResep() {
    
    if(this.isAdmin) {
      this.fs.collection('resep', ref => ref.orderBy('created_at', 'desc')).snapshotChanges().subscribe((resp) => {
        this.listResep = resp;
        this.checkNull();
      })
    } else {
      this.fs.collection('resep', ref => ref.where('author', '==', this.dataUser.username)).snapshotChanges().subscribe((resp) => {
        this.listResep = resp;
        this.checkNull();
      })
    }
  }

  checkNull() {
    if (this.listResep.length === 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }

  openModal() {
    this.modalService.open(ModalProductComponent);
  }

  confirmDeleteResep(modal: any, name: string, id: string) {
    this.nameResep = name;
    this.getId = id;
    this.modalService.open(modal);
  }

  deleteResep(modal: any) {
    this.modalService.dismissAll(modal);
    return this.fs
    .collection("resep")
    .doc(this.getId)
    .delete();
  }

  logOut() {
    this.af.signOut().then(resp => {
      this.router.navigateByUrl('auth');
    });
  }

}
