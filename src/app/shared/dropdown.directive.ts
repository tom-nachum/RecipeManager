import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  clicked = 0;
  @HostBinding('class.open') isOpen = false;

  @HostListener('window:click') windowClick(eventData: Event) {
    if (this.clicked%3==0 || !this.isOpen){
      this.isOpen = false;
      this.clicked = 0;
    }
    this.clicked++;
  }

  @HostListener('click') dropdownClick(eventData: Event) {
    this.isOpen = !this.isOpen;
    this.clicked++;
  }

}
