import { Routes } from '@angular/router';
import { LegalNotice } from './legal-notice/legal-notice';
import { Main } from './main/main';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'legal-notice', component: LegalNotice }
];
