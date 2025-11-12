import { Component, Signal, inject } from '@angular/core';
import { LanguageService } from '../services/language';
import { RouterLink } from '@angular/router';

/**
 * Legal Notice Component
 * Handles the legal notice section functionality including:
 * - Displaying legal notice information
 * - Multilingual support (German/English)
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss'
})
export class LegalNotice {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
