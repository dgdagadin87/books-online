import actions from '../../../../config/actions';

const initialState = {
    notReadCount: 3,
    notifications: [
        {
            id: 1,
            status: 'success',
            bookId: 11,
            bookName: 'Синий мопс счастья',
            type: 'add'
        },
        {
            id: 2,
            status: 'success',
            bookId: 22,
            bookName: 'Квазимодо на шпильках',
            type: 'add'
        },
        {
            id: 3,
            status: 'error',
            bookId: 33,
            bookName: 'Никогде',
            type: 'download'
        }
    ]
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