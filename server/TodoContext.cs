using Microsoft.EntityFrameworkCore;

namespace TodoApi {
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        { }

        public DbSet<TodoItem> Todos { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>().ToTable("todos");
            modelBuilder.Entity<TodoItem>().HasKey(_=>_.Id);
            modelBuilder.Entity<TodoItem>().Property(_=>_.Id)
                .ValueGeneratedOnAdd();
        }
    }
}