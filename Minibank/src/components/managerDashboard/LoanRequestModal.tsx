import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Button,
    Badge,
    Stack,
    useBreakpointValue,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Pedido {
    id: number;
    nome: string;
    valor: number;
    status: 'Aprovado' | 'Pendente' | 'Rejeitado';
    data: string;
}

interface LoanRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    pedido: Pedido | null;
    onStatusUpdate?: (pedidoId: number, newStatus: Pedido['status']) => void; // Callback para notificar a atualização do status
}

const getStatusColor = (status: Pedido['status']) => {
    switch (status) {
        case 'Aprovado':
            return 'green';
        case 'Pendente':
            return 'orange';
        case 'Rejeitado':
            return 'red';
        default:
            return 'gray';
    }
};

export default function LoanRequestModal({
    isOpen,
    onClose,
    pedido: initialPedido,
    onStatusUpdate,
}: LoanRequestModalProps) {
    const [pedidoAtual, setPedidoAtual] = useState<Pedido | null>(initialPedido);
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        setPedidoAtual(initialPedido);
    }, [initialPedido]);

    if (!pedidoAtual) {
        return null;
    }

    const handleUpdateStatus = (novoStatus: Pedido['status']) => {
        if (pedidoAtual && onStatusUpdate) {
            onStatusUpdate(pedidoAtual.id, novoStatus);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={isMobile ? 'xs' : 'md'}>
            <ModalOverlay />
            <ModalContent maxW="sm" mx={isMobile ? 4 : 'auto'}>
                <ModalHeader fontWeight="semibold" fontSize={isMobile ? 'lg' : 'xl'}>
                    Detalhes do Pedido
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3} fontSize={isMobile ? 'sm' : 'md'}>
                        <Text fontWeight="medium">
                            <strong>Cliente:</strong> {pedidoAtual.nome}
                        </Text>
                        <Text fontWeight="medium">
                            <strong>Valor:</strong> R$ {pedidoAtual.valor.toFixed(2)}
                        </Text>
                        <Text fontWeight="medium">
                            <strong>Data:</strong> {pedidoAtual.data}
                        </Text>
                        <Flex align="center">
                            <Text fontWeight="medium">
                                <strong>Status:</strong>
                            </Text>
                            <Spacer />
                            <Badge colorScheme={getStatusColor(pedidoAtual.status)} fontSize={isMobile ? 'xs' : 'sm'}>
                                {pedidoAtual.status}
                            </Badge>
                        </Flex>
                    </Stack>
                </ModalBody>

                <ModalFooter flexDirection={{ base: 'column', md: 'row' }} gap={2}>
                    <Button
                        colorScheme="green"
                        onClick={() => handleUpdateStatus('Aprovado')}
                        width={{ base: 'full', md: 'auto' }}
                        isDisabled={pedidoAtual.status === 'Aprovado'}
                    >
                        Aprovar
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={() => handleUpdateStatus('Rejeitado')}
                        width={{ base: 'full', md: 'auto' }}
                        isDisabled={pedidoAtual.status === 'Rejeitado'}
                    >
                        Rejeitar
                    </Button>
                    <Button onClick={onClose} width={{ base: 'full', md: 'auto' }}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}