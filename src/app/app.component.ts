import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as parser from 'xml-js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput = ''
  image = ""
  name = ""
  file
  path = "";
  @ViewChild('content') modal;
  xml = ` <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.udistrital.edu.co/">
  <soapenv:Header/>
    body
  </soapenv:Envelope>`
  picture = "https://medicina.uv.cl/images/banco_de_fotos/especialidades-medicas.jpg"

  constructor(private modalService: NgbModal,private http:HttpClient) { }
  search() {

  }
  openLg(content) {
    this.name = ""
    this.file = null;
    this.picture = "https://medicina.uv.cl/images/banco_de_fotos/especialidades-medicas.jpg"
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let self = this;
      self.file = fileList[0]
      let fileReader: any = new FileReader();
      fileReader.onload = (e) => {
        self["picture"] = String(fileReader.result);
      }
      fileReader.readAsDataURL(fileList[0]);
    }
  }

  verificarImagen() {
    let xmlEnviar = this.xml.replace("body",
      ` <soapenv:Body>
          <web:buscarImagenPorNombre>
            <arg0>${this.searchInput}</arg0>
          </web:buscarImagenPorNombre>
        </soapenv:Body>`);
    console.log(parser.xml2json(xmlEnviar, {compact: true, spaces: 4}))
    this.post(xmlEnviar).toPromise().then(
      res=>{
 console.log("res ", res);
      }
    )
  }

  guardarImagen(){
    let xmlEnviar=this.xml.replace("body",
    `<soapenv:Body>
        <web:almacenarImagen>
         <arg0>${this.image}</arg0>
         <arg1>${this.name}</arg1>
        </web:almacenarImagen>
      </soapenv:Body>`
    )
    console.log(xmlEnviar)
    this.post(xmlEnviar).toPromise().then(
      res=>{
 console.log("res ", res);
        this.modalService.dismissAll()
      }
    )
  }

  obtenerImagen(name){
    let xmlEnviar=this.xml.replace("body",
    ` <soapenv:Body>
        <web:obtenerImagenPorNombre>
          <arg0>${name}</arg0>
        </web:obtenerImagenPorNombre>
      </soapenv:Body>`)
    this.post(xmlEnviar).toPromise().then(
      res=>{
 console.log("res ", res)
      }
    )
  }

  post(xml){
    return this.http.post(this.path,xml)
  }
}
