import {createReducer, on} from "@ngrx/store";
import {signIn, signUp} from "../actions/auth.action";

export const initialAuthState = ''

export const authReducer = createReducer(
  initialAuthState,
  on(signIn, (state) => {
    return 'SIGN_IN'
  }),
  on(signUp, state => {
    return 'SIGN_UP'
  })
)
