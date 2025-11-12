import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language';

/**
 * Footer Component
 * Handles the footer section functionality including:
 * - Displaying footer content
 * - Multilingual support (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
