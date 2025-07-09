import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface LearningOptionCardProps {
  title: string
  description: string
  icon: IconType
  onClick: () => void
}

const LearningOptionCard = ({ title, description, icon: Icon, onClick }: LearningOptionCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300"
      onClick={onClick}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Inner content container with white background */}
      <div className="relative rounded-xl bg-white p-5">
        {/* Floating background shapes */}
        <div className="absolute -right-6 -top-6 h-24 w-24 animate-float rounded-full bg-pink-100/30 blur-2xl transition-all duration-300 group-hover:bg-pink-200/50" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 animate-float rounded-full bg-rose-100/30 blur-2xl transition-all duration-300 group-hover:bg-rose-200/50" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon container with gradient background */}
          <motion.div 
            className="mb-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 p-4 transition-all duration-300 group-hover:from-pink-100 group-hover:to-rose-100"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-8 w-8 text-pink-500 transition-colors duration-300 group-hover:text-pink-600" />
          </motion.div>
          
          {/* Text content */}
          <h3 className="mb-2 text-xl font-semibold text-heading-light transition-colors duration-300 group-hover:text-pink-600">
            {title}
          </h3>
          <p className="text-sm text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
            {description}
          </p>

          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full rotate-12 transform bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  )
}

export default LearningOptionCard 