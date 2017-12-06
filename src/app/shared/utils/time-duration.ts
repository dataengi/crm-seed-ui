import {FormControl} from "@angular/forms";

export class TimeDuration {

  private static readonly M = 'm';
  private static readonly H = 'h';
  private static readonly D = 'd';
  private static readonly W = 'w';

  private static readonly Minute = 60000;
  private static readonly Hour = 3600000;
  private static readonly Day = 28800000;
  private static readonly Week = 144000000;

  static validator(control: FormControl) {
    const regexp = /(^\d{1,2}[w]\s\d{1,2}[d]\s\d{1,2}[h]\s\d{1,2}[m]$)|(^\d{1,2}[w]\s\d{1,2}[d]\s\d{1,2}[h]$)|(^\d{1,2}[w]\s\d{1,2}[d]\s\d{1,2}[m]$)|(^\d{1,2}[w]\s\d{1,2}[h]\s\d{1,2}[m]$)|(^\d{1,2}[d]\s\d{1,2}[h]\s\d{1,2}[m]$)|(^\d{1,2}[w]\s\d{1,2}[d]$)|(^\d{1,2}[w]\s\d{1,2}[h]$)|(^\d{1,2}[w]\s\d{1,2}[m]$)|(^\d{1,2}[d]\s\d{1,2}[h]$)|(^\d{1,2}[d]\s\d{1,2}[m]$)|(^\d{1,2}[h]\s\d{1,2}[m]$)|(^\d{1,2}[w]$)|(^\d{1,2}[d]$)|(^\d{1,2}[h]$)|(^\d{1,2}[m]$)/;
    if (control.value && control.value.length > 0 && !regexp.test(control.value.trim())) {
      return {invalidDuration: true}
    }
    return null;
  }

  static toNumber(str: string): number {
    let durations = str.split(/\s/).map(e => e.trim()).map(e => {
      let type = e.slice(-1);
      let num = parseInt(e.slice(0, -1));
      switch (type) {
        case TimeDuration.M:
          return num * TimeDuration.Minute;
        case TimeDuration.H:
          return num * TimeDuration.Hour;
        case TimeDuration.D:
          return num * TimeDuration.Day;
        case TimeDuration.W:
          return num * TimeDuration.Week;
      }
    });
    return durations.reduce((a, b) => a + b, 0)
  }

  static toString(time: number): string {
    let str = "";

    let weeks = Math.floor(time / TimeDuration.Week);
    if (weeks) {
      str += weeks + TimeDuration.W + " ";
    }
    time %= TimeDuration.Week;

    let days = Math.floor(time / TimeDuration.Day);
    if (days) {
      str += days + TimeDuration.D + " ";
    }
    time %= TimeDuration.Day;

    let hours = Math.floor(time / TimeDuration.Hour);
    if (hours) {
      str += hours + TimeDuration.H + " ";
    }
    time %= TimeDuration.Hour;

    let minutes = Math.floor(time / TimeDuration.Minute);
    if (minutes) {
      str += minutes + TimeDuration.M
    }

    return str.trim();
  }

}
