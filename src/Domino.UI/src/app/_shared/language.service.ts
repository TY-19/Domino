import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localstorage.service";
import { HttpClient } from "@angular/common/http";
import { Translation } from "./translations";
import { LanguageDesc } from "./languageDesc";
import { ErrorType } from "../_enums/errorType";
import { VictoryType } from "../_enums/victoryType";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languages: { [key: string]: string } = {
    "en": "assets/lang/messages.en.json",
    "ua": "assets/lang/messages.ua.json"
  };
  currentLanguage: string = "en";
  translation?: Translation;
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    let lang = localStorageService.getLanguage();
    if(lang === null) {
      localStorageService.setLanguage("en");
      this.currentLanguage = "en";
    } else {
      this.currentLanguage = lang;
    }
    this.loadLanguage(this.currentLanguage);
  }
  getAvailableLanguages(): LanguageDesc[] {
    return [
      { code: "en" },
      { code: "ua" },
    ];
  }
  switchLanguage(lang: string) {
    if(this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      this.localStorageService.setLanguage(lang);
      this.loadLanguage(lang);
    }
  }
  loadLanguage(lang: string) {
    let path = this.languages[lang];
    this.http.get<any>(path)
      .subscribe((res) => {
        this.translation = res;
      });
  }
  getResultTranslation(victoryType: VictoryType, data?: Record<string, string>): string {
    let template = this.translation?.results[victoryType];
    return this.fillPlaceHolders(template, data);
  }
  getErrorTranslation(errorType: ErrorType, data?: Record<string, string>): string {
    let template = this.translation?.errors[errorType];
    return this.fillPlaceHolders(template, data);
  }
  private fillPlaceHolders(template: string | undefined, data?: Record<string, string>): string {
    if(!template) {
      return ""
    }
    if(!data || Object.keys(data).length <= 0) {
      return template;
    }
    return this.stringFormat(template, data);
  }
  private stringFormat(template: string, data: Record<string, string>): string {
    return template.replace(/{(.*?)}/g, (match, key) => {
        return key in data ? data[key] : match;
    });
  }
  
}
