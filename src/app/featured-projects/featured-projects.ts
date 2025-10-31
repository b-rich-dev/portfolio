import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';
import { Overlay } from './overlay/overlay';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [Overlay],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss'
})
export class FeaturedProjects {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
