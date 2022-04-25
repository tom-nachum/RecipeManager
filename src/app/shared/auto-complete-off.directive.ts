import { ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appAutoCompleteOff]',
})
export class AutoCompleteOffDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'readonly',
      'readonly'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'white'
    );
  }

  @HostListener('click') onFocus(eventData: Event) {
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'readonly');
  }
}
