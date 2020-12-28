const ChainUtil = require('../utils/chain-util')
const { DIFFICULTY, BLOCK_TIME } = require('../config')

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString() {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Data      : ${this.data}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
    `
  }

  static genesis() {
    return new this('genesis time', '-----', 'f1r67-h45h', [], 0, DIFFICULTY)
  }

  static mineBlock(lastBlock, data) {
    let timestamp, hash
    let nonce = 0
    let { difficulty } = lastBlock
    const lastHash = lastBlock.hash
    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))
    return new this(timestamp, lastHash, hash, data, nonce, difficulty)
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`)
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock
    difficulty = lastBlock.timestamp + BLOCK_TIME > currentTime ? (difficulty + 1) : (difficulty - 1)
    return difficulty
  }
}

module.exports = Block
