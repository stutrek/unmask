var proxyTo = process.env.PROXY_TO || 'mybackend.com';

var proxyUrl;
if (/^[\d]+$/.test(proxyTo)) {
    proxyUrl = 'http://localhost:' + proxyTo + '/';
} else {
    proxyUrl = 'https://' + proxyTo;
}

module.exports = [{
    proxy: {
        '/api/*': proxyUrl
    },
    app: '/index-dev.html',
    port: 7000
},{
    proxy: {
        '/api/*': proxyUrl
    },
    app: '/sandbox.html',
    port: 7001
}];
