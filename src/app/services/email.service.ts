import { Injectable, inject, Signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ContactData {
    name: string;
    email: string;
    message: string;
}

export interface EmailSendResult {
    success: boolean;
    error?: string;
}

/**
 * Email Service
 * 
 * Handles email sending functionality via HTTP POST
 * Manages error handling and provides structured responses
 * Supports test mode for development
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Injectable({
    providedIn: 'root'
})
export class EmailService {
    private http = inject(HttpClient);

    private readonly endPoint = 'https://birich.it/sendMail.php';
    private readonly requestOptions = {
        headers: {
            'Content-Type': 'text/plain',
            responseType: 'text',
        },
    };

    /**
     * Sends email via HTTP POST request
     * @param contactData - Contact form data to send
     * @param currentLanguage - Language signal for error messages
     * @returns Observable with send result
     */
    sendEmail(contactData: ContactData, currentLanguage: Signal<'en' | 'de'>): Observable<EmailSendResult> {
        return this.http.post(this.endPoint, JSON.stringify(contactData), this.requestOptions)
            .pipe(
                map(() => ({ success: true })),
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.getErrorMessage(error, currentLanguage);
                    return throwError(() => ({
                        success: false,
                        error: errorMessage
                    }));
                })
            );
    }

    /**
     * Simulates email sending for test mode
     * @param contactData - Contact form data (for logging)
     * @returns Observable with simulated success
     */
    sendEmailTestMode(contactData: ContactData): Observable<EmailSendResult> {
        console.log('Test mode - Form submitted:', contactData);

        return new Observable(observer => {
            setTimeout(() => {
                observer.next({ success: true });
                observer.complete();
            }, 1000);
        });
    }

    /**
     * Gets appropriate error message based on HTTP error status
     * @param error - HTTP error response
     * @param currentLanguage - Language signal for error messages
     * @returns Localized error message
     */
    private getErrorMessage(error: HttpErrorResponse, currentLanguage: Signal<'en' | 'de'>): string {
        const isEnglish = currentLanguage() === 'en';

        if (error.status === 0) return isEnglish ? 'Network error. Please check your connection.' : 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.';
        if (error.status >= 500) return isEnglish ? 'Server error. Please try again later.' : 'Serverfehler. Bitte versuchen Sie es später erneut.';
        if (error.status === 400) return isEnglish ? 'Invalid data. Please check your input.' : 'Ungültige Daten. Bitte überprüfen Sie Ihre Eingaben.';

        return isEnglish ? 'Failed to send message. Please try again.' : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.';
    }
}