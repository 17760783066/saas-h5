import {Utils} from "../../common";
import {AddressComps} from "./AddressComps";
import React from "react";

let AddressUtils = (() => {

    let addressModal = (show_modal, addresses, syncItem) => {
        Utils.common.renderReactDOM(<AddressComps show_modal={show_modal} addresses={addresses} syncItem={syncItem}/>);
    };

    return {addressModal};

})();

export default AddressUtils;
