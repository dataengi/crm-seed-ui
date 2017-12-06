import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, OnChanges,
  SimpleChanges
} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {SelectItem} from "../../models/select-item";

@Component({
  selector: 'crm-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit, OnDestroy, OnChanges {

  searchForm: FormGroup;
  searchFormChangeSubscription: Subscription;


  @Input() items: SelectItem[] = [];
  @Input() right: boolean = false;
  @Output() select = new EventEmitter<SelectItem>();

  constructor(private formBuilder: FormBuilder) {
  }

  filteredItems: SelectItem[] = [];

  ngOnInit() {
    this.initForm();
    this.filteredItems = this.filterItems('');
    this.searchFormChangeSubscription = this.searchForm.valueChanges.debounceTime(200)
      .subscribe(value => this.filteredItems = this.filterItems(value.text))
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if(simpleChanges.hasOwnProperty('items')) {
      this.filteredItems = this.filterItems('');
    }
  }

  ngOnDestroy() {
    this.searchFormChangeSubscription.unsubscribe();
  }

  onSelect(item: SelectItem) {
    this.select.emit(item);
  }

  private initForm() {
    this.searchForm = this.formBuilder.group({
      text: ['']
    })
  }

  private filterItems(text: string) {
    let filteredItems = [];
    if (text.length > 0) {
      this.items.forEach(item => {
        let span = document.createElement("span");
        span.innerHTML = item.text;
        if (span.innerText.toLowerCase().includes(text.toLowerCase())) {
          filteredItems.push(item)
        }
      })
    } else {
      filteredItems.push(...this.items);
    }
    return filteredItems.splice(0, 10);
  }

}
