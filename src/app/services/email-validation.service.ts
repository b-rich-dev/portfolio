import { Injectable, Signal } from '@angular/core';

/**
 * Email Validation Service
 * 
 * Handles detailed email validation with specific error messages
 * Supports multilingual error messages (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Injectable({
    providedIn: 'root'
})
export class EmailValidationService {
    private emailValidationError: boolean = false;
    private emailValidationMessage: string = '';

    /**
     * Validates email address with detailed error checking
     * @param email - Email address to validate
     * @param currentLanguage - Language signal for error messages
     * @returns Object containing validation result and error details
     */
    validateEmailDetailed(email: string, currentLanguage: Signal<'en' | 'de'>): { isValid: boolean; hasError: boolean; errorMessage: string; } {
        const trimmedEmail = email?.trim() || '';

        this.emailValidationError = false;
        this.emailValidationMessage = '';

        const isValid = this.checkEmailExists(trimmedEmail, currentLanguage) &&
            this.checkAtSymbol(trimmedEmail, currentLanguage) &&
            this.checkEmailParts(trimmedEmail, currentLanguage) &&
            this.checkEmailFormat(trimmedEmail, currentLanguage) &&
            this.checkEmailPattern(trimmedEmail, currentLanguage);

        return { isValid, hasError: this.emailValidationError, errorMessage: this.emailValidationMessage };
    }

    /**
     * Checks if email exists and is not empty
     */
    private checkEmailExists(email: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        if (!email) {
            this.setEmailValidationError('en', 'Email address is required.', 'de', 'E-Mail-Adresse ist erforderlich.', currentLanguage);
            return false;
        }
        return true;
    }

    /**
     * Validates @ symbol presence and count
     */
    private checkAtSymbol(email: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        if (!email.includes('@')) {
            this.setEmailValidationError('en', 'Email address must contain @ symbol.', 'de', 'E-Mail-Adresse muss @ Symbol enthalten.', currentLanguage);
            return false;
        }

        if ((email.match(/@/g) || []).length > 1) {
            this.setEmailValidationError('en', 'Email address contains too many @ symbols.', 'de', 'E-Mail-Adresse enthält zu viele @ Symbole.', currentLanguage);
            return false;
        }

        return true;
    }

    /**
     * Validates local and domain parts of email
     */
    private checkEmailParts(email: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        const parts = email.split('@');
        const localPart = parts[0];
        const domainPart = parts[1];

        if (!localPart || localPart.length === 0) {
            this.setEmailValidationError('en', 'Email address is missing the part before @.', 'de', 'E-Mail-Adresse fehlt der Teil vor @.', currentLanguage);
            return false;
        }

        if (!domainPart || domainPart.length === 0) {
            this.setEmailValidationError('en', 'Email address is missing the domain after @.', 'de', 'E-Mail-Adresse fehlt die Domain nach @.', currentLanguage);
            return false;
        }

        return this.checkDomainStructure(domainPart, currentLanguage);
    }

    /**
     * Validates domain structure and extension
     */
    private checkDomainStructure(domainPart: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        if (!domainPart.includes('.')) return this.returnEmailValidationError('dot', currentLanguage);

        const domainParts = domainPart.split('.');
        if (domainParts.length < 2) return this.returnEmailValidationError('domain', currentLanguage);

        const extension = domainParts[domainParts.length - 1];
        if (extension.length < 2) return this.returnEmailValidationError('letter', currentLanguage);

        return true;
    }

    /**   
     * Returns specific email validation error based on trigger
     */
    private returnEmailValidationError(trigger: 'dot' | 'letter' | 'domain', currentLanguage: Signal<'en' | 'de'>): boolean {
        if (trigger === 'dot') {
            this.setEmailValidationError('en', 'Email domain must contain a dot (e.g., .com, .de).', 'de', 'E-Mail-Domain muss einen Punkt enthalten (z.B. .com, .de).', currentLanguage);
        } else if (trigger === 'domain') {
            this.setEmailValidationError('en', 'Email domain is incomplete.', 'de', 'E-Mail-Domain ist unvollständig.', currentLanguage);
        } else if (trigger === 'letter') {
            this.setEmailValidationError('en', 'Email domain extension is too short (minimum 2 characters).', 'de', 'E-Mail-Domain-Endung ist zu kurz (mindestens 2 Zeichen).', currentLanguage);
        }
        return false;
    }

    /**
     * Checks email format for spaces and consecutive dots
     */
    private checkEmailFormat(email: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        if (email.includes(' ')) {
            this.setEmailValidationError('en', 'Email address cannot contain spaces.', 'de', 'E-Mail-Adresse darf keine Leerzeichen enthalten.', currentLanguage);
            return false;
        }

        if (email.includes('..')) {
            this.setEmailValidationError('en', 'Email address cannot contain consecutive dots.', 'de', 'E-Mail-Adresse darf keine aufeinanderfolgenden Punkte enthalten.', currentLanguage);
            return false;
        }

        return true;
    }

    /**
     * Final regex pattern validation
     */
    private checkEmailPattern(email: string, currentLanguage: Signal<'en' | 'de'>): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            this.setEmailValidationError(
                'en', 'Email address format is invalid. Please use format: name@domain.com',
                'de', 'E-Mail-Adressformat ist ungültig. Bitte verwenden Sie das Format: name@domain.de',
                currentLanguage
            );
            return false;
        }

        return true;
    }

    /**
     * Sets email validation error message based on current language
     */
    private setEmailValidationError(
        enKey: string,
        enMessage: string,
        deKey: string,
        deMessage: string,
        currentLanguage: Signal<'en' | 'de'>
    ): void {
        this.emailValidationError = true;
        this.emailValidationMessage = currentLanguage() === 'en' ? enMessage : deMessage;
    }
}