import { Injectable, signal, Signal } from "@angular/core";

/**
 * Language Service
 * Manages the application's language state and provides methods to toggle and retrieve the current language.
 * Also updates the HTML document's lang attribute for accessibility and SEO.
 * @author Eugen Birich
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language = signal<'en' | 'de'>('en');
  public language: Signal<'en' | 'de'> = this._language;

  /** Initializes the LanguageService and sets the HTML lang attribute */
  constructor() {
    this.updateHtmlLang();
  }

  /** Toggles the current language between English and German */
  public toggleLanguageService() {
    this._language.set(this._language() === 'en' ? 'de' : 'en');
    this.updateHtmlLang();
  }

  /** Retrieves the current language */
  public getLanguage() {
    return this.language();
  }

  /** Updates the HTML document's lang attribute based on the current language */
  private updateHtmlLang() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this._language();
    }
  }
}
