import { AUTH_LOGON, AUTH_LOGOUT } from '../action/constants';
import storage from '../../../storage';

const getUserDataFromStorage = () => {return {
    isLoggedIn: typeof storage.authTokean !== 'undefined',
    authTokean: (typeof storage.authTokean !== 'undefined') ? storage.authTokean : null,
    userId: (typeof storage.userId !== 'undefined') ? storage.userId : null,
    userTitle: (typeof storage.userTitle !== 'undefined') ? storage.userTitle : null,
    userCompany: (typeof storage.userCompany !== 'undefined') ? storage.userCompany : null,
    userPosition: (typeof storage.userPosition !== 'undefined') ? storage.userPosition : null
}};

const INITIAL_STATE = getUserDataFromStorage();

export default (state = INITIAL_STATE, action) => {
    const { type } = action;

    switch (type) {
        case AUTH_LOGON.request:
            return authentificate(state, action);

        case AUTH_LOGON.success:
            return authentificateSuccess(state, action);

        case AUTH_LOGON.failure:
            return authentificateFailure(state, action);

        case AUTH_LOGOUT.request:
            return deAuthentificate(state, action);

        case AUTH_LOGOUT.success:
            return deAuthentificateSuccess(state, action);

        case AUTH_LOGOUT.failure:
            return deAuthentificateFailure(state, action);

        default:
            return state;
    }
}

function authentificate(state, action) {
    return state;
}

function authentificateSuccess(state, action) {
    const { payload: { operations } } = action;

    Object.values(operations).map(operation => {
        const {data, errors} = operation;

        if (data) {
            const { id, attributes: { authTokean, userTitle, userCompany, userPosition } } = data;

            if (typeof authTokean !== 'undefined') {
                storage.setItem('authTokean', authTokean);
                storage.setItem('userId', id);
                storage.setItem('userTitle', userTitle);
                storage.setItem('userCompany', userCompany);
                storage.setItem('userPosition', userPosition);
            }
        }
    })

    return getUserDataFromStorage();
}

function authentificateFailure(state, action) {
    const { payload: { operations } } = action;

    return state;
}

function deAuthentificate(state, action) {
    return state;
}

function deAuthentificateSuccess(state, action) {
    storage.removeItem('authTokean');
    storage.removeItem('userId');
    storage.removeItem('userTitle');
    storage.removeItem('userCompany');
    storage.removeItem('userPosition');

    return getUserDataFromStorage();
}

function deAuthentificateFailure(state, action) {
    return state;
}
