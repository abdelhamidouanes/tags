import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Element } from '../shared/models/element.model';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  items = Array.from({length: 200000}).map((_, i) => `Item ${i}`);
  tagForm !: FormGroup;

  displayNewTag : boolean[];

  data : Element[];
  dataSubscription : Subscription;

  constructor(private formBuilder : FormBuilder, private dataService: DataService) { 
    this.displayNewTag = [];
    this.data =[];
    this.dataSubscription = new Subscription();
  }

  ngOnInit() : void {
    this.initFormTag();

    this.dataSubscription = this.dataService.dataSubject.subscribe(data => {
      this.data = data;
    });
    this.dataService.emitData();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  displayNewTagForm(i : number): boolean{
    if(this.displayNewTag[i] != undefined && this.displayNewTag[i]){
      return true;
    }else{
      this.displayNewTag[i] = false;
      return false;
    }
  }

  showHideNewTagForm(i : number): void{
    this.displayNewTag[i] = !this.displayNewTag[i];
  }

  initFormTag() : void{
    this.tagForm = this.formBuilder.group(
      {
        tag : ""
      }
    );
  }

  onNewTag(i : number) : void{
    this.dataService.newTag(this.tagForm.value["tag"], i);
    this.tagForm.setValue({tag : ''})
    this.showHideNewTagForm(i);
  }

}
