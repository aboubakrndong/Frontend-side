import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ZonesService} from "app/entities/zones";
import {IZones} from "app/shared/model/zones.model";



@Component({
  selector: 'jhi-createzone',
  templateUrl: './createzone.component.html',
  styleUrls: ['./createzone.component.scss']
})
export class CreatezoneComponent implements OnInit {
  listzone: IZones[];
  zone: IZones;
  userFormGroup: FormGroup;

  constructor(private zoneService: ZonesService) { }

 /* getZone(){
    this.listzone = new Array<IZones>();
    this.zoneService.findAll().subscribe(liste => {
      console.log(liste.body);
      this.listzone = liste.body;
    });
  }*/

  ngOnInit() {
    this.userFormGroup = new FormGroup(
      {
        nomzone : new FormControl(''),
        couverture : new FormControl(''),
        cadastre : new FormControl(''),
        population : new FormControl('')
      },
    );
   // this.getZone();
  }


  addZone(){
    this.zoneService.create(this.userFormGroup.value).subscribe(zone=>{
      console.log(zone);
      this.zone= zone.body;

    })
   // this.getZone();
  }


}
