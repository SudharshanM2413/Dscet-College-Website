// JavaScript to handle the navbar behavior
document.addEventListener('DOMContentLoaded', function() {
    // Button Event Handlers
    const applyNowBtn = document.getElementById('applyNowBtn');
    const virtualTourBtn = document.getElementById('virtualTourBtn');
    const programsBtn = document.getElementById('programsBtn');
    const placementsBtn = document.getElementById('placementsBtn');

    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function() {
            window.open('https://dscet.mynetcampus.com/newapplication', '_blank');
        });
    }

    if (virtualTourBtn) {
        virtualTourBtn.addEventListener('click', function() {
            const campusSection = document.getElementById('campus');
            if (campusSection) {
                campusSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (programsBtn) {
        programsBtn.addEventListener('click', function() {
            const academicsSection = document.getElementById('academics');
            if (academicsSection) {
                academicsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (placementsBtn) {
        placementsBtn.addEventListener('click', function() {
            const placementSection = document.getElementById('placement');
            if (placementSection) {
                placementSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const topNavbar = document.querySelector('.top-navbar');
    const mainNavbar = document.querySelector('.main-navbar');
    const collegeBrand = document.querySelector('.college-brand');
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Set the initial state
    let lastScrollY = window.scrollY;
    
    // Handle scroll behavior with enhanced effects
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Logo zoom effect
        if (collegeBrand) {
            if (currentScrollY > 100) {
                collegeBrand.classList.add('scrolled');
            } else {
                collegeBrand.classList.remove('scrolled');
            }
        }
        
        // Enhanced navbar effects
        if (mainNavbar) {
            if (currentScrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button logic
        const backToTopButton = document.getElementById('backToTop');
        if (currentScrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        lastScrollY = currentScrollY;
    });

    // Initialize animations for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    // Placement Statistics Chart
    const ctx = document.getElementById('placementChart').getContext('2d');
    const placementChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Placed', 'Higher Studies', 'Entrepreneurs'],
            datasets: [{
                data: [95, 3, 2],
                backgroundColor: [
                    '#A51C30',
                    '#003366',
                    '#28a745'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Smooth scrolling for anchor links and active navigation management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Update active navigation state
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll listener for navigation updates
    window.addEventListener('scroll', updateActiveNavigation);

    // Enhanced Live Chat Functionality
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const minimizeChat = document.getElementById('minimizeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatQuickReplies = document.getElementById('chatQuickReplies');
    const typingIndicator = document.getElementById('typingIndicator');
    const emojiBtn = document.getElementById('emojiBtn');
    const chatNotification = document.getElementById('chatNotification');

    const CHAT_STORE_KEY = 'dscet_chat_history_v1';
    const CHAT_OPEN_KEY = 'dscet_chat_open';
    const USER_PREFERENCES_KEY = 'dscet_user_preferences';
    let hasGreeted = false;
    let chatHistory = [];
    let userPreferences = {};

    // Enhanced Institution Knowledge Base with more detailed information
    const INSTITUTION_KB = {
        about: {
            title: 'About DSCET',
            html: `
                <p>DSCET is a premier institution focused on excellence in education, research, and innovation with NBA-accredited programs and strong industry partnerships.</p>
                <ul>
                  <li><strong>Vision</strong>: Empower learners to become impactful innovators and leaders.</li>
                  <li><strong>Mission</strong>: Deliver industry-relevant education, foster research culture, and nurture entrepreneurship.</li>
                  <li><strong>Accreditations</strong>: NBA-accredited programs; follows outcome-based education practices.</li>
                  <li><strong>Established</strong>: 2001 with over 20+ years of excellence</li>
                  <li><strong>Location</strong>: Chennai, Tamil Nadu, India</li>
                  <li><strong>Affiliation</strong>: Anna University, Chennai</li>
                  <li><strong>Campus Size</strong>: 25+ acres of modern infrastructure</li>
                  <li><strong>Student Strength</strong>: 4000+ students across UG and PG programs</li>
                  <li><strong>Faculty</strong>: 200+ experienced faculty members</li>
                  <li><strong>Research Publications</strong>: 500+ papers in international journals</li>
                </ul>
            `
        },
        admissions: {
            title: 'Admissions 2025-26',
            html: `
                <p>Admissions are open for the academic year 2025-26. Apply before September 30, 2025.</p>
                <ul>
                  <li><strong>UG Eligibility</strong>: 10+2 with Physics, Chemistry, Mathematics with minimum 50% marks</li>
                  <li><strong>PG Eligibility</strong>: Relevant UG degree with minimum 60% marks</li>
                  <li><strong>How to Apply</strong>: Visit <a href="https://dscet.mynetcampus.com/newapplication" target="_blank">Admissions Portal</a></li>
                  <li><strong>Important Dates</strong>: Application deadline - September 30, 2025</li>
                  <li><strong>Scholarships</strong>: Merit-based (up to 100% fee waiver) and need-based scholarships</li>
                  <li><strong>Application Fee</strong>: ₹500 for UG, ₹750 for PG programs</li>
                  <li><strong>Documents Required</strong>: 10th, 12th marksheets, transfer certificate, community certificate, income certificate</li>
                  <li><strong>Entrance Tests</strong>: TNEA for UG, TANCET for PG programs</li>
                  <li><strong>Counseling</strong>: Online counseling process with document verification</li>
                  <li><strong>International Students</strong>: Special provisions for NRI and foreign students</li>
                </ul>
            `
        },
        programs: {
            title: 'Academic Programs',
            html: `
                <p>DSCET offers 16 UG and 7 PG programs across engineering and management disciplines.</p>
                <div style="columns:2; max-width: 100%">
                <ul>
                  <li><strong>Aeronautical Engineering</strong> (UG/PG) - NBA Accredited</li>
                  <li><strong>Computer Science Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Electrical & Electronics Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Electronics & Communication Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Information Technology</strong> (UG) - NBA Accredited</li>
                  <li><strong>Mechanical Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Civil Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>BioMedical Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Food Technology</strong> (UG) - NBA Accredited</li>
                  <li><strong>Cyber Security</strong> (UG) - NBA Accredited</li>
                  <li><strong>AI & Data Science</strong> (UG) - NBA Accredited</li>
                  <li><strong>Internet of Things</strong> (UG) - NBA Accredited</li>
                  <li><strong>Agricultural Engineering</strong> (UG) - NBA Accredited</li>
                  <li><strong>Robotics & AI</strong> (UG) - NBA Accredited</li>
                  <li><strong>Environmental Science</strong> (UG/PG) - NBA Accredited</li>
                  <li><strong>Communication Systems</strong> (PG) - NBA Accredited</li>
                  <li><strong>Power Electronics</strong> (PG) - NBA Accredited</li>
                  <li><strong>Industry & Safety Engineering</strong> (PG) - NBA Accredited</li>
                  <li><strong>MBA</strong> (PG) - NBA Accredited</li>
                  <li><strong>MCA</strong> (PG) - NBA Accredited</li>
                </ul>
                </div>
                <p><strong>Duration:</strong> UG - 4 years, PG - 2 years</p>
                <p><strong>Intake Capacity:</strong> 1632 students annually</p>
                <p>Explore the <a href="#academics">Academics</a> section for detailed information.</p>
            `
        },
        placements: {
            title: 'Placements & Careers',
            html: `
                <p>DSCET boasts excellent placement records with top-tier companies worldwide.</p>
                <ul>
                  <li><strong>Placement Rate</strong>: 95% overall placement rate</li>
                  <li><strong>Top Recruiters</strong>: Microsoft, Google, Amazon, TCS, Infosys, IBM, Tata Motors, Wipro, Cognizant, HCL</li>
                  <li><strong>Average Package</strong>: ₹8.5 LPA (UG), ₹12.2 LPA (PG)</li>
                  <li><strong>Highest Package</strong>: ₹42 LPA (2024 batch)</li>
                  <li><strong>International Placements</strong>: Opportunities in USA, UK, Australia, Singapore</li>
                  <li><strong>Internship Opportunities</strong>: 6-month industry internships in final year</li>
                  <li><strong>Training Programs</strong>: 200+ hours of soft skills and technical training</li>
                  <li><strong>Mock Interviews</strong>: Regular practice sessions with industry experts</li>
                  <li><strong>Career Counseling</strong>: Personalized guidance for career planning</li>
                  <li><strong>Higher Studies</strong>: 15% students pursue higher education at top universities</li>
                  <li><strong>Entrepreneurship</strong>: Support for student startups and business ideas</li>
                  <li><a href="#placement">View Detailed Placement Statistics</a></li>
                </ul>
            `
        },
        campus: {
            title: 'Campus Life & Facilities',
            html: `
                <p>DSCET offers world-class infrastructure and vibrant campus life.</p>
                <ul>
                  <li><strong>Central Library</strong>: 50,000+ books, digital resources, e-journals, 24/7 access</li>
                  <li><strong>Advanced Labs</strong>: 50+ specialized laboratories with latest equipment</li>
                  <li><strong>Sports Facilities</strong>: Indoor stadium, gymnasium, outdoor sports complex</li>
                  <li><strong>Hostels</strong>: Separate accommodation for boys and girls with modern amenities</li>
                  <li><strong>Transportation</strong>: College buses covering major routes in Chennai</li>
                  <li><strong>Cafeteria</strong>: Multi-cuisine food court with hygienic food</li>
                  <li><strong>Medical Center</strong>: On-campus health care facility</li>
                  <li><strong>Bank & ATM</strong>: Convenient banking services</li>
                  <li><strong>Wi-Fi Campus</strong>: High-speed internet connectivity throughout</li>
                  <li><strong>Student Clubs</strong>: Technical clubs, cultural clubs, sports clubs</li>
                  <li><strong>Events</strong>: Annual tech fest, cultural fest, sports meet</li>
                  <li><a href="#campus">Explore Campus Gallery</a></li>
                </ul>
            `
        },
        research: {
            title: 'Research & Innovation',
            html: `
                <p>DSCET promotes cutting-edge research and innovation across disciplines.</p>
                <ul>
                  <li><strong>Research Centers</strong>: 10+ specialized research centers</li>
                  <li><strong>Innovation Hub</strong>: AICTE IDEA Lab for student innovations</li>
                  <li><strong>Incubation Center</strong>: Support for student startups with funding</li>
                  <li><strong>Industry Collaborations</strong>: 50+ MoUs with leading companies</li>
                  <li><strong>Research Publications</strong>: 500+ papers in international journals</li>
                  <li><strong>Patents</strong>: 25+ patents filed by faculty and students</li>
                  <li><strong>Research Grants</strong>: ₹2+ crores in research funding</li>
                  <li><strong>Conferences</strong>: Annual international conferences and symposiums</li>
                  <li><strong>Mentorship Program</strong>: Industry experts mentoring students</li>
                  <li><strong>Innovation Challenges</strong>: Regular hackathons and competitions</li>
                  <li><a href="#mentorship">Learn More About Innovation</a></li>
                </ul>
            `
        },
        contact: {
            title: 'Contact Information',
            html: `
                <p>Get in touch with DSCET for any queries or information.</p>
                <ul>
                  <li><strong>Address</strong>: ECR, Mamallapuram, Chengalpattu District, Tamil Nadu</li>
                  <li><strong>Phone</strong>: 044 2744 2844, Admissions: 9499051266</li>
                  <li><strong>Email</strong>: dscet@yahoo.co.in, admissions@dscet.ac.in</li>
                  <li><strong>Website</strong>: <a href="https://www.dscet.ac.in" target="_blank">www.dscet.ac.in</a></li>
                  <li><strong>Office Hours</strong>: Monday to Friday, 9:00 AM to 5:00 PM</li>
                  <li><strong>Admission Office</strong>: Open on Saturdays for counseling</li>
                  <li><strong>Social Media</strong>: Active presence on Facebook, Instagram, LinkedIn, YouTube</li>
                  <li><strong>WhatsApp</strong>: +91 9499051266 for instant queries</li>
                  <li><a href="#contact">Send Message Form</a></li>
                </ul>
            `
        },
        governance: {
            title: 'Governance & Policies',
            html: `
                <p>DSCET follows transparent governance and student-friendly policies.</p>
                <ul>
                  <li><strong>Academic Council</strong>: Regular meetings for curriculum updates</li>
                  <li><strong>Quality Assurance</strong>: Internal quality assurance cell (IQAC)</li>
                  <li><strong>Anti-Ragging</strong>: Zero tolerance policy with strict enforcement</li>
                  <li><strong>Grievance Redressal</strong>: Student grievance committee for quick resolution</li>
                  <li><strong>Women Cell</strong>: Special cell for women's safety and empowerment</li>
                  <li><strong>Disability Support</strong>: Facilities and support for differently-abled students</li>
                  <li><strong>Code of Conduct</strong>: Clear guidelines for student behavior</li>
                  <li><strong>Transparency</strong>: All policies and procedures publicly available</li>
                </ul>
            `
        },
        scholarships: {
            title: 'Scholarships & Financial Aid',
            html: `
                <p>DSCET offers various scholarships to support deserving students.</p>
                <ul>
                  <li><strong>Merit Scholarships</strong>: Up to 100% fee waiver for top performers</li>
                  <li><strong>Sports Scholarships</strong>: Special scholarships for sports achievers</li>
                  <li><strong>Need-Based Aid</strong>: Financial assistance for economically weaker students</li>
                  <li><strong>SC/ST Scholarships</strong>: Government scholarships for eligible students</li>
                  <li><strong>NRI Scholarships</strong>: Special provisions for NRI students</li>
                  <li><strong>Research Fellowships</strong>: For PG and research students</li>
                  <li><strong>Industry Sponsored</strong>: Scholarships from corporate partners</li>
                  <li><strong>Education Loans</strong>: Tie-ups with banks for easy loan processing</li>
                  <li><strong>Payment Plans</strong>: Flexible payment options available</li>
                </ul>
            `
        },
        fees: {
            title: 'Fee Structure & Payment',
            html: `
                <p>Transparent and competitive fee structure with multiple payment options.</p>
                <ul>
                  <li><strong>UG Programs</strong>: ₹1.2 - 1.5 Lakhs per year</li>
                  <li><strong>PG Programs</strong>: ₹1.8 - 2.2 Lakhs per year</li>
                  <li><strong>Hostel Fee</strong>: ₹45,000 per year (including food)</li>
                  <li><strong>Transportation</strong>: ₹15,000 per year (optional)</li>
                  <li><strong>Payment Options</strong>: Online, DD, Cheque, EMI</li>
                  <li><strong>Installment Plans</strong>: Quarterly and monthly payment options</li>
                  <li><strong>Refund Policy</strong>: Clear refund policy as per AICTE guidelines</li>
                  <li><strong>Additional Costs</strong>: Books, uniforms, lab equipment included</li>
                </ul>
            `
        },
        faq: {
            title: 'Frequently Asked Questions',
            html: `
                <p>Quick answers to common questions about DSCET.</p>
                <ul>
                  <li><strong>How do I apply?</strong> Use the online portal at <a href="https://dscet.mynetcampus.com/newapplication" target="_blank">dscet.mynetcampus.com</a></li>
                  <li><strong>What are the eligibility criteria?</strong> 10+2 with PCM for UG, relevant UG degree for PG</li>
                  <li><strong>Is there hostel accommodation?</strong> Yes, separate hostels for boys and girls</li>
                  <li><strong>What is the placement rate?</strong> 95% placement rate with top companies</li>
                  <li><strong>Are there scholarships available?</strong> Yes, merit-based and need-based scholarships</li>
                  <li><strong>How can I visit the campus?</strong> Contact us to schedule a campus tour</li>
                  <li><strong>What are the transportation options?</strong> College buses and public transport available</li>
                  <li><strong>Is the campus Wi-Fi enabled?</strong> Yes, high-speed internet throughout campus</li>
                  <li><strong>What sports facilities are available?</strong> Indoor and outdoor sports complex</li>
                  <li><strong>How can I contact for more information?</strong> Call 9499051266 or email dscet@yahoo.co.in</li>
                </ul>
            `
        }
    };

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function saveChatState() {
        try { localStorage.setItem(CHAT_STORE_KEY, JSON.stringify(chatHistory)); } catch (_) {}
    }

    function loadChatState() {
        try {
            const raw = localStorage.getItem(CHAT_STORE_KEY);
            if (!raw) return [];
            const arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : [];
        } catch (_) { return []; }
    }
    
    function saveUserPreferences() {
        try { localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(userPreferences)); } catch (_) {}
    }
    
    function loadUserPreferences() {
        try {
            const raw = localStorage.getItem(USER_PREFERENCES_KEY);
            if (!raw) return {};
            const prefs = JSON.parse(raw);
            return typeof prefs === 'object' ? prefs : {};
        } catch (_) { return {}; }
    }
    
    function updateUserPreference(key, value) {
        userPreferences[key] = value;
        saveUserPreferences();
    }

    function addMessage(text, isUser = false, options = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');
        
        // Create message content
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        if (options.allowHTML) {
            messageContent.innerHTML = text;
        } else {
            messageContent.textContent = text;
        }
        
        messageDiv.appendChild(messageContent);
        
        // Add timestamp for all messages
        const timestamp = document.createElement('div');
        timestamp.classList.add('message-timestamp');
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timestamp);
        
        chatMessages.appendChild(messageDiv);
        
        // Smooth scroll to bottom
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
        
        if (options.persist !== false) {
            chatHistory.push({ role: isUser ? 'user' : 'bot', text, allowHTML: !!options.allowHTML, ts: Date.now() });
            if (chatHistory.length > 200) chatHistory = chatHistory.slice(-200);
            saveChatState();
        }
        
        // Show notification if chat is minimized
        if (isUser && chatBox.style.display === 'none') {
            showChatNotification();
        }
        
        return messageDiv;
    }

    function showTyping() {
        typingIndicator.classList.add('show');
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return {
            done: (text, options = {}) => {
                typingIndicator.classList.remove('show');
                addMessage(text, false, options);
            }
        };
    }

    function showChatNotification() {
        if (chatNotification) {
            chatNotification.textContent = '1';
            chatNotification.classList.add('show');
        }
    }

    function hideChatNotification() {
        if (chatNotification) {
            chatNotification.classList.remove('show');
        }
    }

    function minimizeChatBox() {
        chatBox.style.display = 'none';
        localStorage.setItem(CHAT_OPEN_KEY, '0');
    }

    function expandChatBox() {
        chatBox.style.display = 'flex';
        localStorage.setItem(CHAT_OPEN_KEY, '1');
        hideChatNotification();
        chatInput.focus();
    }

    function normalizeText(s) {
        return String(s || '').toLowerCase();
    }

    function searchChatIndex(query) {
        const index = Array.isArray(window.__SITE_INDEX) ? window.__SITE_INDEX : [];
        const q = normalizeText(query).trim();
        if (!q) return [];

        const synonyms = [
            ['cse','computer science','cs'],
            ['ece','electronics'],
            ['eee','electrical'],
            ['mech','mechanical'],
            ['civil'],
            ['it','information technology'],
            ['bme','biomedical'],
            ['aero','aeronautical'],
            ['agri','agricultural'],
            ['food','food technology'],
            ['cyber','cyber security'],
            ['iot','internet of things'],
            ['ai&ds','aids','data science'],
            ['ai&ml','aiml','machine learning','artificial intelligence'],
            ['rai','robotics','artificial intelligence'],
            ['mba'],
            ['mca'],
            ['evs','environmental science']
        ];
        let boosted = q;
        synonyms.forEach(group => {
            const [primary, ...alts] = group;
            alts.forEach(a => { if (q.includes(a)) boosted += ` ${primary}`; });
        });

        function scoreItem(item) {
            const hayTitle = normalizeText(item.title);
            const hayMeta = normalizeText(`${item.section} ${item.text}`);
            let score = 0;
            if (hayTitle.includes(q)) score += 5;
            if (hayMeta.includes(q)) score += 2;
            if (boosted !== q) {
                if (hayTitle.includes(boosted)) score += 4;
                if (hayMeta.includes(boosted)) score += 1;
            }
            return score;
        }

        return index
            .map(item => ({ item, score: scoreItem(item) }))
            .filter(x => x.score > 0)
            .sort((a,b) => b.score - a.score)
            .slice(0, 4)
            .map(x => x.item);
    }

    function populateQuickReplies() {
        if (!chatQuickReplies) return;
        const suggestions = [
            { label: '🎓 Admissions', text: 'Tell me about admissions 2025-26' },
            { label: '📚 Programs', text: 'What programs are offered at DSCET?' },
            { label: '💼 Placements', text: 'Share placement statistics and recruiters' },
            { label: '🏫 Campus', text: 'Show campus life and facilities' },
            { label: '🔬 Research', text: 'Tell me about research and innovation' },
            { label: '💰 Fees', text: 'What is the fee structure?' },
            { label: '📞 Contact', text: 'How can I contact DSCET?' },
            { label: '🔍 Compare', text: 'Compare CSE vs IT programs' },
            { label: '📊 Status', text: 'status' },
            { label: '❓ Help', text: 'menu' }
        ];
        chatQuickReplies.innerHTML = '';
        suggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'quick-reply';
            btn.textContent = s.label;
            btn.addEventListener('click', () => {
                // Add visual feedback
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
                
                chatInput.value = s.text;
                handleSend();
            });
            chatQuickReplies.appendChild(btn);
        });
    }

    function intentResponse(userText) {
        const t = userText.toLowerCase();
        
        // Track user interests for context-aware responses
        if (t.includes('cse') || t.includes('computer science')) {
            updateUserPreference('interest', 'computer_science');
        } else if (t.includes('placement') || t.includes('job') || t.includes('career')) {
            updateUserPreference('interest', 'career');
        } else if (t.includes('admission') || t.includes('apply')) {
            updateUserPreference('interest', 'admissions');
        } else if (t.includes('campus') || t.includes('facility')) {
            updateUserPreference('interest', 'campus_life');
        }
        
        // Enhanced Commands with more options
        if (t === 'help' || t === '/help' || t === 'menu' || t === '/menu') {
            return {
                html: `
                    <div><strong>🤖 AI Mentor Commands</strong></div>
                    <ul style="padding-left:18px; margin:6px 0">
                      <li><strong>📚 Academic</strong>: admissions, programs, courses, eligibility</li>
                      <li><strong>💼 Career</strong>: placements, internships, training, packages</li>
                      <li><strong>🏫 Campus</strong>: facilities, library, sports, activities</li>
                      <li><strong>🔬 Research</strong>: innovation, projects, mentorship</li>
                      <li><strong>💰 Financial</strong>: fees, scholarships, payment</li>
                      <li><strong>📞 Support</strong>: contact, location, timings</li>
                    </ul>
                    <div style="font-size:0.85rem; color:#666">
                      <strong>Commands:</strong> <code>menu</code>, <code>help</code>, <code>clear</code>, <code>status</code>, <code>compare</code>
                    </div>
                `
            };
        }
        
        if (t === 'clear' || t === '/clear') {
            try { localStorage.removeItem(CHAT_STORE_KEY); } catch(_) {}
            chatHistory = [];
            if (chatMessages) chatMessages.innerHTML = '';
            return { html: '🗑️ Conversation cleared. Type <code>menu</code> to see options.' };
        }
        
        if (t === 'status' || t === '/status') {
            const totalMessages = chatHistory.length;
            const userMessages = chatHistory.filter(m => m.role === 'user').length;
            const botMessages = chatHistory.filter(m => m.role === 'bot').length;
            return {
                html: `
                    <div><strong>📊 Chat Statistics</strong></div>
                    <ul style="padding-left:18px; margin:6px 0">
                      <li>Total Messages: ${totalMessages}</li>
                      <li>Your Questions: ${userMessages}</li>
                      <li>My Responses: ${botMessages}</li>
                      <li>Session Duration: ${Math.round((Date.now() - (chatHistory[0]?.ts || Date.now())) / 60000)} minutes</li>
                    </ul>
                `
            };
        }
        
        if (t === 'compare' || t === '/compare') {
            return {
                html: `
                    <div><strong>🔍 Program Comparison Tool</strong></div>
                    <p>I can help you compare programs! Ask me to compare any two programs like:</p>
                    <ul style="padding-left:18px; margin:6px 0">
                      <li>"Compare CSE and IT"</li>
                      <li>"Compare AI&DS vs AI&ML"</li>
                      <li>"Compare UG vs PG programs"</li>
                    </ul>
                `
            };
        }
        // Try site-aware search first
        const matches = searchChatIndex(userText);
        if (matches && matches.length) {
            const list = matches.map(m => {
                const href = m.deep || m.anchor || '#';
                const safeTitle = escapeHtml(m.title);
                const safeMeta = escapeHtml(`${m.section} • ${m.text}`);
                return `<li style="margin:6px 0"><a href="${href}"><strong>${safeTitle}</strong></a><div class="search-result-meta" style="font-size:0.8rem">${safeMeta}</div></li>`;
            }).join('');
            return { html: `<div>Here are relevant pages I found:</div><ul style="padding-left:18px; margin:8px 0 0 0">${list}</ul>` };
        }
        // KB-backed intents
        if (/admission|apply|eligibil|fee|scholar|deadline|entrance/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.admissions.title}</strong></div>${INSTITUTION_KB.admissions.html}` };
        }
        if (/program|course|department|branch|ug|pg|b\.?e|btech|m\.?e|mca|mba/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.programs.title}</strong></div>${INSTITUTION_KB.programs.html}` };
        }
        if (/placement|job|recruiter|career/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.placements.title}</strong></div>${INSTITUTION_KB.placements.html}` };
        }
        if (/contact|phone|email|reach|address/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.contact.title}</strong></div>${INSTITUTION_KB.contact.html}` };
        }
        if (/tour|visit|campus|walkthrough|facility|facilities|hostel|library|sports/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.campus.title}</strong></div>${INSTITUTION_KB.campus.html}` };
        }
        if (/research|innovation|mentor|incubat|project/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.research.title}</strong></div>${INSTITUTION_KB.research.html}` };
        }
        if (/about|dscet|college|institute|institution/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.about.title}</strong></div>${INSTITUTION_KB.about.html}` };
        }
        if (/scholarship|financial aid|fee concession|waiver/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.scholarships.title}</strong></div>${INSTITUTION_KB.scholarships.html}` };
        }
        if (/fee|cost|payment|price|tuition/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.fees.title}</strong></div>${INSTITUTION_KB.fees.html}` };
        }
        if (/governance|policy|obe|quality|council|grievance/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.governance.title}</strong></div>${INSTITUTION_KB.governance.html}` };
        }
        
        // Program comparison functionality
        if (/compare|vs|versus|difference between|which is better/.test(t)) {
            const programs = {
                'cse': { name: 'Computer Science Engineering', duration: '4 years', focus: 'Core CS concepts, algorithms, software development', scope: 'Software, IT, AI/ML, Web Development' },
                'it': { name: 'Information Technology', duration: '4 years', focus: 'IT infrastructure, networking, database systems', scope: 'IT Services, System Administration, Database' },
                'aids': { name: 'AI & Data Science', duration: '4 years', focus: 'AI, ML, Data Analytics, Statistics', scope: 'Data Science, AI Research, Analytics' },
                'aiml': { name: 'AI & Machine Learning', duration: '4 years', focus: 'AI, ML, Deep Learning, Neural Networks', scope: 'AI Research, ML Engineering, Robotics' },
                'ece': { name: 'Electronics & Communication', duration: '4 years', focus: 'Electronics, Communication, Signal Processing', scope: 'Telecom, Electronics, Communication Systems' },
                'eee': { name: 'Electrical & Electronics', duration: '4 years', focus: 'Electrical systems, power electronics, control systems', scope: 'Power Sector, Automation, Control Systems' },
                'mech': { name: 'Mechanical Engineering', duration: '4 years', focus: 'Mechanics, thermodynamics, manufacturing', scope: 'Manufacturing, Automotive, Aerospace' },
                'civil': { name: 'Civil Engineering', duration: '4 years', focus: 'Construction, structures, transportation', scope: 'Construction, Infrastructure, Transportation' }
            };
            
            // Extract program names from user text
            const foundPrograms = [];
            Object.keys(programs).forEach(key => {
                if (t.includes(key) || t.includes(programs[key].name.toLowerCase())) {
                    foundPrograms.push({ key, ...programs[key] });
                }
            });
            
            if (foundPrograms.length >= 2) {
                const [prog1, prog2] = foundPrograms.slice(0, 2);
                return {
                    html: `
                        <div><strong>🔍 Program Comparison: ${prog1.name} vs ${prog2.name}</strong></div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid var(--primary-blue);">
                                <h6 style="color: var(--primary-blue); margin-bottom: 10px;">${prog1.name}</h6>
                                <p><strong>Duration:</strong> ${prog1.duration}</p>
                                <p><strong>Focus:</strong> ${prog1.focus}</p>
                                <p><strong>Career Scope:</strong> ${prog1.scope}</p>
                            </div>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 4px solid var(--accent-crimson);">
                                <h6><strong>${prog2.name}</strong></h6>
                                <p><strong>Duration:</strong> ${prog2.duration}</p>
                                <p><strong>Focus:</strong> ${prog2.focus}</p>
                                <p><strong>Career Scope:</strong> ${prog2.scope}</p>
                            </div>
                        </div>
                        <p><strong>💡 Tip:</strong> Both programs are NBA-accredited and offer excellent placement opportunities!</p>
                    `
                };
            } else if (foundPrograms.length === 1) {
                return {
                    html: `
                        <div><strong>🔍 Program Comparison</strong></div>
                        <p>I found <strong>${foundPrograms[0].name}</strong>. To compare programs, ask me to compare two programs like:</p>
                        <ul style="padding-left:18px; margin:6px 0">
                            <li>"Compare CSE vs IT"</li>
                            <li>"Compare AI&DS vs AI&ML"</li>
                            <li>"Compare ECE vs EEE"</li>
                        </ul>
                    `
                };
            }
        }
        
        if (/faq|question|common/.test(t)) {
            return { html: `<div><strong>${INSTITUTION_KB.faq.title}</strong></div>${INSTITUTION_KB.faq.html}` };
        }
        
        // Enhanced fallback with personalized suggestions
        let personalizedSuggestion = '';
        if (userPreferences.interest === 'computer_science') {
            personalizedSuggestion = '<p><strong>💡 Based on your interest in Computer Science:</strong> Consider exploring AI&DS, AI&ML, or Cyber Security programs. Ask me to compare them!</p>';
        } else if (userPreferences.interest === 'career') {
            personalizedSuggestion = '<p><strong>💡 Based on your career focus:</strong> Our placement rate is 95% with top recruiters like Microsoft, Google, and Amazon!</p>';
        } else if (userPreferences.interest === 'admissions') {
            personalizedSuggestion = '<p><strong>💡 Admissions are open!</strong> Apply before September 30, 2025. Application fee: ₹500 for UG, ₹750 for PG.</p>';
        } else if (userPreferences.interest === 'campus_life') {
            personalizedSuggestion = '<p><strong>💡 Campus highlights:</strong> World-class library, advanced labs, sports facilities, and vibrant student activities!</p>';
        }
        
        return { 
            html: `
                <div><strong>🤖 I'm here to help!</strong></div>
                <p>I can assist you with:</p>
                <ul style="padding-left:18px; margin:8px 0">
                    <li><strong>📚 Academic</strong>: Admissions, Programs, Eligibility</li>
                    <li><strong>💼 Career</strong>: Placements, Packages, Training</li>
                    <li><strong>🏫 Campus</strong>: Facilities, Life, Activities</li>
                    <li><strong>🔬 Research</strong>: Innovation, Projects</li>
                </ul>
                ${personalizedSuggestion}
                <p>Try asking about specific programs, compare courses, or type <code>menu</code> for commands!</p>
            ` 
        };
    }

    function botRespond(userText) {
        const typing = showTyping();
        const resp = intentResponse(userText);
        // Faster, more responsive replies
        const delay = Math.min(500, 120 + Math.random() * 200);
        setTimeout(() => {
            typing.done(resp.html, { allowHTML: true });
        }, delay);
    }

    function handleSend() {
        const value = chatInput.value.trim();
        if (!value) return;
        
        // Disable input and button during processing
        chatInput.disabled = true;
        sendMessage.disabled = true;
        
        addMessage(value, true);
        chatInput.value = '';
        
        // Re-enable input and button
        setTimeout(() => {
            chatInput.disabled = false;
            sendMessage.disabled = false;
            chatInput.focus();
        }, 100);
        
        botRespond(value);
    }

    chatBtn.addEventListener('click', () => {
        if (chatBox.style.display === 'none' || chatBox.style.display === '') {
            expandChatBox();
            populateQuickReplies();
        } else {
            minimizeChatBox();
        }
    });

    closeChat.addEventListener('click', minimizeChatBox);
    
    if (minimizeChat) {
        minimizeChat.addEventListener('click', minimizeChatBox);
    }

    sendMessage.addEventListener('click', handleSend);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

    function greetIfFirstOpen() {
        if (hasGreeted) return;
        const prior = chatHistory.length > 0;
        populateQuickReplies();
        if (!prior) {
            const hour = new Date().getHours();
            const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
            const welcomeMessage = `${greet}! 👋 I'm your advanced AI mentor for DSCET. I can help you with admissions, programs, placements, campus life, and more. 

🔧 <strong>Advanced Features:</strong>
• Program comparisons and analysis
• Chat statistics and session tracking
• Context-aware responses
• Quick navigation to relevant sections
• Real-time information about DSCET

🎯 <strong>What I can help you with:</strong>
• Admissions 2025-26 (Apply before Sept 30!)
• 16 UG & 7 PG programs (All NBA Accredited)
• 95% placement rate with top companies
• Campus facilities and student life
• Research opportunities and innovation
• Fee structure and scholarships

Choose a quick topic below or type your question! You can also use commands like <code>menu</code>, <code>status</code>, or <code>compare</code>.

💡 <strong>Pro Tip:</strong> Try asking "Compare CSE vs IT" or "What are the admission requirements?"`;
            addMessage(welcomeMessage, false, { persist: false, allowHTML: true });
            hasGreeted = true;
        }
    }

    // Emoji functionality
    if (emojiBtn) {
        emojiBtn.addEventListener('click', () => {
            const emojis = ['😊', '👍', '🎓', '📚', '💼', '🏫', '🔬', '💰', '📞', '❓'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            chatInput.value += randomEmoji;
            chatInput.focus();
        });
    }

    // Enhanced input handling
    chatInput.addEventListener('input', () => {
        const hasText = chatInput.value.trim().length > 0;
        sendMessage.style.opacity = hasText ? '1' : '0.6';
        sendMessage.style.cursor = hasText ? 'pointer' : 'default';
    });

    // Restore chat history and open state on load
    (function initializeChat() {
        chatHistory = loadChatState();
        userPreferences = loadUserPreferences();
        if (Array.isArray(chatHistory) && chatHistory.length) {
            chatMessages.innerHTML = '';
            chatHistory.forEach(msg => {
                addMessage(msg.text, msg.role === 'user', { allowHTML: !!msg.allowHTML, persist: false });
            });
        }
        const isOpen = localStorage.getItem(CHAT_OPEN_KEY) === '1';
        if (isOpen) {
            expandChatBox();
            populateQuickReplies();
        }
        greetIfFirstOpen();
        
        // Auto-show chat notification after 5 seconds if not opened
        setTimeout(() => {
            if (chatBox.style.display === 'none' || chatBox.style.display === '') {
                showChatNotification();
                // Add a subtle animation to draw attention
                chatBtn.style.animation = 'chatPulse 1s infinite';
                setTimeout(() => {
                    chatBtn.style.animation = '';
                }, 3000);
            }
        }, 5000);
    })();

    // Site Search: lightweight client-side index
    (function() {
        const input = document.getElementById('siteSearchInput');
        const resultsEl = document.getElementById('searchResults');
        if (!input || !resultsEl) return;

        const index = [
            { title: 'Admissions 2025-26', section: 'Admissions', text: 'Apply before September 30, 2025. Application portal and prospectus.', anchor: '#admissions' },
            { title: 'Academic Programs', section: 'Academics', text: 'UG and PG programs: AERO, CSE, EEE, ECE, IT, MECH, AI&DS, AI&ML, CIVIL, BME, AGRI, FOOD, CYBER, IOT, EVS, RAI, MBA, MCA, PED, ISE.', anchor: '#academics' },
            { title: 'Aeronautical Engineering (UG)', section: 'Academics', text: 'B.E. in Aeronautical Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-aero' },
            { title: 'Computer Science and Engineering (UG)', section: 'Academics', text: 'B.E. in Computer Science and Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-cse' },
            { title: 'Electrical and Electronics Engineering (UG)', section: 'Academics', text: 'B.E. in Electrical and Electronics Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-eee' },
            { title: 'Electronics and Communication Engineering (UG)', section: 'Academics', text: 'B.E. in Electronics and Communication Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-ece' },
            { title: 'Information Technology (UG)', section: 'Academics', text: 'B.Tech. in Information Technology (NBA Accredited).', anchor: '#academics', deep: '#prog-it' },
            { title: 'Mechanical Engineering (UG)', section: 'Academics', text: 'B.E. in Mechanical Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-mech' },
            { title: 'Civil Engineering (UG)', section: 'Academics', text: 'B.E. in Civil Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-civil' },
            { title: 'BioMedical Engineering (UG)', section: 'Academics', text: 'B.E. in BioMedical Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-bme' },
            { title: 'Food Technology (UG)', section: 'Academics', text: 'B.Tech. in Food Technology (NBA Accredited).', anchor: '#academics', deep: '#prog-food' },
            { title: 'Computer Science Engineering (Cyber Security) (UG)', section: 'Academics', text: 'B.E. in Computer Science Engineering (Cyber Security) (NBA Accredited).', anchor: '#academics', deep: '#prog-cyber' },
            { title: 'Artificial Intelligence and Data Science (UG)', section: 'Academics', text: 'B.Tech. in Artificial Intelligence and Data Science (NBA Accredited).', anchor: '#academics', deep: '#prog-aids' },
            { title: 'Computer Science and Engineering (Internet of Things) (UG)', section: 'Academics', text: 'B.E. in Computer Science and Engineering (Internet of Things) (NBA Accredited).', anchor: '#academics', deep: '#prog-iot' },
            { title: 'Agricultural Engineering (UG)', section: 'Academics', text: 'B.Tech. in Agricultural Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-agri' },
            { title: 'Robotics and Artificial Intelligence (UG)', section: 'Academics', text: 'B.Tech. in Robotics and Artificial Intelligence (NBA Accredited).', anchor: '#academics', deep: '#prog-rai' },
            { title: 'Environmental Science and Engineering (UG)', section: 'Academics', text: 'B.Tech. in Environmental Science and Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-evs' },
            { title: 'Computer Science Engineering (AI & ML) (UG)', section: 'Academics', text: 'B.E. in Computer Science Engineering (Artificial Intelligence and Machine Learning) (NBA Accredited).', anchor: '#academics', deep: '#prog-aiml' },
            { title: 'Master of Business Administration (PG)', section: 'Academics', text: 'MBA (NBA Accredited).', anchor: '#academics', deep: '#prog-mba' },
            { title: 'Master of Computer Application (PG)', section: 'Academics', text: 'MCA (NBA Accredited).', anchor: '#academics', deep: '#prog-mca' },
            { title: 'Aeronautical Engineering (PG)', section: 'Academics', text: 'M.E. in Aeronautical Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-me-aero' },
            { title: 'Computer Science and Engineering (PG)', section: 'Academics', text: 'M.E. in Computer Science and Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-me-cse' },
            { title: 'Communication Systems (PG)', section: 'Academics', text: 'M.E. in Communication Systems (NBA Accredited).', anchor: '#academics', deep: '#prog-me-cs' },
            { title: 'Power Electronics and Drives (PG)', section: 'Academics', text: 'M.E. in Power Electronics and Drives (NBA Accredited).', anchor: '#academics', deep: '#prog-me-ped' },
            { title: 'Environmental Science and Engineering (PG)', section: 'Academics', text: 'M.Tech. in Environmental Science and Engineering (NBA Accredited).', anchor: '#academics', deep: '#prog-evs' },
            { title: 'Industry and Safety Engineering (PG)', section: 'Academics', text: 'M.E. in Industry and Safety Engineering  (NBA Accredited).', anchor: '#academics', deep: '#prog-ise' },
            { title: 'Mentorship Program', section: 'Mentorship & Innovation', text: 'Industry-Academia Bridge, workshops, internships, projects.', anchor: '#mentorship', deep: '#mentor-bridge' },
            { title: 'Innovation & Research Center', section: 'Mentorship & Innovation', text: 'Research labs, incubation, competitions, collaborations.', anchor: '#mentorship', deep: '#innovation-center' },
            { title: 'Placements & Careers', section: 'Placements', text: '95% placement rate, top recruiters, statistics.', anchor: '#placement' },
            { title: 'Top Recruiters', section: 'Placements', text: 'Microsoft, Google, Apple, Infosys, TCS, IBM, Tata Motors, Amazon.', anchor: '#placement' },
            { title: 'News: Annual Tech Summit 2025', section: 'News & Events', text: 'Technology event with leaders, workshops, innovation challenges.', anchor: '#news', deep: '#news-tech-summit' },
            { title: 'Campus Life', section: 'Campus', text: 'Library, graduation ceremony, student activities, sports, labs.', anchor: '#campus' },
            { title: 'Campus: Central Library', section: 'Campus', text: 'World-class central library.', anchor: '#campus', deep: '#campus-library' },
            { title: 'Campus: Graduation Ceremony', section: 'Campus', text: 'Convocation and celebrations.', anchor: '#campus', deep: '#campus-graduation' },
            { title: 'Campus: Student Activities', section: 'Campus', text: 'Student clubs and activities.', anchor: '#campus', deep: '#campus-students' },
            { title: 'Campus: Sports Facilities', section: 'Campus', text: 'Sports and fitness infrastructure.', anchor: '#campus', deep: '#campus-sports' },
            { title: 'Campus: Research Lab', section: 'Campus', text: 'Advanced research laboratories.', anchor: '#campus', deep: '#campus-lab' },
            { title: 'About DSCET', section: 'About', text: 'Premier institution, excellence in education, research, innovation.', anchor: '#about' },
            { title: 'Contact Us', section: 'Contact', text: 'Address, phone, email, social links, message form.', anchor: '#contact' }
        ];
        // Expose site index for other modules (chat) to use
        try { window.__SITE_INDEX = index; } catch (_) {}

        let activeIndex = -1;
        const maxResults = 8;

        function normalize(str) { return str.toLowerCase(); }
        function escapeHtml(str) {
            return str.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch] || ch));
        }
        function highlight(text, query) {
            const idx = normalize(text).indexOf(normalize(query));
            if (idx === -1 || !query) return escapeHtml(text);
            const before = escapeHtml(text.slice(0, idx));
            const match = escapeHtml(text.slice(idx, idx + query.length));
            const after = escapeHtml(text.slice(idx + query.length));
            return `${before}<span class="search-highlight">${match}</span>${after}`;
        }
        function render(results, query) {
            if (!results.length) {
                resultsEl.classList.add('d-none');
                resultsEl.innerHTML = '';
                return;
            }
            resultsEl.innerHTML = results.map((r, i) => `
                <a class="search-result-item${i===activeIndex?' active':''}" role="option" data-anchor="${r.deep || r.anchor}" href="${r.deep || r.anchor}">
                    <div class="search-result-title">${highlight(r.title, query)}</div>
                    <div class="search-result-meta">${r.section} • ${highlight(r.text, query)}</div>
                </a>
            `).join('');
            resultsEl.classList.remove('d-none');
        }
        function search(query) {
            const q = normalize(query.trim());
            if (!q) { resultsEl.classList.add('d-none'); resultsEl.innerHTML=''; activeIndex = -1; return; }
            const results = index
                .map(item => {
                    const hay = `${item.title} ${item.section} ${item.text}`.toLowerCase();
                    const score = hay.includes(q) ? (item.title.toLowerCase().includes(q) ? 2 : 1) : 0;
                    return { item, score };
                })
                .filter(x => x.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, maxResults)
                .map(x => x.item);
            activeIndex = 0;
            render(results, query);
        }
        function navigate(delta) {
            const items = Array.from(resultsEl.querySelectorAll('.search-result-item'));
            if (!items.length) return;
            activeIndex = (activeIndex + delta + items.length) % items.length;
            items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
        function goToActive() {
            const active = resultsEl.querySelector('.search-result-item.active') || resultsEl.querySelector('.search-result-item');
            if (!active) return;
            const href = active.getAttribute('href');
            const anchor = document.querySelector(href);
            if (anchor) {
                resultsEl.classList.add('d-none');
                window.scrollTo({ top: anchor.offsetTop - 80, behavior: 'smooth' });
                input.blur();
            } else {
                window.location.hash = href;
            }
        }

        // Debounced input handler to improve performance
        let searchTimer = null;
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (searchTimer) clearTimeout(searchTimer);
            searchTimer = setTimeout(() => search(value), 150);
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); navigate(1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); navigate(-1); }
            else if (e.key === 'Enter') { e.preventDefault(); goToActive(); }
            else if (e.key === 'Escape') { resultsEl.classList.add('d-none'); }
        });
        document.addEventListener('click', (e) => {
            if (!resultsEl.contains(e.target) && e.target !== input) {
                resultsEl.classList.add('d-none');
            }
        });
        resultsEl.addEventListener('click', (e) => {
            const link = e.target.closest('.search-result-item');
            if (!link) return;
            e.preventDefault();
            const href = link.getAttribute('href');
            const anchor = document.querySelector(href);
            if (anchor) {
                resultsEl.classList.add('d-none');
                window.scrollTo({ top: anchor.offsetTop - 80, behavior: 'smooth' });
            } else {
                window.location.hash = href;
            }
        });
    })();

    // Upcoming Events React widget
    (function() {
        const rootEl = document.getElementById('UpcomingEventsRoot');
        if (!rootEl || !window.React || !window.ReactDOM) return;

        const e = React.createElement;

        function monthAbbrev(dateStr) {
            return new Date(dateStr).toLocaleString('en-US', { month: 'short' }).toUpperCase();
        }
        function dayNum(dateStr) {
            return String(new Date(dateStr).getDate()).padStart(2, '0');
        }

        const EVENTS = [
            { id: 'event-workshop', title: 'Industry Connect Workshop', date: '2025-09-25T14:00:00', time: '2:00 PM - 5:00 PM', venue: 'Seminar Hall', desc: 'Emerging technologies with experts from Microsoft and Google.', cta: { href: 'https://www.dscet.ac.in/events.php', label: 'Register' } },
            { id: 'event-symposium', title: 'Research Symposium', date: '2025-10-03T09:00:00', time: '9:00 AM - 4:00 PM', venue: 'Research Center', desc: 'Annual research symposium showcasing student and faculty innovations.', cta: { href: 'https://www.dscet.ac.in/events.php', label: 'Details' } }
        ];

        function useEventsState() {
            const [query, setQuery] = React.useState('');
            const [sort, setSort] = React.useState('asc');
            const [expandedId, setExpandedId] = React.useState(EVENTS[0]?.id || null);
            const filtered = React.useMemo(() => {
                const q = query.trim().toLowerCase();
                const base = EVENTS.filter(ev => `${ev.title} ${ev.venue} ${ev.desc}`.toLowerCase().includes(q));
                base.sort((a,b) => (new Date(a.date) - new Date(b.date)) * (sort === 'asc' ? 1 : -1));
                return base;
            }, [query, sort]);
            return { query, setQuery, sort, setSort, expandedId, setExpandedId, filtered };
        }

        function EventItem({ ev, expanded, onToggle }) {
            return e('div', { className: `event-item ${expanded ? 'expanded' : ''}` },
                e('div', { className: 'event-header', onClick: onToggle },
                    e('div', { className: 'event-main' },
                        e('div', { className: 'event-date-badge' },
                            e('div', { className: 'day' }, dayNum(ev.date)),
                            e('div', { className: 'mon' }, monthAbbrev(ev.date))
                        ),
                        e('div', null,
                            e('h6', { id: ev.id, className: 'event-title mb-0' }, ev.title),
                            e('div', { className: 'event-meta' }, `${ev.time} | ${ev.venue}`)
                        )
                    ),
                    e('div', { className: 'text-muted' }, expanded ? e('i', { className: 'fas fa-chevron-up' }) : e('i', { className: 'fas fa-chevron-down' }))
                ),
                e('div', { className: 'event-details' },
                    e('p', null, ev.desc),
                    e('div', { className: 'event-actions' },
                        e('a', { href: ev.cta.href, className: 'btn cta-btn btn-sm' }, ev.cta.label),
                        e('a', { href: `#${ev.id}`, className: 'btn cta-btn outline btn-sm' }, 'Copy Link')
                    )
                )
            );
        }

        function EventsWidget() {
            const { query, setQuery, sort, setSort, expandedId, setExpandedId, filtered } = useEventsState();
            React.useEffect(() => {
                // Auto-expand the first result when filtering
                if (filtered.length && !filtered.find(ev => ev.id === expandedId)) {
                    setExpandedId(filtered[0].id);
                }
            }, [query, sort]);
            return e(React.Fragment, null,
                e('div', { className: 'events-controls' },
                    e('input', { type: 'search', placeholder: 'Search events...', value: query, onChange: e2 => setQuery(e2.target.value), 'aria-label': 'Search upcoming events' }),
                    e('select', { value: sort, onChange: e2 => setSort(e2.target.value), 'aria-label': 'Sort by date' },
                        e('option', { value: 'asc' }, 'Soonest'),
                        e('option', { value: 'desc' }, 'Latest')
                    )
                ),
                e('div', { className: 'event-list' },
                    filtered.map(ev => e(EventItem, {
                        key: ev.id,
                        ev,
                        expanded: ev.id === expandedId,
                        onToggle: () => setExpandedId(prev => prev === ev.id ? null : ev.id)
                    }))
                )
            );
        }

        const root = ReactDOM.createRoot(rootEl);
        root.render(e(EventsWidget));
    })();
});

