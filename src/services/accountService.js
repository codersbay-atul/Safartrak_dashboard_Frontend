import {
  getAccountProfile as getAccountProfileRequest,
  getAccountNotifications as getAccountNotificationsRequest,
  updateAccountNotifications as updateAccountNotificationsRequest,
  getAccountActivity as getAccountActivityRequest,
  updateAccountEmail as updateAccountEmailRequest,
} from "../api/accountApi";

export function getAccountProfile() {
  return getAccountProfileRequest();
}

export function getAccountNotifications() {
  return getAccountNotificationsRequest();
}

export function updateAccountNotifications(payload) {
  return updateAccountNotificationsRequest(payload);
}

export function updateAccountEmail(payload) {
  return updateAccountEmailRequest(payload);
}

export function getAccountActivity(params) {
  return getAccountActivityRequest(params);
}

export default { getAccountProfile, getAccountNotifications, updateAccountNotifications, getAccountActivity };
