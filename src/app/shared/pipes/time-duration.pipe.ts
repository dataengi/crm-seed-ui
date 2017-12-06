import {PipeTransform, Pipe} from "@angular/core";
import {TimeDuration} from "../utils/time-duration";

@Pipe({name: 'crmTimeDuration'})
export class TimeDurationPipe implements PipeTransform {

  transform(value: any, ...args): any {
    return TimeDuration.toString(+value);
  }
}
