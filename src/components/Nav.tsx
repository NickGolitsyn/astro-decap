import { motion } from "framer-motion"
import { useState } from "react"
import { SITE } from '../config';
// import { useMediaQuery } from "../util/useMediaQuery"

const navMotion = {
  visible: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
}
const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}
const itemMotionDesktop = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 1, x: 0 },
}
const navLinks = [
  { name: "автор_ки", href: "/authors", id: 1 },
  { name: "все номера", href: "/issues", id: 2 },
  { name: "книжная серия", href: "/book-series", id: 3 },
  { name: "контакты", href: "/contacts", id: 4 },
]

const NavLinks = ({
  isMobile,
  className,
}: {
  isMobile: boolean
  className: string
}) => (
  <div className={className}>
    {navLinks.map(({ name, href, id }) => (
      <motion.a
        key={id}
        variants={isMobile ? itemMotion : itemMotionDesktop}
        href={href}
        className={`${isMobile ? "text-2xl" : "text-base"}`}
      >
        {name}
      </motion.a>
    ))}
  </div>
)

export default function Nav() {
  const [toggled, setToggled] = useState(false)
  // const matches = useMediaQuery("(min-width: 1280px)")
  return (
    <header className="border-b-2 border-black max-w-[100vw] py-4 h-20">
    <nav className="flex justify-between w-full max-w-[65em] px-8 mx-auto">
      {/* Title */}

      <motion.a
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -25 }}
        transition={{ delay: 0.35 }} 
        href="/"
        className="z-50 flex items-center"
      >
        <h1 className="font-bold text-2xl sm:text-3xl uppercase">{SITE.title}</h1>
      </motion.a>

      {/* Nav Items animating in  */}
      {/* {toggled && !matches && ( */}
      {toggled && (
        <motion.div
          variants={navMotion}
          animate="visible"
          initial="hidden"
          className="fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-white md:hidden"
        >
          <NavLinks
            className="flex flex-col gap-14"
            isMobile={true}
          />
        </motion.div>
      )}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 25 }}
        transition={{ delay: 0.35 }}
        className="hidden md:flex md:items-center"
      >
        <NavLinks className="flex gap-5" isMobile={false} />
      </motion.div>

      {/* Hamburger Toggle */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 25 }}
        transition={{ delay: 0.35 }}
        className="z-50 md:hidden flex gap-5 items-center"
      >
        <div 
          onClick={() => setToggled((prevToggle) => !prevToggle)}
          className={`burger z-50 cursor-pointer space-y-1.5 md:hidden`}
        >
          <motion.span
            animate={{ 
              rotateZ: toggled ? 45 : 0, 
              y: toggled ? 8 : 0, 
              width: toggled ? 24 : 24, }}
            className="line-1 block h-0.5 w-6 bg-content bg-black"
          ></motion.span>
          <motion.span
            animate={{ width: toggled ? 0 : 24 }}
            className="line-2 block h-0.5 w-6 bg-content bg-black"
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toggled ? -45 : 0,
              y: toggled ? -8 : 0,
              width: toggled ? 24 : 24,
            }}
            className="line-3 block h-0.5 w-6 bg-content bg-black"
          ></motion.span>
        </div>
      </motion.div>
    </nav>
    </header>
  )
}