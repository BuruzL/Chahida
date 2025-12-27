import React, { useState } from 'react';

// Sample data for study buddies
const studyBuddiesData = [
  {
    id: 1,
    name: "Tamanna Haque",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    subjects: ["Mathematics", "Physics"],
    availability: "Weekdays",
    level: "University",
    bio: "Looking for study partners for calculus and quantum physics. Love collaborative problem-solving!",
    online: true,
    phone: "01847832922",
    socials: [
      { type: 'Instagram', handle: '@oyeshi111' },
      { type: 'LinkedIn', handle: 'oyeshi111' },
    ],
  },
  {
    id: 2,
    name: "Faria Jahan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    subjects: ["Computer Science", "Data Science"],
    availability: "Evenings",
    level: "Graduate",
    bio: "CS grad student focusing on ML. Happy to help with programming concepts!",
    online: true,
    phone: "01847362946",
    socials: [
      { type: 'Twitter', handle: '@peek-a-boo' },
      { type: 'LinkedIn', handle: 'faria_jahan' },
    ],
  },
  {
    id: 3,
    name: "Farhana Alam",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    subjects: ["Biology", "Chemistry"],
    availability: "Weekends",
    level: "Pre-Med",
    bio: "Pre-med student preparing for MCAT. Let's study organic chemistry together!",
    online: false,
    phone: "01849374692",
    socials: [
      { type: 'Instagram', handle: '@Farhu_22' },
    ],
  },
  {
    id: 4,
    name: "Nusrat Jahan Priya",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    subjects: ["Economics", "Statistics"],
    availability: "Flexible",
    level: "University",
    bio: "Econ major with a passion for data analysis. Great at explaining complex concepts!",
    online: true,
    phone: "+1 (555) 456-7890",
    socials: [
      { type: 'LinkedIn', handle: 'priya_priya' },
    ],
  },
  {
    id: 5,
    name: "Jahin Hasan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    subjects: ["History", "Literature"],
    availability: "Mornings",
    level: "University",
    bio: "History buff and bookworm. Love discussing ideas and essay writing strategies.",
    online: false,
    phone: "+1 (555) 567-8901",
    socials: [
      { type: 'Twitter', handle: '@jahin007' },
    ],
  },
  {
    id: 6,
    name: "Lamia Buruz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    subjects: ["Psychology", "Neuroscience"],
    availability: "Afternoons",
    level: "Graduate",
    bio: "Researching cognitive psychology. Interested in study groups for research methods.",
    online: true,
    phone: "+1 (555) 678-9012",
    socials: [
      { type: 'LinkedIn', handle: 'Lamia_buruz' },
      { type: 'Instagram', handle: '@Lamia03' },
    ],
  },
];

const allSubjects = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Computer Science",
  "Data Science",
  "Biology",
  "Chemistry",
  "Economics",
  "Statistics",
  "History",
  "Literature",
  "Psychology",
  "Neuroscience",
];

const styles = {
  // Main container
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #fff7ed 50%, #fef3c7 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  // Hero section
  hero: {
    padding: '4rem 1.5rem 3rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #0d9488 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: '1.6',
  },
  
  // Search container
  searchContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1.5rem 1rem 3rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '9999px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  searchIcon: {
    position: 'absolute',
    left: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    width: '20px',
    height: '20px',
  },
  
  // Filters section
  filtersSection: {
    padding: '0 1.5rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  filterLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '0.75rem',
    display: 'block',
  },
  filterTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  filterTag: (isActive) => ({
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: isActive 
      ? 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: isActive ? '#ffffff' : '#475569',
    boxShadow: isActive 
      ? '0 4px 15px -3px rgba(13, 148, 136, 0.4)' 
      : '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
  }),
  
  // Grid section
  gridSection: {
    padding: '0 1.5rem 4rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  
  // Card styles
  card: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.9)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #fef3c7 100%)',
    border: '3px solid #ffffff',
    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)',
  },
  onlineIndicator: (isOnline) => ({
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: isOnline ? '#22c55e' : '#94a3b8',
    border: '3px solid #ffffff',
    boxShadow: isOnline ? '0 0 8px rgba(34, 197, 94, 0.5)' : 'none',
  }),
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.25rem',
  },
  cardLevel: {
    fontSize: '0.875rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  cardBio: {
    fontSize: '0.9375rem',
    color: '#475569',
    lineHeight: '1.5',
    marginBottom: '1rem',
  },
  subjectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  subjectTag: {
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    color: '#0d9488',
    border: '1px solid rgba(13, 148, 136, 0.2)',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  },
  availability: {
    fontSize: '0.8125rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  connectButton: {
    padding: '0.625rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 15px -3px rgba(249, 115, 22, 0.4)',
    transition: 'all 0.2s ease',
  },
  contactBox: {
    marginTop: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    background: 'rgba(249, 115, 22, 0.06)',
    border: '1px solid rgba(249, 115, 22, 0.12)',
    color: '#92400e',
    fontSize: '0.9375rem',
  },
  contactItem: {
    display: 'block',
    marginBottom: '0.25rem',
  },
  
  // Stats section
  statsSection: {
    padding: '2rem 1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    textAlign: 'center',
  },
  statItem: {
    padding: '1rem',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #0d9488 0%, #f97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '0.25rem',
  },
  
  // Empty state
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#64748b',
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 1rem',
    color: '#cbd5e1',
  },
};

