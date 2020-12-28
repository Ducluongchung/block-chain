const Blockchain = require('./blockchain')

const bc = new Blockchain()
const newBlock = bc.addBlock('s3c0nd-b10ck')
console.log(newBlock.toString())
console.log(bc.chain)
