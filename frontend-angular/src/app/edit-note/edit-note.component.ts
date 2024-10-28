import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar two-way binding
import { urlBackend } from '../config';  // Importa urlBackend desde el archivo de configuración

declare var bootstrap: any;  // Declara Bootstrap como variable global


@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  noteId: string | null = null;
  content: string = '';
  user: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Obtener el ID de la nota de los parámetros de la URL
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.loadNote();
    }
  }

  loadNote() {
    fetch(`${urlBackend}/api/notes/${this.noteId}`)
      .then(response => response.json())
      .then(data => {
        this.content = data.content;  // Cargamos el contenido para edición
        this.user = data.user;
      })
      .catch(err => console.error('Error:', err));
  }

  saveNote() {
    fetch(`${urlBackend}/api/notes/${this.noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: this.content })
    })
      .then(response => response.json())
      .then(() => {
        console.log('Nota actualizada');
        //this.router.navigate(['/notes/all']);  // Redirige a la lista de notas tras guardar
        this.showSuccessToast();
      })
      .catch(err => {
        console.error('Error:', err)
        this.showErrorToast();
      });
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
}

