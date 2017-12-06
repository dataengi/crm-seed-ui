import {Directive, EventEmitter, Output, ElementRef, HostListener} from '@angular/core';
import {NotificationsService} from "../../core/notifications/notifications.service";

@Directive({
  selector: '[crmDblClickCopy]'
})
export class DblClickCopyDirective {

  @Output() onCopy = new EventEmitter();

  element;

  constructor(elm: ElementRef, private ns: NotificationsService) {
    this.element = elm.nativeElement;
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event) {
    const selection = getSelection();
    const range = document.createRange();

    range.selectNodeContents(this.element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    this.onCopy.emit(range);
    this.ns.info(`${range} copied to clipboard!`);
  }

}
