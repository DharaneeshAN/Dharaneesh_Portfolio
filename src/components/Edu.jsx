import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiShare2, FiInfo, FiCheckCircle, FiTwitter, FiLinkedin, FiSun, FiMoon, FiChevronUp } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Edu = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [expandedEdu, setExpandedEdu] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const modalRef = useRef(null);

  const education = [
    {
      id: 1,
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'Kongu Kalvi Milayam Mat Hr Sec School, Erode, Tamil Nadu',
      duration: '2019-2020',
      description: 'Percentage: 59%',
      category: 'school',
      details: 'Completed foundational studies with a focus on core academic subjects. Built discipline and foundational knowledge in science and math.',
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'SSM Lakshmi Ammal Mat Hr Sec School, Namakkal, Tamil Nadu',
      duration: '2021-2022',
      description: 'Percentage: 70.16%',
      category: 'school',
      details: 'Studied under the Computer Science stream, laying the groundwork for programming and logical thinking. Participated in academic and extracurricular events.',
    },
    {
      id: 3,
      degree: 'B.E. in Computer Science and Design',
      institution: 'Kongu Engineering College, Erode, Tamil Nadu',
      duration: '2022–2026 (Expected)',
      description: 'GPA: 7.61 / 10.00',
      category: 'college',
      details: 'Pursuing specialized courses in software development, UI/UX design, and AR/VR. Engaged in project-based learning and interdisciplinary collaborations.',
    },
  ];


  const certificates = [


    {
      id: 1,
      name: 'Oracle Cloud Infrastructure',
      issuer: 'Oracle',
      description: 'Certified in Oracle Cloud Infrastructure, demonstrating knowledge of cloud computing concepts, services, and architecture on Oracle Cloud.',
      link: 'https://drive.google.com/file/d/1D5yH2IZmjuouSHGwChW_pN9dpgtPD-wP/view?usp=sharing',
      logo: 'https://www.pngmart.com/files/23/Oracle-Logo-PNG-Image.png',
      images: [
        'https://drive.google.com/file/d/1D5yH2IZmjuouSHGwChW_pN9dpgtPD-wP/view?usp=sharing',
      ],
      verified: true,
      date: 'N/A',
    },
    {
      "id": 2,
      "name": "Creators of Metaverse - Phase 1 Participation",
      "issuer": "AICTE & Meta (1M1B)",
      "description": "Participated in Phase 1 of the Creators of Metaverse Student Program for the academic year 2024-25, focused on AR and VR technology development and problem solving.",
      "link": "https://drive.google.com/file/d/1Jadgxi8ijbgxTGbK6r-ixjmw7Ozl8_o5/view?usp=drive_link",
      "logo": "data:image/webp;base64,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",
      "images": [
        "https://drive.google.com/file/d/1Jadgxi8ijbgxTGbK6r-ixjmw7Ozl8_o5/view?usp=drive_link"
      ],
      "verified": true,
      "date": "2024-25"
    },{
      "id": 3,
      "name": "Internship Offer - Dotworld Technologies",
      "issuer": "Dotworld Technologies Pvt. Ltd.",
      "description": "Offered and completed a 15-day internship at Dotworld Technologies from 18-09-2023 to 02-10-2023, gaining experience in professional software development environment.",
      "link": "https://drive.google.com/file/d/1dbphR7Yv0gftvKfbufaHqrkTQwjsuLW2/view?usp=sharing",
      "logo": "data:image/jpeg;base64,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",
      "images": [
        "https://drive.google.com/file/d/1dbphR7Yv0gftvKfbufaHqrkTQwjsuLW2/view?usp=sharing"
      ],
      "verified": true,
      "date": "18-09-2023 to 02-10-2023"
    }


  ];

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const filteredEducation = education.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      !searchQuery ||
      item.degree.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      !searchQuery ||
      cert.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95 },
  };

  const handleCertDetails = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
    },
    [showModal]
  );

  const shareCert = async (cert, platform = 'clipboard') => {
    const url = cert.link;
    const text = `Check out my ${cert.name} certification from ${cert.issuer}! ${url}`;
    try {
      if (platform === 'clipboard') {
        await navigator.clipboard.writeText(url);
        alert('Certificate link copied to clipboard!');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      } else if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      }
    } catch (err) {
      console.error('Failed to share:', err);
      alert('Failed to share. Please try again.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleEscapeKey]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: (
      <button className="slick-prev slick-arrow p-2 bg-gray-800/50 rounded-lg text-white hover:bg-blue-500">
        <FiChevronUp className="rotate-90" />
      </button>
    ),
    nextArrow: (
      <button className="slick-next slick-arrow p-2 bg-gray-800/50 rounded-lg text-white hover:bg-blue-500">
        <FiChevronUp className="-rotate-90" />
      </button>
    ),
  };

  return (
    <>
      <section
        id="education"
        className={`py-16 min-h-screen ${
          theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text ${
                theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              }`}
            >
              Education & Certifications
            </h2>
            <p
              className={`text-sm sm:text-base max-w-xl mx-auto mt-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              My academic journey and professional certifications in technology.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 justify-center items-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search education/certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 bg-opacity-30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-gray-200 border-gray-300 text-gray-800'
                }`}
                aria-label="Search education and certifications"
              />
              <FiSearch
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'School', value: 'school' },
                { label: 'College', value: 'college' },
              ].map((btn) => (
                <motion.button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    filter === btn.value
                      ? theme === 'dark'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={filter === btn.value}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </motion.button>
          </motion.div>

          {/* Education Section */}
          {loading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg h-32 animate-pulse"></div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={filter + searchQuery}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Education</h3>
                {filteredEducation.length > 0 ? (
                  <div className="space-y-6">
                    {filteredEducation.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="bg-gray-800/30 p-5 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex items-start gap-3">
                          <FiCheckCircle className="text-blue-400 text-xl mt-1" />
                          <div className="flex-grow">
                            <h4 className="text-base font-semibold text-white">{item.degree}</h4>
                            <h5 className="text-sm text-blue-400">{item.institution}</h5>
                            <p className="text-sm text-gray-400">{item.duration}</p>
                            <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                            <button
                              onClick={() => setExpandedEdu(expandedEdu === item.id ? null : item.id)}
                              className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                              aria-label={
                                expandedEdu === item.id
                                  ? `Collapse details for ${item.degree}`
                                  : `Expand details for ${item.degree}`
                              }
                            >
                              {expandedEdu === item.id ? 'Hide Details' : 'Show Details'}
                            </button>
                            <AnimatePresence>
                              {expandedEdu === item.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 bg-gray-900/50 p-3 rounded text-sm text-gray-300"
                                >
                                  {item.details}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-10"
                    variants={itemVariants}
                  >
                    <p className="text-gray-300">No education entries found.</p>
                    <button
                      onClick={() => {
                        setFilter('all');
                        setSearchQuery('');
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Show All
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certifications Section */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={`rounded-lg h-64 animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                key={searchQuery}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <motion.div
                        key={cert.id}
                        variants={itemVariants}
                        className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50 min-h-[300px] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={cert.logo}
                              alt={`${cert.issuer} logo`}
                              className="w-10 h-10 rounded-full object-contain bg-white p-1"
                              loading="lazy"
                            />
                            <div>
                              <h4 className="text-base font-semibold text-white">{cert.name}</h4>
                              <h5 className="text-sm text-gray-400">{cert.issuer}</h5>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{cert.description}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          {/* <button
                            onClick={() => handleCertDetails(cert)}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              theme === 'dark' ? 'bg-gray-900 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                            }`}
                            aria-label={`View details for ${cert.name}`}
                          >
                            <FiInfo className="inline mr-1" /> Details
                          </button> */}
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-2 rounded-lg text-sm text-white ${
                              theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            aria-label={`View ${cert.name} certificate`}
                          >
                            View
                          </a>
                        </div>
                        {cert.verified && (
                          <div className="absolute top-3 right-3 text-xs font-semibold py-1 px-2 rounded bg-blue-500 text-white">
                            Verified
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full text-center py-10"
                      variants={itemVariants}
                    >
                      <p className="text-gray-300">No certifications found.</p>
                      <button
                        onClick={() => {
                          setFilter('all');
                          setSearchQuery('');
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Show All
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Certification Modal */}
      <AnimatePresence>
        {showModal && selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className={`bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              tabIndex="-1"
            >
              <div className="p-6">
                <motion.div
                  className="flex justify-between items-center mb-5"
                  variants={itemVariants}
                >
                  <h3
                    id="modal-title"
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {selectedCert.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-label="Close modal"
                  >
                    <FiX className="text-lg" />
                  </button>
                </motion.div>
                <motion.div
                  className="mb-5 rounded-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <Slider {...sliderSettings}>
                    {selectedCert.images.map((image, index) => (
                      <div key={index}>
                        <motion.img
                          src={image}
                          alt={`${selectedCert.name} screenshot ${index + 1}`}
                          className="w-full h-48 sm:h-64 object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Slider>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  variants={itemVariants}
                >
                  <img
                    src={selectedCert.logo}
                    alt={`${selectedCert.issuer} logo`}
                    className="w-10 h-10 rounded-full object-contain bg-white p-1"
                  />
                  <div>
                    <h4 className={`text-base font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {selectedCert.issuer}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedCert.verified ? 'Verified Credential' : 'Unverified'} | Issued: {new Date(selectedCert.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="mb-5"
                  variants={itemVariants}
                >
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedCert.description}
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={itemVariants}
                >
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-sm text-white ${
                      theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    aria-label={`View ${selectedCert.name} certificate`}
                  >
                    View Certificate
                  </a>
                  <button
                    onClick={() => shareCert(selectedCert, 'clipboard')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    aria-label={`Copy ${selectedCert.name} certificate link`}
                  >
                    <FiShare2 className="inline mr-1" /> Share
                  </button>
                  <button
                    onClick={() => shareCert(selectedCert, 'twitter')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                    }`}
                    aria-label={`Share ${selectedCert.name} on Twitter`}
                  >
                    <FiTwitter className="inline mr-1" /> Twitter
                  </button>
                  <button
                    onClick={() => shareCert(selectedCert, 'linkedin')}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
                    }`}
                    aria-label={`Share ${selectedCert.name} on LinkedIn`}
                  >
                    <FiLinkedin className="inline mr-1" /> LinkedIn
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Edu;