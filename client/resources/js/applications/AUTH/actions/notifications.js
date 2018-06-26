import actions from '../../../config/actions';

export const toggleDisplayList = (displayList) => {
    return {
        type: actions.NOTIFICATIONS_SET_DISPLAY_LIST,
        payload: displayList
    }
};