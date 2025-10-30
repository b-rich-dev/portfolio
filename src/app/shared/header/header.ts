import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  set = inject(LanguageService);

  toggleLanguage() {
    this.set.toggleLanguageService();
  }
}
