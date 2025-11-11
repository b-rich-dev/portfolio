import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Signal, AfterViewInit, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../services/language';

/**
 * Contact Component
 * 
 * Handles the contact form functionality including:
 * - Form validation and submission
 * - Email sending via HTTP POST
 * - Test mode simulation
 * - Privacy policy dialog management
 * - Auto-resizing textarea functionality
 * - Multilingual support (German/English)
 * 
 * Features:
 * - Real email sending and test mode toggle
 * - Loading states and success/error feedback
 * - Privacy policy acceptance requirement
 * - Responsive textarea that grows with content
 * - Modal dialog for privacy policy display
 * - Server-side rendering (SSR) compatibility
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  
  /** Flag to toggle test mode for email sending */
  mailTest = false;

  /** Reference to the privacy policy dialog element */
  @ViewChild('privacyPolicyDialog') privacyPolicyDialog!: ElementRef<HTMLDialogElement>;

  /** HTTP client for sending requests */
  http = inject(HttpClient);

  /** Platform ID for SSR compatibility */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  contactData: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: ''
  };

  acceptPolicy: boolean = false;
  emailSent: boolean = false;
  emailSending: boolean = false;

  post: {
    endPoint: string;
    body: (payload: any) => string;
    options: {
      headers: {
        'Content-Type': string;
        responseType: string;
      };
    };
  } = {
    endPoint: 'https://birich.it/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Handles form submission for contact form
   * @param ngForm - Angular form reference containing form data and validation state
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && this.acceptPolicy && !this.mailTest) {
      this.sendMail(ngForm);
    } else if (ngForm.submitted && ngForm.form.valid && this.acceptPolicy && this.mailTest) {
      this.sendMailTestMode(ngForm);
    }
  }

  /**
   * Sends email via HTTP POST request to server endpoint
   * @param ngForm - Form reference for resetting after successful submission
   */
  private sendMail(ngForm: NgForm) {
    this.emailSending = true;
    this.emailSent = false;

    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: (response) => { this.nextToDo(ngForm); },
        error: (error) => { this.errorToDo(error); },
      });
  }

  /**
   * Handles successful email submission
   * Resets form state and shows success message for 5 seconds
   * @param ngForm - Form reference to reset after successful submission
   */
  private nextToDo(ngForm: NgForm) {
    this.emailSending = false;
    this.emailSent = true;
    ngForm.resetForm();
    this.acceptPolicy = false;
    setTimeout(() => { this.emailSent = false; }, 5000);
  }

  /**
   * Handles HTTP errors during email submission
   * Logs error details and resets sending state
   * @param error - HTTP error response containing status, message, and other error details
   */
  private errorToDo(error: HttpErrorResponse) {
    console.error(error);
    this.emailSending = false;
  }

  /**
   * Simulates email sending for testing purposes
   * Shows loading state for 1 second, then success message for 5 seconds
   * @param ngForm - Form reference to reset after simulated submission
   */
  private sendMailTestMode(ngForm: NgForm) {
    console.log('Form submitted:', this.contactData);

    this.emailSending = true;
    setTimeout(() => {
      this.emailSending = false;
      this.emailSent = true;
      ngForm.resetForm();
      this.acceptPolicy = false;

      setTimeout(() => {
        this.emailSent = false;
      }, 5000);
    }, 1000);
  }

  /**
   * Toggles the privacy policy acceptance state
   * Used for checkbox interaction in the contact form
   */
  toggleAcceptPolicy() {
    this.acceptPolicy = !this.acceptPolicy;
  }

  /** Lifecycle hook after component view initialization */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupTextareaAutoResize();
    }
  }

  /**
   * Sets up automatic textarea height adjustment for all textareas in the component
   * Only runs in browser environment (not during SSR)
   */
  private setupTextareaAutoResize() {
    if (!isPlatformBrowser(this.platformId) || typeof document === 'undefined') return;

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      this.adjustTextareaHeight(textarea as HTMLTextAreaElement);
      textarea.addEventListener('input', () => {
        this.adjustTextareaHeight(textarea as HTMLTextAreaElement);
      });
    });
  }

  /**
   * Adjusts textarea height based on content to prevent scrollbars
   * Ensures minimum height of 22px and grows with content
   * @param textarea - The textarea element to adjust
   */
  private adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    if (!isPlatformBrowser(this.platformId)) return;

    textarea.style.height = 'auto';

    const newHeight = Math.max(22, textarea.scrollHeight);
    textarea.style.height = newHeight + 'px';

  }

  /**
   * Event handler for textarea input events
   * Triggers height adjustment when user types in textarea
   * @param event - Input event from textarea
   */
  onTextareaInput(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = event.target as HTMLTextAreaElement;
    this.adjustTextareaHeight(textarea);
  }

  /**
   * Opens the privacy policy dialog modal
   */
  openPrivacyPolicyDialog() {
    this.openDialog(this.privacyPolicyDialog);
  }

  /**
   * Closes the privacy policy dialog modal
   * Public method for template usage
   */
  public closePrivacyPolicyDialog(): void {
    this.closeDialog(this.privacyPolicyDialog);
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
