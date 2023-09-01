const PWA = ((PWA_CONFIG, notification) => {

    /**
     * Service Workers
     */
    class ServiceWorker {

        /**
         * Register principal Service Worker
         * @return {undefined}
         */
        static register() {
            if (Navigator.isSupportedServiceWorker()) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register(PWA_CONFIG.sw.filepath)
                        .then((registration) => {
                            console.log('PWA: Service Worker ready!');
                            registration.update();
                        })
                        .catch((error) => {
                            console.error('PWA: Service Worker registration failed with ' + error);
                        })
                    ;
                });
            }
        }

        /**
         * Get registered Service Worker
         * @param  {Function} callback Return callback with registration object.
         * @return {Object}   registration object
         */
        static getRegistration(callback) {
            if (Navigator.isSupportedServiceWorker()) {
                navigator.serviceWorker.getRegistration()
                    .then((registration) => {
                        callback(registration);
                    })
                    .catch((error) => {
                        console.error('PWA: Service Worker don\'t registered: ' + error);
                    })
                ;
            }
        }
    }

    /**
     * Navigator
     */
    class Navigator {

        /**
         * Navigator support Service Workers
         * @return {Boolean}
         */
        static isSupportedServiceWorker() {
            if ('serviceWorker' in navigator) {
                return true;
            }
            console.error('PWA: This browser does not support service workers.');
            return false;
        }

        /**
         * Navigator support Notifications
         * @return {Boolean}
         */
        static isSupportedNotification() {
            if ('Notification' in window && navigator.serviceWorker) {
                return true;
            }
            console.error('PWA: This browser does not support Notifications.');
            return false;
        }

        /**
         * Navigator is offline
         * @return {Boolean}
         */
        static isOffline() {
            if (navigator.onLine) {
                return false;
            }
            return true;
        }

        /**
         * Clear Cache of Navigator
         * @return {undefined}
         */
        static clearCache() {
            if ('caches' in window) {
                caches.keys().then((names) => {
                    for (let name of names) {
                        caches.delete(name);
                    }
                });
                console.log('PWA: Cache cleared!');
            } else {
                console.error('PWA: This browser does not support Caches API.');
            }
        }
    }

    /**
     * Server
     */
    class Server {

        /**
         * Send data to API Server
         * @param  {String} endpoint URL of endpoint of server API
         * @param  {String} method   ('GET'|'POST'|'PUT'|'DELETE')
         * @param  {(ArrayBuffer|ArrayBufferView|Blob|File|String|URLSearchParams|FormData)} body
         * @return {Object} Return Promise object
         */
        static send(endpoint, method, body) {
            return fetch(endpoint, {
                method: method,
                body: body
            });
        }

        /**
         * Send subscription data to API Server
         * @param  {Object} subscription Subscription object
         * @param  {String} method       ('POST'|'PUT'|'DELETE')
         * @return {Object} Return       Promise object
         */
        static sendSubscription(subscription, method) {
            const key = subscription.getKey('p256dh');
            const token = subscription.getKey('auth');
            const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];

            return this.send(PWA_CONFIG.push.server.endpoint, method, JSON.stringify({
                endpoint: subscription.endpoint,
                publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
                contentEncoding,
            }));
        }
    }

    /**
     * Helpers
     */
    class Helper {

        /**
         * Covert urlBase64 To Uint8Array
         * @param  {String}     base64String base64 string
         * @return {Uint8Array} Uint8Array
         */
        static urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    }

    return {
        ServiceWorker,
        Navigator,
        Server,
        Helper
    };

}) (PWA_CONFIG, Notification);
