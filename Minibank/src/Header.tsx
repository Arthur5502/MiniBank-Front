import {
    Box,
    Flex,
    Text,
    Icon,
    Avatar,
    HStack,
    useBreakpointValue,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { FaBell, FaQuestionCircle } from 'react-icons/fa'
import { MdTextDecrease, MdTextIncrease } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import SearchNavigation from './SearchNavigation'
import { useFontSize } from '../context/FontSizeContext'

interface HeaderProps {
    onOpenMenu: () => void
}

const Header = ({ onOpenMenu }: HeaderProps) => {
    const isSmallScreen = useBreakpointValue({ base: true, md: false })
    const router = useNavigate()
    const { increaseFontSize, decreaseFontSize } = useFontSize()

    return (
        <Flex
            as="header"
            bgColor="gray.900"
            color="white"
            px={6}
            py={3}
            alignItems="center"
            justifyContent="space-between"
            boxShadow="sm"
            position="relative"
            zIndex={1000}
        >
            {/* Menu hambúrguer no mobile */}
            {isSmallScreen && (
                <Box position="absolute" left="1rem">
                    <Icon
                        as={FiMenu}
                        fontSize="xl"
                        onClick={onOpenMenu}
                        cursor="pointer"
                    />
                </Box>
            )}

            {/* Marca / Logo */}
            <Box
                flex={isSmallScreen ? 1 : 0}
                textAlign={isSmallScreen ? 'center' : 'left'}
                cursor="pointer"
                onClick={() => router('/login')}
            >
                <Text fontSize="2xl" fontWeight="bold">
                    <Text as="span" color="white">Mini</Text>
                    <Text as="span" color="green.500">Bank</Text>
                </Text>
            </Box>

            {/* Barra de busca (centralizada no desktop) */}
            {!isSmallScreen && (
                <Flex flex={1} justifyContent="center" px={4}>
                    <SearchNavigation />
                </Flex>
            )}

            {/* Ações e ícones (desktop) */}
            {!isSmallScreen && (
                <HStack spacing={4} ml={4}>
                    <Icon
                        as={MdTextIncrease}
                        fontSize="lg"
                        onClick={increaseFontSize}
                        cursor="pointer"
                        title="Aumentar tamanho da fonte"
                    />
                    <Icon
                        as={MdTextDecrease}
                        fontSize="lg"
                        onClick={decreaseFontSize}
                        cursor="pointer"
                        title="Reduzir tamanho da fonte"
                    />
                    <Icon as={FaQuestionCircle} fontSize="lg" cursor="pointer" />
                    <Icon as={FaBell} fontSize="lg" cursor="pointer" />
                    <Avatar size="sm" name="Usuário" />
                </HStack>
            )}

            {/* Ícone de notificações no mobile */}
            {isSmallScreen && (
                <Box position="absolute" right="1rem">
                    <Icon as={FaBell} fontSize="lg" cursor="pointer" />
                </Box>
            )}
        </Flex>
    )
}

export default Header
