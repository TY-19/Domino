import { ElementRef, Injectable } from "@angular/core";
import { LocalStorageService } from "../../_shared/localstorage.service";
import { DefaultDisplayOptions } from "../../_defaults/defaultDisplayOptions";
import { DisplayOptions } from "../../_models/displayOptions";

@Injectable({
    providedIn: 'root',
})

export class DisplayOptionsService {
    constructor(private localStorageSevice: LocalStorageService) {

    }
    getDisplayOptions(): DisplayOptions {
        return this.localStorageSevice.getDisplayOptions() ?? DefaultDisplayOptions;
    }
    saveDisplayOptions(options: DisplayOptions): void {
        this.localStorageSevice.setDisplayOptions(options);
    }
    setVariables(ref: ElementRef): void {
        let options = this.getDisplayOptions();
        let elem = ref.nativeElement as HTMLElement;
        elem.style.setProperty('--table-bg-color', options.tableBgColor);
        elem.style.setProperty('--message-text-color', options.messageTextColor);
        elem.style.setProperty('--message-bg-color', options.messageBgColor);
        elem.style.setProperty('--menu-text-color', options.menuTextColor);
        elem.style.setProperty('--menu-bg-color', options.menuBgColor);
        elem.style.setProperty('--start-button-text-color', options.startButtonTextColor);
        elem.style.setProperty('--start-button-bg-color', options.startButtonBgColor);
        elem.style.setProperty('--domino-tile-primary-color', options.dominoTilePrimaryColor);
        elem.style.setProperty('--domino-tile-dots-color', options.dominoTileDotsColor);
        elem.style.setProperty('--domino-tile-line-color', options.dominoTileLineColor);
        elem.style.setProperty('--domino-tile-back-primary-color', options.dominoTileBackPrimaryColor);
        elem.style.setProperty('--domino-tile-back-secondary-color', options.dominoTileBackSecondaryColor);
    }
}