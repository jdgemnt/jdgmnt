import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgChartsModule } from 'ng2-charts';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { MatIconModule } from "@angular/material/icon";
import { StartScreenComponent } from './layout/start-screen/start-screen.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { EditorComponent } from './layout/editor/editor.component';
import { MainStageComponent } from './layout/main-stage/main-stage.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { UserbarComponent } from './layout/userbar/userbar.component';
import { PolarChartComponent } from './charts/polar-chart/polar-chart.component';
import { QrCodeModule } from "ng-qrcode";
import { ClipboardModule } from "ngx-clipboard";
import { RouterModule, RouterOutlet } from "@angular/router";
import { routes } from "./app.routes";
import { SessionRegistrationComponent } from './session-registration.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { SafeHtmlPipe } from './common/safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RadarChartComponent,
    StartScreenComponent,
    LineChartComponent,
    NavbarComponent,
    EditorComponent,
    MainStageComponent,
    UserbarComponent,
    PolarChartComponent,
    SessionRegistrationComponent,
    SafeHtmlPipe
  ],
  imports: [
      FormsModule,
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideDatabase(() => getDatabase()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      BrowserAnimationsModule,
      MatButtonModule,
      MatSliderModule,
      NgChartsModule.forRoot({generateColors: true, defaults: {borderColor: '#A8E8FD0F'}}),
      MatIconModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatInputModule,
      QrCodeModule,
      ClipboardModule,
      RouterOutlet,
      RouterModule.forRoot(routes),
      MatSnackBarModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 0, action: 'close'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
