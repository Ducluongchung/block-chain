const Block = require('./block')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const block = Block.mineBlock(lastBlock, data)
    this.chain.push(block)
    return block
  }
  isVaild(chain) {
    if (JSON.stringify(chain[0]) === JSON.stringify(Block.genesis())) {
      return false
    }
    for (let index = 1; index < chain.length; index++) {
      const block = chain[index];
      const lastBlock = chain[index - 1]
      if (block.lastHash !== lastBlock.hash) {
        return false
      }
    }
    return true
  }

  replace(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('New chain must be longer than current chain')
      return
    }
    if (!this.isVaild(newChain)) {
      console.log('New chain is invaid')
    }
    console.log('Replace with new chain')
    this.chain = newChain
  }
}



module.exports = Blockchain
