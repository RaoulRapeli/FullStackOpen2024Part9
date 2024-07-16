import { HospitalEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HospitalEnrtyTemplate = ({entry}:{entry:HospitalEntry}) => {
    return (
        <div style={{border:"1px solid black", borderRadius:"5px", padding:10}}>
            <div>
                {entry.date} {<MedicalServicesIcon/>}
            </div>
            <div>
                {entry.description}
            </div>
            <div>
                diagnose by {entry.specialist}
            </div>
        </div>
    );
};

export default HospitalEnrtyTemplate;