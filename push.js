const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDVhCwxmmYNkuU44DhR69VZYzx8Y0aBuTkPfk2wSi9jRHaVWefB-Mb9vJFpefr_OhIl81rDt66dkOQzVjWAl314",
   "privateKey":"QKZt47OLfaU1-qHts4d8Fr3vDSTqOsu3mLwUr_QDsZs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint":"https://fcm.googleapis.com/fcm/send/emdEEfugDFg:APA91bHRxkQRLb7tjS_fhbCaIHMurC3VWg6DALjH6VWXn2tYlHgSiwWcI-lu63rph3_9Ou8chD9qtddxy1yYGsCoW3CKp7OuM2qSNYxZpUiYqQslxy_otiuT3_IXeZyyWyRsAEOS_LNo",
   "keys": {
       "p256dh":"BG7ZRJDqnPOTaSioOFMHE4lRHzTL6HcrItdn4dC3THLhmZqN2o8jxqKmT53Za3EZzVI662DUHOumBY8FURnCE0E=",
       "auth":"eKLcueZ0ygC74ytDd9/lnA=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '10838324202',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);