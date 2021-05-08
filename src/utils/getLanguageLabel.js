import { languageData } from "../data/language-data"

export const getLanguageLabel = (labelName, language) => {
    return languageData[language].labels[labelName];
}