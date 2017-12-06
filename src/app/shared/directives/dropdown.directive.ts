import {Directive, HostBinding, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[crmDropdown]',
  exportAs: 'crmDropdown',
  host: {
    '(document:click)':'close($event)'
  }
})
export class DropdownDirective {

  constructor(private elementRef: ElementRef) {
  }

  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }

  @HostListener('click', ['$event']) open() {
    this.isOpen = true;
  }

  close(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  private isOpen = false;

}
