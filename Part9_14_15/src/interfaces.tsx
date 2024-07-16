export interface HeaderProps {
    name: string;
}

export interface ContentProps {
    courseParts: {
        name: string;
        exerciseCount: number;
    }[];
}

export interface PartProps {
    name: string;
    exerciseCount: number;
}

export interface TotalExercisesProps {
    totalExercises: number;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase{
    description:string;
}

export interface CoursePartBasic extends CoursePartBaseWithDescription {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseWithDescription {
    backgroundMaterial: string;
    kind: "background"
}

export interface CoursePartRequirements extends CoursePartBaseWithDescription {
    requirements: string[];
    kind: "special"
}



export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;