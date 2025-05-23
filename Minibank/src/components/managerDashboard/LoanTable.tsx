import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    VStack,
    Badge,
    useBreakpointValue,
    useColorModeValue,
    IconButton,
    useDisclosure,
    Tooltip,
    Button,
} from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import LoanRequestModal from './LoanRequestModal';

interface Pedido {
    id: number;
    nome: string;
    valor: number;
    status: 'Aprovado' | 'Pendente' | 'Rejeitado';
    data: string;
}

interface LoanRequestTableProps {
    pedidos: Pedido[];
    onPedidoStatusUpdated?: (pedidoId: number, newStatus: Pedido['status']) => void;
}

const getStatusColor = (status: Pedido['status']) => {
    const colorMap = {
        Aprovado: 'green',
        Pendente: 'yellow',
        Rejeitado: 'red',
    } as const;
    return colorMap[status] ?? 'gray';
};

const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

export default function LoanRequestTable({ pedidos, onPedidoStatusUpdated }: LoanRequestTableProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

    const handleOpenModal = useCallback((pedido: Pedido) => {
        setSelectedPedido(pedido);
        onOpen();
    }, [onOpen]);

    const handleCloseModal = useCallback(() => {
        setSelectedPedido(null);
        onClose();
    }, [onClose]);

    const handlePedidoStatusUpdated = useCallback(
        (pedidoId: number, newStatus: Pedido['status']) => {
            if (onPedidoStatusUpdated) {
                onPedidoStatusUpdated(pedidoId, newStatus);
            }
            handleCloseModal(); // Fechar o modal após a atualização (opcional, dependendo do fluxo)
        },
        [onPedidoStatusUpdated, handleCloseModal]
    );

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const tableBg = useColorModeValue('white', 'gray.700');

    const renderMobileView = () => (
        <VStack spacing={4} align="stretch">
            {pedidos.map((p) => (
                <Box
                    key={p.id}
                    p={5}
                    shadow="md"
                    bg={cardBg}
                    rounded="md"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                        borderColor: 'blue.500',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <Text fontSize="lg" fontWeight="bold">{p.nome}</Text>
                    <Text fontSize="sm" color="gray.600">
                        Valor solicitado: {formatCurrency(p.valor)}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        Data da solicitação: {formatDate(p.data)}
                    </Text>
                    <Text mt={2}>
                        Situação: <Badge colorScheme={getStatusColor(p.status)}>{p.status}</Badge>
                    </Text>
                    <Button
                        mt={3}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleOpenModal(p)}
                        _hover={{ bg: 'blue.600' }}
                    >
                        Ver detalhes
                    </Button>
                </Box>
            ))}
        </VStack>
    );

    const renderDesktopView = () => (
        <Box bg={tableBg} rounded="lg" shadow="md" overflowX="auto" p={4}>
            <Table variant="striped" colorScheme="gray" size="md">
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                        <Th>Situação</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {pedidos.map((p) => (
                        <Tr key={p.id}>
                            <Td>{p.nome}</Td>
                            <Td>{formatCurrency(p.valor)}</Td>
                            <Td>{formatDate(p.data)}</Td>
                            <Td>
                                <Badge colorScheme={getStatusColor(p.status)}>{p.status}</Badge>
                            </Td>
                            <Td>
                                <Tooltip label="Ver detalhes" hasArrow>
                                    <IconButton
                                        aria-label="Ver detalhes"
                                        icon={<AiOutlineSearch />}
                                        colorScheme="blue"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleOpenModal(p)}
                                    />
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );

    return (
        <>
            {isMobile ? renderMobileView() : renderDesktopView()}

            <LoanRequestModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                pedido={selectedPedido}
                onStatusUpdate={handlePedidoStatusUpdated}
            />
        </>
    );
}