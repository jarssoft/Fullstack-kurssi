interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasicBackground extends CoursePartBase {
  description: string;
}

interface CoursePartRequirements extends CoursePartBasicBackground {
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartBasicBackground {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBasicBackground {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

export default CoursePart;
