export class Element {

    constructor(public title ?: string, public subTitle ?:string, public description ?: string, public tags ?: string[]){
        this.title = title;
        this.description = description;
        this.subTitle = subTitle;
        this.tags = tags;
    }
}
