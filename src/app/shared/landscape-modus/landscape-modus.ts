import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../../services/language';

/**
 * Landscape Modus Component
 * 
 * Displays a fullscreen overlay when device is in landscape orientation,
 * requesting user to rotate back to portrait mode for better experience.
 * 
 * Features:
 * - Only shows on mobile devices in landscape mode
 * - Multilingual support (German/English)
 * - Fullscreen overlay with high z-index
 * - CSS-only detection using media queries
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-landscape-modus',
  standalone: true,
  imports: [],
  templateUrl: './landscape-modus.html',
  styleUrl: './landscape-modus.scss'
})
export class LandscapeModus {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
