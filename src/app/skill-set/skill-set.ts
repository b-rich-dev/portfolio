import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

/**
 * Skill Set Component
 * Handles the skill-set section functionality including:
 * - Displaying various skills
 * - Multilingual support (German/English)
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [],
  templateUrl: './skill-set.html',
  styleUrl: './skill-set.scss'
})
export class SkillSet {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
