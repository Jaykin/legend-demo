
// reducer creator
import * as type from '../_utils/actionTypes'

export default function (state, action) {
    switch(action.type) {
        case type.DATALIST_SEARCH_FILES : return { formData: action.data };
    }
    return state
}
