import { useState } from 'react';
import CategoryPreview from './CategoryPreview';

interface Props {
  posts: any;
  allCategories: any[];
  allPosts: any[];
}

const PostPreview: React.FC<Props> = ({ posts, allCategories, allPosts }) => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const handleItemClick = (index: any) => {
    setSelectedPostIndex(index);
  };
  
  const originalDate = posts[selectedPostIndex].frontmatter.publishDate;
  const [month, day] = originalDate.split(' ');
  const reformattedDate = `${month}/${day}`;

  return (
    <article className="post-preview">
      <header className="flex flex-row justify-between">
        <div>
          <p className="font-medium">номер {posts[selectedPostIndex].frontmatter.issueNumber} - {reformattedDate}</p>
          <h1 className="cat-title text-xl sm:text-4xl">{posts[selectedPostIndex].frontmatter.title}</h1>
        </div>
        <div>
          {posts.map((issuePost: any, index: any) => (
            <i
              key={index}
              className={`bi text-neutral-400 ml-3 text-base sm:text-xl ${selectedPostIndex === index ? 'bi-circle-fill' : 'bi-circle'}`}
              onClick={() => handleItemClick(index)}
            ></i>
          ))}
        </div>
      </header>

      <section className="flex flex-col sm:flex-row gap-5">
        <div className="sm:w-1/2">
          <img
            width="720"
            height="420"
            className="hero-image mx-auto"
            loading="lazy"
            src={posts[selectedPostIndex].frontmatter.coverImage}
            alt="Cover"
          />
        </div>
        <div className="sm:w-1/2">
          <p className="text-xs md:text-base font-light whitespace-pre-line">{posts[selectedPostIndex].frontmatter.description}</p>
        </div>
      </section>

      <section aria-label="Blog post list" className="mt-20">
        {allCategories
          .filter((p) => posts[selectedPostIndex].frontmatter.select_categories.includes(p.frontmatter.title))
          .map((p, index) => (
            <CategoryPreview key={index} post={p} allPosts={allPosts} />
          ))}
      </section>
    </article>
  );
};

export default PostPreview;
