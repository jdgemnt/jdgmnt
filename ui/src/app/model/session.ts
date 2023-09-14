export interface User {
  id?: string,
  name: string,
  me?: boolean
}

export interface Session {
  id: string,
  name: string,
  created: number,
  users: User[],
  // me: User
}

export interface SessionInit {
  sessionID?: string,
  error?: SessionError,
  // generatedName?: string,
  hasValidSession?: boolean,
  me: User
}

export enum SessionErrorCode {
  EMPTY_SESSION_ID,
  INVALID_SESSION_ID,
  MAX_USERS_IN_SESSION
}

export interface SessionError {
  code: SessionErrorCode,
  error: string
}

export const sessionErrors = {
  EMPTY_SESSION : { code: SessionErrorCode.EMPTY_SESSION_ID, error: 'session id is empty' },
  INVALID_SESSION : { code: SessionErrorCode.INVALID_SESSION_ID, error: 'the url contains invalid session id' },
  MAX_USERS_IN_SESSION : { code: SessionErrorCode.MAX_USERS_IN_SESSION, error: 'max users in session' }
}
