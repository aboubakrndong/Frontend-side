import {Component, Input, OnInit} from '@angular/core';
import {ZonesService} from "app/entities/zones";
import {IZones} from "app/shared/model/zones.model";



@Component({
  selector: 'jhi-editzone',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() zone: IZones;

  constructor() {
  }

  ngOnInit(): void {
  }

  ShareWithSkype() {
    let url = 'https://web.skype.com/';
    window.open(url, 'sharer', 'toolbar=0,status=0,width=748,height=495');
  }

   ShareWithEmail() {
   var msgbody=("NomZone:"+this.zone.nomzone+
       "Couverture:"+this.zone.couverture+
       "Population:"+this.zone.population+
       "Cadastre:"+this.zone.cadastre)
     let url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=' +msgbody+ '&ui=2&tf=1&pli=1';
     window.open(url, 'sharer', 'status=0,toolbar=yes, alwaysOnTop=yes ,scrollbars=yes,resizable=yes,top=100,left=500,width=700,height=500');
   }

}
