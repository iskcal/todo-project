import { HStack, IconButton, VStack, Text, StackDivider, Badge } from '@chakra-ui/react';
import { FaArrowAltCircleUp, FaTrashAlt, FaCheck, FaTimes, FaArrowAltCircleDown } from 'react-icons/fa';

export default function TodoList({ todos }) {
  const compare = (prev, next) => {
    if (prev.finished !== next.finished) {
      return prev.finished - next.finished;
    } else if (prev.top !== next.top) {
      return next.top - prev.top ;
    }
    else {
      return prev.createTime - next.createTime;
    }
  }

  if (!todos.length) {
    return (
      <Badge p='4' variant='solid' colorScheme='green' borderRadius="lg">
        No Todo Items
      </Badge>
    )
  }

  return (
    <VStack divider={<StackDivider />} w='60%' align='stretch' borderWidth='2px' p='4' borderRadius='lg'>
      {todos.sort(compare).map(t => (
        <HStack key={t.id} color={t.top && !t.finished ? 'red.500': 'gray.700'}>
          <VStack flex="1">
            <Text alignSelf="flex-start" fontSize="xl" isTruncated textDecoration={t.finished ? 'line-through': 'none'}>{t.content}</Text>
            <Text fontSize="xs" alignSelf="flex-end">{t.createTime.toLocaleString()}</Text>
          </VStack>
          <IconButton icon={<FaTrashAlt />}/>
          <IconButton isDisabled={t.finished} icon={t.top ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}/>
          <IconButton icon={t.finished ? <FaTimes /> : <FaCheck />}/>
        </HStack>
      ))}
    </VStack>
  )
}
