import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'crm-tag-input-item',
  templateUrl: './tag-input-item.component.html',
  styleUrls: ['./tag-input-item.component.scss']
})
export class TagInputItemComponent {

  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Input() readonly: boolean = false;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }

}
