import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryTemplate = ({entry}:{entry:HealthCheckEntry}) => {
    const heartColor = ( rating:number ) => {
        switch(Number(rating)) {
            case 0:
                return "green";
            case 1:
                return "yellow";
            case 2:
                return "orange";
            case 3:
                return "red";
            default:
                return "black";
        }
    };
    return (
        <div style={{border:"1px solid black", borderRadius:"5px", padding:10}}>
            <div>
                {entry.date} {<MedicalServicesIcon/>}
            </div>
            <div>
                {entry.description}
            </div>
            <div>
                <FavoriteIcon style={{color:heartColor(entry.healthCheckRating)}}/>
            </div>
            <div>
                diagnose by {entry.specialist}
            </div>
        </div>
    );
};

export default HealthCheckEntryTemplate;