export interface BlogPostMeta {
  id: string;
  slug: string;
  image: string;
  date: string;
  readTime: number;
}

export const blogPostsMeta: BlogPostMeta[] = [
  {
    id: "1",
    slug: "sta-obici-u-cacku-top-5-lokacija",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=1200",
    date: "2024-05-15",
    readTime: 4,
  },
  {
    id: "2",
    slug: "najbolji-restorani-u-cacku",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
    date: "2024-05-20",
    readTime: 5,
  },
  {
    id: "3",
    slug: "ovcarsko-kablarska-klisura-vodic",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200",
    date: "2024-06-01",
    readTime: 6,
  }
];
