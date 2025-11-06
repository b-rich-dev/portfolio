import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.html',
  styleUrl: './social.scss'
})
export class Social {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  commentWidth = 590;
  gap = 100;
  slideOffset = 0;
  disableTransition = false;
  isAnimating = false;
  transitionDurationMs = 350;

  // Responsive Werte für mobile Geräte
  get responsiveCommentWidth(): number {
    if (window.innerWidth <= 320) return Math.min(280, window.innerWidth - 20);
    if (window.innerWidth <= 480) return Math.min(290, window.innerWidth - 30);
    if (window.innerWidth <= 768) return Math.min(300, window.innerWidth - 60);
    if (window.innerWidth <= 1024) return Math.min(450, window.innerWidth - 80);
    return this.commentWidth;
  }

  get responsiveGap(): number {
    if (window.innerWidth <= 320) return 10;
    if (window.innerWidth <= 480) return 12;
    if (window.innerWidth <= 768) return 15;
    if (window.innerWidth <= 1024) return 40;
    return this.gap;
  }

  get responsiveTransitionDuration(): number {
    if (window.innerWidth <= 320) return 200;
    if (window.innerWidth <= 480) return 220;
    if (window.innerWidth <= 768) return 250;
    if (window.innerWidth <= 1024) return 280;
    return 300;
  }

  calcTranslateX(index: number): number {
    const currentWidth = this.responsiveCommentWidth;
    const currentGap = this.responsiveGap;
    const totalWidth = this.comments.length * currentWidth + (this.comments.length - 1) * currentGap;
    const containerCenter = totalWidth / 2;
    const activePos = index * (currentWidth + currentGap) + currentWidth / 2;
    return containerCenter - activePos;
  }

  activeCommentIndex = 1;
  comments = [
    {
      textEn: `Working with Eugen was a great experience. His reliable, conscientious, and team-oriented approach helped us achieve excellent results together. I especially value his openness, expertise, and solution-focused mindset – I can fully recommend collaborating with him.`,
      textDe: `Die Zusammenarbeit mit Eugen war äußerst angenehm und erfolgreich. Durch seine zuverlässige, gewissenhafte und teamorientierte Arbeitsweise konnten wir gemeinsam starke Ergebnisse erzielen. Besonders schätze ich seine Offenheit, Fachkompetenz und lösungsorientierte Haltung – eine Zusammenarbeit, die ich uneingeschränkt empfehlen kann.`,
      authorEn: 'Mathias Johann Josef Voigt - Team Partner',
      authorDe: 'Mathias Johann Josef Voigt - Teamkollege'
    },
    {
      textEn: `He works in a very structured and efficient manner, enabling tasks to be completed quickly and accurately. Particularly impressive is his ability to quickly and confidently familiarize himself with existing code. He has solid knowledge of HTML, CSS, JavaScript, TypeScript, and Angular, as well as experience with Git, GitHub, Firebase, and Figma. Working with him is always pleasant, professional, and constructive.`,
      textDe: `Er arbeitet sehr strukturiert und effizient, wodurch Aufgaben schnell und fehlerfrei umgesetzt werden. Besonders beeindruckend ist seine Fähigkeit, sich rasch und sicher in bestehenden Code einzuarbeiten. Er verfügt über fundierte Kenntnisse in HTML, CSS, JavaScript, TypeScript und Angular sowie Erfahrung mit Git, GitHub, Firebase und Figma. Die Zusammenarbeit mit ihm ist stets angenehm, professionell und konstruktiv`,
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

  nextComment() {
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

  prevComment() {
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

  getVisibleComments() {
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
