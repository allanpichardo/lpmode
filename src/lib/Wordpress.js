import WpApi from 'wpapi';
const wpids = require('../wordpress/wpids.json');

export default class Wordpress {

    static getBaseWpInstance() {
        return new WpApi({endpoint: 'https://lp-mode.com/wp-json'});
    }

    static getFeaturedPosts() {
        return Wordpress.getBaseWpInstance().posts().tags(wpids.tags.featured);
    }

}