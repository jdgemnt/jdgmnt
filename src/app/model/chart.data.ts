import {Skill, SkillRating, SkillRatingClass} from "./skill";


const createData = (owner: string, skills: Skill[]) => {
  return new SkillRatingClass(
    skills.map(s => s.title),
    [
      {
        own: true,
        user: 'its me',
        values: skills.map(s => s.value),
      }
    ]);
}

export const skills:Skill[] = [
  { title: 'architecture', value: 0},
  { title: 'ui/ux', value: 2},
  { title: 'frontend', value: 0},
  { title: 'backend', value: 0},
  { title: 'devops', value: 4},
  { title: 'infrastructure', value: 1},
  { title: 'security', value: 2},
  { title: 'mobile development', value: 0},
  { title: 'test automation', value: 1},
  { title: 'ml/ai', value: 4},
  { title: 'data analytics', value: 1},
  { title: 'embedded systems', value: 1},
  { title: 'agile', value: 1},
  { title: 'documentation', value: 1},
];

export const frameworks:Skill[] = [
  { title: '', value: 0},
  { title: 'angular', value: 1},
  { title: 'typescript', value: 2},
  { title: 'nest', value: 3},
  { title: 'node', value: 4},
  { title: 'java', value: 2},
  { title: 'spring', value: 1},
  { title: 'postgresql', value: 4},
  { title: 'k8s', value: 2},
  { title: 'dcker', value: 0},
  { title: 'mssql', value: 2},
  { title: 'helm', value: 3},
  { title: 'terraform', value: 1},
  { title: 'gh actions', value: 4},
  { title: 'jenkins', value: 2},
  { title: 'firebase', value: 1},
  { title: 'rest api', value: 4},
  { title: '', value: 0},
];

export const softskills: Skill[] = [
  { title: 'teamwork', value: 0},
  { title: 'communication', value: 0},
  { title: 'conflicts', value: 0},
  { title: 'flexibility', value: 0},
  { title: 'pragmatism', value: 0},
  { title: 'empathy', value: 0},
  { title: 'independence', value: 0},
  { title: 'organisation', value: 0},
  { title: 'creativity', value: 0},
  { title: 'analicical thinking', value: 0},
  { title: 'learning ability', value: 0},
  { title: 'resilience', value: 0},
  { title: 'curiosity', value: 0},
  { title: 'self-assessment', value: 0}
]


export const skillsRatingData = createData('its me', skills);
export const frameworksRatingData = createData('its me', frameworks);
export const softSkillsRatingData = createData('its me', softskills);
