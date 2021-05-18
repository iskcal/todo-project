import { HStack, IconButton, VStack, Text, StackDivider, Badge } from '@chakra-ui/react';
import { FaArrowAltCircleUp, FaTrashAlt, FaCheck, FaTimes, FaArrowAltCircleDown } from 'react-icons/fa';
import { useQuery } from 'react-query';

export default function TodoList() {
  const { data, isLoading, isError } = useQuery('todos', async() => {
    const data = await fetch("https://localhost:5001/Todo", {
      method: 'GET',
      mode: 'cors',
    });
    const result = await data.json();
    return result;
  });

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

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const todos = data.map(t=>{
    return {
      id: t.id,
      content: t.content,
      createTime: new Date(t.createTime),
      finished: t.finished,
      top: t.top,
    }
  });

  if (!todos) {
    return <Text>Nothing</Text>
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
          <VStack flex="1" isTruncated>
            <Text alignSelf="flex-start" fontSize="xl" isTruncated textDecoration={t.finished ? 'line-through': 'none'} w='100%'>{t.content}</Text>
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
