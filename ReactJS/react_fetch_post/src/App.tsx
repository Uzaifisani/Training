import { useState } from 'react';
import './App.css'
import axios from 'axios'; 
import PostForm from './components/PostForm';
import SendPost from './components/SendPost';

type Post = {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

function App() {
  const [post, setPost] = useState<Post | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPost = async (postId: number | null) => {
    setLoading(true);
    if (!postId) {
      setError("Enter Post ID");
      setLoading(false);
      setPost(null);
      return;
    } else {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
          setLoading(false);
          setError(null);
          setPost(JSON.parse(JSON.stringify(response.data)));
      } catch (e) {
        setLoading(false);
        setPost(null);
        setError("Post Not Found " );
      }
    }
  }

  
  return (
    <>
      <div className='max-w-1/2 mx-auto flex-wrap mt-10 p-5 border rounded-lg shadow-lg bg-amber-100'>
        <h1 className='text-xl text-center mb-3 font-bold'>Get Post</h1>
        <input className='w-10/12 border-2 rounded-md p-1' type="number" placeholder='Enter Post id...' onChange={(e)=>setPostId(Number(e.target.value))}/>
        <button className='bg-amber-500 text-white rounded-md p-1 ml-4 mt-1'onClick={()=>getPost(postId)}>Get Post</button>
      </div>
      {loading && <div className='text-center font-bold text-2xl p-2 m-2'>Loading...</div>}
      {error && <div className='text-center text-red-600 font-bold  text-2xl p-2 m-2'>{error}</div>}
      {post && <PostForm post={post} />}
      <SendPost/>
    </>
  )
}

export default App
