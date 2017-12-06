import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[sidebarDropdown]',
  exportAs: 'sidebarDropdown'
})
export class DropdownDirective {

  private targetClassName = "nav-link nav-dropdown-toggle";
  private isOpen = false;

  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }

  @HostListener('click', ['$event.target.className']) open(srcClass) {
    if (srcClass === this.targetClassName) {
      this.isOpen = !this.isOpen;
    }
  }

  close() {
    this.isOpen = false;
  }

}
