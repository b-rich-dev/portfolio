import { Component, inject, Signal, AfterViewInit, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../services/language';
import { EmailValidationService } from '../services/email-validation.service';
import { PlaceholderService } from '../services/placeholder.service';
import { EmailService, ContactData } from '../services/email.service';
import { RouterLink } from '@angular/router';

/**
 * Contact Component
 * 
 * Streamlined contact form with service-based architecture
 * - Form validation and submission
 * - Email sending via EmailService
 * - Test mode simulation
 * - Privacy policy dialog management
 * - Auto-resizing textarea functionality
 * - Multilingual support (German/English)
 * - Responsive placeholder texts
 * 
 * @author Eugen Birich
 * @version 2.0.0
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  /** Current language signal from LanguageService */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;

  /** Flag to toggle test mode for email sending */
  mailTest = false;

  /** Reference to the privacy policy dialog element */
  @ViewChild('privacyPolicyDialog') privacyPolicyDialog!: ElementRef<HTMLDialogElement>;

  /** Injected services */
  private emailValidationService = inject(EmailValidationService);
  private placeholderService = inject(PlaceholderService);
  private emailService = inject(EmailService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  contactData: ContactData = {
    name: '',
    email: '',
    message: ''
  };

  acceptPolicy: boolean = false;
  emailSent: boolean = false;
  emailSending: boolean = false;
  emailError: boolean = false;
  emailErrorMessage: string = '';
  validationError: boolean = false;
  emailValidationError: boolean = false;
  emailValidationMessage: string = '';

  /**
   * Handles form submission for contact form
   * @param ngForm - Angular form reference containing form data and validation state
   */
  onSubmit(ngForm: NgForm) {
    this.resetFeedbackStates();
    
    if (!this.handleEmailValidation()) return;
    if (!this.handleFormValidation(ngForm)) return;
    
    this.sendEmail(ngForm);
  }

  /**
   * Validates email and handles validation errors
   * @returns true if email is valid, false otherwise
   */
  private handleEmailValidation(): boolean {
    const emailValidation = this.emailValidationService.validateEmailDetailed(this.contactData.email, this.currentLanguage);
    
    if (!emailValidation.isValid) {
      this.showEmailValidationError(emailValidation.hasError, emailValidation.errorMessage);
      return false;
    }
    
    return true;
  }

  /**
   * Validates form and handles validation errors
   * @param ngForm - Angular form reference to validate
   * @returns true if form is valid, false otherwise
   */
  private handleFormValidation(ngForm: NgForm): boolean {
    if (!this.validateForm(ngForm)) {
      this.showFormValidationError();
      return false;
    }
    
    return true;
  }

  /**
   * Shows email validation error with timeout
   * @param hasError - Whether there is an error
   * @param errorMessage - Error message to display
   */
  private showEmailValidationError(hasError: boolean, errorMessage: string): void {
    this.emailValidationError = hasError;
    this.emailValidationMessage = errorMessage;
    
    setTimeout(() => {
      this.emailValidationError = false;
      this.emailValidationMessage = '';
    }, 6000);
  }

  /**
   * Shows form validation error with timeout
   */
  private showFormValidationError(): void {
    this.validationError = true;
    setTimeout(() => { this.validationError = false; }, 5000);
  }

  /**
   * Resets all feedback states to initial values
   */
  private resetFeedbackStates(): void {
    this.emailSent = false;
    this.emailError = false;
    this.emailErrorMessage = '';
    this.validationError = false;
    this.emailValidationError = false;
    this.emailValidationMessage = '';
  }

  /**
   * Validates the form data and policy acceptance
   * @param ngForm - Angular form reference to validate
   * @returns true if form is valid, false otherwise
   */
  private validateForm(ngForm: NgForm): boolean {
    if (!ngForm.submitted || !ngForm.form.valid) return false;
    if (!this.acceptPolicy) return false;
    if (this.contactData.message.trim().length < 1) return false;
    if (!this.contactData.name.trim()) return false;

    return true;
  }

  /**
   * Sends email using EmailService
   * @param ngForm - Form reference for resetting after successful submission
   */
  private sendEmail(ngForm: NgForm) {
    this.emailSending = true;

    const emailObservable = this.mailTest ? this.emailService.sendEmailTestMode(this.contactData) : this.emailService.sendEmail(this.contactData, this.currentLanguage);

    emailObservable.subscribe({
      next: (result) => {
        if (result.success) this.handleEmailSuccess(ngForm);
      },
      error: (errorResult) => {
        this.handleEmailError(errorResult.error);
      }
    });
  }

  /**
   * Handles successful email submission
   * @param ngForm - Form reference to reset after successful submission
   */
  private handleEmailSuccess(ngForm: NgForm) {
    this.emailSending = false;
    this.emailSent = true;
    ngForm.resetForm();
    this.acceptPolicy = false;
    setTimeout(() => { this.emailSent = false; }, 5000);
  }

  /**
   * Handles email submission errors
   * @param errorMessage - Error message from EmailService
   */
  private handleEmailError(errorMessage: string) {
    this.emailSending = false;
    this.emailError = true;
    this.emailErrorMessage = errorMessage;

    setTimeout(() => {
      this.emailError = false;
      this.emailErrorMessage = '';
    }, 7000);
  }

  /**
   * Toggles the privacy policy acceptance state
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
   * Sets up automatic textarea height adjustment
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
   * Adjusts textarea height based on content
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
   * @param event - Input event from textarea
   */
  onTextareaInput(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = event.target as HTMLTextAreaElement;
    this.adjustTextareaHeight(textarea);
  }

  /**
   * Gets responsive placeholder text for name input using PlaceholderService
   * @param isError - Whether to show error placeholder
   * @returns Appropriate placeholder text
   */
  getNamePlaceholder(isError: boolean): string {
    return this.placeholderService.getNamePlaceholder(isError, this.currentLanguage);
  }

  /**
   * Gets responsive placeholder text for email input using PlaceholderService
   * @param isError - Whether to show error placeholder
   * @returns Appropriate placeholder text
   */
  getEmailPlaceholder(isError: boolean): string {
    return this.placeholderService.getEmailPlaceholder(isError, this.currentLanguage);
  }

  /**
   * Gets responsive placeholder text for message textarea using PlaceholderService
   * @param isError - Whether to show error placeholder
   * @returns Appropriate placeholder text
   */
  getMessagePlaceholder(isError: boolean): string {
    return this.placeholderService.getMessagePlaceholder(isError, this.currentLanguage);
  }
}