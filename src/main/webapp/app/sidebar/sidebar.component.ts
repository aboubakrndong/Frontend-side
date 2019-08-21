import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material';
import { ZonesService } from 'app/entities/zones';
import { IZones } from 'app/shared/model/zones.model';
import { IQos } from 'app/shared/model/qos.model';
import { IKpi } from 'app/shared/model/kpi.model';
import { IBts } from 'app/shared/model/bts.model';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";


library.add(faDownload, faEnvelope);


import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as html2canvas from "html2canvas"

export interface PeriodicElement {
  id?: number;
  nomzone?: string;
  couverture?: string;
  cadastre?: string;
  population?: string;
  qos?: IQos[];
  kpis?: IKpi[];
  bts?: IBts[];
}

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  listzone: IZones[];
  ELEMENT_DATA: PeriodicElement[];
  zone: IZones;
  selectedValue: number;
  displayedColumns: string[] = ['nomzone', 'couverture', 'cadastre', 'population'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  opened = false;

  constructor(private breakpointObserver: BreakpointObserver, private zoneService: ZonesService) {}

  ngOnInit(): void {
    this.listzone = new Array<IZones>();
    this.zoneService.findAll().subscribe(liste => {
      console.log(liste.body);
      this.listzone = liste.body;
    });
  }
  getZoneById(event: any) {
    this.zoneService.find(this.selectedValue).subscribe(zone => {
      console.log(zone);
      this.zone = zone.body;
      this.ELEMENT_DATA = [
        {
          id: this.zone.id,
          nomzone: this.zone.nomzone,
          couverture: this.zone.couverture,
          cadastre: this.zone.cadastre,
          population: this.zone.population,
          qos: this.zone.qos,
          kpis: this.zone.kpis,
          bts: this.zone.bts
        }
      ];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteZone(event: any) {
    this.zoneService.delete(this.selectedValue).subscribe(zone=>{
      console.log(zone);
      this.zone=zone.body;
    })
}

ConvertDataToPdf ()
{
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas=>{
    var imgWidth = 105;
    var pageHeight = 120;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4');
    var position=0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth,imgHeight)
    pdf.save('File.pdf');
  });

}

ShareWithEmail() {
      var msgbody=("NomZone:"+this.zone.nomzone+
      "Couverture:"+this.zone.couverture+
      "Population:"+this.zone.population+
      "Cadastre:"+this.zone.cadastre)
      let url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=' + msgbody+ '&ui=2&tf=1&pli=1';
      window.open(url, 'sharer', 'status=0,toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=600');
  }


  ShareWithSkype() {
    var msgbody=("NomZone:"+this.zone.nomzone+
      "Couverture:"+this.zone.couverture+
      "Population:"+this.zone.population+
      "Cadastre:"+this.zone.cadastre)

      let url = 'https://web.skype.com/';
    window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
      }


  /*ShareData() {
    var myWindow = window.open("", "MsgWindow", "width=648,height=395");
    myWindow.document.write("<HR><FORM><INPUT TYPE='button' VALUE='fermer' onClick='window.close()'><input type='button' value ='envoy' OnClick='this.ShareWithEmail()'></FORM></HR>");

  }*/

}
