import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
}
