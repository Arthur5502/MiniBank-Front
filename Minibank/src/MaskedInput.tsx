// src/components/MaskedInput.tsx
import { forwardRef } from 'react'
import InputMask from 'react-input-mask'
import { Input, InputProps } from '@chakra-ui/react'

interface MaskedInputProps extends InputProps {
    mask: string
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
({ mask, ...rest }, ref) => (
    <InputMask mask={mask}>
        {(inputProps) => (
        <Input
            {...(inputProps as any)} // força os tipos corretos
            {...rest}
            ref={ref}
        />
        )}
    </InputMask>
    )
)

MaskedInput.displayName = 'MaskedInput'
