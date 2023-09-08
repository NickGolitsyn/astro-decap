import { useEffect } from "react";
import BlogPostPreview from "./BlogPostPreview";

interface Props {
  post: any;
  allPosts: any[];
}

const PostPage: React.FC<Props> = ({ post, allPosts }) => {
  useEffect(() => {
    const scrollBackButton = document.getElementById('scrollBack');
    const scrollForwardButton = document.getElementById('scrollForward');
    const postList = document.getElementById('postList');

    if (scrollBackButton && scrollForwardButton && postList) {
      scrollBackButton.addEventListener('click', () => {
        postList.scrollLeft -= 328; // Scroll back 50px
      });

      scrollForwardButton.addEventListener('click', () => {
        postList.scrollLeft += 328; // Scroll forward 50px
      });
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <section>
      <style>
        {`
          #postList {
            scroll-behavior: smooth; 
          }
          .cat-title {
            font-weight: 700;
            color: var(--theme-text);
          }
        `}
      </style>
      <article className="post-preview">
        <header className="flex flex-row justify-between items-end">
          <h1 className="cat-title text-xl sm:text-4xl">{post.frontmatter.title}</h1>
          <div className="flex">
            <div id="scrollBack" className="select-none">
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
            <div id="scrollForward" className="select-none">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </header>

        <section aria-label="Blog post list" className="flex items-baseline overflow-scroll gap-2" id="postList">
          {allPosts
            .filter((p) => post.frontmatter.select_stories.includes(p.frontmatter.title))
            .map((p, index) => (
              <BlogPostPreview key={index} post={p} />
            ))}
        </section>
      </article>
    </section>
  );
};

export default PostPage;
