export interface Skill {
  title: string,
  value: number
}

export interface UserRating {
  own: boolean,
  user: string,
  values: number[]
}

export interface SkillRating {
  labels: string[],
  ratings: UserRating[],

  get own() : Skill[] | undefined;
  updateOwnValues : (values: number[] | undefined) => void;
}


export class SkillRatingClass implements SkillRating {
  labels: string[];
  ratings: UserRating[];

  constructor(labels: string[], ratings: UserRating[]) {
    this.labels = labels;
    this.ratings = ratings;
  }

  get own(): Skill[] {
    return this.ratings?.find(r => r.own)?.values?.
                      map((v, i) => ({ title: this.labels[i], value: v })) ?? [];
  }

  updateOwnValues(values: number[] | undefined) {
    const ownR = this.ratings.find(r => r.own);
    if (ownR) {
      ownR.values = values ?? [];
    }
  }
}
