import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-title-conponet',
  templateUrl: './title-conponet.component.html',
  styleUrls: ['./title-conponet.component.css']
})
export class TitleConponetComponent {
  @Input() titulo:string;
}
