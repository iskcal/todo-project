using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetTodoById(int id)
        {
            var todo = _context.Todos.FirstOrDefault(_=>_.Id==id);
            if (todo != default(TodoItem))
            {
                return Ok(todo);
            }
            return NotFound();
        }

        [HttpGet("")]
        public IActionResult GetTodos()
        {
            var todos = _context.Todos.ToList();
            if (todos.Any())
            {
                return Ok(todos);
            }
            return NotFound();
        }

        [HttpPost("")]
        public IActionResult AddTodo(string content, bool top)
        {
            var todo = new TodoItem()
            {
                Content = content,
                CreateTime = DateTime.Now,
                Finished = false,
                Top = top,
            };
            _context.Todos.Add(todo);
            _context.SaveChanges();
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _context.Todos.FirstOrDefault(_=>_.Id == id);
            if (todo != default(TodoItem))
            {
                _context.Todos.Remove(todo);
                _context.SaveChanges();
                return Ok(todo);
            }
            return NotFound();
        }

        [HttpPatch("{id}")]
        public IActionResult ModifyContentOfTodo(int id, string content)
        {
            var todo = _context.Todos.FirstOrDefault(_=>_.Id == id);
            if (todo != default(TodoItem))
            {
                todo.Content = content;
                _context.SaveChanges();
                return Ok(todo);
            }
            return NotFound();
        }

        [HttpPost("/{id}/finish")]
        public IActionResult MarkFinishOfTodo(int id, bool finish)
        {
            var todo = _context.Todos.FirstOrDefault(_=>_.Id == id);
            if (todo != default(TodoItem))
            {
                todo.Finished = finish;
                _context.SaveChanges();
                return Ok(todo);
            }
            return NotFound();
        }

        [HttpPost("/{id}/top")]
        public IActionResult MarkTopOfTodo(int id, bool top)
        {
            var todo = _context.Todos.FirstOrDefault(_=>_.Id == id);
            if (todo != default(TodoItem))
            {
                todo.Top = top;
                _context.SaveChanges();
                return Ok(todo);
            }
            return NotFound();
        }
    }
}