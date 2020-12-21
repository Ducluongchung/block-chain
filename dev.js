const sha256 = require('crypto-js/sha256')
const BLOCKTIME = 10e3
const MIN_DIFFICULTY = 2

class Block {
    constructor(data, previousHash, difficulty = MIN_DIFFICULTY) {
        this.timestamp = Date.now()
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
        this.difficulty = difficulty
    }

    calculateHash() {
        return sha256(`${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}${this.nonce}${this.difficulty}`).toString()
    }

    mine(difficulty, timestamp) {
        while (parseInt(this.hash, 16) > Math.pow(16, 64 - this.difficulty)) {
            this.timestamp = Date.now()
            this.difficulty = Block.adjustDifficulty(difficulty, timestamp, this.timestamp)
            this.nonce++
            this.hash = this.calculateHash()
        }
    }

    static adjustDifficulty(difficulty, timestamp, newTimestamp) {
        return (timestamp + BLOCKTIME) > newTimestamp ? (difficulty + 1) : (difficulty - 1)
    }

    toString() {
        return `Block --
        timestamp       : ${this.timestamp}
        previousHash    : ${this.previousHash}
        hash            : ${this.hash}
        data            : ${JSON.stringify(this.data)}
        nonce           : ${this.nonce}
        difficulty      : ${this.difficulty}`
    }

}

module.exports = Block;