import actions from '../../../../config/actions';

const initialState = {
    displayList: false,
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
        },
        {
            id: 4,
            status: 'success',
            bookId: 44,
            bookName: 'Звонят, звонят колокола!',
            type: 'download'
        },
        {
            id: 5,
            status: 'success',
            bookId: 55,
            bookName: 'Народные рецепты',
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
        case actions.NOTIFICATIONS_SET_DISPLAY_LIST:
            console.log(payload);
            return {...returnState, displayList: payload};
        default:
            return returnState;

    }
}