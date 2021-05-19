import { Box, Checkbox, HStack, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'



export default function AddTodo() {
  const [content, setContent] = useState("");
  const [top, setTop] = useState(false);
  
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation(()=>{
    fetch(`http://localhost:5000/Todo?content=${encodeURIComponent(content)}&top=${top}`, {
      method: 'POST',
      mode: 'cors',
    });
  }, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.refetchQueries("todos");
      }, 200);
      setContent('');
    }
  });

  const onSubmit = (e) =>  {
    e.preventDefault();
    addTodoMutation.mutate();
  }

  return (
    <Box w='70%' minW='400px' borderWidth='2px' p='4' borderRadius='lg'>
      <form onSubmit={onSubmit}>
        <HStack>
          <Input variant="filled" placeholder="Add todo" value={content} onChange={e=>setContent(e.target.value)}/>
          <Checkbox colorScheme="red" size="lg" isChecked={top} onChange={e=>setTop(e.target.checked)}>Top</Checkbox>
          <Button colorScheme="blue" px="8" type="submit">Submit</Button>
        </HStack>
      </form>
    </Box>
  )
}
