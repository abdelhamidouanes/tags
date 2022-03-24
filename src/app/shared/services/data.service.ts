import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Element } from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data : Element[];
  dataSubject : Subject<Element[]>;

  constructor() { 
    this.data = [
      new Element('Title1','SubTitle1','Ceci est une description de test blabla blablfel lfal ok czo',['homme','black', 'loyer', 'sport']),
      new Element('Title2','SubTitle2','Ceci est une description de test blabla blablfel lfal ok czo',['femme','black', 'game']),
      new Element('Title3','SubTitle3','Ceci est une description de test blabla blablfel lfal ok czo',['homme','white', 'dream']),
      new Element('Title4','SubTitle4','Ceci est une description de test blabla blablfel lfal ok czo',['femme','next', 'life']),
    ]
    this.dataSubject = new Subject<Element[]>();
  }

  emitData(){
    this.dataSubject.next(this.data.slice());
  }

  newElement(element : Element): void{
    this.data.push(element);
    this.emitData();
  }

  newTag(tag: string, i: number): void{
    this.data[i].tags?.push(tag);
    this.emitData();
  }

}
