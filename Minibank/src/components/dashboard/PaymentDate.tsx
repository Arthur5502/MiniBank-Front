import {
    Box,
    Text,
    RadioGroup,
    Stack,
    Radio,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { useFontSize } from '../../context/FontSizeContext'; // ajuste o caminho conforme necessário

interface PaymentDateProps {
    selectedDate: string;
    onChangeDate: (value: string) => void;
}

const PaymentDate = ({ selectedDate, onChangeDate }: PaymentDateProps) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('blue.100', 'blue.300');
    const textColor = useColorModeValue('gray.800', 'white');

    const { fontSize } = useFontSize(); // use o hook

    return (
        <Box
            flex="1"
            bg={bgColor}
            p={5}
            rounded="2xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="sm"
        >
            <Text fontWeight="semibold" fontSize={fontSize} color={textColor} mb={3}>
                Data de pagamento
            </Text>

            <Divider mb={4} />

            <RadioGroup value={selectedDate} onChange={onChangeDate}>
                <Stack spacing={3}>
                    <Radio value="hoje" fontWeight="medium" colorScheme="blue" fontSize={fontSize}>
                        Pagar hoje
                    </Radio>
                    <Radio value="agendar" fontWeight="medium" colorScheme="blue" fontSize={fontSize}>
                        Agendar para outra data
                    </Radio>
                </Stack>
            </RadioGroup>
        </Box>
    );
};

export default PaymentDate;