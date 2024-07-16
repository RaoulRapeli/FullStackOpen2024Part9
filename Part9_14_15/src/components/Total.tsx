import { TotalExercisesProps } from '../interfaces'

const Total = (props: TotalExercisesProps) => {
    return (
        <div>
            <div>
                Number of exercises {props.totalExercises}
            </div>
        </div>
    )
}

export default Total