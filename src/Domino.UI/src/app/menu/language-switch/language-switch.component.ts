import { Component } from '@angular/core';
import { LanguageService } from '../../_shared/language.service';
import { LanguageDesc } from '../../_shared/languageDesc';

@Component({
  selector: 'Dom-language-switch',
  standalone: true,
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  showSwitch: boolean = false;
  currentLang: string = "";
  languages: LanguageDesc[] = [];
  constructor(private languageService: LanguageService) {

  }
  ngOnInit() {
    this.currentLang = this.languageService.currentLanguage;
    this.languages = this.languageService.getAvailableLanguages();
  }
  selectLanguage(lang: string) {
    this.languageService.switchLanguage(lang);
    this.currentLang = this.languageService.currentLanguage;
  }
}
