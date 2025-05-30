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
} from '@chakra-ui/react'
import { FaHome, FaHandHoldingUsd } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarItemProps {
    icon: IconType
    label: string
    path: string
    onClick?: () => void
}

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

const SidebarItem = ({ icon, label, path, onClick }: SidebarItemProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = location.pathname === path

    const handleClick = () => {
        navigate(path)
        if (onClick) onClick()
    }

    return (
        <VStack
            spacing={1}
            color={isActive ? '#008000' : 'gray.600'}
            fontWeight={isActive ? 'bold' : 'normal'}
            _hover={{ color: 'black', cursor: 'pointer' }}
            onClick={handleClick}
        >
            <Icon as={icon} boxSize={6} />
            <Text fontSize="sm" textAlign="center">{label}</Text>
        </VStack>
    )
}

const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <Box
        w="15vh"
        bg="gray.50"
        py={6}
        px={2}
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <VStack spacing={8}>
            <SidebarItem icon={FaHome} label="Home" path="/manager" onClick={onClose} />
            <SidebarItem icon={FaHandHoldingUsd} label="Pedidos" path="/pedidos-emprestimos" onClick={onClose} />
        </VStack>
    </Box>
)

const ManagerSidebar = ({ isOpen = false, onClose = () => { } }: SidebarProps) => {
    const isDesktop = useBreakpointValue({ base: false, md: true })

    if (isDesktop) {
        return <SidebarContent onClose={onClose} />
    }

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody p={0}>
                    <SidebarContent onClose={onClose} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default ManagerSidebar