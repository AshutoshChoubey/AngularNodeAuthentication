import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { 
    console.log("constructor",el);
  }

  @Input() defaultColor: string;

  @Input('appHighlight') highlightColor1: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor1 || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    console.log(this.el);
  }

}
