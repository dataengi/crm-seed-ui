import {Period} from "../models/period";

export class PeriodTime {

  static readonly Day: PeriodTimeName = "Day";
  static readonly Week: PeriodTimeName = "Week";
  static readonly Month: PeriodTimeName = "Month";
  static readonly Year: PeriodTimeName = "Year";
  static readonly All: PeriodTimeName = "All time";

  static getPeriod(periodName: PeriodTimeName): Period {
    let fromTime = new Date();
    switch (periodName) {
      case PeriodTime.Day:
        break;
      case PeriodTime.Week:
        fromTime.setDate(fromTime.getDate() - 7);
        break;
      case PeriodTime.Month:
        fromTime.setMonth(fromTime.getMonth() - 1);
        break;
      case PeriodTime.Year:
        fromTime.setFullYear(fromTime.getFullYear() - 1);
        break;
      case PeriodTime.All:
        fromTime.setTime(0);
        break;
    }

    return new Period(fromTime.getTime(), new Date().getTime()).toStartAndEndOfDay()
  }

}

export type PeriodTimeName = "Day" | "Week" | "Month" | "Year" | "All time"
