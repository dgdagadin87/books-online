import actions from '../../../../config/actions';

const initialState = {
    notReadCount: 7,
    notifications: []
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.NOTIFICATIONS_SET_DATA:
            return {...returnState, ...payload};
        default:
            return returnState;

    }
}