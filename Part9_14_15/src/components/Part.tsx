import { CoursePart } from '../interfaces'

const Part = (props: CoursePart) => {
    return (
        <div>
            <h3>{props.name} {props.exerciseCount}</h3>
            {props.kind === "background" ?
                <>
                    <p>
                        {props.description}
                    </p>
                    <p>
                    submit to {props.backgroundMaterial}
                    </p>
                </>
                :
                null
            }
            {props.kind === "group" ?
                <>
                    <p>
                    project exercises {props.groupProjectCount}
                    </p>
                </>
                :
                null
            }
            {props.kind === "basic" ?
                <>
                    <p>
                        {props.description}
                    </p>
                </>
                :
                null
            }
            {props.kind === "special" ?
                <>
                    <p>
                        {props.description}
                    </p>
                    <p>
                        required skils: {props.requirements.join(", ")}
                    </p>
                </>
                :
                null
            }
        </div>
    )
}

export default Part