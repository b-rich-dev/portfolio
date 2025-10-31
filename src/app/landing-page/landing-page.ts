import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;

}
