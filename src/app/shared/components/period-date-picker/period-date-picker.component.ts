import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DatePicker} from "../../utils/date-picker.type";
import {Period} from "../../models/period";

@Component({
  selector: 'crm-period-date-picker',
  templateUrl: './period-date-picker.component.html',
  styleUrls: ['./period-date-picker.component.scss']
})
export class PeriodDatePickerComponent implements OnInit, OnChanges {

  @Input() period: Period;
  @Output() changed = new EventEmitter<Period>();
  @Input() limit: Period;
  @Input() fromNow: boolean = false;
  @Input() readonly: boolean = false;

  from: DatePicker;
  to: DatePicker;

  constructor() {
  }

  onNavigate(): void {
    const from = this.from ? DatePicker.fromJson(this.from).getFromTime() : null;
    const to = this.to ? DatePicker.fromJson(this.to).getToTime() : null;
    this.changed.emit(new Period(from, to))
  }

  ngOnInit() {
   this.setFromTo()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['period']) {
      this.setFromTo()
    }
  }

  toMinDate() {
    if (this.from) {
      return this.from
    }
    if (this.limit && this.limit.from) {
      return DatePicker.fromNumber(this.limit.from)
    }
  }

  toMaxDate() {
    if (this.limit && this.limit.to) {
      return DatePicker.fromNumber(this.limit.to)
    }
  }

  fromMinDate() {
    if(this.fromNow) {
      return DatePicker.fromNumber(new Date().getTime())
    }
    if (this.limit && this.limit.from) {
      return DatePicker.fromNumber(this.limit.from)
    }
  }

  fromMaxDate() {
    if (this.to) {
      return this.to
    }
    if (this.limit && this.limit.to) {
      return DatePicker.fromNumber(this.limit.to)
    }
  }

  private setFromTo() {
    if (this.period) {
      if (this.period.from) {
        this.from = DatePicker.fromNumber(this.period.from);
      }
      if (this.period.to) {
        this.to = DatePicker.fromNumber(this.period.to);
      }
    }
  }

}
