import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntryTemplate = ({entry}:{entry:OccupationalHealthcareEntry}) => {
    return (
        <div style={{border:"1px solid black", borderRadius:"5px", padding:10}}>
            <div>
                {entry.date} {<WorkIcon/>} {entry.employerName}
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

export default OccupationalHealthcareEntryTemplate;