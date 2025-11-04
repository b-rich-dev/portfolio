import { Component, Signal, inject } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss'
})
export class LegalNotice {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
