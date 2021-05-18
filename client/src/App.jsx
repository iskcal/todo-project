import { VStack, Heading } from '@chakra-ui/react'

function App() {
  return (
    <VStack spacing={4} p={4}>
      <Heading as="h1" m={2} fontWeight="bold" fontSize="4xl">Todo List</Heading>
    </VStack>
  );
}

export default App;
