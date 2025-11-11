import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

/**
 * Landing Page Component
 *
 * Handles the landing page functionality including:
 * - Displaying landing page content
 * - Multilingual support (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
