import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  mailTest = true;

  http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  acceptPolicy: boolean = false;

  post = {
    endPoint: 'https://birich.it/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {

            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) { //&& this.acceptPolicy
      console.log('Form submitted:', this.contactData);

      ngForm.resetForm();
      this.acceptPolicy = false;

    }
  }

  toggleAcceptPolicy() {
    this.acceptPolicy = !this.acceptPolicy;
  }

  ngAfterViewInit() {
    // Nur im Browser ausführen, nicht bei SSR
    if (isPlatformBrowser(this.platformId)) {
      // Auto-resize functionality für textareas
      this.setupTextareaAutoResize();
    }
  }

  // Setup auto-resize für alle textareas
  private setupTextareaAutoResize() {
    // Zusätzliche Browser-Prüfung
    if (!isPlatformBrowser(this.platformId) || typeof document === 'undefined') {
      return;
    }

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      // Initiale Höhe setzen
      this.adjustTextareaHeight(textarea as HTMLTextAreaElement);
      
      // Event-Listener für input events
      textarea.addEventListener('input', () => {
        this.adjustTextareaHeight(textarea as HTMLTextAreaElement);
      });
    });
  }

  // Passt die Höhe der Textarea an den Inhalt an
  private adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    // Browser-Prüfung
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Reset height to auto to get the scroll height
    textarea.style.height = 'auto';
    
    // Set height to scroll height (content height)
    const newHeight = Math.max(22, textarea.scrollHeight);
    textarea.style.height = newHeight + 'px';
    
  }

  // Öffentliche Methode für Template-Binding (falls benötigt)
  onTextareaInput(event: Event) {
    // Browser-Prüfung
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const textarea = event.target as HTMLTextAreaElement;
    this.adjustTextareaHeight(textarea);
  }
}
