namespace TodoApi
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool Finished { get; set; }
        public bool Top { get; set; }
    }
}