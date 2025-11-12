import { Component, inject, Signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';
import { RouterLink } from '@angular/router';

/**
 * Header Component
 * Handles the header section functionality including:
 * - Displaying navigation links
 * - Language toggle (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  /** Current language signal from LanguageService for multilingual support */
  currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;

  /** LanguageService instance for managing language state */
  set = inject(LanguageService);

  /** Reference to the navigation dialog element */
  @ViewChild('navDialog') navDialog!: ElementRef<HTMLDialogElement>;

  /** Toggles the current language between English and German */
  public toggleLanguage(): void {
    this.set.toggleLanguageService();
  }

  /** Opens the navigation dialog modal */
  public openNavDialog(): void {
    this.openDialog(this.navDialog);
  }

  /**
   * Closes the navigation dialog modal
   * Public method for template usage
   */
  public closeNavDialog(): void {
    this.closeDialog(this.navDialog);
  }

  /**
   * Generic method to open any dialog modal
   * Disables body scrolling and sets up event listeners
   * @param dialogRef - ElementRef to the dialog element
   */
  private openDialog(dialogRef: ElementRef<HTMLDialogElement>) {
    const dlg = dialogRef?.nativeElement;
    if (!dlg) return;

    dlg.showModal();
    document.body.classList.add('no-scroll');
    this.setupDialogEventListeners(dlg);
  }

  /**
   * Generic method to close any dialog modal
   * Re-enables body scrolling
   * @param dialogRef - ElementRef to the dialog element
   */
  private closeDialog(dialogRef: ElementRef<HTMLDialogElement>) {
    const dlg = dialogRef?.nativeElement;
    if (!dlg) return;

    dlg.close();
    document.body.classList.remove('no-scroll');
  }

  /**
   * Sets up event listeners for dialog interactions
   * Handles backdrop clicks and cleanup on dialog close
   * @param dlg - The dialog HTML element
   */
  private setupDialogEventListeners(dlg: HTMLDialogElement) {
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
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
