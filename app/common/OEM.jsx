import { U,App,CTYPE } from '../common';
let info = null;
let loading = false;

let OEM = {
    get: () => {
        if (loading) {
            let promiseFunc = (resolve, reject) => {
                let check = () => {
                    if (info) {
                        resolve(info);
                    } else {
                        setTimeout(check, 50);
                    }
                };
                check();
            };
            return new Promise(promiseFunc);
        }
        loading = true;
        if (info) {
            loading = false;
            return new Promise((resolve, reject) => {
                resolve(info);
            });
        } else {
            return OEM.load();
        }
    },
    load: () => {
        let schoolId = U.getIdFromUrl();
        return App.api("/sch/admin/oem", { schoolId }).then((result) => {
            loading = false;
            info = result;
            return info;
        }, () => {
            loading = false;
        });
    },
    clear: () => {
        info = null;
        loading = false;
    }
};

export default OEM;