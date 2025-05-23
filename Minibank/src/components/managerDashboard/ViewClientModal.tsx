// ViewClientModal.tsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    useDisclosure,
    IconButton,
    Tooltip,
    Stack,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { Cliente } from '../../types/client'; // Importe a interface Cliente

interface ViewClientModalProps {
    cliente: Cliente;
}

export function ViewClientModal({ cliente }: ViewClientModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip label="Visualizar Cliente" hasArrow>
                <IconButton
                    icon={<FaEye />}
                    aria-label="Visualizar Cliente"
                    size="sm"
                    colorScheme="green"
                    variant="outline"
                    onClick={onOpen}
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW="md">
                    <ModalHeader fontWeight="semibold" fontSize="lg">
                        Detalhes do Cliente
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={3}>
                            <Text fontWeight="medium">
                                <strong>Nome:</strong> {cliente.nome}
                            </Text>
                            <Text fontWeight="medium">
                                <strong>Agência:</strong> {cliente.agencia}
                            </Text>
                            <Text fontWeight="medium">
                                <strong>Conta:</strong> {cliente.conta}
                            </Text>
                            <Text fontWeight="medium">
                                <strong>Saldo:</strong> {cliente.saldo}
                            </Text>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}