import { HStack, IconButton, VStack, Text, StackDivider, Badge, Alert, AlertIcon } from '@chakra-ui/react';
import { FaArrowAltCircleUp, FaTrashAlt, FaCheck, FaTimes, FaArrowAltCircleDown } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const switchFinish = async (todo) => {
  const data = await fetch(`http://localhost:5000/${todo.id}/finish?finish=${!todo.finished}`,{
    method: 'POST',
    mode: 'cors',
    // body: JSON.stringify({finished: !todo.finished})
  });
  return await data.json();
}

const switchTop = async (todo) => {
  const data = await fetch(`http://localhost:5000/${todo.id}/top?top=${!todo.top}`,{
    method: 'POST',
    mode: 'cors',
    // body: JSON.stringify({finished: !todo.top})
  });
  return await data.json();
}

const deleteTodo = async (todo) => {
  const data = await fetch(`http://localhost:5000/Todo/${todo.id}`, {
    method: 'DELETE',
    mode: 'cors'
  });
  return await data.json();
}

export default function TodoList() {
  const { data, isLoading, isError } = useQuery('todos', async() => {
    const data = await fetch("http://localhost:5000/Todo", {
      method: 'GET',
      mode: 'cors',
    });
    let result = [];
    if (data.status === 200) 
      result = await data.json();
    return result;
  }, {
    cacheTime: 0
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
  };

  const queryClient = useQueryClient();
  const todoMutation = useMutation(({type, todo}) => {
    switch(type) {
      case 'FINISH':
        return switchFinish(todo)
      case 'TOP':
        return switchTop(todo)
      case 'DELETE':
        return deleteTodo(todo)
      default:
        ;
    }
  }, {
    onSuccess: (data, variable) => {
      if (variable.type === 'DELETE') {
        queryClient.setQueryData('todos', todos.filter(t=>t.id !== data.id));
      } else if (variable.type === 'FINISH' || variable.type === 'TOP') {
        queryClient.setQueryData('todos', todos.map(t => t.id === data.id? data : t));
      }
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
          <IconButton icon={<FaTrashAlt />} onClick={()=>todoMutation.mutate({type: 'DELETE', todo: t})}/>
          <IconButton isDisabled={t.finished} icon={t.top ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />} onClick={()=>todoMutation.mutate({type: 'TOP', todo: t})}/>
          <IconButton icon={t.finished ? <FaTimes /> : <FaCheck />} onClick={()=>todoMutation.mutate({ type: 'FINISH', todo: t})}/>
        </HStack>
      ))}
    </VStack>
  );
}
