import actions from '../../../../config/actions';

const initialState = {
    collection: false,
    sortField: 'userName',
    sortType: 'ASC',
    page: 1,
    pages: 1,
    totalCount: 0,
    disabled: false,
    globalLoading: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.USERS_STOP_LOADING:
            return {...payload, disabled: false, globalLoading: false};
        case actions.USERS_START_LOADING:
            return {...returnState, ...payload, disabled: true, globalLoading: false};
        case actions.USERS_START_GLOBAL_LOADING:
            return {...returnState, ...payload, disabled: false, globalLoading: true};
        default:
            return returnState;

    }
}