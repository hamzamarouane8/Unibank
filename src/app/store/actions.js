import {createAction} from 'redux-actions'

import {accounts, geoList, historyById, login, virement,beneficiaires,addBeneficiairy,deleteBeneficiairy,addChequebook,chequebooks,cancelChequebook} from '../api'
import {get} from "../storage";

export const LOGIN = 'session/LOGIN'
export const LOGIN_AUTH = 'session/LOGIN_AUTH'
export const ACCOUNTS_LOAD = 'session/ACCOUNTS_LOAD'
export const LIST_BRANCHES = 'session/LIST_BRANCHES'
export const VIREMENT_SEND = 'session/VIREMENT_SEND'
export const LOGOUT_SUCCESS = 'session/LOGOUT_SUCCESS'
export const ACCOUNT_HISTORY = 'session/ACCOUNT_HISTORY'
export const BENEFICIAIRES_LOAD = 'session/BENEFICIAIRES_LOAD'
export const BENEFICIAIRY_ADD = 'session/BENEFICIAIRY_ADD'
export const BENEFICIAIRY_DELETE = 'session/BENEFICIAIRY_DELETE'
export const AUTH_BAPI = 'session/AUTH_BAPI'
export const CHEQUEBOOK_ADD = 'session/CHEQUEBOOK_ADD'
export const CHEQUEBOOK_LOAD = 'session/CHEQUEBOOK_LOAD'
export const CHEQUEBOOK_CANCEL = 'session/CHEQUEBOOK_CANCEL'


export const loginAction = createAction(LOGIN, async ({username, password}) => {
  return await login({username, password});
});

export const loadAccountsAction = createAction(ACCOUNTS_LOAD, async () => {
  const user = get('session_user')
  return await accounts(user.token );
});

export const loadListGeo = createAction(LIST_BRANCHES, async () => {
  return await geoList();
});


export const virementAction = createAction(VIREMENT_SEND, async ( data) => {
  const user = get('session_user')
  return await virement(data,user.token);
});

export const virementConfirmAction = createAction(VIREMENT_SEND, async (form) => {
  return await form;
});


export const logoutAction = () => ({
  type: LOGOUT_SUCCESS
})

export const loadHistoryById = createAction(ACCOUNT_HISTORY, async (idAccount) => {
  const user = get('session_user')
  return await historyById(user.token,idAccount);
});

export const loadBeneficiairesAction = createAction(BENEFICIAIRES_LOAD, async () => {
  const user = get('session_user')
  return await beneficiaires(user.token );
});

export const addBeneficiairyAction = createAction(BENEFICIAIRY_ADD, async (data) => {
  const user = get('session_user')
  return await addBeneficiairy(user ,data);
});
export const deleteBeneficiairyAction = createAction(BENEFICIAIRY_DELETE, async (listBeneficiaries) => {
  const user = get('session_user')
  return await deleteBeneficiairy(user.token ,listBeneficiaries);
});

export const loginOAuth2 = createAction(AUTH_BAPI, async () => {
  return await true;
});

export const loadChequebookAction = createAction(CHEQUEBOOK_LOAD, async () => {
  const user = get('session_user')
  return await chequebooks(user.token );
});

export const addChequebookAction = createAction(CHEQUEBOOK_ADD, async (data) => {
  const user = get('session_user')
  return await addChequebook(user ,data);
});

export const cancelChequebookAction = createAction(CHEQUEBOOK_CANCEL, async (data) => {
  const user = get('session_user')
  return await cancelChequebook(user ,data);
});

