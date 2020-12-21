const express = require('express')
const bodyParser = require('body-parser')
const BlockChain = require('./blockchain')

const server = express()
const blockChain = new BlockChain()
const port = process.env.PORT || 3000

server.use(bodyParser.json())

server.get('/blocks', (req, res) => {
    res.json(blockChain.chain)
})

server.post('/mine', (req, res) => {
    const data = req.body.data
    blockChain.addBlock(data)
    res.redirect('/blocks')
})
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})