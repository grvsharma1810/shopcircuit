import { languageData } from "../data/language-data"

export const getLanguageLabel = (labelName, languageIndex) => {
    return languageData[languageIndex].labels[labelName];
}