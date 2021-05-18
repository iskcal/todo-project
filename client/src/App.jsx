import { VStack, Heading, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import TodoList from './components/TodoList';

function App() {
  // const todos = [
  //   {
  //     id: 1,
  //     content: 'write an essay',
  //     createTime: new Date(),
  //     finished: false,
  //     top: false
  //   },
  //   {
  //     id: 2,
  //     content: 'send an email',
  //     createTime: new Date(),
  //     finished: true,
  //     top: false
  //   },
  //   {
  //     id: 3,
  //     content: 'make a report',
  //     createTime: new Date(),
  //     finished: false,
  //     top: true
  //   }
  // ]
  const { todos, isLoading, isError } = useQuery('todos', async() => {
    let res = await fetch("http://localhost:5000/Todo");
    let result = await res.json();
    console.log(result);
    return result;
  });

  if (isLoading) {
    return <Text>Loading</Text>
  }

  return (
    <VStack spacing={4} p={4}>
      <Heading as="h1" m={2} fontWeight="bold" fontSize="4xl">Todo List</Heading>
      <TodoList todos={todos}/>
    </VStack>
  );
}

export default App;
