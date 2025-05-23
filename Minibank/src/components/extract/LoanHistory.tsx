import { Box, Heading, Text, Stack, Flex, useBreakpointValue } from "@chakra-ui/react";

const LoanHistory = () => {
    const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

    // Exemplo de dados de empréstimos
    const loans = [
        { amount: 5000, installments: 12, dueDate: "01/06/2025" },
        { amount: 10000, installments: 24, dueDate: "01/12/2025" },
        { amount: 2000, installments: 6, dueDate: "01/08/2025" }
    ];

    return (
        <Box px={{ base: 4, md: 8 }} py={6} bg="gray.50" borderRadius="lg" shadow="md">
            <Heading size="lg" color="teal.600" mb={6}>
                Histórico de Empréstimos
            </Heading>
            <Stack spacing={4}>
                {loans.map((loan, index) => (
                    <Flex
                        key={index}
                        direction={isMobile ? "column" : "row"}
                        p={5}
                        bg="white"
                        borderRadius="lg"
                        boxShadow="lg"
                        borderWidth={1}
                        borderColor="gray.200"
                        _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "all 0.3s ease" }}
                        alignItems={isMobile ? "flex-start" : "center"}
                    >
                        <Box flex="1" mb={isMobile ? 2 : 0} mr={isMobile ? 0 : 4}>
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                Valor: R$ {loan.amount.toFixed(2)}
                            </Text>
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                Parcelas: {loan.installments}
                            </Text>
                        </Box>

                        <Box flex="1" textAlign={isMobile ? "left" : "center"} py={isMobile ? 2 : 0}>
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                {loan.installments} parcelas
                            </Text>
                        </Box>

                        <Box flex="1" textAlign={isMobile ? "left" : "right"} py={isMobile ? 2 : 0}>
                            <Text fontSize="lg" color="gray.500">
                                Vencimento: {loan.dueDate}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </Stack>
        </Box>
    );
};

export default LoanHistory;