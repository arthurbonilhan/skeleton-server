const { MongoClient } = require('mongodb')

let client = null

async function connectToDatabase() {
  try {
    if (!client || !client.isConnected()) {
      const mongoURI = process.env.MONGO_URI
      if (!mongoURI) {
        throw new Error('A string de conexão do MongoDB não foi fornecida.')
      }

      client = new MongoClient(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      await client.connect()
    }
    const db = client.db() // Remova o nome do banco de dados aqui
    return { db, client }
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error
  }
}

module.exports = { connectToDatabase }
