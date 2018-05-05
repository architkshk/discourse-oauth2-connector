declare module 'discourse-sso' {
  namespace discourseSSO {
    interface UserParams {
      nonce: string,
      external_id: string,
      email: string,
      username?: string,
      name?: string,
      avatar_url?: string,
      add_groups?: string[],
      remove_groups?: string[]
    }
  }
  class discourseSSO {
    constructor(ssoSecret: string)
    validate(payload: string, sig: string): boolean
    getNonce(payload: string): string
    buildLoginString(params: discourseSSO.UserParams): string
  }
  export = discourseSSO
}