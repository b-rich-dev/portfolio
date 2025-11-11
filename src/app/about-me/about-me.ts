import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

/**
 * About Me Component
 * 
 * Handles the about-me section functionality including:
 * - Displaying personal information
 * - Multilingual support (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss'
})
export class AboutMe {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
