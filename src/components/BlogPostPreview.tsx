interface Props {
  post: any;
}

function getRussianMonth(englishMonth: string) {
  const months: Record<string, string> = {
    Jan: "Янв",
    Feb: "Фев",
    Mar: "Мар",
    Apr: "Апр",
    May: "Май",
    Jun: "Июн",
    Jul: "Июл",
    Aug: "Авг",
    Sep: "Сен",
    Oct: "Окт",
    Nov: "Ноя",
    Dec: "Дек",
  };

  return months[englishMonth];
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const parts = post.frontmatter.publishDate.split(" ");
  const day = parts[0];
  const month = getRussianMonth(parts[1]);
  const year = parts[2];

  const russianDate = `${day} ${month} ${year}`;

  return (
    <article className="post-preview ">
			<style>{`
				.blog-image {
					width: 95%;
					object-fit: contain;
					object-position: center;
					margin-top: 2rem;
					margin-bottom: 1rem;
					max-width: 380px;
				}

				@media (max-width: 50em) {
					.blog-image {
						margin-top: 0;
					}
				}

				header {
					align-items: flex-start;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding-bottom: 2rem;
					text-align: left;
				}

				.title,
				.author,
				.publish-date {
					margin: 0;
				}

				.publish-date,
				.author {
					font-size: 1.25rem;
					color: var(--theme-text-lighter);
				}

				.title {
					font-weight: 700;
					color: var(--theme-text);
				}`}
			</style>
      {post.frontmatter.coverImage && (
        <img
          width="720"
          height="420"
          className="blog-image select-none h-fit"
          loading="lazy"
          src={post.frontmatter.coverImage}
          alt="cover"
					draggable="false"
        />
      )}
      <header className="w-[95%] select-none flex items-center">
        <a href={post.url}>
          <h1 className="title text-center text-lg">{post.frontmatter.title}</h1>
        </a>
				{post.frontmatter.select_author.map((e, index) => (
					<p key={index} className="text-center text-base">{e}</p>
				))}
      </header>
    </article>
  );
};

export default PostPreview;
