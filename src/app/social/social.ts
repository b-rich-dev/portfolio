import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

/** 
 * Interface for individual comment data structure
 * Contains multilingual text and author information
 */
interface CommentData {
  /** English version of the comment text */
  textEn: string;
  /** German version of the comment text */
  textDe: string;
  /** English version of the author name and title */
  authorEn: string;
  /** German version of the author name and title */
  authorDe: string;
}

/**
 * Social Component
 * Handles the social section functionality including:
 * - Displaying colleague testimonials
 * - Multilingual support (German/English)
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.html',
  styleUrl: './social.scss'
})
export class Social {
  /** Current language signal from LanguageService for multilingual support */
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  
  /** Width of each comment card in pixels */
  commentWidth: number = 590;

  /** Gap between comment cards in pixels */
  gap: number = 100;

  /** Current slide offset for the comments slider */
  slideOffset: number = 0;

  /** Flag to disable CSS transitions */
  disableTransition: boolean = false;

  /** Flag to indicate if an animation is in progress */
  isAnimating: boolean = false;

  /** Duration of the slide transition in milliseconds */
  transitionDurationMs: number = 350;

  /** Calculates responsive comment width based on viewport size */
  get responsiveCommentWidth(): number {
    if (window.innerWidth <= 320) return Math.min(280, window.innerWidth - 20);
    if (window.innerWidth <= 480) return Math.min(290, window.innerWidth - 30);
    if (window.innerWidth <= 768) return Math.min(300, window.innerWidth - 60);
    if (window.innerWidth <= 1024) return Math.min(450, window.innerWidth - 80);
    return this.commentWidth;
  }

  /** Calculates responsive gap between comment cards based on viewport size */
  get responsiveGap(): number {
    if (window.innerWidth <= 320) return 10;
    if (window.innerWidth <= 480) return 12;
    if (window.innerWidth <= 768) return 15;
    if (window.innerWidth <= 1024) return 40;
    return this.gap;
  }

  /** Calculates responsive transition duration based on viewport size */
  get responsiveTransitionDuration(): number {
    if (window.innerWidth <= 320) return 200;
    if (window.innerWidth <= 480) return 220;
    if (window.innerWidth <= 768) return 250;
    if (window.innerWidth <= 1024) return 280;
    return 300;
  }

  /** Calculates the translateX value for centering the active comment */
  calcTranslateX(index: number): number {
    const currentWidth = this.responsiveCommentWidth;
    const currentGap = this.responsiveGap;
    const totalWidth = this.comments.length * currentWidth + (this.comments.length - 1) * currentGap;
    const containerCenter = totalWidth / 2;
    const activePos = index * (currentWidth + currentGap) + currentWidth / 2;
    return containerCenter - activePos;
  }

  /** Index of the currently active comment */
  activeCommentIndex: number = 1;

  /** Array of comment objects containing text and author information in English and German */
  comments: CommentData[] = [
    {
      textEn: `Working with Eugen was a great experience. His reliable, conscientious, and team-oriented approach helped us achieve excellent results together. I especially value his openness, expertise, and solution-focused mindset – I can fully recommend collaborating with him.`,
      textDe: `Die Zusammenarbeit mit Eugen war äußerst angenehm und erfolgreich. Durch seine zuverlässige, gewissenhafte und teamorientierte Arbeitsweise konnten wir gemeinsam starke Ergebnisse erzielen. Besonders schätze ich seine Offenheit, Fachkompetenz und lösungsorientierte Haltung – eine Zusammenarbeit, die ich uneingeschränkt empfehlen kann.`,
      authorEn: 'Mathias Johann Josef Voigt - Team Partner',
      authorDe: 'Mathias Johann Josef Voigt - Teamkollege'
    },
    {
      textEn: `He works in a very structured and efficient manner, enabling tasks to be completed quickly and accurately. Particularly impressive is his ability to quickly and confidently familiarize himself with existing code. He has solid knowledge of HTML, CSS, JavaScript, TypeScript, and Angular, as well as experience with Git, GitHub, Firebase, and Figma. Working with him is always pleasant, professional, and constructive.`,
      textDe: `Er arbeitet sehr strukturiert und effizient, wodurch Aufgaben schnell und fehlerfrei umgesetzt werden. Besonders beeindruckend ist seine Fähigkeit, sich rasch und sicher in bestehenden Code einzuarbeiten. Er verfügt über fundierte Kenntnisse in HTML, CSS, JavaScript, TypeScript und Angular sowie Erfahrung mit Git, GitHub, Firebase und Figma. Die Zusammenarbeit mit ihm ist stets angenehm, professionell und konstruktiv.`,
      authorEn: 'Dominik Rapp - Team Partner',
      authorDe: 'Dominik Rapp - Teamkollege'
    },
    {
      textEn: 'Eugen stands out through his structured and goal-oriented approach. He quickly understands complex contexts and delivers high-quality results with great attention to detail. His strong technical expertise in modern web technologies and his proactive, collaborative mindset make him a valuable team member. Working with him is always efficient, insightful, and enjoyable.',
      textDe: 'Eugen überzeugt durch seine strukturierte und zielorientierte Arbeitsweise. Er erfasst komplexe Zusammenhänge schnell und liefert hochwertige Ergebnisse mit viel Sorgfalt und Detailgenauigkeit. Durch seine fundierte Fachkenntnis in modernen Webtechnologien und seine proaktive, teamorientierte Art ist er eine große Bereicherung für jedes Projekt. Die Zusammenarbeit mit ihm ist stets effizient, inspirierend und angenehm.',
      authorEn: 'Sven Degen - Team Partner',
      authorDe: 'Sven Degen - Teamkollege'
    }
  ];

  /** Advances to the next comment in the carousel */
  public nextComment(): void {
    if (this.isAnimating || this.comments.length <= 1) return;
    this.isAnimating = true;
    const distance = this.responsiveCommentWidth + this.responsiveGap;
    const duration = this.responsiveTransitionDuration;
    this.slideOffset = -distance;
    setTimeout(() => {
      this.disableTransition = true;
      this.activeCommentIndex = (this.activeCommentIndex + 1) % this.comments.length;
      this.slideOffset = 0;
      setTimeout(() => {
        this.disableTransition = false;
        this.isAnimating = false;
      }, 20);
    }, duration);
  }

  /** Moves to the previous comment in the carousel */
  public prevComment(): void {
    if (this.isAnimating || this.comments.length <= 1) return;
    this.isAnimating = true;
    const distance = this.responsiveCommentWidth + this.responsiveGap;
    const duration = this.responsiveTransitionDuration;
    this.slideOffset = distance;
    setTimeout(() => {
      this.disableTransition = true;
      this.activeCommentIndex = (this.activeCommentIndex - 1 + this.comments.length) % this.comments.length;
      this.slideOffset = 0;
      setTimeout(() => {
        this.disableTransition = false;
        this.isAnimating = false;
      }, 20);
    }, duration);
  }

  /** Retrieves the five comments to be displayed in the carousel */
  public getVisibleComments(): { data: CommentData; idx: number }[] {
    const len = this.comments.length;
    if (len === 0) return [];
    const prev = (this.activeCommentIndex - 1 + len) % len;
    const prevPrev = (this.activeCommentIndex - 2 + len) % len;
    const next = (this.activeCommentIndex + 1) % len;
    const nextNext = (this.activeCommentIndex + 2) % len;
    return [
      { data: this.comments[prevPrev], idx: prevPrev },
      { data: this.comments[prev], idx: prev },
      { data: this.comments[this.activeCommentIndex], idx: this.activeCommentIndex },
      { data: this.comments[next], idx: next },
      { data: this.comments[nextNext], idx: nextNext }
    ];
  }
}
