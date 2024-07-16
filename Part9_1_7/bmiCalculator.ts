interface Results {
    weight: number
    height: number
    bmi: string
}

interface Error {
    error:string
}

type ReturnValue = Results | Error;

export const calculateBmi = (height: number, weight: number): ReturnValue => {
    try {
        if(isNaN(height)) {
            return {
                error:"malformatted parameters"
            };
        }
        if(isNaN(weight)) {
            return {
                error:"malformatted parameters"
            };
        }
        const BMI = (weight / Math.pow((height / 100), 2));
        if (BMI < 18.5) {
            return {
                weight: weight,
                height: height,
                bmi: "Underweight (Unhealthy Thin)"
            };
        }
        else if (BMI < 24.9) {
            return {
                weight: weight,
                height: height,
                bmi: "Normal (Healthy weight)"
            };
        }
        else if (BMI < 29.9) {
            return {
                weight: weight,
                height: height,
                bmi: "Obesity (At risk Class 1)"
            };
        }
        else if (BMI < 34.9) {
            return {
                weight: weight,
                height: height,
                bmi: "Obesity (Moderately obese Class 2)"
            };
        }
        else if (BMI < 39.9) {
            return {
                weight: weight,
                height: height,
                bmi: "Obesity (Severely obese Class 3)"
            };
        }
        else if (BMI >= 40) {
            return {
                weight: weight,
                height: height,
                bmi: "Obesity (Severely obese Class 4)"
            };
        }
        else {
            return {
                error:"malformatted parameters"
            };
        }
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        return {
            error: errorMessage
        };
    }
};

// try {
//     var getHeight:number
//     var getWeight:number
//     if(!isNaN(Number(process.argv[2]))){
//         getHeight = Number(process.argv[2])
//     }
//     else {
//         throw new Error('Height missing')
//     }
//     if(!isNaN(Number(process.argv[3]))){
//         getWeight = Number(process.argv[3])
//     }
//     else {
//         throw new Error('Weight missing')
//     }
//     console.log(calculateBmi(getHeight, getWeight))
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }
