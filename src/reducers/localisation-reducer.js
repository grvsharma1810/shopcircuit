export const SET_LANGUAGE = 'setLanguage';

export const localisationReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: payload.language
            }
    }
}