// SVG Icons as components
const SearchIcon = () => (
  <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
  </svg>
);

const UsersIcon = () => (
  <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// Study Buddy Card Component
const StudyBuddyCard = ({ buddy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardHeader}>
        <div style={styles.avatarContainer}>
          <img src={buddy.avatar} alt={buddy.name} style={styles.avatar} />
          <div style={styles.onlineIndicator(buddy.online)} />
        </div>
        <div style={styles.cardInfo}>
          <h3 style={styles.cardName}>{buddy.name}</h3>
          <span style={styles.cardLevel}>
            <GraduationIcon />
            {buddy.level}
          </span>
        </div>
      </div>
      
      <p style={styles.cardBio}>{buddy.bio}</p>
      
      <div style={styles.subjectTags}>
        {buddy.subjects.map((subject) => (
          <span key={subject} style={styles.subjectTag}>
            {subject}
          </span>
        ))}
      </div>
      
      <div style={styles.cardFooter}>
        <span style={styles.availability}>
          <ClockIcon />
          {buddy.availability}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            style={styles.connectButton}
            onClick={() => setShowContact(!showContact)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px -3px rgba(249, 115, 22, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px -3px rgba(249, 115, 22, 0.4)';
            }}
          >
            {showContact ? 'Hide Contact' : 'Connect'}
          </button>
        </div>
        {showContact && (
          <div style={styles.contactBox} aria-live="polite">
            <span style={styles.contactItem}><strong>Phone:</strong> {buddy.phone || 'Not provided'}</span>
            {buddy.socials && buddy.socials.length > 0 ? (
              buddy.socials.map((s, i) => (
                <span key={i} style={styles.contactItem}><strong>{s.type}:</strong> {s.handle}</span>
              ))
            ) : (
              <span style={styles.contactItem}>No socials provided</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const StudyBuddyFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  
  const filteredBuddies = studyBuddiesData.filter((buddy) => {
    const matchesSearch = buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'All Subjects' || 
      buddy.subjects.includes(selectedSubject);
    
    return matchesSearch && matchesSubject;
  });
  
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Perfect Study Buddy</h1>
        <p style={styles.heroSubtitle}>
          Connect with motivated students who share your academic interests. 
          Learn together, grow together, succeed together.
        </p>
        
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name, subject, or interest..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 10px 40px -10px rgba(13, 148, 136, 0.2), 0 0 0 2px rgba(13, 148, 136, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)';
            }}
          />
        </div>
      </section>
      
      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>2,500+</div>
          <div style={styles.statLabel}>Active Students</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>150+</div>
          <div style={styles.statLabel}>Study Groups</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>50+</div>
          <div style={styles.statLabel}>Subjects</div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section style={styles.filtersSection}>
        <span style={styles.filterLabel}>Filter by Subject</span>
        <div style={styles.filterTags}>
          {allSubjects.map((subject) => (
            <button
              key={subject}
              style={styles.filterTag(selectedSubject === subject)}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>
      
      {/* Grid Section */}
      <section style={styles.gridSection}>
        {filteredBuddies.length > 0 ? (
          <div style={styles.grid}>
            {filteredBuddies.map((buddy) => (
              <StudyBuddyCard key={buddy.id} buddy={buddy} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <UsersIcon />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
              No study buddies found
            </h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudyBuddyFinder;