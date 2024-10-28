import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar two-way binding
import { urlBackend } from '../config';  // Importa urlBackend desde el archivo de configuración

declare var bootstrap: any;  // Declara Bootstrap como variable global

@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent {
  user = "";
  content = "";

  async addNote() {

    if (this.user == "" || this.content == "") {
      this.showWarningToast();
      return;
    }

      const response = await fetch(`${urlBackend}/api/savenote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.user,
          content: this.content
        })
      })
      console.log(response.status);
      if (response.ok) {
        //totast
        this.showSuccessToast();  // Llamar a la función para mostrar el toast
        this.user = "";
        this.content = "";
      } else {
        this.showErrorToast();
      }
    
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

  showWarningToast() {
    const toastElement = document.getElementById('warningToast');
    const toast = new bootstrap.Toast(toastElement!);  // Inicializar el toast de Bootstrap
    toast.show();  // Mostrar el toast
  }

}
