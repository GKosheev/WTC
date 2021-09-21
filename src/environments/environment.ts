// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* auth service  */
  login_api: 'http://localhost:5000/api/auth/login',
  register_api: 'http://localhost:5000/api/auth/register',
  me_api: 'http://localhost:5000/api/auth/me',
  confirm_email_api: 'http://localhost:5000/api/auth/confirmation',
  resend_link_api: 'http://localhost:5000/api/auth/resendLink',
  forgot_password_api: 'http://localhost:5000/api/password/forgot-password',
  reset_password_api: 'http://localhost:5000/api/password/reset-password',

  /* table service  */
  get_users_api: 'http://localhost:5000/api/table/users',
  get_user_profile: 'http://localhost:5000/api/table/users',
  send_message_api: 'http://localhost:5000/api/table/send-message',

  /* profile service */
  save_changes_api: 'http://localhost:5000/api/profile/edit-profile'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
