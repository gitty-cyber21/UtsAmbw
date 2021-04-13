import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  
  urlImageStorage : string[] =  [];
  
  Judul : string;
  Isi : string;
  Tanggal : string;
  Nilai : string;

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService,
    afs : AngularFirestore
    ) {
      this.isiDataColl = afs.collection('dataCoba');
      this.isiData = this.isiDataColl.valueChanges();
    }

    async ngOnInit(){
      await this.fotoService.loadFoto();
    }

    TambahFoto(){
      this.fotoService.tambahFoto();
    }

    simpan(){
      this.isiDataColl.doc(this.Judul).set({
        judul : this.Judul,
        isi : this.Isi,
        tanggal : this.Tanggal,
        nilai : this.Nilai
      });

    //   var inp = [];
    //   inp[0] = this.Judul.toString();
     
    //   inp[1] = this.Isi.toString();
      
    //   inp[2] = this.Tanggal.toString();
      
    //   inp[3] = this.Nilai.toString();

    // this.fotoService.arr.push(inp);

    // console.log(this.fotoService.arr[0])
    }

    hapusNote(){
      this.isiDataColl.doc(this.Judul).delete();
    }

    upload(){
      this.urlImageStorage=[];
      
      for(var index in this.fotoService.dataFoto){
        const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
        this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() =>{
          this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url);
            console.log(url);
          });
        });
      
     
    }
    }

}

interface data{
  judul : string,
  isi : string,
  tanggal : string,
  nilai : string
}

export interface filefoto{
  name : string; //filepath
  path : string;  //webviewPath
}
