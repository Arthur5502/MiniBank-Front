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
import {
  FaHome,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaFileInvoice,
  FaCreditCard,
  FaHandHoldingUsd,
  FaEllipsisH,
} from 'react-icons/fa'
import { IconType } from 'react-icons'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavItemProps {
  icon: IconType
  title: string
  route: string
  onSelect?: () => void
}

interface NavigationProps {
  isOpen?: boolean
  onClose?: () => void
}

const NavItem = ({ icon, title, route, onSelect }: NavItemProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const active = pathname === route

  const handleNavigation = () => {
    navigate(route)
    if (onSelect) onSelect()
  }

  return (
    <VStack
      spacing={1}
      onClick={handleNavigation}
      fontWeight={active ? 'bold' : 'normal'}
      color={active ? '#008000' : 'gray.600'}
      _hover={{ color: 'black', cursor: 'pointer' }}
    >
      <Icon as={icon} boxSize={6} />
      <Text fontSize="sm" textAlign="center">
        {title}
      </Text>
    </VStack>
  )
}

const NavigationContent = ({ onClose }: { onClose?: () => void }) => {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      w="15vh"
      py={6}
      px={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack spacing={8}>
        <NavItem icon={FaHome} title="Home" route="/dashboard" onSelect={onClose} />
        <NavItem icon={FaMoneyBillWave} title="Extrato" route="/extrato" onSelect={onClose} />
        <NavItem icon={FaExchangeAlt} title="Transferências" route="/transferencias" onSelect={onClose} />
        <NavItem icon={FaFileInvoice} title="Pagamentos" route="/pagamentos" onSelect={onClose} />
        <NavItem icon={FaCreditCard} title="Cartões" route="/cartoes" onSelect={onClose} />
        <NavItem icon={FaHandHoldingUsd} title="Empréstimos" route="/emprestimos" onSelect={onClose} />
        <NavItem icon={FaEllipsisH} title="Outros" route="/manager" onSelect={onClose} />
      </VStack>
    </Box>
  )
}

const Sidebar = ({ isOpen = false, onClose = () => {} }: NavigationProps) => {
  const isWide = useBreakpointValue({ base: false, md: true })

  return isWide ? (
    <NavigationContent onClose={onClose} />
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody p={0}>
          <NavigationContent onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
