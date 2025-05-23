// src/pages/ManagerDashboard.tsx
import { Heading, Box } from '@chakra-ui/react';
import DashboardLayout from '../../components/managerDashboard/DashboardLayout';
import ClientTable from '../../components/managerDashboard/ClientTable';
import { Cliente } from '../../types/client'; // Importe a interface Cliente (se você a tiver criado)
import { useState, useCallback } from 'react';

const ManagerDashboard = () => {
    const initialClientes: Cliente[] = [
        { nome: 'João Silva', agencia: '1234', conta: '56789-0', saldo: '1200.00' },
        { nome: 'Maria Souza', agencia: '5678', conta: '12345-6', saldo: '850.50' },
        { nome: 'Carlos Lima', agencia: '1010', conta: '78901-2', saldo: '3000.00' },
    ];

    const [clientes, setClientes] = useState<Cliente[]>(initialClientes);

    const handleClientUpdated = useCallback(
        (updatedClient: Cliente, index: number) => {
            setClientes((prevClientes) => {
                const novosClientes = [...prevClientes];
                novosClientes[index] = updatedClient;
                return novosClientes;
            });
            console.log(`Cliente atualizado no índice ${index}:`, updatedClient);
            // Aqui você pode adicionar a lógica para chamar sua API de backend para salvar a atualização
        },
        []
    );

    return (
        <DashboardLayout>
            <Box mb={4}>
                <Heading>Painel de clientes</Heading>
            </Box>
            <ClientTable clientes={clientes} onClientUpdated={handleClientUpdated} />
        </DashboardLayout>
    );
};

export default ManagerDashboard;