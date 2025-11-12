import { Injectable, Signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Placeholder Service
 * 
 * Manages responsive placeholder texts for form inputs
 * Switches between normal and short placeholders based on screen width
 * Supports multilingual placeholders (German/English)
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Injectable({
    providedIn: 'root'
})
export class PlaceholderService {
    private readonly BREAKPOINT_WIDTH = 420;

    private originalPlaceholders = {
        nameEn: 'Your Name goes here',
        nameEnError: 'Oops! it seems your name is missing',
        nameDe: 'Ihr Name hier eingeben',
        nameDeError: 'Hoppla! es scheint, als ob Ihr Name fehlt',
        emailEn: 'yourmail@email.com',
        emailEnError: 'Hoppla! your email is required',
        emailDe: 'deinemail@email.de',
        emailDeError: 'Hoppla! Ihre E-Mail ist erforderlich',
        messageEn: 'Hello Eugen, I am interested in...',
        messageEnError: 'What do you need to develop?',
        messageDe: 'Hallo Eugen, ich interessiere mich für...',
        messageDeError: 'Was müssen Sie entwickeln?'
    };

    private shortPlaceholders = {
        nameEn: 'Your Name',
        nameEnError: 'Name missing',
        nameDe: 'Ihr Name',
        nameDeError: 'Name fehlt',
        emailEn: 'mail@email.com',
        emailEnError: 'Email required',
        emailDe: 'mail@email.de',
        emailDeError: 'E-Mail erforderlich',
        messageEn: 'Hello Eugen, I am interested...',
        messageEnError: 'What to develop?',
        messageDe: 'Hallo Eugen, ich interessiere...',
        messageDeError: 'Was entwickeln?'
    };

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    /**
     * Gets responsive placeholder text for name input
     * @param isError - Whether to show error placeholder
     * @param currentLanguage - Language signal for placeholder text
     * @returns Appropriate placeholder text based on screen width and language
     */
    getNamePlaceholder(isError: boolean, currentLanguage: Signal<'en' | 'de'>): string {
        return this.getPlaceholder('name', isError, currentLanguage);
    }

    /**
     * Gets responsive placeholder text for email input
     * @param isError - Whether to show error placeholder
     * @param currentLanguage - Language signal for placeholder text
     * @returns Appropriate placeholder text based on screen width and language
     */
    getEmailPlaceholder(isError: boolean, currentLanguage: Signal<'en' | 'de'>): string {
        return this.getPlaceholder('email', isError, currentLanguage);
    }

    /**
     * Gets responsive placeholder text for message textarea
     * @param isError - Whether to show error placeholder
     * @param currentLanguage - Language signal for placeholder text
     * @returns Appropriate placeholder text based on screen width and language
     */
    getMessagePlaceholder(isError: boolean, currentLanguage: Signal<'en' | 'de'>): string {
        return this.getPlaceholder('message', isError, currentLanguage);
    }

    /**
     * Generic method to get placeholder text for any field type
     * @param fieldType - Type of field (name, email, message)
     * @param isError - Whether to show error placeholder
     * @param currentLanguage - Language signal for placeholder text
     * @returns Appropriate placeholder text
     */
    private getPlaceholder(fieldType: 'name' | 'email' | 'message', isError: boolean, currentLanguage: Signal<'en' | 'de'>): string {
        if (!isPlatformBrowser(this.platformId)) {
            return this.getFallbackPlaceholder(fieldType, isError, currentLanguage);
        }

        const isSmallScreen = typeof window !== 'undefined' ? window.innerWidth < this.BREAKPOINT_WIDTH : false;
        const isEnglish = currentLanguage() === 'en';

        const placeholderSet = isSmallScreen ? this.shortPlaceholders : this.originalPlaceholders;

        const baseKey = fieldType + (isEnglish ? 'En' : 'De') + (isError ? 'Error' : '');
        return placeholderSet[baseKey as keyof typeof placeholderSet] || '';
    }

    /**
     * Gets fallback placeholder for SSR environment
     * @param fieldType - Type of field (name, email, message)
     * @param isError - Whether to show error placeholder
     * @param currentLanguage - Language signal for placeholder text
     * @returns Fallback placeholder text
     */
    private getFallbackPlaceholder(
        fieldType: 'name' | 'email' | 'message',
        isError: boolean,
        currentLanguage: Signal<'en' | 'de'>
    ): string {
        const isEnglish = currentLanguage() === 'en';
        const baseKey = fieldType + (isEnglish ? 'En' : 'De') + (isError ? 'Error' : '');
        return this.originalPlaceholders[baseKey as keyof typeof this.originalPlaceholders] || '';
    }
}