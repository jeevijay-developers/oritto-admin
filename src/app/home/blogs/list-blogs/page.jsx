import ListBlogs from "@/components/blogs/ListBlogs";

export default async function BlogsPage() {
  const res = await fetch("http://localhost:5000/api/blogs/getAllBlogs/", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-8 text-red-500">Failed to load blogs</div>;
  }

  const blogs = await res.json();

  return <ListBlogs blogs={blogs} />;
}
