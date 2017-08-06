import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  /* listens to click and toggle some property
    which determines if some class is added or not
    and a function that dynamically changes the class
  */

  /* appDropdown
    isOpen = false
    click => !isOpen => @HostListener
    class = open else remove => @HostBinding
  */

  @HostBinding('class.open') isOpen = false;
  /* this is kinda different with
    @HostBinding('style.backgroundColor') backgroundColor = 'skyBlue';
      where the backgroundColor is set as the value of
      this binded property 'style.backgroundColor'
    since we bind 'class.open' to isOpen, open class is not
      attached initially and when isOpen = true, class will
      now get attached
      this is kinda like class.open attach yes(true) or no(false) */

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}