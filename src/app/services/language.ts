import { Injectable, signal, Signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language = signal<'en' | 'de'>('en');
  public language: Signal<'en' | 'de'> = this._language;

  constructor() {
    this.updateHtmlLang();
  }

  public toggleLanguageService() {
    this._language.set(this._language() === 'en' ? 'de' : 'en');
    this.updateHtmlLang();
  }

  public getLanguage() {
    return this.language();
  }

  private updateHtmlLang() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this._language();
    }
  }
}
