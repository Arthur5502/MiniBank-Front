import { Heading, Box } from '@chakra-ui/react';
import DashboardLayout from '../../components/managerDashboard/DashboardLayout';
import LoanRequestTable from '../../components/managerDashboard/LoanTable';
import { Pedido } from '../../types/pedido';
import { useState, useCallback } from 'react';

const LoanRequests = () => {
    const initialPedidos: Pedido[] = [
        { id: 1, nome: 'João Silva', valor: 1500, status: 'Aprovado', data: '2025-04-10' },
        { id: 2, nome: 'Maria Souza', valor: 3000, status: 'Pendente', data: '2025-04-15' },
        { id: 3, nome: 'Carlos Lima', valor: 500, status: 'Rejeitado', data: '2025-04-20' },
    ];

    const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);

    const handlePedidoStatusUpdated = useCallback(
        (pedidoId: number, newStatus: Pedido['status']) => {
            setPedidos((prevPedidos) =>
                prevPedidos.map((pedido) =>
                    pedido.id === pedidoId ? { ...pedido, status: newStatus } : pedido
                )
            );
            console.log(`Pedido ${pedidoId} atualizado para: ${newStatus}`);
            // Aqui você pode adicionar a lógica para chamar sua API de backend
        },
        []
    );

    return (
        <DashboardLayout>
            <Box mb={6}>
                <Heading size="lg">Pedidos de Empréstimo</Heading>
            </Box>
            <LoanRequestTable pedidos={pedidos} onPedidoStatusUpdated={handlePedidoStatusUpdated} />
        </DashboardLayout>
    );
};

export default LoanRequests;