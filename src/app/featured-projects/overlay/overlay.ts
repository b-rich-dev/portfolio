import { Component, inject, Signal, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../services/language';
import { text } from 'node:stream/consumers';
import { link } from 'node:fs';

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

  public currentProjectId: number = 1;

  dialogContent = [{
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
    github: "https://github.com/b-rich-dev/join",
    link: "https://birich.it/join",
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
    title: 'Eugen Birich - Frontend Developer | Web Developer Portfolio',
    language: [
      { code: "en", question: "What is this project about?", description: 'Responsive developer portfolio built with Angular. Features modern design with smooth animations, multilingual support, and showcases my skills through interactive project presentations. Includes contact functionality and optimized performance.' },
      { code: "de", question: "Worum geht es in diesem Projekt?", description: 'Responsives Entwicklerportfolio, erstellt mit Angular. Modernes Design mit flüssigen Animationen, mehrsprachiger Unterstützung und interaktiven Projektpräsentationen, die meine Fähigkeiten eindrucksvoll demonstrieren. Inklusive Kontaktfunktion und optimierter Performance.' }
    ],
    icons: [{ img: "angular_icon.svg", alt: "Angular Icon", text: "Angular" },
    { img: "typescript_icon.svg", alt: "TypeScript Icon", text: "TypeScript" },
    { img: "css_icon.svg", alt: "CSS Icon", text: "CSS" },
    { img: "html_icon.svg", alt: "HTML Icon", text: "HTML" }],
    github: "https://github.com/b-rich-dev/portfolio",
    link: "https://birich.it/portfolio",
    bigImg: [{ src: "portfolio.png", alt: "Portfolio Project Screenshot" }]
  }];

  public openDialog(id: number): void {
    const dlg = this.dialog?.nativeElement;
    if (!dlg) return;

    this.currentProjectId = id;

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

  public closeDialog(): void {
    const dlg = this.dialog?.nativeElement;
    if (!dlg) return;
    dlg.close();
    document.body.classList.remove('no-scroll');
  }

  public getCurrentProject() {
    const projects = this.dialogContent;
    return projects.find(project => project.id === this.currentProjectId) || projects[0];
  }

  public nextProject(): void {
    this.currentProjectId++;
    if (this.currentProjectId > this.dialogContent.length) {
      this.currentProjectId = 1;
    }
  }
}
