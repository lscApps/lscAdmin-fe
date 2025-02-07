import { TitleCasePipe} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.css'
})
export class TitlePageComponent {
  @Input() title?:string;
}
