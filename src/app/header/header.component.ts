import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Element } from '../shared/models/element.model';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  displayNewElement = false;

  searchForm!: FormGroup;

  newElementForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private dataService : DataService) { 
  }

  ngOnInit(): void {
    this.initSearchForm();
    this.initnewElementForm();
  }

  initSearchForm() : void{
    this.searchForm = this.formBuilder.group(
      {
        toSearch : ''
      }
    );
  }

  initnewElementForm() : void{
    this.newElementForm = this.formBuilder.group(
      {
        title : '',
        subtitle : '',
        description : ''
      }
    );
  }

  onClickNewElement(): void{
    this.displayNewElement = !this.displayNewElement;
  }

  onSearch() : void{
    console.log(this.searchForm.value?.toSearch)
  }

  onNewElement() : void{
    let newElement : Element = new Element(this.newElementForm.value["title"], this.newElementForm.value["subtitle"], this.newElementForm.value["description"], []);
    this.dataService.newElement(newElement);
  }

}
