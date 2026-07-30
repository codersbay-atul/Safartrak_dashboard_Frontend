import { getActions as getActionsRequest } from "../api/actionsApi";

/**
 * Actions service layer.
 */

/**
 * Load dashboard actions from GET /v1/actions.
 * @returns {Promise<{ actions: array }>}
 */
export function getActions() {
  return getActionsRequest();
}
