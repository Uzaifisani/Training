import { useState } from "react";
import axios from 'axios'; 

type Post = {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

const SendPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [postStatus, setPostStatus] = useState<string | null>(null); 

  const sendPost = async (post: Post) => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: post
      });
      if (res.status === 201) {
        setPostStatus('Post Sent Successfully \n Response Code: ' + res.status);
        setPost(null); 
      } else {
        alert('Post Sent Failed: Status Code = ' + res.status);
      }
    } catch (e) {
      console.log(e);
      alert('Post Sent Failed ,Error: ' + e);
    }
  }

  return (
    <div className='max-w-1/3 mx-auto mt-8 p-4 border-2 rounded-lg shadow-lg bg-amber-100 '>
      <h1 className='text-xl text-center mb-3 font-bold'>Send Post</h1>
      <input
        className='w-9/12 border-2 rounded-md p-1 m-2'
        type="number"
        placeholder='Enter User id...'
        value={post?.userId || ''}
        onChange={(e) => setPost({ ...post, userId: Number(e.target.value) } as Post)}
      />
      <input
        className='w-9/12 border-2 rounded-md p-1 m-2'
        type="text"
        placeholder='Enter Post Title...'
        value={post?.title || ''}
        onChange={(e) => setPost({ ...post, title: e.target.value } as Post)}
      />
      <input
        className='w-9/12 border-2 rounded-md p-1 m-2'
        type="text"
        placeholder='Enter Post Body...'
        value={post?.body || ''}
        onChange={(e) => setPost({ ...post, body: e.target.value } as Post)}
      />
      <button
        className='bg-amber-500 text-white rounded-md p-1 ml-4 mt-1'
        onClick={() => post && sendPost(post)}
      >
        Send Post
      </button>
      {postStatus && <div className='text-center text-green-600 font-bold  text-2xl p-2 m-2'>{postStatus}</div>}    
    </div>
  )
}

export default SendPost;