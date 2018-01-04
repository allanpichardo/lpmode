const WpApi = require('wpapi');

let wp = new WpApi({endpoint: 'https://lp-mode.com/wp-json'});

wp.categories().then((tags) => {
    console.log(tags);
}).catch((err) => {
    console.log(err);
});