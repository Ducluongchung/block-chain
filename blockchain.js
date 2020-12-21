const Block = require('./block')

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block({
            from: '',
            amount: 10e9,
            to: 'Block-chain'
        }, 'genesis-hash')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(data) {
        const block = new Block(data, this.getLatestBlock().hash, this.getLatestBlock().difficulty)
        block.mine(this.getLatestBlock().difficulty, this.getLatestBlock().timestamp)
        this.chain.push(block);
    }

    toString() {
        return `Blockchain \r\n${this.chain.map(t => t.toString()).join('\r\n')}`
    }
}

module.exports = BlockChain;