import { HStack, IconButton, VStack, Text, StackDivider, Spacer } from '@chakra-ui/react';
import { FaArrowAltCircleUp, FaTrashAlt, FaCheck, FaTimes, FaArrowAltCircleDown } from 'react-icons/fa';

export default function TodoList() {
  const todos = [
    {
      id: 1,
      content: 'write an essay',
      createTime: new Date(),
      finished: false,
      top: false
    },
    {
      id: 2,
      content: 'send an email',
      createTime: new Date(),
      finished: true,
      top: false
    },
    {
      id: 3,
      content: 'make a report',
      createTime: new Date(),
      finished: false,
      top: true
    }
  ]
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
