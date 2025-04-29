import { motion } from "motion/react"
import { useState } from "react"
import { ArrowRight, Credits, File, Image, Link, Plus, Video } from "./components"
import clsx from "clsx"

function App() {
  const [boxsIsVisible, setBoxsIsVisible] = useState(false)

  const items = [
    { icon: <File />, cls: 'bg-yellow-400' },
    { icon: <Image />, cls: 'bg-green-400' },
    { icon: <Video />, cls: 'bg-pink-400' },
    { icon: <Link />, cls: 'bg-blue-400' },
  ]

  return (
    <section className="bg-gray-100 w-full h-dvh flex justify-center items-center px-3">
      <Credits />
      <div 
        className="bg-white w-full md:w-96 h-16 rounded-full relative overflow-hidden"
        style={{ boxShadow: '0px 0px 2px rgba(0, 0, 0, .2)' }}
      >
        {items.map((item, index, array) => {
          const x = boxsIsVisible ? (((index + 1) * 62) + (index + 1) * 4) : 0
          const delay = (array.length - index) * 0.15

          return (
            <motion.div
              key={index} 
              initial={{ x, filter: 'blur(0px)' }}
              animate={{ 
                x,
                filter: boxsIsVisible ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : ['blur(2px)', 'blur(0px)'],
                transition: {
                  x: { 
                    type: 'spring', 
                    bounce: .1, 
                    duration: .4, 
                    delay: boxsIsVisible ? delay : 0 
                  },
                  filter: { 
                    type: 'tween', 
                    duration: .6,
                    delay: boxsIsVisible ? delay : 0 

                  }
                } 
              }}
              transition={{ type: 'spring', bounce: .1, duration: .5 }}
              className={clsx(
                "absolute left-1 top-1 bottom-1 z-40 h-[56px] aspect-square rounded-full",
                "flex items-center justify-center",
                item.cls
              )}
            >
              {item.icon}
            </motion.div>
          )
        })}

        <div className="absolute z-50 top-0 bottom-0 left-0 pl-0.5 py-0.5">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: boxsIsVisible ? 45 : 0 }}
            transition={{ type: 'spring', bounce: .1, duration: .5 }}
            onClick={() => setBoxsIsVisible(!boxsIsVisible)} 
            className="h-full aspect-square bg-gray-200 rounded-full flex justify-center items-center"
          >
            <Plus />
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 0, filter: 'blur(0px)' }}
          animate={{
             x: boxsIsVisible ? '100%' : 0,
             filter: boxsIsVisible ? 'blur(2px)' : 'blur(0px)'
          }}
          transition={{ type: 'spring', bounce: .2, duration: .6 }}
          className="w-full h-full flex justify-between p-0.5"
        >
          <input 
            type="text"
            className="w-full h-full outline-none text-lg flex-grow bg-transparent pl-16 pr-1 placeholder:text-gray-600"
            placeholder="What's on your mind ?" 
           />
          <div className="bg-blue-400 h-full aspect-square rounded-full flex justify-center items-center">
            <ArrowRight />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default App
