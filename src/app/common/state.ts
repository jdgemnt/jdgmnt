import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {
  frameworksRatingData,
  skillsRatingData,
  softSkillsRatingData
} from "../model/chart.data";
import {Skill, SkillRating} from "../model/skill";
import {Session, SessionError, SessionInit, User} from "../model/session";

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

  update() {
    this.val = this.val;
  }

  /*
  subscribe(observer?: Partial<Observer<T>>) {
    return this.val$.subscribe(observer);
  }

  subscribe(next: (value: T) => void) {
    return this.val$.subscribe(next);
  }



  subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null) {
    return this.val$.subscribe(next, error, complete);
  }

  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ) {
    return this.val$.subscribe(observerOrNext, error, complete);
  }
  */
}

@Injectable({providedIn: 'root'})
export class State {
  hasEntered = new StateProperty<boolean>(false);
  isEditMode = new StateProperty<boolean>(true);

  activeItem = new StateProperty<string>('specialization');

  hasSession = new StateProperty<boolean>(false);
  // session = new StateProperty<Session | null>(null)

  sessionUsers = new StateProperty<User[]>([])
  sessionInit = new StateProperty<SessionInit>({ me: { name: '' }})


  skillsRating = new StateProperty<SkillRating>(skillsRatingData);
  softSkillsRating = new StateProperty<SkillRating>(softSkillsRatingData);
  frameworksRating = new StateProperty<SkillRating>(frameworksRatingData);



  updateSkills(rating: Skill[]) {
    this.skillsRating.val.updateOwnValues(rating.map(v => v.value))
    this.skillsRating.val = this.skillsRating.val;
  }

  updateSoftSkills(rating: Skill[]) {
    this.softSkillsRating.val.updateOwnValues(rating.map(v => v.value))
    this.softSkillsRating.val = this.softSkillsRating.val;
  }

  updateFrameworks(rating: Skill[]) {
    this.frameworksRating.val.updateOwnValues(rating.map(v => v.value))
    this.frameworksRating.val = this.frameworksRating.val;
  }
}
