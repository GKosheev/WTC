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
  save_changes_api: '/api/profile/edit-profile',

  /* payments services */
  get_all_payments_api: '/api/payments/all',
  create_checkout_session_api: '/api/payments/create-checkout-session',
  delete_payments_api: '/api/payments/delete',

  /* subscription service */
  get_all_subscriptions_api: 'api/subscription/all',
  subscription_to_payments_api: 'api/subscription/subscribe'
};
