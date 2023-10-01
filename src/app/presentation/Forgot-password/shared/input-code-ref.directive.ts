import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appInputCodeRef], [codeRef] '
})
export class InputCodeRefDirective {
    constructor(private element: ElementRef, private renderer: Renderer2) { }
    @Input() set appInputCodeRef(name: string){
        this.renderer.setAttribute(this.element.nativeElement, 'ng-reflect-name', name);
        this.renderer.setAttribute(this.element.nativeElement, 'formcontrolname', name);
  }
}