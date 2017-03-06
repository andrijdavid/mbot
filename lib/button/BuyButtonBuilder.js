const Button = require('../Button');

class BuyButtonBuilder {
    constructor() {
        this.type = Button.TYPE.BUY;
        this.url = null;
        this.title = null;
        this.data = null;
        this.paymentSummary = {};
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setTitle(str) {
        this.title = str;
        return this;
    }

    getTitle() {
        return this.title;
    }

    setData(str) {
        this.data = str;
        return this;
    }

    getData() {
        return this.data;
    }

    setCurrency(currency) {
        this.paymentSummary['currency'] = currency;
        return this;
    }

    getCurrency() {
        return this.paymentSummary.currency;
    }

    isTestPayment(isTest) {
        if (isTest != null) {
            this.paymentSummary['is_test_payment'] = isTest;
            return this;
        }

        return (!!this.paymentSummary.is_test_payment);
    }

    setPaymentType(type) {
        let paymentType = Object.keys(Button.PAYMENT_TYPE).map(function (value) {
            return Button.PAYMENT_TYPE[value];
        }, []);
        if (paymentType.indexOf(type) < 0) throw new Error('Not found payment type.');

        this.paymentSummary['payment_type'] = type;
        return this;
    }

    getPaymentType() {
        return this.paymentSummary.payment_type;
    }

    setMerchantName(name) {
        this.paymentSummary['merchant_name'] = name;
        return this;
    }

    getMerchantName() {
        return this.paymentSummary.merchant_name;
    }

    requestedShippingAddress() {
        if (!this.paymentSummary['requested_user_info']) this.paymentSummary['requested_user_info'] = [];
        this.paymentSummary.requested_user_info.push('shipping_address');
        return this;
    }

    requestedContactName() {
        if (!this.paymentSummary['requested_user_info']) this.paymentSummary['requested_user_info'] = [];
        this.paymentSummary.requested_user_info.push('contact_name');
        return this;
    }

    requestedContactPhone() {
        if (!this.paymentSummary['requested_user_info']) this.paymentSummary['requested_user_info'] = [];
        this.paymentSummary.requested_user_info.push('contact_phone');
        return this;
    }

    requestedContactEmail() {
        if (!this.paymentSummary['requested_user_info']) this.paymentSummary['requested_user_info'] = [];
        this.paymentSummary.requested_user_info.push('contact_email');
        return this;
    }

    getRequestedUserInfo() {
        return this.paymentSummary.requested_user_info;
    }

    addPriceList(label, amount) {
        if (!this.paymentSummary['price_list']) this.paymentSummary['price_list'] = [];
        this.paymentSummary.price_list.push({
            label: label,
            amount: amount
        });
        return this;
    }

    getPriceList() {
        if (!this.paymentSummary.price_list) return [];

        return this.paymentSummary.price_list.map(function (list, i) {
            return {
                getLabel: function () {
                    return list.label;
                },
                getAmount: function () {
                    return (!list.amount) ? 0 : list.amount;
                }
            };
        }, []);
    }

    build() {
        let btn = new Button(this.type, this.title, this.data);
        btn.payment_summary = this.paymentSummary;
        return btn;
    }
}

module.exports = BuyButtonBuilder;