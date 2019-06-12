import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput=''
  image=""
  name=""
  file
  picture="https://medicina.uv.cl/images/banco_de_fotos/especialidades-medicas.jpg"
  constructor(private modalService: NgbModal){}
  search(){

  }
  openLg(content) {
    this.name=""
    this.file=null;
    this.picture="https://medicina.uv.cl/images/banco_de_fotos/especialidades-medicas.jpg"
    this.modalService.open(content, { centered:true,size: 'lg' });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let self = this;
      self.file=fileList[0]
      let fileReader: any = new FileReader();
      fileReader.onload = (e) => {
        self["picture"] = String(fileReader.result);
      }
      fileReader.readAsDataURL(fileList[0]);
    }
  }
}
