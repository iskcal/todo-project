import { HStack, IconButton, VStack, Text, StackDivider, Badge, Alert, AlertIcon } from '@chakra-ui/react';
import { FaArrowAltCircleUp, FaTrashAlt, FaCheck, FaTimes, FaArrowAltCircleDown } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const switchFinish = async (todo) => {
  const res = await fetch(`https://localhost:5001/${todo.id}/finish?finish=${!todo.finished}`,{
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({finished: !todo.finished})
  })
  return res.json()
}

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

  const queryClient = useQueryClient();
  const finishMutation = useMutation(todo=>switchFinish(todo), {
    onSuccess: (data) => {
      queryClient.refetchQueries("todos")
    }
  });


  if (isLoading) {
    return (
      <></>
    );
  }

  if (isError) {
    return (
      <Alert status="error" w='70%'>
        <AlertIcon />
        Cannot loading data from the server.
      </Alert>
    );
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
    <VStack divider={<StackDivider />} w='70%' minW='400px' align='stretch' borderWidth='2px' p='4' borderRadius='lg'>
      {todos.sort(compare).map(t => (
        <HStack key={t.id} color={t.top && !t.finished ? 'red.500': 'gray.700'}>
          <VStack flex="1" isTruncated>
            <Text alignSelf="flex-start" fontSize="xl" isTruncated textDecoration={t.finished ? 'line-through': 'none'} w='100%'>{t.content}</Text>
            <Text fontSize="xs" alignSelf="flex-end">{t.createTime.toLocaleString()}</Text>
          </VStack>
          <IconButton icon={<FaTrashAlt />}/>
          <IconButton isDisabled={t.finished} icon={t.top ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}/>
          <IconButton icon={t.finished ? <FaTimes /> : <FaCheck />} onClick={()=>finishMutation.mutate(t)}/>
        </HStack>
      ))}
    </VStack>
  );
}
