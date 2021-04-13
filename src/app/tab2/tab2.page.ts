import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  Tanggal : string;
  Nilai : string;

  constructor(  private router : Router, 
    public fotoService : FotoService,
    afs : AngularFirestore
    ) { 
    this.isiDataColl = afs.collection('dataCoba');
    this.isiData = this.isiDataColl.valueChanges();}

  Det(i){
    
    //this.fotoService.arr2.push(this.fotoService.arr[i]);
  }

  hapusNote(){
    this.isiDataColl.doc(this.Judul).delete();
  }
}

interface data{
  judul : string,
  isi : string,
  tanggal : string,
  nilai : string
}
