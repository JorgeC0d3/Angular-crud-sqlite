import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() note: any;
  @Output() addDeleteEvent = new EventEmitter<string>();
  @Output() addEditEvent = new EventEmitter<any>();
  date = new Date();

  onDeleteNote(id: string) {
    this.addDeleteEvent.emit(id);
  }

  onEditNote(id: string) {
    this.addEditEvent.emit(id);
  }
}
