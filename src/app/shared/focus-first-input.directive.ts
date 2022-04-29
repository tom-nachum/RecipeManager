import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'form[appFocusFirstInput]'
})
export class FocusFirstInputDirective implements AfterViewInit {

  constructor(
    private element: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    const input = this.element.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }
}