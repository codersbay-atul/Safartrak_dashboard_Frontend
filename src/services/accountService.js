import {
  getAccountProfile as getAccountProfileRequest,
  getAccountNotifications as getAccountNotificationsRequest,
  updateAccountNotifications as updateAccountNotificationsRequest,
  getAccountActivity as getAccountActivityRequest,
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

export function getAccountActivity(params) {
  return getAccountActivityRequest(params);
}

export default { getAccountProfile, getAccountNotifications, updateAccountNotifications, getAccountActivity };
