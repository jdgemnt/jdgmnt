import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {frameworks, Skill, skills} from "../model/skills";

export class StateProperty<T> {

  private readonly propertySubject;
  readonly val$;

  constructor(initValue: T) {
    this.propertySubject = new BehaviorSubject<T>(initValue);
    this.val$ = this.propertySubject.asObservable();
  }

  get val(): T {
    return this.propertySubject.getValue();
  }

  set val(val) {
    this.propertySubject.next(val);
  }
}


@Injectable({providedIn: 'root'})
export class State {
  hasEntered = new StateProperty<boolean>(true);
  isEditMode = new StateProperty<boolean>(true);
  skills = new StateProperty<Skill[] | null>(skills);
  frameworks = new StateProperty<Skill[] | null>(frameworks);

  activeItem = new StateProperty<string>('profile');



  public toggleNavbar() {
    //this.navbarOn.val = !this.navbarOn.val;
  }
}
