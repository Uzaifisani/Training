class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
        this.status = 'pending';
    }

    processPayment() {
        throw new Error('Process payment method must be implemented');
    }

    getPaymentDetails() {
        return {
            amount: this.amount,
            date: this.date,
            status: this.status
        };
    }
}

class CreditCardPayment extends Payment {
    #cardNumber;
    #cvv;
    #expiryDate;

    constructor(amount, date, cardNumber, cvv, expiryDate) {
        super(amount, date);
        this.#cardNumber = cardNumber;
        this.#cvv = cvv;
        this.#expiryDate = expiryDate;
    }

    processPayment() {
        // Simulate payment processing
        this.status = 'completed';
        return `Credit Card Payment processed: $${this.amount}`;
    }

    getMaskedCardNumber() {
        return `****-****-****-${this.#cardNumber.slice(-4)}`;
    }
}

class PayPalPayment extends Payment {
    #email;
    #password;

    constructor(amount, date, email, password) {
        super(amount, date);
        this.#email = email;
        this.#password = password;
    }

    processPayment() {
        // Simulate payment processing
        this.status = 'completed';
        return `PayPal Payment processed: $${this.amount}`;
    }

    getPayPalEmail() {
        return this.#email;
    }
}

class CryptoPayment extends Payment {
    #walletAddress;
    #privateKey;

    constructor(amount, date, walletAddress, privateKey) {
        super(amount, date);
        this.#walletAddress = walletAddress;
        this.#privateKey = privateKey;
    }

    processPayment() {
        // Simulate payment processing
        this.status = 'completed';
        return `Crypto Payment processed: $${this.amount}`;
    }

    getWalletAddress() {
        return this.#walletAddress;
    }
}

// Example usage:
const creditCard = new CreditCardPayment(100, new Date(), '1234567890123456', '123', '12/25');
const paypal = new PayPalPayment(50, new Date(), 'user@example.com', 'password123');
const crypto = new CryptoPayment(75, new Date(), '0x123...abc', 'private_key_here');

console.log(creditCard.getMaskedCardNumber()); // ****-****-****-3456
console.log(creditCard.processPayment());      // Credit Card Payment processed: $100
console.log(paypal.getPayPalEmail());         // user@example.com
console.log(crypto.getWalletAddress());       // 0x123...abc
