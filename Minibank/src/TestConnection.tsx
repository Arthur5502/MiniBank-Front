import React from 'react'
import api from '../services/api'

const ConnectionTester: React.FC = () => {
  const testApiConnection = async () => {
    try {
      const res = await api.get('/ping')
      window.alert(res.data) // Esperado: 'pong'
    } catch (err) {
      window.alert('Não foi possível se conectar ao servidor.')
    }
  }

  return (
    <button onClick={testApiConnection}>
      Verificar Conexão
    </button>
  )
}

export default ConnectionTester
