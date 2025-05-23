// EditClientModal.tsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text, // Alterado de Input para Text
    FormControl,
    FormLabel,
    useDisclosure,
    IconButton,
    Tooltip,
    Stack,
    Button
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa'; // Mudado o ícone para visualização
import { useState, useEffect } from 'react';
import { Cliente } from '../../types/client'; // Importe a interface Cliente

interface EditClientModalProps {
    cliente: Cliente;
    // onSave removido, pois não haverá salvamento
    onCloseModal: () => void; // Adicionada prop para fechar o modal do pai
}

export function EditClientModal({ cliente, onCloseModal }: EditClientModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [form, setForm] = useState<Cliente>(cliente);

    useEffect(() => {
        setForm(cliente); // Sincroniza os detalhes para exibição
    }, [cliente]);

    // handleChange e handleSave removidos

    return (
        <>
            <Tooltip label="Visualizar Cliente" hasArrow>
                <IconButton
                    icon={<FaEye />} // Usando ícone de visualização
                    aria-label="Visualizar Cliente"
                    size="sm"
                    colorScheme="blue"
                    onClick={onOpen}
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="md">
                    <ModalHeader fontWeight="semibold" fontSize="lg">
                        Detalhes do Cliente
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl id="nome">
                                <FormLabel fontWeight="medium">Nome</FormLabel>
                                <Text>{form.nome}</Text> {/* Exibindo como texto */}
                            </FormControl>
                            <FormControl id="agencia">
                                <FormLabel fontWeight="medium">Agência</FormLabel>
                                <Text>{form.agencia}</Text> {/* Exibindo como texto */}
                            </FormControl>
                            <FormControl id="conta">
                                <FormLabel fontWeight="medium">Conta</FormLabel>
                                <Text>{form.conta}</Text> {/* Exibindo como texto */}
                            </FormControl>
                            <FormControl id="saldo">
                                <FormLabel fontWeight="medium">Saldo</FormLabel>
                                <Text>{form.saldo}</Text> {/* Exibindo como texto */}
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}