import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss'
})
export class AboutMe {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
