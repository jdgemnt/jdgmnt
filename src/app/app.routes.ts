import {Routes} from "@angular/router";
import {SessionRegistrationComponent} from "./session-registration.component";

export const routes: Routes = [
  {
    path: ':sessionID',
    component: SessionRegistrationComponent
  },
  {
    path: ':sessionID/confirm',
    component: SessionRegistrationComponent
  }
];
