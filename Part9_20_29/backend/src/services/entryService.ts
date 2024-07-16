import entries from "../../data/entires";
import { Entry } from "../types";

const getEntries = (): Entry[] => {
    return entries;
};

export default {
    getEntries
};