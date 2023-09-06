import { useState } from "react";
import IssuePreview from "./IssuePreview";
import BlogHeader from "./BlogHeader.astro";

function IssueSelection({ issuePosts, categoryPosts, allPosts }) {
// function IssuePostList() {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedPostIndex(index);
  };

  return (
    <div>
      <div>
      <header className="flex">
        <p className="font-medium">номер {issuePosts[selectedPostIndex].frontmatter.issueNumber} - </p>
        <h1 className="cat-title text-xl sm:text-4xl">{issuePosts[selectedPostIndex].frontmatter.title}</h1>
      </header>
        {issuePosts.map((issuePost, index) => (
          <i
            key={index}
            className={`bi bi-circle-fill text-neutral-500 opacity-20 ml-3 ${selectedPostIndex === index ? '!opacity-100' : ''}`}
            onClick={() => handleItemClick(index)}
          ></i>
        ))}
      </div>
      <section aria-label="Blog post list">
        {/* <IssuePreview post={issuePosts[selectedPostIndex]} allCategories={categoryPosts} allPosts={allPosts} /> */}
        <IssuePreview posts={issuePosts} allCategories={categoryPosts} allPosts={allPosts} />
      </section>
    </div>
  );
}

export default IssueSelection;
