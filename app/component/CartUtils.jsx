import { App } from "../common";

let CartUtils = {
    get: () => {
        return App.api('usr/user/carts').then((carts) => {
            return carts;
        });
    }
};

export default CartUtils;
