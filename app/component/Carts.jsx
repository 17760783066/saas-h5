import { action, configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });
export default class Carts {

    @observable carts = [];

    get getCarts() {
        return this.carts;
    }

    @action setCarts(carts) {
        this.carts = carts;
    }

    get getCount() {
        return this.carts.length || 0;
    }

}
