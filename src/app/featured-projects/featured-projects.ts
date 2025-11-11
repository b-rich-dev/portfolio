import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';
import { Overlay } from './overlay/overlay';


/**
 * Featured Projects Component
 * 
 * Handles the featured projects section functionality including:
 * - Displaying featured projects
 * - Multilingual support (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [Overlay],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss'
})
export class FeaturedProjects {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
