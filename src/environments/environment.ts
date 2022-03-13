// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* auth service  */
  login_api: 'http://localhost:5000/api/auth/login',
  register_api: 'http://localhost:5000/api/auth/register',
  me_api: 'http://localhost:5000/api/auth/me',

  confirm_email_api: 'http://localhost:5000/api/auth/confirm-email', // /:token
  resend_link_api: 'http://localhost:5000/api/auth/resend-email-link',

  forgot_password_api: 'http://localhost:5000/api/auth/forgot-password',
  reset_password_api: 'http://localhost:5000/api/auth/reset-password', // /:token

  /* users service  */
  get_users_api: 'http://localhost:5000/api/users',
  get_user_profile_api: 'http://localhost:5000/api/users', // /:userId
  send_message_api: 'http://localhost:5000/api/users/send-message', // /:userId

  /* profile service */
  edit_profile_api: 'http://localhost:5000/api/profile/edit-profile',
  upload_image_api: 'http://localhost:5000/api/profile/upload-image',
  /* payments service */
  get_all_payments_api: 'http://localhost:5000/api/payments/all',
  create_checkout_session_api: 'http://localhost:5000/api/payments/create-checkout-session',
  delete_payments_api: 'http://localhost:5000/api/payments/delete',

  /* subscription service */
  get_all_subscriptions_api: 'http://localhost:5000/api/subscription/all',
  subscription_to_payments_api: 'http://localhost:5000/api/subscription/subscribe',

  /* store&tags service */
  get_all_store_items_api: 'http://localhost:5000/api/store/all',
  buy_store_item_api: 'http://localhost:5000/api/store/buy-item',
  get_all_tags_api: 'http://localhost:5000/api/tags/all',

  /* user purchases */
  get_all_user_purchases_api: 'http://localhost:5000/api/purchases/all',

  /* courts service */
  get_courts_general_info: 'http://localhost:5000/api/courts/info',
  get_courts: 'http://localhost:5000/api/courts',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
