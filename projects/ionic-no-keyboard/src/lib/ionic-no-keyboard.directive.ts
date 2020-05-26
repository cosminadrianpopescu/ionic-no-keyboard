import {Directive, NgZone, ElementRef} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[no-keyboard]'
})
export class NoKeyboard {
  private _s: Subscription;
  constructor(private _platform: Platform ,private _zone: NgZone, private _host: ElementRef) {}

  private _addReadonly(el: HTMLInputElement) {
    this._zone.runOutsideAngular(() => {
      el.setAttribute('readonly', '');
      if (el.value == "") {
        setTimeout(() => el.removeAttribute('readonly'));
      }
    });
  }

  private _removeReadonly(el: HTMLInputElement) {
    this._zone.runOutsideAngular(() => {
      setTimeout(() => el.removeAttribute('readonly'));
    })
  }

  public ngOnInit() {
    this._s = this._platform.pause.subscribe(() => this._host.nativeElement.blur());
  }

  public ngOnDestroy() {
    if (!this._s) {
      return ;
    }
    this._s.unsubscribe();
  }

  public ngAfterViewInit() {
    const el: HTMLInputElement = this._host.nativeElement;
    this._addReadonly(el);
    el.onclick = () => this._removeReadonly(el);
    el.onmousedown = () => this._addReadonly(el);
    el.onmouseup = () => this._removeReadonly(el);
    el.onmouseout = () => this._removeReadonly(el);
    el.ontouchstart = () => this._addReadonly(el);
    el.ontouchend = () => this._removeReadonly(el);
    el.ontouchcancel = () => this._addReadonly(el);
    el.onfocus = () => this._removeReadonly(el);
    el.onblur = () => this._addReadonly(el);
  }
}

