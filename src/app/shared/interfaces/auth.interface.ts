export interface FbAuthResponse {
  idToken:string,
  expiresIn:string
}

export interface UserLogin {
  email:string,
  password:string,
  returnSecureToken:boolean
}
