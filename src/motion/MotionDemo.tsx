import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'

export const MotionDemo = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0)

  // 定义变体动画
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // 延迟子元素动画 0.3秒后开始
        staggerChildren: 0.2, // 子元素动画间隔 0.2秒
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className='p-5 max-w-3xl mx-auto space-y-8'>
      {/* 基础动画 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>基础动画</h2>
        <motion.div
          className='w-20 h-20 bg-blue-500 rounded'
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ['10%', '10%', '50%', '50%', '10%'],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </section>

      {/* 手势动画 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>手势动画</h2>
        <motion.button className='bg-purple-500 text-white px-4 py-2 rounded' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          点击我！
        </motion.button>
      </section>

      {/* 拖拽动画 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>拖拽动画</h2>
        <motion.div
          className='w-32 h-32 bg-green-500 rounded cursor-move'
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
          whileDrag={{ scale: 1.2 }}
        />
      </section>

      {/* 变体动画 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>变体动画</h2>
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-2'>
          {[1, 2, 3].map(index => (
            <motion.div key={index} variants={itemVariants} className='w-full h-12 bg-red-500 rounded' />
          ))}
        </motion.div>
      </section>

      {/* 动画退出 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>动画退出</h2>
        <button onClick={() => setIsVisible(!isVisible)} className='mb-4 bg-gray-500 text-white px-4 py-2 rounded'>
          切换显示
        </button>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className='w-32 h-32 bg-yellow-500 rounded'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              key='toggle'
            />
          )}
        </AnimatePresence>
      </section>

      {/* 标签切换动画 */}
      <section>
        <h2 className='text-xl font-bold mb-4'>标签切换动画</h2>
        <div className='flex space-x-4 mb-4'>
          {[0, 1, 2].map(tab => (
            <button key={tab} onClick={() => setSelectedTab(tab)} className={`px-4 py-2 rounded ${selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              标签 {tab + 1}
            </button>
          ))}
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full h-32 bg-blue-200 rounded flex items-center justify-center'
          >
            内容 {selectedTab + 1}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}
