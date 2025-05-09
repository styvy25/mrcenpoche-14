
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Home, Mail, Menu, Settings, User, X } from "lucide-react"
import { GooeyFilter } from "@/components/ui/gooey-filter"

const MENU_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Mail, label: "Contact" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
]

function GooeyDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center dark:bg-black bg-white">
      <GooeyFilter id="gooey-filter-menu" strength={5} />

      <div
        className="absolute top-4 left-4"
        style={{ filter: "url(#gooey-filter-menu)" }}
      >
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen &&
            MENU_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  className="absolute w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    y: (index + 1) * 44,
                    opacity: 1,
                  }}
                  exit={{
                    y: 0,
                    opacity: 0,
                    transition: {
                      delay:
                        (MENU_ITEMS.length - index) * 0.05,
                      duration: 0.4,
                      type: "spring",
                      bounce: 0,
                    },
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    type: "spring",
                    bounce: 0,
                  }}
                >
                  <AnimatePresence>
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                        type: "spring",
                        bounce: 0,
                      }}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground hover:text-black" />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )
            })}
        </AnimatePresence>

        {/* Main Menu Button */}
        <motion.button
          className="relative w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <p>Open the menu in the top left corner</p>
    </div>
  )
}

export { GooeyDemo }
