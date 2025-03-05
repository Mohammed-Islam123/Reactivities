interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;

  /*  
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string  Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
*/
}

export type { Activity };
