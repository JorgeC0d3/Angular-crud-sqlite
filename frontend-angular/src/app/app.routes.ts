import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'notes',
        children: [
            {
                path: 'all',
                loadComponent: () =>
                    import('./notes/notes.component').then(m => m.NotesComponent),
            },
            {
                path: 'newnote',
                loadComponent: () =>
                    import('./new-note/new-note.component').then(m => m.NewNoteComponent),
            },
            {
                path: 'edit/:id',  // Ruta para editar la nota con el ID
                loadComponent: () => import('./edit-note/edit-note.component').then(m => m.EditNoteComponent)
              },
        ]
    },
    {
        path: '**',
        redirectTo: 'notes/all',
    },

];

