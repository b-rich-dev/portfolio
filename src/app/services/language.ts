import { Injectable, signal, Signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language = signal<'en' | 'de'>('en');
  public language: Signal<'en' | 'de'> = this._language;

  public toggleLanguageService() {
    this._language.set(this._language() === 'en' ? 'de' : 'en');
  }

  public getLanguage() {
    return this.language();
  }
}
