import { useQuery } from 'react-query';

export interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
  // 나중에 댓글 UI에서 첨부 정보를 사용할 예정이므로 인터페이스에 포함합니다.
  imageFile?: File;
  gifUrl?: string;
  linkUrl?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  postedBy: string;
  time: string;
  upvotes: number;
  downvotes: number;
  views: number;
  mediaUrl?: string;
  comments: Comment[];
}

async function fetchPost(postId: string): Promise<Post> {
  console.log(`Fetching post with ID: ${postId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "Dummy Post Title",
        content: "This is dummy content for testing API integration.",
        postedBy: "Alice",
        time: "3 hours ago",
        upvotes: 300,
        downvotes: 50,
        views: 1200,
        mediaUrl: "https://via.placeholder.com/600x300",
        comments: [
          { id: 1, author: "Bob", content: "Great post! Really enjoyed it.", time: "2 hours ago" },
          { id: 2, author: "Charlie", content: "I totally agree with your points.", time: "1 hour ago" },
        ],
      });
    }, 1000);
  });
}

export function usePost(postId: string) {
  return useQuery(['post', postId], () => fetchPost(postId));
}
