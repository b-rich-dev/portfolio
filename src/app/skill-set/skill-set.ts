import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-skill-set',
  imports: [],
  templateUrl: './skill-set.html',
  styleUrl: './skill-set.scss'
})
export class SkillSet {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
