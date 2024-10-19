import { Component } from '@angular/core';

@Component({
  selector: 'Dom-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
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
  message: string = "";
  displayMessage(message: string) {
    this.message = message;
    this.showMessage = true;
  }
  hideMessage() {
    this.message = "";
    this.showMessage = false;
  }
}
