import { Component, inject, Signal, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss'
})
export class Overlay {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;

  // dialogID

  public openDialog(): void {
    const dlg = this.dialog?.nativeElement;
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
}
