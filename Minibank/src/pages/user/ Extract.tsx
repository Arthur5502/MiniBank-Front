import { Box, Flex, Text, useDisclosure, Stack, Button, useBreakpointValue } from '@chakra-ui/react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import TransferHistory from '../../components/extract/TransferHistory'; // Componente de extrato de Transferências
import LoanHistory from '../../components/extract/LoanHistory'; // Componente de extrato de Empréstimos
import { useState } from 'react';

const Extract = () => {
    // Chakra menu disclosure
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

    // Estado para controlar a seção ativa
    const [activeSection, setActiveSection] = useState<"transferencias" | "emprestimos">("transferencias");

    // Função para alternar entre as seções
    const handleSectionChange = (section: "transferencias" | "emprestimos") => {
        setActiveSection(section);
    };

    return (
        <Box minH="100vh" bg="white">
            <Box position="fixed" top="0" left="0" right="0" zIndex="1000">
                <Header onOpenMenu={onOpen} />
            </Box>

            <Flex pt={isMobile ? "56px" : "64px"}> {/* Ajusta o pt para a altura do header mobile */}
                <Sidebar isOpen={isOpen} onClose={onClose} />

                <Box ml={{ base: 0, md: '15vh' }} flex="1" p={isMobile ? 4 : 6}> {/* Ajusta ml e padding */}
                    <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold" mb={6}>
                        Extrato
                    </Text>

                    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}> {/* Stack vertical no mobile */}
                        <Button
                            leftIcon={<i className="fas fa-exchange-alt" />} // ícone FontAwesome ou useIcon()
                            onClick={() => handleSectionChange("transferencias")}
                            bg={activeSection === "transferencias" ? "blue.800" : "gray.100"}
                            color={activeSection === "transferencias" ? "white" : "gray.700"}
                            _hover={{
                                bg: activeSection === "transferencias" ? "blue.600" : "gray.200",
                            }}
                            _active={{
                                transform: "scale(0.98)",
                                boxShadow: "md",
                            }}
                            rounded="xl"
                            px={6}
                            py={2}
                            shadow="sm"
                            transition="all 0.2s"
                            width={isMobile ? "full" : "auto"} // Botão ocupar largura total no mobile
                        >
                            Transferências
                        </Button>

                        <Button
                            leftIcon={<i className="fas fa-hand-holding-usd" />}
                            onClick={() => handleSectionChange("emprestimos")}
                            bg={activeSection === "emprestimos" ? "#008000" : "gray.100"}
                            color={activeSection === "emprestimos" ? "white" : "gray.700"}
                            _hover={{
                                bg: activeSection === "emprestimos" ? "#008000" : "gray.200",
                            }}
                            _active={{
                                transform: "scale(0.98)",
                                boxShadow: "md",
                            }}
                            rounded="xl"
                            px={6}
                            py={2}
                            shadow="sm"
                            transition="all 0.2s"
                            width={isMobile ? "full" : "auto"} // Botão ocupar largura total no mobile
                        >
                            Empréstimos
                        </Button>
                    </Stack>

                    {/* Renderiza o componente de acordo com a seção ativa */}
                    {activeSection === "transferencias" ? (
                        <TransferHistory />
                    ) : (
                        <LoanHistory />
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Extract;