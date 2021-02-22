import {createHash} from 'crypto';

class Block {
    constructor(text, previousHash) {
        this._timestamp = +new Date();
        this._text = text;
        this._previousHash = previousHash;
    }

    get text() {
        return this._text;
    }

    get previousHash() {
        return this._previousHash;
    }

    get timestamp() {
        return this._timestamp;
    }

    get hash() {
        let h = createHash('sha256')
            .update(this.timestamp.toString())
            .update(this.text)
            .update(this.previousHash);
        return h.digest('hex');
    }

    toJSON() {
        return {
            timestamp: this.timestamp,
            text: this.text,
            previousHash: this.previousHash,
            hash: this.hash,
        };
    }

    toString() {
        return {
            timestamp: this.timestamp,
            text: this.text,
            previousHash: this.previousHash,
            hash: this.hash,
        };
    }
}

class Blockchain {
    constructor() {
        this._chain = [];

        // Add genesis block
        this._chain.push(new Block('Genesis block text.', '0'));
    }

    addBlock(text) {
        let block = new Block(text, this._chain[this._chain.length - 1].hash);
        this._chain.push(block);
    }

    get chain() {
        return this._chain;
    }

    get isValid() {
        for (let i = 1; i < this._chain.length; i++) {
            if (this.chain[i].previousHash !== this.chain[i - 1].hash) return false;
        }
        return true;
    }

    toString() {
        let ch = [];
        for (let i = 0; i < this.chain.length; i++) {
            ch.push(this.chain[i].toString());
        }
        return ch;
    }

    toJSON() {
        let ch = [];
        for (let i = 0; i < this.chain.length; i++) {
            ch.push(this.chain[i].toString());
        }
        return ch;
    }
}

let blockchain = new Blockchain();

blockchain.addBlock('My note');
blockchain.addBlock('My second note');
console.log(blockchain.toString());

console.log(blockchain.isValid ? 'Chain is valid' : 'Chain is invalid!');
blockchain._chain[0]._text = 'smth';
console.log(blockchain.isValid ? 'Chain is valid' : 'Chain is invalid!');
