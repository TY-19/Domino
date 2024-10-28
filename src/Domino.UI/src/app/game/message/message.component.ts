import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from '../../_shared/language.service';
import { GameTranslation } from '../../_shared/translations';

@Component({
  selector: 'Dom-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Output() confirmChoice: EventEmitter<boolean> = new EventEmitter<boolean>();
  private showMessageInner: boolean = false;
  get showMessage(): boolean {
    return this.showMessageInner;
  }
  set showMessage(show: boolean) {
    this.showMessageInner = show;
    if(show === true) {
      setTimeout(() => this.showMessageInner = false, 3000);
    }
  }
  showConfirmation: boolean = false;
  message: string = "";
  get names(): GameTranslation | undefined {
    return this.languageService.translation?.game;
  }
  constructor(private languageService: LanguageService) {

  }
  displayMessage(message: string) {
    this.message = message;
    this.showMessage = true;
  }
  hideMessage() {
    this.message = "";
    this.showMessage = false;
  }
  askForConfirmation(message: string) {
    this.message = message;
    this.showMessageInner = true;
    this.showConfirmation = true;
  }
  makeChoice(confirm: boolean) {
    this.confirmChoice.emit(confirm);
    this.showMessageInner = false;
    this.showConfirmation = false;
  }
}
