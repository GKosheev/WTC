export const environment = {
  production: true,
  /* auth service  */
  login_api: '/api/auth/login',
  register_api: '/api/auth/register',
  me_api: '/api/auth/me',
  confirm_email_api: '/api/auth/confirmation',
  resend_link_api: '/api/auth/resendLink',
  forgot_password_api: '/api/password/forgot-password',
  reset_password_api: '/api/password/reset-password',

  /* table service  */
  get_users_api: '/api/table/users',
  get_user_profile: '/api/table/users',
  send_message_api: '/api/table/send-message',

  /* profile service */
  save_changes_api: '/api/profile/edit-profile'
};
