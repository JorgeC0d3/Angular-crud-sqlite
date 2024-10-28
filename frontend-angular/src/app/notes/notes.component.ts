import { Component, OnInit } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { Router } from '@angular/router';
import { urlBackend } from '../config';  // Importa urlBackend desde el archivo de configuración

declare var bootstrap: any;  // Declara Bootstrap como variable global

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private router: Router) {}

  getNotes() {
    fetch(`${urlBackend}/api/notes`)
      .then(response => response.json())
      .then(data => {
        this.notes = data;
        console.log(this.notes);
      })
      .catch(err => console.error('Error:', err));
  }

  deleteNote(id: string) {
    console.log('Eliminando la nota:', id);
    fetch(`${urlBackend}/api/notes/${id}`, { method: 'DELETE' })
     .then(response => response.json())
     .then(() => {
        this.notes = this.notes.filter(n => n.id!== id);
        console.log('Nota eliminada');
        this.showSuccessToast();
      })
     .catch(err => {
      console.error('Error:', err);
      this.showErrorToast();
    });
  }

  editNote(id: string) {
    console.log('Editando la nota:', id);
    this.router.navigate(['/notes/edit', id]);
    
  }

  showSuccessToast() {
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement!);  // Inicializar el toast de Bootstrap
    toast.show();  // Mostrar el toast
  }

  showErrorToast() {
    const toastElement = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastElement!);  // Inicializar el toast de Bootstrap
    toast.show();  // Mostrar el toast
  }

  ngOnInit() {
    this.getNotes();
  }

}
