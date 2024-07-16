import { CoursePart } from '../interfaces'
import Part from './Part'

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part) => {
                switch (part.kind) {
                    case 'background':
                        return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} description={part.description} backgroundMaterial={part.backgroundMaterial} kind={part.kind} />
                    case 'group':
                        return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} kind={part.kind} groupProjectCount={part.groupProjectCount} />
                    case 'basic':
                        return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} kind={part.kind} description={part.description} />
                    case 'special':
                        return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} kind={part.kind} description={part.description} requirements={part.requirements}/>
                    default:
                        return assertNever(part);
                }
            })}
        </div>
    )
}

export default Content