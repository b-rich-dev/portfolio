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

  /** Initializes the LanguageService and loads language from localStorage */
  constructor() {
    this.loadLanguageFromStorage();
    this.updateHtmlLang();
  }

  /** Toggles the current language between English and German */
  public toggleLanguageService(): void {
    const newLanguage = this._language() === 'en' ? 'de' : 'en';
    this._language.set(newLanguage);
    
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('language', newLanguage);
      } catch (error) {
        console.warn('Failed to save language to localStorage:', error);
      }
    }
    
    this.updateHtmlLang();
  }

  /** Loads the language from localStorage on service initialization */
  private loadLanguageFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as 'en' | 'de';
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'de')) {
        this._language.set(storedLanguage);
      }
    }
  }

  /** Retrieves the current language */
  public getLanguage(): 'en' | 'de' {
    return this._language();
  }

  /** Updates the HTML document's lang attribute based on the current language */
  private updateHtmlLang(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this._language();
    }
  }
}
