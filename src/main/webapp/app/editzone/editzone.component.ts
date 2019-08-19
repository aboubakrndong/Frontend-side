import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ZonesService} from "app/entities/zones";
import {IZones} from "app/shared/model/zones.model";


@Component({
  selector: 'jhi-editzone',
  templateUrl: './editzone.component.html',
  styleUrls: ['./editzone.component.scss']
})
export class EditzoneComponent implements OnInit {

  title = 'Ng7Crud';
  insertForm: FormGroup;
  updateForm: FormGroup;

  globalResponse: any;
  inputZoneForm: IZones[];
  allZones: IZones[];
  lazone: IZones;
  zone: IZones[];
  selectedZones: IZones[];
  idValue=0;



  constructor(private zoneService: ZonesService,private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.insertForm = this.fb.group(
      {
        nomzone: ['', [Validators.required]],
        couverture: ['', [Validators.required]],
        population: ['', [Validators.required]],
        cadastre: ['', [Validators.required]],
      }
    );
    this.updateForm = this.fb.group(
      {
        nomzone: ['', [Validators.required]],
        couverture: ['', [Validators.required]],
        population: ['', [Validators.required]],
        cadastre: ['', [Validators.required]],
      }
    );
  }

  UpdateZon(){
    this.inputZoneForm= this.insertForm.value;
    this.zoneService.updateById(this.idValue, this.selectedZones).subscribe((lazone)=>{
        console.log(lazone);
        this.lazone=lazone.body;

      })
  }
  GetAllZones(){
    this.inputZoneForm = this.insertForm.value;
    this.zoneService.findAll().subscribe(zone=>{
      console.log(zone);
      this.zone=zone.body;

    })
  }

  GetSelectedZones(zon: any)
  {
    this.selectedZones=zon;

    this.updateForm.controls["nomzone"].setValue(this.selectedZones["nomzone"]);
    this.updateForm.controls["couverture"].setValue(this.selectedZones["couverture"]);
    this.updateForm.controls["population"].setValue(this.selectedZones["population"]);
    this.updateForm.controls["cadastre"].setValue(this.selectedZones["cadastre"]);


    this.idValue=this.selectedZones["Id"]


  }


}
