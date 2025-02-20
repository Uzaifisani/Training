type Post = {
  userId: number;
  id?: number;
  title: string;
  body: string;
}
type PostFormProps = {
  post: Post | null;
}

const PostForm= ({ post }:PostFormProps) => {
  return (
    <div className='max-w-1/3 mx-auto mt-3 p-2 border rounded-2xl shadow-md bg-amber-200'>
      <p className='font-medium text-lg'>Id :{ post?.id}</p>
      <p className='font-medium text-lg'>Title :{ post?.title}</p>
      <p className='font-medium text-lg'>Body :{ post?.body}</p>
    </div>
  );
}

export default PostForm;