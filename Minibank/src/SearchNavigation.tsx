import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  List,
  ListItem,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sidebarRoutes } from '../routes/SidebarRoutes'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(sidebarRoutes)
  const navigate = useNavigate()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const current = e.target.value
    setQuery(current)

    const filteredResults =
