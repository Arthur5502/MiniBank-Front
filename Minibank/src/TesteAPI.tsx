import { useEffect } from 'react'

export default function APICheck() {
  useEffect(() => {
    console.log('Componente APICheck carregado.')

    const fetchPing = async () => {
      try {
        const response = await fetch('http://localhost:3000/ping')
        console.log('Resposta da requisição:', response)
        const result = await response.text()
        console.log('Conteúdo retornado:', result)
      } catch (error) {
        console.error('Falha ao conectar com a API:', error)
      }
    }

    fetchPing()
  }, [])

  return <p>Abra o console para verificar a resposta da API.</p>
}
