import { VStack, Heading } from '@chakra-ui/react';
import TodoList from './components/TodoList';

function App() {
  return (
    <VStack spacing={4} p={4}>
      <Heading as="h1" m={2} fontWeight="bold" fontSize="4xl">Todo List</Heading>
      <TodoList />
    </VStack>
  );
}

export default App;
