import { Component } from '@angular/core';

@Component({
  selector: 'Dom-version',
  standalone: true,
  imports: [],
  templateUrl: './version.component.html',
  styleUrl: './version.component.scss'
})
export class VersionComponent {
  version: string = "v. 0.0.39";
}
