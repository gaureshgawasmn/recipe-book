import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input({ required: true }) message: string | undefined;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
