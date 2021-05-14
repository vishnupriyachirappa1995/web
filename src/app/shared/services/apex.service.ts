import { Injectable, Output, EventEmitter, NgZone } from "@angular/core";
import { Observable, AsyncSubject, Subject, BehaviorSubject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class ApexService {
  private _loaderSubject: Subject<Boolean> = new BehaviorSubject(false);
  private _sessionUserSubject: Subject<Object> = new BehaviorSubject(null);
  private _menuSubject: Subject<Object[]> = new BehaviorSubject(null);
  private _dataSubject: Subject<any> = new BehaviorSubject(null);
  private _langSubject: BehaviorSubject<any> = new BehaviorSubject({lang: 'en'});

  constructor(
    private _domSanitizer: DomSanitizer,
    private zone: NgZone
  ) {}
  showMessage(message: string) {
    this.zone.run(() => {
      // this._snackBarService.open(message, "close", {
      //   duration: 35000,
      //   verticalPosition: "top",
      //   horizontalPosition: "right",
      //   panelClass: "snack-error"
      // });
    });
  }
  showLoader(show: Boolean) {
    this.zone.run(() => {
      this._loaderSubject.next(show);
    });
  }

  loaderEvent(): Observable<Boolean> {
    return this._loaderSubject.asObservable();
  }
  sessionUserEvent(): Observable<Object> {
    return this._sessionUserSubject.asObservable();
  }
  menuEvent(): Observable<Object[]> {
    return this._menuSubject.asObservable();
  }
  dataEvent(): Observable<any> {
    return this._dataSubject.asObservable();
  }
  langEvent():  Observable<any> {
    return this._langSubject.asObservable();
  }


  dataEmit(data: any): any {
    this._dataSubject.next(data);
  }
  menuEmit(menu: any) {
    this.zone.run(() => {
      this._menuSubject.next(menu);
    });
  }
  langEmit(lang: any){
    this.zone.run(() => {
      this._langSubject.next(lang);
    });
  }
  sessionUserEmit(sessionUser: any) {
    this._sessionUserSubject.next(sessionUser);
  }

  bypassURL(url: string) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
