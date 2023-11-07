import {Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrls: ['./general-button.component.scss']
})
export class GeneralComponent implements OnInit{
  @Input() text:string = ''
  @Input() disabled:any = false
  @Input() type:any = 'button'
  @Input() style:any = {}
  @Input() onClick:any

  @Output() public onClicked: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }

  onClickHandler() {
    this.onClicked.emit()
  }
}
