import { Component, inject, Signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  set = inject(LanguageService);

  @ViewChild('navDialog') navDialog!: ElementRef<HTMLDialogElement>;

  toggleLanguage() {
    this.set.toggleLanguageService();
  }

  openNavDialog(){
    const dlg = this.navDialog?.nativeElement;
    if (!dlg) return;
    dlg.showModal();
    document.body.classList.add('no-scroll');

    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dlg) {
        dlg.close();
      }
    };

    const onClose = () => {
      document.body.classList.remove('no-scroll');
      dlg.removeEventListener('click', onBackdropClick);
      dlg.removeEventListener('close', onClose);
    };

    dlg.addEventListener('click', onBackdropClick);
    dlg.addEventListener('close', onClose);
  }

  public closeNavDialog(): void {
    const dlg = this.navDialog?.nativeElement;
    if (!dlg) return;
    dlg.close();
    document.body.classList.remove('no-scroll');
  }
}
