import { useState, useEffect, useCallback, useRef } from 'react';
import { FiGithub, FiExternalLink, FiInfo, FiChevronUp, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('dark');
  const modalRef = useRef(null);
  const cursorRef = useRef(null);

  const projects = [
    {
      id: 2,
      title: 'AR Anatomy Scanner',
      description: 'An AR application to help school students visualize anatomical structures.',
      longDescription: 'Built with Unity, this AR/VR project allows users to scan objects and view corresponding anatomical 3D models in real-time. Designed to enhance learning through interactive, immersive experiences.',
      whatIDid: [
        'Developed the project in Unity with Vuforia for AR marker tracking.',
        'Modeled anatomical parts using 3D tools and integrated into Unity.',
        'Optimized performance for smooth interaction on mobile devices.',
      ],
      video: '/assets/organ.mp4',
      images: [],
      tags: ['unity', 'ar', 'vuforia', '3d-modeling'],
      github: 'https://github.com',
      demo: '#',
      featured: true,
      category: 'ar-vr',
      date: '2024-02-10',
      timeline: [
        { date: '2023-12-01', milestone: 'Project Ideation' },
        { date: '2024-01-01', milestone: 'Development Started' },
        { date: '2024-02-10', milestone: 'Project Completed' },
      ],
    },
    {
      id: 3,
      title: 'AR Talking Tom Game',
      description: 'An interactive AR/VR game that simulates a virtual pet.',
      longDescription: 'Using Unity and C#, created a game where users interact with a virtual Talking Tom character in augmented reality. Offers voice interactions and animated responses, enriching user engagement.',
      whatIDid: [
        'Programmed character behaviors and responses using C#.',
        'Integrated AR features using Unitys AR foundation and Vuforia.',
        'Designed animations and sound effects for immersive gameplay.',
      ],
      video: '/assets/talking.mp4',
      images: [],
      tags: ['unity', 'c#', 'ar', 'game'],
      github: 'https://github.com',
      demo: '#',
      featured: true,
      category: 'ar-vr',
      date: '2023-11-05',
      timeline: [
        { date: '2023-09-15', milestone: 'Project Ideation' },
        { date: '2023-10-01', milestone: 'Development Started' },
        { date: '2023-11-05', milestone: 'Project Completed' },
      ],
    },
    {
      id: 4,
      title: 'Infinity Runner Game',
      description: 'An endless runner game designed to deliver an engaging and dynamic gameplay experience.',
      longDescription: 'Created in Unity, the game features a continuously running character with obstacles and dynamic environments. The project emphasized performance optimization and visual appeal to maximize user engagement.',
      whatIDid: [
        'Designed and implemented engaging gameplay mechanics in Unity.',
        'Optimized performance for smooth cross-device play.',
        'Created appealing game assets and dynamic environment effects.',
      ],
      video: '/assets/infinty.mp4',
      images: [],
      tags: ['unity', 'game-development', 'endless-runner'],
      github: 'https://github.com',
      demo: '#',
      featured: true,
      category: 'game',
      date: '2023-08-20',
      timeline: [
        { date: '2023-07-01', milestone: 'Project Ideation' },
        { date: '2023-07-15', milestone: 'Development Started' },
        { date: '2023-08-20', milestone: 'Project Completed' },
      ],
    },
    {
      id: 5,
      title: 'Smart Home App UI/UX Design',
      description: 'A clean and intuitive UI/UX design for a smart home control application.',
      longDescription: 'Focused on creating an accessible, modern interface for managing home devices such as lights, thermostat, and security systems. Conducted user research, wireframing, and prototyping using industry-standard tools.',
      whatIDid: [
        'Conducted user interviews and created user personas.',
        'Designed wireframes and interactive prototypes using Figma.',
        'Ensured accessibility and responsiveness across devices.',
      ],
      video:'/assets/UI.UX.mp4',
      images: ['/assets/smart-home-ui1.png', '/assets/smart-home-ui2.png'],
      tags: ['ui-ux', 'figma', 'prototyping', 'design-thinking'],
      github: 'https://github.com',
      demo: '#',
      featured: false,
      category: 'ui-ux',
      date: '2023-07-15',
      timeline: [
        { date: '2023-06-01', milestone: 'Research & Ideation' },
        { date: '2023-06-15', milestone: 'Wireframing & Prototyping' },
        { date: '2023-07-15', milestone: 'Final Design Complete' },
      ],
    },{
      id: 6,
      title: 'Jump Over - 2D Platformer Game',
      description: 'A fast-paced 2D game where players must jump over obstacles and survive as long as possible.',
      longDescription: 'Created using Unity, this addictive platformer features increasing difficulty, power-ups, and a leaderboard system. Designed for both casual and competitive gameplay on mobile and desktop.',
      whatIDid: [
        'Developed game mechanics and level design using Unity C#.',
        'Implemented scoring system and player animations.',
        'Integrated sound effects and mobile touch controls.',
      ],
      video: '/assets/Jump.mp4',
      images: ['/assets/jump-over1.png', '/assets/jump-over2.png'],
      tags: ['unity', '2d-game', 'csharp', 'mobile'],
      github: 'https://github.com',
      demo: '#',
      featured: false,
      category: 'game-dev',
      date: '2023-11-20',
      timeline: [
        { date: '2023-10-01', milestone: 'Game Concept Finalized' },
        { date: '2023-10-10', milestone: 'Prototype Built' },
        { date: '2023-11-20', milestone: 'Game Released' },
      ],
    },{
      id: 7,
      title: 'Farmer Ease - Agriculture Assistant UI/UX',
      description: 'A UI/UX design project aimed at simplifying agricultural task management for rural farmers.',
      longDescription: 'Focused on designing an intuitive, multilingual interface to help farmers access crop recommendations, market rates, and weather updates. Prioritized accessibility and low-literacy usability features.',
      whatIDid: [
        'Conducted field research and user testing with farmers.',
        'Designed the app interface in Figma with high-contrast visuals.',
        'Created onboarding flows and feedback mechanisms for ease of use.',
      ],
      video: '/assets/farm.mp4',
      images: ['/assets/farmer-ease-ui1.png', '/assets/farmer-ease-ui2.png'],
      tags: ['ui-ux', 'figma', 'accessibility', 'agritech'],
      github: 'https://github.com',
      demo: '#',
      featured: true,
      category: 'ui-ux',
      date: '2024-01-25',
      timeline: [
        { date: '2023-12-05', milestone: 'Research & Requirements' },
        { date: '2023-12-20', milestone: 'Wireframe & Prototype' },
        { date: '2024-01-25', milestone: 'Design Finalized' },
      ],
    }



  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document !== 'undefined') {
        const rect = document.getElementById('projects')?.getBoundingClientRect();
        setShowScrollTop(rect?.top < -300);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
    },
    [showModal]
  );

  useEffect(() => {
    if (showModal && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
      modalRef.current?.focus();
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };
  }, [showModal, handleEscapeKey]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'featured' && project.featured) ||
      (['web', 'mobile', 'ar-vr', 'game'].includes(filter) && project.category === filter) ||
      project.tags.includes(filter);
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    return matchesFilter && matchesSearch;
  });

  const handleProjectDetails = (project) => {
    // setSelectedProject(project);
    // setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const scrollToTop = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className={`py-16 min-h-screen relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10" />

      <div
        ref={cursorRef}
        className="hidden md:block fixed w-6 h-6 rounded-full bg-blue-500/40 shadow-md pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${
              theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}
          >
            My Projects
          </h2>
          <p className={`mt-3 text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Innovative Solutions & Creative Builds
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[
              { label: `All (${projects.length})`, value: 'all' },
              { label: `Featured (${projects.filter((p) => p.featured).length})`, value: 'featured' },
              { label: `Web (${projects.filter((p) => p.category === 'web').length})`, value: 'web' },
              { label: `AR/VR (${projects.filter((p) => p.category === 'ar-vr').length})`, value: 'ar-vr' },
              { label: `Games (${projects.filter((p) => p.category === 'game').length})`, value: 'game' },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilterChange(btn.value)}
                className={`px-3 py-1 text-sm rounded ${
                  filter === btn.value
                    ? theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800/30 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500/20 transition-colors`}
                aria-pressed={filter === btn.value}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-3 py-2 pl-8 bg-gray-800/30 border ${
                theme === 'dark' ? 'border-blue-500/30' : 'border-blue-600/30'
              } rounded text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
              aria-label="Search projects"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`rounded-lg h-64 animate-pulse ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className={`bg-opacity-30 backdrop-blur-md rounded-lg overflow-hidden border h-full flex flex-col ${
                    theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
                  }`}>
                    <div className="relative h-44 overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          controls
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src="/api/placeholder/400/320"
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      <div className={`absolute inset-0 bg-gradient-to-t from-opacity-80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        theme === 'dark' ? 'from-gray-900' : 'from-gray-800'
                      }`} />

                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                        <button
                          onClick={() => handleProjectDetails(project)}
                          className={`p-2 rounded text-white hover:bg-blue-500 transition-colors ${
                            theme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-800/80'
                          }`}
                          aria-label={`View ${project.title} details`}
                        >
                          <FiInfo className="text-lg" />
                        </button>
                      </div>

                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          project.category === 'web'
                            ? theme === 'dark'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-700'
                            : project.category === 'ar-vr'
                            ? theme === 'dark'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-purple-100 text-purple-700'
                            : theme === 'dark'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {project.category === 'ar-vr' ? 'AR/VR' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className={`text-lg font-medium mb-2 group-hover:text-blue-400 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded cursor-pointer ${
                              theme === 'dark' ? 'bg-gray-700/30 text-gray-300 hover:bg-blue-500/20' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
                            }`}
                            onClick={() => handleFilterChange(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className={`px-2 py-1 text-xs rounded ${
                            theme === 'dark' ? 'bg-gray-700/30 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {project.featured && (
                      <div className={`absolute top-2 right-2 text-xs font-medium py-1 px-2 rounded text-white ${
                        theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                      }`}>
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  No projects found.
                </p>
                <button
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                  className={`mt-4 px-4 py-2 rounded text-white ${
                    theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  Show All
                </button>
              </div>
            )}
          </div>
        )}

        <div className={`mt-12 text-center p-6 rounded-lg bg-opacity-30 backdrop-blur-md border ${
          theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
        }`}>
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
            Explore More
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-md mx-auto`}>
            Discover additional projects and contributions on my GitHub profile.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 mt-4 rounded text-white ${
              theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            <FiGithub className="text-base" /> Explore More on GitHub
          </a>
        </div>

        {showScrollTop && (
          <button
            className={`fixed bottom-6 right-6 p-2 rounded text-white shadow-md ${
              theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FiChevronUp className="text-base" />
          </button>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <a href="#contact" className="text-gray-300 hover:text-blue-400" aria-label="Scroll to next section">
            <FiChevronDown className="text-xl" />
          </a>
        </div>

        {showModal && selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className={`bg-opacity-30 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border ${
                theme === 'dark' ? 'bg-gray-800/30 border-blue-500/30' : 'bg-white/30 border-blue-600/30'
              } shadow-lg`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              tabIndex="-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    id="modal-title"
                    className={`text-xl font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'}`}
                    aria-label="Close modal"
                  >
                    <FiX className="text-base" />
                  </button>
                </div>

                <div className="mb-4 rounded-lg overflow-hidden">
                  {selectedProject.video ? (
                    <video
                      src={selectedProject.video}
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="/api/placeholder/800/400"
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    Overview
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    What I Did
                  </h4>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedProject.whatIDid.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`mt-1 ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700/30 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    Project Timeline
                  </h4>
                  <div className="relative pl-5">
                    <div className={`absolute left-1 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-600/30'}`} />
                    {selectedProject.timeline.map((event, index) => (
                      <div key={index} className="mb-3 flex items-center">
                        <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} mr-3`} />
                        <div>
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            {event.milestone}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">


                  {selectedProject.demo !== '#' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white ${
                        theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                      } transition-colors`}
                      aria-label={`View ${selectedProject.title} live demo`}
                    >
                      <FiExternalLink className="text-base" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
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
    </section>
  );
};

export default Projects;