import {
    Box,
    VStack,
    Icon,
    Text,
    useBreakpointValue,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    Divider, // Importe o Divider para separar os itens (opcional)
    Flex, // Importe o Flex para um layout mais flexível
} from '@chakra-ui/react';
import {
    FaHome,
    FaMoneyBillWave,
    FaExchangeAlt,
    FaFileInvoice,
    FaCreditCard,
    FaHandHoldingUsd,
    FaEllipsisH,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    path: string;
    onClick?: () => void;
}

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const SidebarItem = ({ icon, label, path, onClick }: SidebarItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;

    const handleClick = () => {
        navigate(path);
        if (onClick) onClick();
    };

    return (
        <Flex // Use Flex para alinhar o ícone e o texto horizontalmente
            align="center"
            gap={4} // Adicione um pouco de espaço entre o ícone e o texto
            color={isActive ? '#008000' : 'gray.600'}
            fontWeight={isActive ? 'bold' : 'normal'}
            bg={isActive ? 'green.100' : 'transparent'} // Adiciona um fundo sutil para o item ativo
            borderRadius="md" // Opcional: adiciona um pouco de arredondamento
            p={2} // Adiciona um pouco de padding interno
            _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            onClick={handleClick}
            w="full" // Garante que o item ocupe a largura total
        >
            <Icon as={icon} boxSize={6} />
            <Text fontSize="md" textAlign="left">{label}</Text> {/* Alinhe o texto à esquerda */}
        </Flex>
    );
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <Box
        w={{ base: '60vw', md: '20vh' }} // Largura ajustada para 60vw no modo base (mobile) - REVERTIDO PARA O VALOR ANTERIOR
        bg="gray.50"
        py={6}
        px={4} // Aumenta o padding horizontal
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="flex-start" // Alinhe os itens à esquerda
    >
        <VStack spacing={4} align="stretch"> {/* Use align="stretch" para os itens ocuparem a largura */}
            <SidebarItem icon={FaHome} label="Home" path="/dashboard" onClick={onClose} />
            <SidebarItem icon={FaMoneyBillWave} label="Extrato" path="/extrato" onClick={onClose} />
            <SidebarItem icon={FaExchangeAlt} label="Transferências" path="/transferencias" onClick={onClose} />
            <SidebarItem icon={FaFileInvoice} label="Pagamentos" path="/pagamentos" onClick={onClose} />
            <SidebarItem icon={FaCreditCard} label="Cartões" path="/cartoes" onClick={onClose} />
            <SidebarItem icon={FaHandHoldingUsd} label="Empréstimos" path="/emprestimos" onClick={onClose} />
            <SidebarItem icon={FaEllipsisH} label="Outros" path="/manager" onClick={onClose} />
        </VStack>
    </Box>
);

const Sidebar = ({ isOpen = false, onClose = () => {} }: SidebarProps) => {
    const isDesktop = useBreakpointValue({ base: false, md: true });

    if (isDesktop) {
        return <SidebarContent onClose={onClose} />;
    }

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton mt={2} mr={2} /> {/* Melhora a posição do botão de fechar */}
                <DrawerBody p={0} bg="gray.50">
                    <SidebarContent onClose={onClose} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Sidebar;