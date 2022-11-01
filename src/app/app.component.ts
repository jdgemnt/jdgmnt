import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jDgmnt';
  sessions: Observable<any[]>;

  value = 0;

  constructor(firestore: AngularFirestore) {
      this.sessions = firestore.collection('sessions').valueChanges();
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

}
