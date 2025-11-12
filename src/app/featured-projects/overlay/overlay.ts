import { Component, inject, Signal, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../services/language';

/**
 * Interface for project data structure
 */
interface ProjectData {
  id: number;
  title: string;
  language: Array<{ code: string; question: string; description: string; }>;
  icons: Array<{ img: string; alt: string; text: string; }>;
  github: string;
  link: string;
  bigImg: Array<{ src: string; alt: string; }>;
}

/**
 * Project Overlay Component
 * 
 * Interactive modal overlay that displays detailed information about portfolio projects.
 * 
 * Features:
 * - Project showcase with detailed descriptions
 * - Multilingual content support (German/English)
 * - Technology stack display with icons
 * - Direct links to GitHub repository and live demo
 * - Modal dialog with backdrop interaction
 * - Project navigation functionality
 * - Responsive design with scroll management
 * 
 * Projects included:
 * - Join: Kanban-style task manager
 * - El Pollo Loco: Object-oriented JavaScript game
 * - Pokedex: REST API based Pokemon encyclopedia
 * 
 * @author Eugen Birich
 * @version 1.0.1
 */
@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss'
})
export class Overlay {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;

  /** Reference to the dialog element for modal functionality */
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;

  /** Currently selected project ID for display in the overlay */
  public currentProjectId: number = 1;

  /**
   * Static project data containing all portfolio projects
   * Each project includes multilingual descriptions, tech stack, and links
   */
  dialogContent: ProjectData[] = [{
    id: 0o1,
    title: 'Join',
    language: [
      { code: "en", question: "What is this project about?", description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.' },
      { code: "de", question: "Worum geht es in diesem Projekt?", description: 'Aufgabenmanager, inspiriert vom Kanban-System. Aufgaben per Drag & Drop erstellen und organisieren, Benutzer und Kategorien zuweisen.' }
    ],
    icons: [{ img: "javascript_icon.svg", alt: "JavaScript Icon", text: "JavaScript" },
    { img: "firebase_icon.svg", alt: "Firebase Icon", text: "Firebase" },
    { img: "css_icon.svg", alt: "CSS Icon", text: "CSS" },
    { img: "html_icon.svg", alt: "HTML Icon", text: "HTML" }],
    github: "https://github.com/b-rich-dev/Join-Team-Work",
    link: "https://birich.it/Join-Team-Work",
    bigImg: [{ src: "join.png", alt: "Join Project Screenshot" }]
  },
  {
    id: 0o2,
    title: 'El Pollo Loco',
    language: [
      { code: "en", question: "What is this project about?", description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.' },
      { code: "de", question: "Worum geht es in diesem Projekt?", description: 'Springen, rennen und werfen – ein objektorientiertes Spiel. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um die verrückten Hennen zu besiegen.' }
    ],
    icons: [{ img: "javascript_icon.svg", alt: "JavaScript Icon", text: "JavaScript" },
    { img: "css_icon.svg", alt: "CSS Icon", text: "CSS" },
    { img: "html_icon.svg", alt: "HTML Icon", text: "HTML" }],
    github: "https://github.com/b-rich-dev/el_pollo_loco",
    link: "https://birich.it/el_pollo_loco",
    bigImg: [{ src: "el_pollo_loco.png", alt: "El Pollo Loco Project Screenshot" }]
  },
  {
    id: 0o3,
    title: 'Pokedex',
    language: [
      { code: "en", question: "What is this project about?", description: 'This Pokédex app is a responsive web application that provides Pokémon fans with a comprehensive database of all Pokémon. The app uses the official PokéAPI to present up-to-date and complete information.' },
      { code: "de", question: "Worum geht es in diesem Projekt?", description: 'Diese Pokedex-App ist eine responsive Webanwendung, die Pokémon-Fans eine umfassende Datenbank aller Pokémon bietet. Die App nutzt die offizielle PokéAPI, um aktuelle und vollständige Informationen zu präsentieren.' }
    ],
    icons: [{ img: "rest_api_icon.png", alt: "REST API Icon", text: "REST API" },
    { img: "javascript_icon.svg", alt: "JavaScript Icon", text: "JavaScript" },
    { img: "css_icon.svg", alt: "CSS Icon", text: "CSS" },
    { img: "html_icon.svg", alt: "HTML Icon", text: "HTML" }],
    github: "https://github.com/b-rich-dev/pokedex",
    link: "https://birich.it/pokedex",
    bigImg: [{ src: "pokedex.png", alt: "Pokedex Project Screenshot" }]
  }];

  /**
   * Opens the project overlay dialog for a specific project
   * @param id - Project ID to display (1: Join, 2: El Pollo Loco, 3: Pokedex)
   */
  public openDialog(id: number): void {
    this.currentProjectId = id;
    this.openDialogHelper(this.dialog);
  }

  /**
   * Closes the project overlay dialog
   * Public method for template usage
   */
  public closeDialog(): void {
    this.closeDialogHelper(this.dialog);
  }

  /**
   * Helper method to open any dialog modal
   * Displays modal, disables body scrolling, and sets up event listeners
   * @param dialogRef - ElementRef to the dialog element
   */
  private openDialogHelper(dialogRef: ElementRef<HTMLDialogElement>) {
    const dlg = dialogRef?.nativeElement;
    if (!dlg) return;

    dlg.showModal();
    document.body.classList.add('no-scroll');
    this.setupDialogEventListeners(dlg);
  }

  /**
   * Helper method to close any dialog modal
   * Closes modal and re-enables body scrolling
   * @param dialogRef - ElementRef to the dialog element
   */
  private closeDialogHelper(dialogRef: ElementRef<HTMLDialogElement>) {
    const dlg = dialogRef?.nativeElement;
    if (!dlg) return;

    dlg.close();
    document.body.classList.remove('no-scroll');
  }

  /**
   * Sets up event listeners for dialog interactions
   * Handles backdrop clicks to close dialog and cleanup on dialog close
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

  /**
   * Retrieves the currently selected project data
   * @returns Project object with all details (title, description, links, etc.)
   * Falls back to first project if current ID is invalid
   */
  public getCurrentProject(): ProjectData {
    const projects = this.dialogContent;
    return projects.find(project => project.id === this.currentProjectId) || projects[0];
  }

  /**
   * Navigates to the next project in the sequence
   * Cycles back to project 1 after reaching the last project
   * Used for project navigation within the overlay
   */
  public nextProject(): void {
    this.currentProjectId++;
    if (this.currentProjectId > this.dialogContent.length) {
      this.currentProjectId = 1;
    }
  }
}
