interface Results {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface Error {
    error: string
}

type ReturnValue = Results | Error;

export const calculateExercises = (exercises: number[], targetValue: number): ReturnValue => {
    try {
        if(!exercises) {
            return {
                error:"parameters missing"
            };
        }
        else if(!exercises.every(item => typeof item === "number")){
            return {
                error:"malformatted parameters"
            };
        }
        if(isNaN(targetValue)) {
            return {
                error:"parameters missing"
            };
        }
        else if(isNaN(Number(targetValue))){
            return {
                error:"malformatted parameters"
            };
        }
        const amountOfHoursDone: number = exercises.reduce(function (a: number, b: number) { return a + b; }, 0);
        const hoursPerDay: number = (amountOfHoursDone / exercises.length);
        const ratingScore: number = (hoursPerDay / targetValue >= 1 ? 3 : hoursPerDay / targetValue >= 0.66 ? 2 : 1);
        const ratingText: string = (ratingScore === 3 ? "Goal reached" : ratingScore === 2 ? 'not too bad but could be better' : "bad should be better");
        const results = {
            periodLength: exercises.length,
            trainingDays: exercises.filter(exercise => exercise !== 0).length,
            success: hoursPerDay >= targetValue,
            rating: ratingScore,
            ratingDescription: ratingText,
            target: targetValue,
            average: hoursPerDay
        };
        return results;
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return {
            error:errorMessage
        };
    }
};

// try {
//     let getExercises: number[];
//     let getTargetValue: number;
//     if (!isNotNumber(process.argv[2])) {
//         getTargetValue = Number(process.argv[2]);
//     }
//     else {
//         throw new Error('Missing target value');
//     }
//     if (process.argv.filter(arg => !isNotNumber(arg)).length > 1) {
//         const tempExercies: number[] = [];
//         process.argv.map((exercise, index) => {
//             if (index > 2 && !isNotNumber(exercise)) {
//                 tempExercies.push(Number(exercise));
//             }
//         });
//         getExercises = tempExercies;
//     }
//     else {
//         throw new Error('No exercise entries');
//     }
//     console.log(calculateExercises(getExercises, getTargetValue));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }
