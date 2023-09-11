import BlogPostPreview from "./BlogPostPreview";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useRef } from "react";

interface Props {
  post: any;
  allPosts: any[];
}

const CategoryPreview: React.FC<Props> = ({ post, allPosts }) => {
  const carouselRef = useRef(null);
  const selectedStories = post.frontmatter.select_stories;

  const storyOrdering = {};
  selectedStories.forEach((story, index) => {
    storyOrdering[story] = index;
  });

  const sortedPosts = allPosts
  .filter((p) => selectedStories.includes(p.frontmatter.title))
  .sort((a, b) => {
    const orderA = storyOrdering[a.frontmatter.title];
    const orderB = storyOrdering[b.frontmatter.title];
    return orderA - orderB;
  });

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
          .custom-dot-list {
            position: absolute;
            bottom: 10px; /* Adjust the vertical position as needed */
            left: 50%; /* Center horizontally */
            transform: translateX(-50%);
            list-style: none;
            padding: 0;
            display: flex;
          }
          
          .custom-dot-list li {
            margin: 0 5px; /* Adjust the spacing between dots as needed */
          }
          
          .custom-dot-list li button {
            border: 1.5px solid #a3a3a3;
            border-radius: 50%;
            background-color: transparent; /* Dot color */
            cursor: pointer;
            width: 16px;
            height: 16px;
          }
          
          .react-multi-carousel-dot--active button {
            background-color: #a3a3a3 !important; /* Active dot color */
          }
          @media (min-width: 640px) {
            .custom-dot-list li button {
              width: 20px;
              height: 20px;
            }
          }

        `}
      </style>
      <article className="post-preview">
        <header className="flex flex-row justify-between items-end">
          <h1 className="cat-title text-xl sm:text-4xl">{post.frontmatter.title}</h1>
        </header>
        <section className="mb-10">
          <div
            style={{
              paddingBottom: '30px',
              position: 'relative'
            }}
          >
            <Carousel
              key={post.frontmatter.title}
              ref={carouselRef}
              additionalTransfrom={0}
              arrows={false}
              autoPlaySpeed={3000}
              centerMode={false}
              // dotListClass="custom-dot-list"
              draggable
              focusOnSelect={false}
              infinite={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024
                  },
                  items: 3,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464
                  },
                  items: 2,
                  partialVisibilityGutter: 30
                }
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots
              // sliderClass="flex gap-5"
              slidesToSlide={1}
              swipeable
            >
              {/* {allPosts
                .filter((p) => post.frontmatter.select_stories.includes(p.frontmatter.title))
                .map((p, index) => (
                  <BlogPostPreview key={index} post={p} />
              ))} */}
              {sortedPosts.map((p, index) => (
                <BlogPostPreview key={index} post={p} />
              ))}
            </Carousel>
          </div>
        </section>
      </article>
    </section>
  );
};

export default CategoryPreview;
