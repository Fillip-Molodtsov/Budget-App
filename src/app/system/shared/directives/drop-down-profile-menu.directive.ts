import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropDownProfileMenu]'
})
export class DropDownProfileMenuDirective {
  @HostBinding('class.open') open = false;
  @HostListener('click') onClick() {
    this.open = !this.open;
  }
}