// Enhanced Dropdown Navigation Functions
function toggleSubMenu(element) {
    const subMenu = element.parentElement.querySelector('.sub-menu');
    if (subMenu) {
        subMenu.classList.toggle('active');
        
        // Close other open submenus
        document.querySelectorAll('.sub-menu').forEach(menu => {
            if (menu !== subMenu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    }
}

// Initialize dropdown behavior
function initDropdowns() {
    // Desktop hover behavior
    if (window.innerWidth > 768) {
        const navItems = document.querySelectorAll('.nav-item.has-submenu');
        
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const subMenu = this.querySelector('.sub-menu');
                if (subMenu) {
                    subMenu.classList.add('active');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const subMenu = this.querySelector('.sub-menu');
                if (subMenu) {
                    subMenu.classList.remove('active');
                }
            });
        });
    }
    
    // Mobile touch behavior
    const subMenuToggles = document.querySelectorAll('.sub-menu-toggle');
    subMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSubMenu(this);
        });
    });
    
    // Close submenus when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-item.has-submenu')) {
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile behavior
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}

// Enhanced navigation smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close any open submenus
                document.querySelectorAll('.sub-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                
                // Smooth scroll to target
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                window.location.hash = this.getAttribute('href');
            }
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initDropdowns();
    initSmoothScrolling();
});