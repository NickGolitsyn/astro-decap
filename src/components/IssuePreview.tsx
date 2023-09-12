import { useEffect, useState } from 'react';
import CategoryPreview from './CategoryPreview';

interface Props {
  posts: any[];
  allCategories: any[];
  allPosts: any[];
}

const IssuePreview: React.FC<Props> = ({ posts, allCategories, allPosts }) => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const issueSwitcher = (index: any) => {
    setSelectedPostIndex(index);
  };

  const originalDate = posts[selectedPostIndex].frontmatter.publishDate;
  const [month, day] = originalDate.split(' ');
  const reformattedDate = `${month}/${day}`;

  const selectedCategories = posts[selectedPostIndex].frontmatter.select_categories;


  const categoryOrdering = {};
  selectedCategories.forEach((story, index) => {
    categoryOrdering[story] = index;
  });

  const sortedCategories = allCategories
    .filter((p) => selectedCategories.includes(p.frontmatter.title))
    .sort((a, b) => {
      const orderA = categoryOrdering[a.frontmatter.title];
      const orderB = categoryOrdering[b.frontmatter.title];
      return orderA - orderB;
  });

  return (
    <article>
      <header className="flex flex-row justify-between">
        <div>
          <p className="font-medium">номер {posts[selectedPostIndex].frontmatter.issueNumber} - {reformattedDate}</p>
          <h1 className="cat-title text-lg sm:text-4xl break-all">{posts[selectedPostIndex].frontmatter.title}</h1>
        </div>
        <div className='min-w-fit'>
          {posts.map((issuePost: any, index: any) => (
            <i
              key={index}
              className={`bi text-neutral-400 ml-3 text-base sm:text-xl cursor-pointer ${selectedPostIndex === index ? 'bi-circle-fill' : 'bi-circle'}`}
              onClick={() => issueSwitcher(index)}
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
        {/* {allCategories
          .filter((p) => posts[selectedPostIndex].frontmatter.select_categories.includes(p.frontmatter.title))
          .map((p, index) => (
            <CategoryPreview key={index} post={p} allPosts={allPosts} />
          ))} */}
        {sortedCategories.map((p, index) => (
          <CategoryPreview key={index} post={p} allPosts={allPosts} />
        ))}
      </section>
    </article>
  );
};

export default IssuePreview;
