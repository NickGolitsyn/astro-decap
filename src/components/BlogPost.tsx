import { motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  title: string;
  author: string;
  authorURL: string;
  publishDate: string;
  heroImage: string;
  coverImage: string;
  alt: string;
}

function Article({ title, author, authorURL, publishDate, heroImage, coverImage, alt }: Props) {
	const constraintsRef = useRef(null)
  function getRussianMonth(englishMonth: string) {
    const months = {
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
      Dec: "Дек"
    };

    return months[englishMonth];
  }

  const parts = publishDate.split(" ");
  const day = parts[0];
  const month = getRussianMonth(parts[1]);
  const year = parts[2];

  const russianDate = `${day} ${month} ${year}`;

  return (
    <motion.div className="layout container select-none" ref={constraintsRef}>
			<style>{`
	.hero-image {
		width: 70vw;
		aspect-ratio: 2/1;
		object-fit: cover;
		object-position: center;
		margin-top: 2rem;
		margin-bottom: 4rem;
		max-width: 1280px;
	}

	@media (max-width: 50em) {
		.hero-image {
			height: 260px;
			margin-top: 0;
			margin-bottom: 2rem;
		}
	}

	.content {
		margin-bottom: 8rem;
	}

	.content :global(main > * + *) {
		margin-top: 1rem;
	}

	.content :global(h2) {
		margin-top: 4rem;
	}

	header {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;

		padding-bottom: 2rem;
		margin-bottom: 2rem;
		border-bottom: 4px solid var(--theme-divider);
	}

	.title,
	.author,
	.publish-date {
		margin: 0;
	}

	.publish-date,
	.author {
		color: var(--theme-text-lighter);
	}

	.title {
		font-size: 2.25rem;
		font-weight: 700;
	}`}
</style>
      <article className="content">
        <div>
          <header>
            {coverImage && <motion.img drag dragConstraints={constraintsRef} width="720" height="420" className="hero-image element" loading="lazy" src={coverImage} alt={alt} />}
            <motion.p drag dragConstraints={constraintsRef} className="publish-date element">{russianDate}</motion.p>
            <motion.h1 drag dragConstraints={constraintsRef} className="title element">{title}</motion.h1>
          </header>
          <main className="element">
            <slot />
          </main>
        </div>
      </article>
    </motion.div>
  );
}

export default Article;
