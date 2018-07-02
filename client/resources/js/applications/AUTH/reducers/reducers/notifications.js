import actions from '../../../../config/actions';

const initialState = {
    displayList: false,
    notReadCount: 0,
    notifications: []
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.NOTIFICATIONS_SET_DATA:
            return {...returnState, ...payload};
        case actions.NOTIFICATIONS_SET_DISPLAY_LIST:
            return {...returnState, displayList: payload};
        default:
            return returnState;

    }
}