export const SET_LANGUAGE_INDEX = 'setLanguageIndex';

export const localisationReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_LANGUAGE_INDEX:
            return {
                ...state,
                languageIndex: payload.languageIndex
            }
    }
}