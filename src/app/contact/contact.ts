import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  mailTest = true;

  http = inject(HttpClient);

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
}
