import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FlipLinkProps {
  href: string;
  children: string;
  className?: string;
}

const FlipLink = ({ href, children, className = '' }: FlipLinkProps) => {
  const letters = children.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <Link to={href} className={className}>
      <motion.span
        className="inline-block"
        variants={container}
        initial="hidden"
        whileHover="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </Link>
  );
};

export default FlipLink;

