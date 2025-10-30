import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-featured-projects',
  imports: [],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss'
})
export class FeaturedProjects {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
