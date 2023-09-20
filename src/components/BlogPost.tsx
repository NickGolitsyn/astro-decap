import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  author: string;
  publishDate: string;
  heroImage: string;
  coverImage: string;
  alt: string;
	htmlfile: string;
}

function Article({ title, author, publishDate, heroImage, coverImage, htmlfile, alt }: Props) {
	const constraintsRef = useRef(null)
  

  const [iframeHeight, setIframeHeight] = useState<number | null>(null);

  useEffect(() => {
    // Define the resizeIframe function
    function resizeIframe() {
      const iframe = document.getElementById('frame') as HTMLIFrameElement;

      if (iframe) {
        const elementsInsideIframe = iframe.contentDocument?.querySelectorAll('body');

        if (elementsInsideIframe) {
          elementsInsideIframe.forEach((element) => {
            element.style.padding = '0';
            element.style.maxWidth = '100%';
          });

          const newHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          if (newHeight !== iframeHeight) {
            iframe.style.height = newHeight + 'px';
            setIframeHeight(newHeight);
          }
        }
      }
    }

    // Attach the resizeIframe function to the iframe's load event
    const iframe = document.getElementById('frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.addEventListener('load', resizeIframe);
    }

    // Attach the resizeIframe function to the window's resize event
    window.addEventListener('resize', resizeIframe);

    // Clean up the event listeners when the component unmounts
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', resizeIframe);
      }
      window.removeEventListener('resize', resizeIframe);
    };
  }, [iframeHeight]);

  return (
    <motion.div className="layout container select-none" ref={constraintsRef}>
			<style>
				{`
				.hero-image {
					width: 35vw;
					object-fit: cover;
					object-position: center;
					max-width: 1280px;
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
				}
			
				.title {
					font-size: 2.25rem;
					font-weight: 700;
					margin: 0;
				}
				`}
			</style>
      <article className="content">
        <div>
					<header>
						{coverImage && <img width="720" height="420" className="hero-image element my-5" loading="lazy" src={coverImage} alt={alt} />}
						<h1 className="title element">{title}</h1>
						<p>{author}</p>
					</header>
          <main className="element">
						<iframe src={htmlfile} className="w-full" scrolling="no" id="frame" />
						{/* <embed src={htmlfile} type="application/pdf" width="100%" height="500" /> */}
          </main>
        </div>
      </article>
    </motion.div>
  );
}

export default Article;
