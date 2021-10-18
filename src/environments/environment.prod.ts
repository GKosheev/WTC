export const environment = {
  production: true,
  /* auth service  */
  login_api: '/api/auth/login',
  register_api: '/api/auth/register',
  me_api: '/api/auth/me',

  confirm_email_api: '/api/auth/confirm-email', // /:token
  resend_link_api: '/api/auth/resend-email-link',

  forgot_password_api: 'api/auth/forgot-password',
  reset_password_api: '/api/auth/reset-password', // /:token

  /* users service  */
  get_users_api: '/api/users',
  get_user_profile_api: '/api/users', // /:userId
  send_message_api: '/api/users/send-message', // /:userId

  /* profile service */
  save_changes_api: '/api/profile/edit-profile'
};
