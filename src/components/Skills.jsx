import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { DiPython ,DiCsharp  } from "react-icons/di";
import { FaFigma } from "react-icons/fa";
import { FaBuildingFlag ,FaUnity, FaGaugeHigh,FaBlender ,FaPersonCircleQuestion} from "react-icons/fa6";
import { GiWireframeGlobe } from "react-icons/gi";
import { FaSearch, FaTimes, FaDownload, FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { SiCplusplusbuilder } from "react-icons/si";
import { SiContentful,SiAdobeaftereffects,SiAdobephotoshop ,SiAdobeillustrator } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { BsMicrosoftTeams } from "react-icons/bs";
import { IoMdTimer } from "react-icons/io";
import { MdHomeWork } from "react-icons/md";
const Skills = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSkill, setModalSkill] = useState(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: [
        { name: 'Python', icon: <DiPython />, color: '#3776AB', description: 'Versatile language for automation and backend.', projects: ['Fitness Tracker'] },
        { name: 'C', icon: <SiContentful />, color: '#00599C', description: 'Low-level system programming language.', projects: ['Fitness Tracker'] },
        { name: 'C++', icon: <SiCplusplusbuilder />, color: '#004482', description: 'Powerful language for object-oriented applications.', projects: ['Fitness Tracker'] },
        { name: 'C#', icon: <TbBrandCSharp />, color: '#178600', description: 'Used for game development and desktop apps.', projects: ['AR Anatomy Scanner', 'Infinity Runner Game'] },
      ],
    },
    {
      name: 'UI/UX Design',
      skills: [
        { name: 'UI/UX Design Principles', icon: <FaBuildingFlag  />, color: '#F24E1E', description: 'Designing user-centered interfaces with usability in mind.', projects: ['AR Anatomy Scanner', 'Infinity Runner Game'] },
        { name: 'Wireframe', icon: <GiWireframeGlobe/>, color: '#F7B500', description: 'Creating low-fidelity design mockups.', projects: ['Fitness Tracker'] },
        { name: 'Prototype', icon: <FaBuildingFlag  />, color: '#F24E1E', description: 'Building interactive prototypes to visualize app flow.', projects: ['Fitness Tracker'] },
        { name: 'Figma', icon: <FaFigma />, color: '#F24E1E', description: 'Collaborative interface design tool.', projects: ['Fitness Tracker', 'AR Anatomy Scanner'] },
      ],
    },
    {
      name: 'Game Development',
      skills: [
        { name: 'Unity', icon: <FaUnity />, color: '#000000', description: 'Game engine for developing AR/VR experiences and games.', projects: ['AR Anatomy Scanner', 'Infinity Runner Game'] },
        { name: 'Vuforia/ ARKit/ ARCore', icon: < FaGaugeHigh  />, color: '#75B4A7', description: 'Frameworks for building augmented reality applications.', projects: ['AR Anatomy Scanner'] },
      ],
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Blender', icon: <FaBlender />, color: '#00B5C6', description: '3D modeling software for creating game assets.', projects: ['Infinity Runner Game'] },
        { name: 'Adobe Illustrator', icon: <SiAdobeillustrator />, color: '#FF7F00', description: 'Graphic design and vector illustration software.', projects: ['Infinity Runner Game'] },
        { name: 'Adobe Photoshop', icon: <SiAdobephotoshop />, color: '#31A8FF', description: 'Raster graphics editing software.', projects: ['Infinity Runner Game'] },
        { name: 'After Effects', icon: <SiAdobeaftereffects />, color: '#FF5C00', description: 'Motion graphics and visual effects software.', projects: ['Infinity Runner Game'] },
      ],
    },
    {
      name: 'Soft Skills',
      skills: [
        { name: 'Teamwork and Collaboration', icon: <BsMicrosoftTeams  />, color: '#61DAFB', description: 'Working together to achieve common goals.', projects: ['All Projects'] },
        { name: 'IoMdTimer ', icon: <IoMdTimer  />, color: '#FFCD00', description: 'Efficiently organizing time and tasks.', projects: ['All Projects'] },
        { name: 'Critical Thinking', icon: <FaPersonCircleQuestion />, color: '#28A745', description: 'Analyzing situations and making sound decisions.', projects: ['All Projects'] },
        { name: 'Adaptability', icon: <MdHomeWork />, color: '#D73A49', description: 'Adjusting to new challenges and environments.', projects: ['All Projects'] },
      ],
    },
  ];

  const allCategories = ['All', ...skillCategories.map((category) => category.name)];

  const getFilteredSkills = () => {
    const query = searchQuery.toLowerCase().trim();
    let filtered = skillCategories;

    if (selectedCategory !== 'All') {
      filtered = skillCategories.filter((category) => category.name === selectedCategory);
    }

    if (query) {
      filtered = filtered.map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(query)),
      }));
    }

    return filtered.filter((category) => category.skills.length > 0);
  };

  const filteredSkills = getFilteredSkills();

  const SkillCard = ({ skill }) => (
    <motion.div
      className={`w-32 h-36 p-4 rounded-lg bg-opacity-30 backdrop-blur-md border ${
        theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
      } flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      onClick={() => setModalSkill(skill)}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      role="button"
      aria-label={`Skill: ${skill.name}`}
    >
      <div style={{ color: skill.color }} className="text-3xl mb-2">{skill.icon}</div>
      <p className={`text-sm font-medium text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{skill.name}</p>
      <AnimatePresence>
        {hoveredSkill === skill.name && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white shadow-md"
          >
            {skill.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const SkillModal = ({ skill, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`p-6 rounded-lg bg-opacity-30 backdrop-blur-md border ${
          theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
        } max-w-sm w-full mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`text-xl font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-3`}>{skill.name}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{skill.description}</p>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
          <strong>Projects:</strong> {skill.projects.join(', ')}
        </p>
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.section
      id="skills"
      className={`py-16 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10" />
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-6 h-6 rounded-full bg-blue-500/40 shadow-md pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${
              theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}
          >
            Technical Skills
          </h2>
          <TypeAnimation
            sequence={['Tech Expertise', 1000, 'Modern Tools', 1000, 'Innovative Skills', 1000]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className={`mt-3 text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
          />
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {allCategories.map((category) => (
              <motion.button
                key={category}
                className={`px-3 py-1 text-sm rounded ${
                  selectedCategory === category
                    ? theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800/30 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500/20 transition-colors`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="relative w-full max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-3 py-2 pl-8 bg-gray-800/30 border ${
                theme === 'dark' ? 'border-blue-500/30' : 'border-blue-600/30'
              } rounded text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
              aria-label="Search skills"
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
        </motion.div>

        <div className="space-y-16">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3
                  className={`text-xl font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-8 text-center`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {category.name}
                </motion.h3>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.05 }}
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>No skills found.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className={`mt-4 px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center p-6 rounded-lg bg-opacity-30 backdrop-blur-md border border-blue-500/30"
        >
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Explore More</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-md mx-auto`}>
            Passionate about leveraging technology to create impactful solutions.
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <a
              href="#contact"
              className={`px-4 py-2 rounded text-white ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
            >
              Collaborate
            </a>
            <a
              href="/assets/DharaneeshANresume new.pdf"
              download="DharaneeshANresume new.pdf"
              className={`px-4 py-2 rounded text-white ${
                theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors flex items-center gap-1`}
              aria-label="Download skills summary"
            >
              <FaDownload className="text-sm" />
              Skills PDF
            </a>
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800/30 text-gray-200 hover:bg-gray-700/30' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} border ${
                theme === 'dark' ? 'border-blue-500/30' : 'border-blue-600/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
            </motion.button>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        <a href="#contact" className="text-gray-300 hover:text-blue-400" aria-label="Scroll to next section">
          <FaChevronDown className="text-xl" />
        </a>
      </motion.div>
      <AnimatePresence>{modalSkill && <SkillModal skill={modalSkill} onClose={() => setModalSkill(null)} />}</AnimatePresence>
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 20s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  );
};

export default Skills;