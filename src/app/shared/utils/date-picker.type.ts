export class DatePicker {
  constructor(public year: number,
              public month: number,
              public day: number,
              public hour: number,
              public minute: number,
              public second: number = 0) {
  }

  getTime(): number {
    let d = new Date();
    d.setFullYear(this.year);
    d.setMonth(this.month - 1);
    d.setDate(this.day);
    d.setHours(this.hour);
    d.setMinutes(this.minute);
    d.setSeconds(this.second);
    return d.getTime();
  }

  getFromTime(): number {
    let d = new Date();
    d.setFullYear(this.year);
    d.setMonth(this.month - 1);
    d.setDate(this.day);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  getToTime(): number {
    let d = new Date();
    d.setFullYear(this.year);
    d.setMonth(this.month - 1);
    d.setDate(this.day);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }

  static fromNumber(date: number) {
    const d = new Date(date);
    return new DatePicker(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes());
  }

  static fromJson(date) {
    return new DatePicker(date.year, date.month, date.day, date.hour, date.minute)
  }

}
