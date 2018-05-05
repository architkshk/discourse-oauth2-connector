import passport from 'passport'
import {OneauthProfile, Strategy as OneauthStrategy} from 'passport-oneauth'
import url from 'url'
import {VerifyCallback} from 'passport-oauth2'

passport.serializeUser(((user: OneauthProfile, done) => {
  done(user.id)
}))

passport.deserializeUser((id, done) => {

})

const oneauthStrategy = new OneauthStrategy({
  clientID: process.env.ONEAUTH_CLIENT_ID,
  clientSecret: process.env.ONEAUTH_CLIENT_SECRET,
  authorizationURL: 'https://account.codingblocks.com/oauth/authorize',
  callbackURL: url.resolve(process.env.SERVER_URL, '/login/callback'),
  tokenURL: 'https://account.codingblocks.com/oauth/token',
  include: ['a']
}, (accessToken: string, refreshToken: string, profile: OneauthProfile, done: VerifyCallback) => {

  if (!profile.verifiedemail) {
    // Do not allow people without verified emails to Discourse
    return done(new Error("Email not verified"))
  }

  done(null, profile)


})

passport.use(oneauthStrategy)

export {
  passport
}
