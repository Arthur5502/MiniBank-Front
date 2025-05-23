// ClientTable.tsx
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stack,
    Text,
    useBreakpointValue,
    Flex,
} from '@chakra-ui/react';
import { ViewClientModal } from './ViewClientModal';
import { Cliente } from '../../types/client';
import { useState, useEffect } from 'react';

interface ClientTableProps {
    clientes: Cliente[];
    onClientUpdated?: (updatedClient: Cliente, index: number) => void; // Callback para notificar a atualização
}

export default function ClientTable({ clientes: initialClientes, onClientUpdated }: ClientTableProps) {
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
    const [clientes, setClientes] = useState<Cliente[]>(initialClientes);

    useEffect(() => {
        setClientes(initialClientes); // Mantém o estado de clientes sincronizado com as props
    }, [initialClientes]);

    const atualizarCliente = (index: number, novoCliente: Cliente) => {
        const novosClientes = [...clientes];
        novosClientes[index] = novoCliente;
        setClientes(novosClientes);
        onClientUpdated?.(novoCliente, index); // Chama o callback se fornecido
    };

    if (isMobile) {
        return (
            <Stack spacing={4}>
                {clientes.map((cliente, i) => (
                    <Box
                        key={i}
                        p={5}
                        shadow="md"
                        rounded="lg"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        transition="all 0.2s ease"
                        _hover={{ shadow: 'lg', transform: 'scale(1.01)' }}
                    >
                        <Text fontSize="xl" fontWeight="bold" color="gray.900">
                            {cliente.nome}
                        </Text>
                        <Text color="gray.700">
                            <strong>Agência:</strong> {cliente.agencia}
                        </Text>
                        <Text color="gray.700">
                            <strong>Conta:</strong> {cliente.conta}
                        </Text>
                        <Text mt={2} color="#008000" fontWeight="semibold">
                            <strong>Saldo:</strong> {cliente.saldo}
                        </Text>

                        <Flex mt={4} gap={2}>
                            <ViewClientModal cliente={cliente} />
                            
                        </Flex>
                    </Box>
                ))}
            </Stack>
        );
    }

    return (
        <Box bg="white" rounded="lg" shadow="md" p={6}>
            <Table variant="simple" size="md">
                <Thead bg="#008000">
                    <Tr>
                        <Th color="white">Nome</Th>
                        <Th color="white">Agência</Th>
                        <Th color="white">Conta</Th>
                        <Th color="white">Saldo</Th>
                        <Th color="white">Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {clientes.map((cliente, i) => (
                        <Tr key={i} _hover={{ bg: 'gray.100' }}>
                            <Td>{cliente.nome}</Td>
                            <Td>{cliente.agencia}</Td>
                            <Td>{cliente.conta}</Td>
                            <Td color="#008000" fontWeight="semibold">
                                {cliente.saldo}
                            </Td>
                            <Td>
                                <Flex gap={2}>
                                    <ViewClientModal cliente={cliente} />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}