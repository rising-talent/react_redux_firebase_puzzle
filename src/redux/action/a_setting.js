import * as types from './types'

export const setTempFiles = (files) => {
    return {
        type: types.TEMP_FILES,
        files
    }
}