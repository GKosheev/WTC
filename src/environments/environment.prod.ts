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
  edit_profile_api: '/api/profile/edit-profile',
  upload_image_api: '/api/profile/upload-image',


  /* payments services */
  get_all_payments_api: '/api/payments/all',
  create_checkout_session_api: '/api/payments/create-checkout-session',
  delete_payments_api: '/api/payments/delete',

  /* subscription service */
  get_all_subscriptions_api: 'api/subscription/all',
  subscription_to_payments_api: 'api/subscription/subscribe',

  /* store&tags service */
  get_all_store_items_api: '/api/store/all',
  buy_store_item_api: '/api/store/buy-item',
  get_all_tags_api: '/api/tags/all',

  /* user purchases */
  get_all_user_purchases_api: '/api/purchases/all',

  /* courts service */
  get_courts_general_info: '/api/courts/info',
  get_courts: '/api/courts',


  assetsPath: {
    user_profile: './assets/',
    private_component: './assets/',
    edit_profile: './assets/',
  }
};
