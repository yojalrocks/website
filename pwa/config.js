const PWA_CONFIG = {

    // App config
    app: {
        // App name
        name: 'https://yagarwalca.in/',
        // App version
        version: 'v1',
    },

    // Service Worker config
    sw: {
        // Main service worker filepath (always root of project)
        filepath: 'assets/js/sw.js',
        // Route of offline page
        offline_route: '/pwa/errors/offline/',
    },

    // Cache config
    cache: {
        // Images cache config (png|jpg|jpeg|svg|gif)
        images: {
            // Enable/disable images caching
            active: true,
            // The maximum number of entries to cache.
            // Entries used the least will be removed as the maximum is reached.
            maxentries: 500,
            // The maximum age of an entry before it's treated as stale and removed.
            maxageseconds: 7 * 24 * 60 * 60,
        },
        // Static files cache config (js|json|css)
        statics: {
            // Enable/disable static files caching
            active: true,
            // The maximum number of entries to cache.
            // Entries used the least will be removed as the maximum is reached.
            maxentries: 500,
            // The maximum age of an entry before it's treated as stale and removed.
            maxageseconds: 7 * 24 * 60 * 60,
        },
        // Fonts cache config (eot|ttf|woff|woff2|otf)
        // with cross-origin requests example google fonts
        fonts: {
            // Enable/disable fonts caching
            active: true,
            // The maximum number of entries to cache.
            // Entries used the least will be removed as the maximum is reached.
            maxentries: 500,
            // The maximum age of an entry before it's treated as stale and removed.
            maxageseconds: 7 * 24 * 60 * 60,
        },
        routes: {
            // Force the response to come from the network
            networkonly: {
                // Enable/disable network only routes caching
                active: true,
                // Matching routes with a Regular Expression
                regex: /\/(?:login|logout)\//,
            },
            // Resources are requested from both the cache and the network in parallel.
            // The strategy will respond with the cached version if available,
            // otherwise wait for the network response.
            // The cache is updated with the network response with each successful request.
            stalewhilerevalidate: {
                active: true,
                regex: /\/news\/.*/,
            },
            // Network first request strategy.
            networkfirst: {
                active: true,
                regex: /.*/,
            },
            // Cache first request strategy.
            cachefirst: {
                active: false,
                // regex: /.*/,
                // maxentries: 500,
                // maxageseconds: 7 * 24 * 60 * 60,
            },
            // Force the response to come from the browser.
            cacheonly: {
                active: false,
                // regex: /.*/,
            },
        },
        // Add your custom service worker for load it.
        custom: {
            active: false,
            // service worker script route
            // script: '/pwa/sw/my-custom-sw.js',
        },
    },

    // Precache config
    precache: {
        // Enable/disable precaching
        active: true,
        // Routes to
        routes: [
            '/',
            '/about.html',
            '/contact.html',
            '/index.html',
            '/services.html',
            '/assets/vendor/bootstrap-icons/bootstrap-icons.min.css',
            '/assets/css/main.css',
            '/assets/vendor/remixicon/remixicon.css',
            '/assets/vendor/swiper/swiper-bundle.min.css',
            '/assets/vendor/bootstrap/css/bootstrap.min.css',
            '/assets/vendor/glightbox/css/glightbox.min.css',
            '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
            '/assets/vendor/glightbox/js/glightbox.min.js',
            '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
            '/assets/js/main.js',
            '/assets/vendor/swiper/swiper-bundle.min.js',
            '/assets/img/about.jpg',
            '/assets/img/contact-bg.png',
            '/assets/img/headers/contact-header.jpg',
            '/assets/img/cta-bg.jpg',
            '/assets/img/fullLogo.png',
            '/assets/img/hero-bg.jpg',
            '/assets/img/team/team-1.jpg',
            '/assets/img/team/team-2.jpg',
            '/assets/img/team/team-3.jpg',
            '/assets/img/logo.ico'
        ],
    },
}
