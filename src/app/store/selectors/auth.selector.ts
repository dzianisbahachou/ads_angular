import {createSelector} from "@ngrx/store";

export const selectFeature = (state:any) => state

export const authSelector = createSelector(
  selectFeature,
  (state => state.auth)
)
