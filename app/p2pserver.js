const Websocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2pServer {
  constructor(blockChain) {
    this.sockets = []
    this.blockChain = blockChain
  }
  listen() {
    const server = new Websocket.Server({
      port: P2P_PORT
    })
    server.on('connection', socket => {
      this.connectSocket(socket)
    })
    this.connectPeers()
    console.log(`Listening on port : ${P2P_PORT}`)
  }

  connectPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer)
      socket.on('open', () => {
        this.connectSocket(socket)
      })
    })
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')
    this.messageHandler(socket);
    this.sendChain(socket)
  }
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockChain.chain))
  }
  messageHandler(socket) {
    socket.on('message', (message) => {
      const receiverOnMessage = JSON.parse(message)
      this.blockChain.replace(receiverOnMessage)
    })
  }
}

module.exports = P2pServer
