var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var CreditCard = /** @class */ (function (_super) {
    __extends(CreditCard, _super);
    function CreditCard(amount, date, creditCardNo) {
        var _this = _super.call(this, amount, date) || this;
        _this.creditCardNo = creditCardNo;
        return _this;
    }
    CreditCard.prototype.processPayment = function () {
        console.log("Processing the Payment of $".concat(this.amount));
    };
    return CreditCard;
}(Payment));
var PaypalPayment = /** @class */ (function (_super) {
    __extends(PaypalPayment, _super);
    function PaypalPayment(amount, date, email) {
        var _this = _super.call(this, amount, date) || this;
        _this.email = email;
        return _this;
    }
    PaypalPayment.prototype.processPayment = function () {
        console.log("Processing the Payment of $".concat(this.amount));
    };
    return PaypalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        console.log("Processing the Payment of $".concat(this.amount));
    };
    return CryptoPayment;
}(Payment));
var PaymentCC = new CreditCard(2000, new Date('2023-12-05'), 134556);
PaymentCC.processPayment();
var PaymentPayPal = new PaypalPayment(2000, new Date('2023-12-05'), "uzaifisani8@gmail.com");
PaymentPayPal.processPayment();
var Crypto1 = new CryptoPayment(2000, new Date('2023-12-05'), "b12e234hudc34");
Crypto1.processPayment();
