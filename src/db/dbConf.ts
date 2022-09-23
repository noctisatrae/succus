import { gun } from ".";

/**
 * This function is used to configure gunDB as succus is built on top of it. Learn more at https://gun.eco and follow @marknadal on twitter! It's a really awesome project and if you learn use it, you can easily make succus your own.
 * @param conf Change the configuration of the DB by passing an object to this function containing your config: https://gun.eco/docs/API#options
 */
const dbConf = (conf:object) => {
    gun.opt(conf);
}

export default dbConf; 