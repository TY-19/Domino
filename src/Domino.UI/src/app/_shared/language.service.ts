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
  private languages: LanguageDesc[] = [
    { code: "en", flag: "en" },
    { code: "ua", flag: "ua" },
  ];
  private messages: { [key: string]: string } = {
    "en": "assets/lang/messages.en.json",
    "ua": "assets/lang/messages.ua.json"
  };
  currentLanguage: LanguageDesc = this.languages[0];
  translation?: Translation;
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    let lang: string = localStorageService.getLanguage() ?? "en";
    this.setCurrentLanguage(lang);
    this.loadLanguage(this.currentLanguage.code);
  }
  getAvailableLanguages(): LanguageDesc[] {
    return this.languages;
  }
  switchLanguage(lang: string) {
    if(this.currentLanguage.code !== lang) {
      this.setCurrentLanguage(lang);
      this.loadLanguage(lang);
    }
  }
  loadLanguage(lang: string) {
    let path = this.messages[lang];
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
  private setCurrentLanguage(lang: string) {
    this.localStorageService.setLanguage(lang);
    this.currentLanguage = this.languages.find(l => l.code == lang) ?? this.languages[0];
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
