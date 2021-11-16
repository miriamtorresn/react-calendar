import * as types from "./actionTypes";

export function updateLoadingStatus(loading: boolean) {
    return { type: types.UPDATE_LOADING_STATUS, loading };
}