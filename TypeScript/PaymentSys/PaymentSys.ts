abstract class Payment{
    protected amount: number;
    protected date: Date;
    constructor(amount: number, date: Date) {
        this.amount = amount;
        this.date = date;
    }

    abstract processPayment(): void;
}

class CreditCard extends Payment{
    private readonly creditCardNo: number;
    constructor(amount: number, date: Date, creditCardNo: number) {
        super(amount, date);
        this.creditCardNo = creditCardNo;

    }
    processPayment(): void {
        console.log(`Processing the Payment of $${this.amount}`);
    }

}

class PaypalPayment extends Payment{
    private readonly email: string;
    constructor(amount: number, date: Date, email: string) {
        super(amount, date);
        this.email = email;
    }
    processPayment(): void {
        console.log(`Processing the Payment of $${this.amount}`);
    }
    
}
class CryptoPayment extends Payment{
    private readonly walletAddress: string;
    constructor(amount: number, date: Date, walletAddress: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    processPayment(): void {
        console.log(`Processing the Payment of $${this.amount}`);
    }
    
}

const PaymentCC = new CreditCard(2000, new Date('2023-12-05'), 134556);
PaymentCC.processPayment();

const PaymentPayPal = new PaypalPayment(2000, new Date('2023-12-05'), "uzaifisani8@gmail.com");
PaymentPayPal.processPayment();

const Crypto1 = new CryptoPayment(2000, new Date('2023-12-05'), "b12e234hudc34");
Crypto1.processPayment();

/**
 *
OUTPUT: 
Processing the Payment of $2000
Processing the Payment of $2000
Processing the Payment of $2000
 */