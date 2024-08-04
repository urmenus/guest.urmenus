class Links {
  private root = '/'

  INDEX = `${this.root}`

  PROFILE = `${this.root}profile`

  AUTH = `${this.root}auth`
  SIGN_IN = `${this.AUTH}/sign-in`
  SIGN_UP = `${this.AUTH}/sign-up`
  REPASS = `${this.AUTH}/repass`
}

export const NUXT_LINKS = new Links()
