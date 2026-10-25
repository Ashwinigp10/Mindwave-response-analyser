/**
 * MindWave Adaptive Screening Engine
 * 
 * context-specific branching logic for Bipolar Disorder and Schizophrenia assessments.
 *
 * Age Groups calibrated from 6 to 50+:
 * - '6-12': Pediatric / Child
 * - '13-17': Adolescent / Teen
 * - '18-25': Young Adult / Early Career
 * - '26-39': Working Adult / Career & Family
 * - '40-49': Mid-Life Adult / Experienced Professional
 * - '50+': Senior Adult / Late Career & Retirement
 */

// ============================================================================
// 1. AGE GROUPS CONFIGURATION (From 6 to 50+)
// ============================================================================
export const AGE_GROUPS = [
  {
    id: '6-12',
    label: '6–12 years',
    title: 'Child',
    badge: 'Pediatric Tier',
    description: 'Child-friendly language, family and classroom developmental milestones.'
  },
  {
    id: '13-17',
    label: '13–17 years',
    title: 'Adolescent',
    badge: 'Teen Tier',
    description: 'Teenage experiences, school environment, peer dynamics and early puberty.'
  },
  {
    id: '18-25',
    label: '18–25 years',
    title: 'Young Adult',
    badge: 'Young Adult Tier',
    description: 'College, vocational transitions, early career and peak onset exploration.'
  },
  {
    id: '26-39',
    label: '26–39 years',
    title: 'Working Adult',
    badge: 'Career & Family Tier',
    description: 'Career building, workplace demands, family responsibilities, and lifestyle patterns.'
  },
  {
    id: '40-49',
    label: '40–49 years',
    title: 'Mid-Life Adult',
    badge: 'Experienced Professional Tier',
    description: 'Senior workplace leadership, family caregiving, stress load, and sleep changes.'
  },
  {
    id: '50+',
    label: '50+ years',
    title: 'Senior Adult',
    badge: 'Mature & Retirement Tier',
    description: 'Late career, transition to retirement, cognitive health, and community life.'
  }
];

// ============================================================================
// 2. OCCUPATION MAPPING BY AGE GROUP
// ============================================================================
export const OCCUPATIONS_BY_AGE = {
  '6-12': [
    { id: 'school_student', label: 'School Student', desc: 'Attending primary or elementary school' },
    { id: 'homeschool', label: 'Homeschool / Alternative Learning', desc: 'Home-based schooling or tutoring' },
    { id: 'sports_arts', label: 'Sports / Arts / Music Student', desc: 'Active in athletics, music, or creative arts' },
    { id: 'other', label: 'Other Activities', desc: 'Other daily childhood activities' }
  ],
  '13-17': [
    { id: 'school_hs_student', label: 'High School / Secondary Student', desc: 'Secondary school, high school, or junior college' },
    { id: 'vocational_training', label: 'Vocational / Apprentice Student', desc: 'Trade school, technical skills, apprenticeships' },
    { id: 'student_part_time', label: 'Student with Part-Time Job', desc: 'Balancing school with part-time work' },
    { id: 'creative_athlete', label: 'Competitive Sports / Creative Arts', desc: 'Intensive training in athletics or performing arts' },
    { id: 'other', label: 'Other', desc: 'Other daily pursuits or home study' }
  ],
  '18-25': [
    { id: 'college_student', label: 'College / University Student', desc: 'Undergraduate or graduate higher education' },
    { id: 'software_it', label: 'Software / IT / Tech', desc: 'Software engineering, tech support, web development, data' },
    { id: 'healthcare_worker', label: 'Healthcare Worker / Nursing', desc: 'Clinical care, nursing, medical support' },
    { id: 'teaching_education', label: 'Teaching / Education / Tutor', desc: 'Academic tutoring, school assistant, teaching' },
    { id: 'corporate_employee', label: 'Corporate / Office Employee', desc: 'Sales, marketing, operations, business analysis, admin' },
    { id: 'business_entrepreneur', label: 'Business / Freelance / Startup', desc: 'Freelancer, startup founder, independent business' },
    { id: 'creative_media', label: 'Creative / Media / Design', desc: 'Design, writing, art, digital content creation' },
    { id: 'skilled_manual_worker', label: 'Skilled Trades / Technician', desc: 'Electrician, mechanic, construction, culinary, logistics' },
    { id: 'job_seeker', label: 'Job Seeker / Exploring Career', desc: 'Actively searching for career opportunities' },
    { id: 'other', label: 'Other', desc: 'Other occupations or daily roles' }
  ],
  '26-39': [
    { id: 'software_it', label: 'Software / IT Professional', desc: 'Senior developer, devops, data science, IT management' },
    { id: 'healthcare_professional', label: 'Healthcare Professional', desc: 'Doctor, nurse, pharmacist, clinical therapist' },
    { id: 'corporate_employee', label: 'Corporate Manager / Employee', desc: 'Corporate management, finance, HR, consulting' },
    { id: 'teacher_professor', label: 'Teacher / Professor', desc: 'School educator, college lecturer, researcher' },
    { id: 'business_entrepreneur', label: 'Business Owner / Entrepreneur', desc: 'Managing enterprise, retail, commercial business' },
    { id: 'government_employee', label: 'Government / Public Sector', desc: 'Civil services, administration, public safety' },
    { id: 'skilled_manual_worker', label: 'Skilled Trades / Engineering', desc: 'Civil technician, manufacturing, logistics, mechanics' },
    { id: 'creative_media', label: 'Creative / Media / Designer', desc: 'Architect, writer, art director, multimedia' },
    { id: 'homemaker_caregiver', label: 'Homemaker / Caregiver', desc: 'Managing home and primary family caregiving' },
    { id: 'job_seeker', label: 'Job Seeker / Career Transition', desc: 'Pivoting career paths or seeking new employment' },
    { id: 'other', label: 'Other', desc: 'Other profession' }
  ],
  '40-49': [
    { id: 'corporate_executive', label: 'Corporate Executive / Senior Leader', desc: 'Senior director, VP, enterprise manager, finance head' },
    { id: 'healthcare_specialist', label: 'Healthcare Specialist / Doctor', desc: 'Senior physician, surgeon, medical director' },
    { id: 'software_tech_lead', label: 'Software / Tech Architecture Lead', desc: 'Principal architect, tech director, IT consultant' },
    { id: 'academic_professor', label: 'Professor / Senior Educator', desc: 'Senior academic, department head, school principal' },
    { id: 'business_owner', label: 'Business Owner / Enterprise Head', desc: 'Established enterprise, manufacturing, retail owner' },
    { id: 'government_officer', label: 'Government Officer / Public Service', desc: 'Senior civil service, policy, judiciary, law enforcement' },
    { id: 'skilled_contractor', label: 'Senior Trades / Contractor', desc: 'Master tradesman, site contractor, engineering inspector' },
    { id: 'homemaker_family', label: 'Homemaker / Family Caregiver', desc: 'Caring for teen children and aging parents' },
    { id: 'independent_consultant', label: 'Independent Consultant / Specialist', desc: 'Advisory, legal, consulting, advisory practice' },
    { id: 'other', label: 'Other', desc: 'Other professional role' }
  ],
  '50+': [
    { id: 'senior_executive', label: 'Senior Professional / Executive', desc: 'Senior advisor, director, managing partner' },
    { id: 'healthcare_veteran', label: 'Healthcare Veteran / Senior Clinician', desc: 'Consultant physician, medical director, supervisor' },
    { id: 'retired', label: 'Retired / Semi-Retired', desc: 'Enjoying post-career lifestyle, hobbies, volunteering' },
    { id: 'business_owner', label: 'Business Owner / Director', desc: 'Overseeing enterprise or family business operations' },
    { id: 'educator_mentor', label: 'Educator / Mentor / Professor Emeritus', desc: 'Teaching, academic mentorship, advisory' },
    { id: 'public_servant', label: 'Public Servant / Civil Leader', desc: 'Community leadership, public committee, administration' },
    { id: 'homemaker_grandparent', label: 'Homemaker / Family Caregiver', desc: 'Home management, grandparent care, family coordination' },
    { id: 'craftsman_artisan', label: 'Artisan / Craftsman / Hobbyist', desc: 'Woodworking, gardening, arts, creative hobbies' },
    { id: 'other', label: 'Other', desc: 'Other daily lifestyle or role' }
  ]
};

// ============================================================================
// 3. CONTEXTUAL FOLLOW-UP QUESTION GENERATOR
// ============================================================================
export const CONTEXTUAL_QUESTION_TEMPLATES = {
  energy_impact: {
    school_student: 'Did this change affect your schoolwork, classroom focus, homework, or interactions with teachers?',
    homeschool: 'Did this change affect your daily study schedule, focus on tasks, or family routine?',
    sports_arts: 'Did this surge in energy make you overtrain, act erratically during practice, or clash with coaches?',
    school_hs_student: 'Did this change affect your classes, exam preparation, homework, or attendance?',
    vocational_training: 'Did this change affect your practical workshops, skill training, attendance, or concentration?',
    student_part_time: 'Did this change create conflict between your work shifts, study deadlines, and stamina?',
    college_student: 'Did this change affect your studies, assignments, lectures, attendance, or concentration?',
    software_it: 'Did this change affect your code quality, concentration during technical tasks, or team deadlines?',
    healthcare_worker: 'Did this change impact your patient care alertness, shift endurance, or clinical routine?',
    healthcare_professional: 'Did this change strain your clinical decision-making, patient rounds, or hospital shifts?',
    teaching_education: 'Did this change affect your classroom management, lesson planning, or patience with students?',
    teacher_professor: 'Did this change affect your lecture delivery, student guidance, grading, or academic research?',
    corporate_employee: 'Did this change affect your work performance, meeting engagement, deadlines, or colleague collaboration?',
    corporate_manager: 'Did this change affect your managerial judgment, team delegation, or project delivery?',
    corporate_executive: 'Did this surge influence strategic board decisions, corporate negotiations, or management stability?',
    business_entrepreneur: 'Did this change lead to hasty business decisions, overspending, or unpredictable commitments?',
    business_owner: 'Did this change cause unpredictable financial investments, staffing friction, or erratic deals?',
    government_employee: 'Did this change affect your official protocol, regulatory casework, or departmental duties?',
    government_officer: 'Did this change affect policy deliberations, inter-agency communication, or administrative duties?',
    skilled_manual_worker: 'Did this change affect your physical safety, machine operation, or quality of manual craftsmanship?',
    skilled_contractor: 'Did this change lead to taking on unmanageable project loads or workplace safety issues?',
    creative_media: 'Did this surge cause manic artistic output followed by severe exhaustion or missed client briefs?',
    homemaker_caregiver: 'Did this change disrupt household routines, meal prep, or patience with children/dependents?',
    homemaker_family: 'Did this affect your capacity to balance household management, children, and elderly care?',
    homemaker_grandparent: 'Did this surge make your home environment chaotic or strain family relationships?',
    job_seeker: 'Did this change lead to erratic job applications, missing interviews, or disruptive daily rhythms?',
    retired: 'Did this unexpected energy surge disrupt your peaceful daily routine, sleep rhythm, or health management?',
    other: 'Did this change affect your primary daily routines, responsibilities, or concentration?'
  },

  mood_shift_impact: {
    school_student: 'Did these mood changes cause friction with friends, teachers, or parents during daily activities?',
    homeschool: 'Did these mood changes make it difficult to follow learning goals or get along with family at home?',
    sports_arts: 'Did sudden mood swings disrupt team harmony, performances, or feedback from instructors?',
    school_hs_student: 'Did these mood shifts interfere with your study routine, exam preparation, or friendships?',
    vocational_training: 'Did these mood shifts affect your focus during hands-on training sessions or peer collaboration?',
    student_part_time: 'Did mood volatility create tension at your workplace or cause you to fall behind in classes?',
    college_student: 'Did these mood shifts interfere with your study routine, examinations, assignments, or campus social life?',
    software_it: 'Did these mood shifts affect your patience during code reviews, debugging, or collaborating with your team?',
    healthcare_worker: 'Did these mood shifts strain your empathy, patient interactions, or communication with senior doctors?',
    healthcare_professional: 'Did these mood shifts strain your focus during patient consultations, clinical decisions, or handovers?',
    teaching_education: 'Did these mood shifts make it harder to maintain patience and emotional steadiness in class?',
    teacher_professor: 'Did these mood shifts make it harder to manage student guidance, departmental meetings, or research?',
    corporate_employee: 'Did these mood shifts impact your workplace relationships, email communications, or meeting demeanor?',
    corporate_executive: 'Did rapid mood changes affect executive negotiations, investor trust, or leadership presence?',
    business_entrepreneur: 'Did these mood shifts influence critical business decisions, client relationships, or financial commitments?',
    business_owner: 'Did unpredictable mood swings create friction with business partners, key clients, or long-term staff?',
    government_employee: 'Did these mood shifts affect your public interactions, administrative paperwork, or team coordination?',
    government_officer: 'Did sudden shifts in mood disrupt formal proceedings, public stakeholder trust, or team morale?',
    skilled_manual_worker: 'Did sudden irritability or mood swings cause workplace arguments or dangerous lapses in concentration?',
    skilled_contractor: 'Did mood volatility lead to disputes with subcontractors, clients, or construction delays?',
    creative_media: 'Did these mood swings cause creative burnout, broken client relationships, or abandoned projects?',
    homemaker_caregiver: 'Did these mood swings create emotional tension at home or strain your caregiving patience?',
    homemaker_family: 'Did these mood swings create friction with family members or leave you emotionally depleted?',
    homemaker_grandparent: 'Did these mood shifts diminish your emotional peace, warmth with family, or daily contentment?',
    job_seeker: 'Did these mood shifts diminish your confidence during job interviews or discourage your search efforts?',
    retired: 'Did these mood shifts diminish your peace of mind, social hobbies, or daily relaxation rhythm?',
    other: 'Did these mood shifts disrupt your essential daily activities, productivity, or relationships?'
  },

  perception_impact: {
    school_student: 'Did these unusual sights, sounds, or feelings make you feel scared or confused in class or at home?',
    homeschool: 'Did these unusual sensations distract you from your lessons or make you feel uneasy in your own home?',
    sports_arts: 'Did unexpected sensations, sounds, or shadows distract you during practice or competitions?',
    school_hs_student: 'Did these perceptual experiences distract you during classes, homework, or hanging out with friends?',
    vocational_training: 'Did these experiences make it hard to concentrate on practical workshop tasks or machine operation?',
    student_part_time: 'Did unusual sensory experiences cause anxiety while working your shift or studying late?',
    college_student: 'Did these experiences distract you during lectures, studying in libraries, or writing exams?',
    software_it: 'Did these experiences interfere with your ability to focus on complex technical problem-solving or screen work?',
    healthcare_worker: 'Did these sensory distortions create fear or distraction while carrying out hospital responsibilities?',
    healthcare_professional: 'Did these experiences cause distress while managing clinical duties, patient care, or hospital environments?',
    teaching_education: 'Did these experiences make it difficult to stay fully attentive and present during teaching sessions?',
    teacher_professor: 'Did these sensory anomalies distract you while lecturing or reviewing scholarly work?',
    corporate_employee: 'Did these experiences affect your concentration during office meetings, presentations, or report writing?',
    corporate_executive: 'Did unexpected sensory distortions make it hard to remain focused during high-stakes meetings?',
    business_entrepreneur: 'Did these experiences interfere with your confidence in negotiations, client meetings, or operations?',
    business_owner: 'Did these unusual experiences create self-doubt during executive business meetings or daily management?',
    government_employee: 'Did these experiences cause distraction while reviewing official documentation or attending public duties?',
    government_officer: 'Did unexpected perceptual experiences create intense stress during official public responsibilities?',
    skilled_manual_worker: 'Did these experiences cause safety concerns or distraction while operating machinery or working on site?',
    skilled_contractor: 'Did these visual or auditory distractions create safety concerns while inspecting job sites or machinery?',
    creative_media: 'Did these experiences disrupt your creative focus, writing flow, or ability to meet client briefs?',
    homemaker_caregiver: 'Did these experiences create distress while managing home safety or looking after family members?',
    homemaker_family: 'Did these sensory experiences make you feel unsafe at home or distracted while caring for family?',
    homemaker_grandparent: 'Did strange sensory occurrences create anxiety when alone at home or in neighborhood settings?',
    job_seeker: 'Did these experiences create extra stress or difficulty during job interviews and professional outreach?',
    retired: 'Did these experiences interfere with your quiet daily routine, reading, or feeling secure in your home?',
    other: 'Did these experiences make your everyday activities or public interactions feel challenging?'
  },

  thought_control_impact: {
    school_student: 'Did these thoughts make you worry that classmates or others were secretly against you?',
    homeschool: 'Did these thoughts make it difficult to trust people around you or feel safe in your study space?',
    sports_arts: 'Did feelings of suspicion or being watched make you doubt your teammates, teachers, or friends?',
    school_hs_student: 'Did these thoughts make you feel that other students or teachers were talking about you or judging you?',
    vocational_training: 'Did these thoughts cause friction or difficulty when working alongside peers and instructors?',
    student_part_time: 'Did thoughts of being talked about or targeted make you want to avoid work shifts or school classes?',
    college_student: 'Did these thoughts make it hard to focus during classes or cause mistrust with classmates or professors?',
    software_it: 'Did these thoughts make you second-guess digital communications, feel monitored, or lose focus on code?',
    healthcare_worker: 'Did feelings of suspicion make it hard to trust shift handovers or communication with coworkers?',
    healthcare_professional: 'Did these thoughts interfere with your confidence in clinical team discussions or patient notes?',
    teaching_education: 'Did these thoughts make you feel undue suspicion or stress when interacting with staff or students?',
    teacher_professor: 'Did these thoughts create feelings of mistrust with department colleagues or hinder academic focus?',
    corporate_employee: 'Did these thoughts cause worry about coworkers\' motives, meeting anxiety, or cognitive exhaustion?',
    corporate_executive: 'Did persistent mistrust of board members, colleagues, or partners interfere with sound leadership?',
    business_entrepreneur: 'Did these thoughts make you suspicious of partners, clients, or standard business contracts?',
    business_owner: 'Did feelings of sabotage or mistrust strain your relationships with business associates or staff?',
    government_employee: 'Did these thoughts cause concern regarding workplace trust, official memos, or team relations?',
    government_officer: 'Did feelings of surveillance or conspiracy interfere with your administrative clarity and peace of mind?',
    skilled_manual_worker: 'Did these thoughts distract you from workplace safety procedures or coworker communication?',
    skilled_contractor: 'Did suspicion of workers or suppliers cause friction, delays, or communication breakdowns?',
    creative_media: 'Did these thoughts hinder your clarity of expression or confidence in sharing creative work?',
    homemaker_caregiver: 'Did these thoughts make you feel unsettled at home or strain your relationships with family members?',
    homemaker_family: 'Did feelings of mistrust isolate you from family members or neighbors you used to trust?',
    homemaker_grandparent: 'Did worries about being monitored or deceived make you withdraw from family and community life?',
    job_seeker: 'Did these thoughts make you feel skeptical of job opportunities or anxious during interview assessments?',
    retired: 'Did these thoughts make it difficult to feel relaxed at home or interact comfortably with neighbors and friends?',
    other: 'Did these thoughts make it difficult to feel secure and clear-minded in your everyday environment?'
  }
};

/**
 * Dynamically resolves the follow-up question text tailored to the user's selected or custom profession.
 */
export function getContextualQuestionText(contextType, occupationId, customProfessionName = '') {
  const categoryTemplates = CONTEXTUAL_QUESTION_TEMPLATES[contextType] || CONTEXTUAL_QUESTION_TEMPLATES.energy_impact;
  
  // If user entered a custom profession, generate a custom sentence
  if (customProfessionName && customProfessionName.trim()) {
    const prof = customProfessionName.trim();
    if (contextType === 'energy_impact') {
      return `Did this change affect your performance, focus, deadlines, or daily responsibilities as a ${prof}?`;
    }
    if (contextType === 'mood_shift_impact') {
      return `Did these mood shifts create friction, stress, or communication difficulties in your work as a ${prof}?`;
    }
    if (contextType === 'perception_impact') {
      return `Did these unusual sensations or distractions interfere with your ability to focus on your duties as a ${prof}?`;
    }
    if (contextType === 'thought_control_impact') {
      return `Did these intrusive thoughts or feelings of suspicion make it difficult to feel confident and secure in your role as a ${prof}?`;
    }
  }

  return categoryTemplates[occupationId] || categoryTemplates['other'] || categoryTemplates['corporate_employee'];
}

// ============================================================================
// 4. BIPOLAR ADAPTIVE QUESTIONS (Calibrated for 6-12, 13-17, 18-25, 26-39, 40-49, 50+)
// ============================================================================

export const BIPOLAR_ADAPTIVE_QUESTIONS = {
  // ── Child Tier (6–12) ──
  '6-12': [
    {
      id: 'bp_child_1',
      category: 'bipolar',
      domain: 'Energy & Activity Level',
      text: 'I have periods where I feel an explosion of wild energy and I cannot sit still or calm down, even when asked to.',
      audioText: 'I have periods where I feel an explosion of wild energy and I cannot sit still or calm down, even when asked to.',
      followUp: { id: 'bp_child_1_sleep', text: 'During these energetic days, did you stay awake very late without feeling tired at all the next morning?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_2',
      category: 'bipolar',
      domain: 'Sleep Architecture & Restlessness',
      text: 'I can sleep for just a couple of hours and still jump out of bed feeling 100% awake and full of energy.',
      audioText: 'I can sleep for just a couple of hours and still jump out of bed feeling 100% awake and full of energy.',
      followUp: { id: 'bp_child_2_bed', text: 'Did you get out of bed in the middle of the night to play or do things because you had so much energy?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_3',
      category: 'bipolar',
      domain: 'Cognitive Speed & Racing Thoughts',
      text: 'My thoughts feel like a runaway roller coaster, jumping rapidly from one exciting idea to another.',
      audioText: 'My thoughts feel like a runaway roller coaster, jumping rapidly from one exciting idea to another.',
      followUp: { id: 'bp_child_3_speech', text: 'Did friends, teachers, or family members say that you were talking so fast they could hardly understand you?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_4',
      category: 'bipolar',
      domain: 'Speech Pressure & Interruption',
      text: 'I talk so fast and loud that others cannot interrupt me, and I find it almost impossible to wait for my turn.',
      audioText: 'I talk so fast and loud that others cannot interrupt me, and I find it almost impossible to wait for my turn.',
      followUp: { id: 'bp_child_4_blurting', text: 'Did you constantly blurt out answers in class or interrupt grown-ups without meaning to?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_5',
      category: 'bipolar',
      domain: 'Emotional Volatility & Irritability',
      text: 'My feelings switch in an instant from laughing and super happy to having intense anger or crying over small things.',
      audioText: 'My feelings switch in an instant from laughing and super happy to having intense anger or crying over small things.',
      followUp: { id: 'bp_child_5_temper', text: 'Did you have explosive temper tantrums or scream when someone asked you to stop what you were doing?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_child_6',
      category: 'bipolar',
      domain: 'Grandiosity & Belief in Special Powers',
      text: 'I sometimes believe I have special superpowers or that I am far smarter and more important than all other kids.',
      audioText: 'I sometimes believe I have special superpowers or that I am far smarter and more important than all other kids.',
      followUp: { id: 'bp_child_6_powers', text: 'Did you try to do dangerous things like jumping from high places believing you could not be hurt?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_7',
      category: 'bipolar',
      domain: 'Impulsive & Risky Choices',
      text: 'I do daring, risky things on the playground or at home without thinking at all about getting hurt or in trouble.',
      audioText: 'I do daring, risky things on the playground or at home without thinking at all about getting hurt or in trouble.',
      followUp: { id: 'bp_child_7_trouble', text: 'Did your actions lead to being disciplined, sent to the office, or breaking things?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_child_8',
      category: 'bipolar',
      domain: 'Crash into Deep Sadness & Fatigue',
      text: 'After days of being super energetic, I suddenly crash into feeling exhausted, sad, and wanting to hide from everyone.',
      audioText: 'After days of being super energetic, I suddenly crash into feeling exhausted, sad, and wanting to hide from everyone.',
      followUp: { id: 'bp_child_8_hiding', text: 'Did you lose all interest in your favorite games and just want to sleep or cry?' },
      contextType: 'mood_shift_impact'
    }
  ],

  // ── Teen Tier (13–17) ──
  '13-17': [
    {
      id: 'bp_teen_1',
      category: 'bipolar',
      domain: 'Elevated Energy & Euphoria',
      text: 'I experience distinct phases where I feel on top of the world, invincible, and significantly more energetic than normal.',
      audioText: 'I experience distinct phases where I feel on top of the world, invincible, and significantly more energetic than normal.',
      followUp: { id: 'bp_teen_1_hyper', text: 'Did this surge last for several days in a row without fading?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_2',
      category: 'bipolar',
      domain: 'Decreased Need for Sleep',
      text: 'I can stay up until 3 or 4 AM studying, texting, or planning, and still wake up early feeling completely energized.',
      audioText: 'I can stay up until 3 or 4 AM studying, texting, or planning, and still wake up early feeling completely energized.',
      followUp: { id: 'bp_teen_2_fatigue', text: 'Did you go multiple days on minimal sleep without feeling sleepy during school hours?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_3',
      category: 'bipolar',
      domain: 'Flight of Ideas & Racing Thoughts',
      text: 'My mind moves so rapidly that ideas collide into each other, making it hard to follow a single train of thought.',
      audioText: 'My mind moves so rapidly that ideas collide into each other, making it hard to follow a single train of thought.',
      followUp: { id: 'bp_teen_3_pacing', text: 'Did you feel the physical urge to pace around or start five new projects at once?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_4',
      category: 'bipolar',
      domain: 'Pressured Speech & Verbosity',
      text: 'I catch myself talking non-stop, dominating conversations, and getting frustrated when others cannot keep up with me.',
      audioText: 'I catch myself talking non-stop, dominating conversations, and getting frustrated when others cannot keep up with me.',
      followUp: { id: 'bp_teen_4_arguments', text: 'Did friends or family tell you that your speech felt intense or argumentative?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_5',
      category: 'bipolar',
      domain: 'Severe Irritability & Low Frustration Tolerance',
      text: 'I become suddenly enraged or agitated by small interruptions that would usually never bother me.',
      audioText: 'I become suddenly enraged or agitated by small interruptions that would usually never bother me.',
      followUp: { id: 'bp_teen_5_snapping', text: 'Did you lash out, slam doors, or post aggressive messages online that you later regretted?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_teen_6',
      category: 'bipolar',
      domain: 'Impulsive Spending & Reckless Behavior',
      text: 'I engage in impulsive, reckless choices like spending all my money, risky driving, or breaking school/family rules.',
      audioText: 'I engage in impulsive, reckless choices like spending all my money, risky driving, or breaking school/family rules.',
      followUp: { id: 'bp_teen_6_regret', text: 'Did you look back at these decisions with shock or regret once your mood stabilized?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_7',
      category: 'bipolar',
      domain: 'Grandiosity & Unrealistic Plans',
      text: 'I become convinced that I am destined for sudden fame or that I have unlocked secrets that teachers and peers don\'t understand.',
      audioText: 'I become convinced that I am destined for sudden fame or that I have unlocked secrets that teachers and peers don\'t understand.',
      followUp: { id: 'bp_teen_7_conviction', text: 'Did you disregard advice from people you trust because you felt completely superior?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_teen_8',
      category: 'bipolar',
      domain: 'Depressive Collapse & Severe Fatigue',
      text: 'These periods of high energy are followed by weeks of emotional darkness, zero energy, and struggling to even get out of bed.',
      audioText: 'These periods of high energy are followed by weeks of emotional darkness, zero energy, and struggling to even get out of bed.',
      followUp: { id: 'bp_teen_8_grades', text: 'Did your school attendance, grades, or friendships suffer significantly during these lows?' },
      contextType: 'mood_shift_impact'
    }
  ],

  // ── Young Adult Tier (18–25) ──
  '18-25': [
    {
      id: 'bp_ya_1',
      category: 'bipolar',
      domain: 'Elevated Mood & Hyper-Productivity',
      text: 'I have distinct periods where I feel exceptionally high, energetic, and capable of achieving anything without fatigue.',
      audioText: 'I have distinct periods where I feel exceptionally high, energetic, and capable of achieving anything without fatigue.',
      followUp: { id: 'bp_ya_1_days', text: 'Did this elevated state persist for at least 3–4 consecutive days?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_2',
      category: 'bipolar',
      domain: 'Drastically Decreased Sleep Need',
      text: 'I need much less sleep than usual (e.g. 2–3 hours) and still feel fully alert, sharp, and energized throughout the day.',
      audioText: 'I need much less sleep than usual (e.g. 2–3 hours) and still feel fully alert, sharp, and energized throughout the day.',
      followUp: { id: 'bp_ya_2_insomnia', text: 'Did you stay up all night coding, studying, or working without feeling tired the next afternoon?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_3',
      category: 'bipolar',
      domain: 'Accelerated Cognition & Multitasking',
      text: 'My thoughts race so quickly that I start multiple ambitious projects simultaneously, struggling to focus on just one.',
      audioText: 'My thoughts race so quickly that I start multiple ambitious projects simultaneously, struggling to focus on just one.',
      followUp: { id: 'bp_ya_3_unfinished', text: 'Did you leave many ambitious initiatives unfinished once your energy level shifted?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_4',
      category: 'bipolar',
      domain: 'Pressured, Rapid Speech',
      text: 'I talk much more rapidly and urgently than usual, making it difficult for colleagues, peers, or friends to interrupt me.',
      audioText: 'I talk much more rapidly and urgently than usual, making it difficult for colleagues, peers, or friends to interrupt me.',
      followUp: { id: 'bp_ya_4_interrupted', text: 'Did people remark that your conversational tempo felt overwhelming or unusual?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_5',
      category: 'bipolar',
      domain: 'Irritability & Emotional Friction',
      text: 'I become unusually irritable, impatient, and agitated when others move or think more slowly than I do.',
      audioText: 'I become unusually irritable, impatient, and agitated when others move or think more slowly than I do.',
      followUp: { id: 'bp_ya_5_clashes', text: 'Did this trigger workplace arguments, relationship strain, or abrupt confrontations?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_ya_6',
      category: 'bipolar',
      domain: 'Impulsive Financial & Lifestyle Choices',
      text: 'I spend excessive money, take big uncalculated risks, or make hasty romantic/career decisions during high-energy episodes.',
      audioText: 'I spend excessive money, take big uncalculated risks, or make hasty romantic/career decisions during high-energy episodes.',
      followUp: { id: 'bp_ya_6_consequences', text: 'Did these financial or personal choices lead to significant debt or regret?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_7',
      category: 'bipolar',
      domain: 'Grandiosity & Inflated Self-Esteem',
      text: 'I feel far more powerful, brilliant, or uniquely gifted than everyone around me, believing I cannot fail.',
      audioText: 'I feel far more powerful, brilliant, or uniquely gifted than everyone around me, believing I cannot fail.',
      followUp: { id: 'bp_ya_7_dismissive', text: 'Did you dismiss sound guidance from advisors, managers, or professors because you felt superior?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_ya_8',
      category: 'bipolar',
      domain: 'Depressive Rebound & Functional Impairment',
      text: 'Following these high phases, I sink into prolonged periods of severe low mood, cognitive fog, and inability to meet daily demands.',
      audioText: 'Following these high phases, I sink into prolonged periods of severe low mood, cognitive fog, and inability to meet daily demands.',
      followUp: { id: 'bp_ya_8_missed', text: 'Did you miss exams, work shifts, or isolate yourself completely during these lows?' },
      contextType: 'mood_shift_impact'
    }
  ],

  // ── Adult Tier (26–39) ──
  '26-39': [
    {
      id: 'bp_adult_1',
      category: 'bipolar',
      domain: 'Hypomanic / Manic Energy & Drive',
      text: 'I go through distinct periods where my energy, confidence, and physical drive surge to extraordinary, intense levels.',
      audioText: 'I go through distinct periods where my energy, confidence, and physical drive surge to extraordinary, intense levels.',
      followUp: { id: 'bp_adult_1_intensity', text: 'Did this period of elevated drive persist continuously for 4 days or more?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_2',
      category: 'bipolar',
      domain: 'Marked Sleep Efficiency Alteration',
      text: 'I can function on 2 to 3 hours of sleep per night for days on end without experiencing daytime fatigue or grogginess.',
      audioText: 'I can function on 2 to 3 hours of sleep per night for days on end without experiencing daytime fatigue or grogginess.',
      followUp: { id: 'bp_adult_2_wired', text: 'Did you feel completely "wired" and unable to wind down even when laying in bed?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_3',
      category: 'bipolar',
      domain: 'Hyper-Focus & Racing Ideation',
      text: 'My mental processing accelerates dramatically, generating countless business, creative, or organizational ideas in rapid succession.',
      audioText: 'My mental processing accelerates dramatically, generating countless business, creative, or organizational ideas in rapid succession.',
      followUp: { id: 'bp_adult_3_multitasking', text: 'Did you commit to more tasks, meetings, or ventures than you could realistically sustain?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_4',
      category: 'bipolar',
      domain: 'High-Velocity Speech & Impatience',
      text: 'I speak with intense velocity and find it difficult to listen patiently when others speak at normal speeds.',
      audioText: 'I speak with intense velocity and find it difficult to listen patiently when others speak at normal speeds.',
      followUp: { id: 'bp_adult_4_workplace', text: 'Did coworkers, clients, or family express concern over your heightened intensity?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_5',
      category: 'bipolar',
      domain: 'Workplace & Interpersonal Volatility',
      text: 'I become easily triggered into sudden anger, irritability, or confrontation when projects or people do not move at my pace.',
      audioText: 'I become easily triggered into sudden anger, irritability, or confrontation when projects or people do not move at my pace.',
      followUp: { id: 'bp_adult_5_consequences', text: 'Did these bursts of irritability jeopardize professional partnerships or personal relationships?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_adult_6',
      category: 'bipolar',
      domain: 'High-Stakes Impulsivity & Risk',
      text: 'I make rash financial, investment, business, or lifestyle commitments that I would never entertain during baseline mood.',
      audioText: 'I make rash financial, investment, business, or lifestyle commitments that I would never entertain during baseline mood.',
      followUp: { id: 'bp_adult_6_damage', text: 'Did you suffer financial strain, legal complications, or severe personal regret as a result?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_7',
      category: 'bipolar',
      domain: 'Inflated Authority & Grandiosity',
      text: 'I feel an overwhelming sense of infallible authority or superior insight that makes me ignore cautionary feedback from peers.',
      audioText: 'I feel an overwhelming sense of infallible authority or superior insight that makes me ignore cautionary feedback from peers.',
      followUp: { id: 'bp_adult_7_dismissal', text: 'Did you disregard critical business, medical, or legal risks due to feeling bulletproof?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_adult_8',
      category: 'bipolar',
      domain: 'Bipolar Depressive Shift & Burnout',
      text: 'These surges inevitably collapse into profound depressive episodes characterized by apathy, exhaustion, and executive dysfunction.',
      audioText: 'These surges inevitably collapse into profound depressive episodes characterized by apathy, exhaustion, and executive dysfunction.',
      followUp: { id: 'bp_adult_8_dysfunction', text: 'Did this depression impair your ability to work, manage family duties, or maintain self-care?' },
      contextType: 'mood_shift_impact'
    }
  ],

  // ── Mid-Life Tier (40–49) ──
  '40-49': [
    {
      id: 'bp_mid_1',
      category: 'bipolar',
      domain: 'Sustained Elevation in Energy & Agitation',
      text: 'I experience extended periods of intense, hyper-charged energy accompanied by an urgent internal drive that feels impossible to calm.',
      audioText: 'I experience extended periods of intense, hyper-charged energy accompanied by an urgent internal drive that feels impossible to calm.',
      followUp: { id: 'bp_mid_1_physical', text: 'Did you feel physical restlessness, chest tension, or a compulsive urge to keep working?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_mid_2',
      category: 'bipolar',
      domain: 'Sleep Disruption Without Fatigue',
      text: 'I sleep as little as 3 hours per night for several nights consecutively, yet wake up without daytime drowsiness or cognitive slowdown.',
      audioText: 'I sleep as little as 3 hours per night for several nights consecutively, yet wake up without daytime drowsiness or cognitive slowdown.',
      followUp: { id: 'bp_mid_2_chronic', text: 'Did your family or partner notice this drastic drop in your need for rest?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_mid_3',
      category: 'bipolar',
      domain: 'Over-Commitment & Grandiose Ventures',
      text: 'I launch into massive life changes, uncalculated financial investments, or overwhelming commitments with absolute certainty of success.',
      audioText: 'I launch into massive life changes, uncalculated financial investments, or overwhelming commitments with absolute certainty of success.',
      followUp: { id: 'bp_mid_3_loss', text: 'Did these commitments create serious financial, professional, or domestic complications later on?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_mid_4',
      category: 'bipolar',
      domain: 'Pressured Communication & Agitation',
      text: 'My conversation feels urgent, commanding, and relentless, causing others to comment that I am uncharacteristically intense.',
      audioText: 'My conversation feels urgent, commanding, and relentless, causing others to comment that I am uncharacteristically intense.',
      followUp: { id: 'bp_mid_4_strain', text: 'Did this create friction with long-time colleagues, direct reports, or family members?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_mid_5',
      category: 'bipolar',
      domain: 'Short Fuse & Irritability Under Stress',
      text: 'I experience explosive irritability or rage over minor procedural delays or family disagreements that normally wouldn\'t bother me.',
      audioText: 'I experience explosive irritability or rage over minor procedural delays or family disagreements that normally wouldn\'t bother me.',
      followUp: { id: 'bp_mid_5_damage', text: 'Did you later feel deep regret or have to apologize for uncharacteristic outbursts?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_mid_6',
      category: 'bipolar',
      domain: 'Depressive Paralysis & Chronic Fatigue',
      text: 'Following high-energy periods, I suffer from debilitating depressive spells where even basic professional and family duties feel overwhelming.',
      audioText: 'Following high-energy periods, I suffer from debilitating depressive spells where even basic professional and family duties feel overwhelming.',
      followUp: { id: 'bp_mid_6_absence', text: 'Did you need to take sick leave, cancel commitments, or withdraw from all social interaction?' },
      contextType: 'mood_shift_impact'
    }
  ],

  // ── Senior Tier (50+) ──
  '50+': [
    {
      id: 'bp_senior_1',
      category: 'bipolar',
      domain: 'Uncharacteristic Energy Surges',
      text: 'I have periods where I feel an unexpected surge of high physical energy, restless agitation, and an urge to constantly stay busy.',
      audioText: 'I have periods where I feel an unexpected surge of high physical energy, restless agitation, and an urge to constantly stay busy.',
      followUp: { id: 'bp_senior_1_restless', text: 'Did you find it impossible to sit quietly, relax, or read without feeling compelled to move?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_senior_2',
      category: 'bipolar',
      domain: 'Drastic Sleep Pattern Alteration',
      text: 'I find myself sleeping only 3 to 4 hours, waking up before dawn with racing energy and no need for naps or rest.',
      audioText: 'I find myself sleeping only 3 to 4 hours, waking up before dawn with racing energy and no need for naps or rest.',
      followUp: { id: 'bp_senior_2_wired', text: 'Did this unusual sleep pattern continue for several days without making you physically fatigued?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_senior_3',
      category: 'bipolar',
      domain: 'Racing Thoughts & Hyper-Talkativeness',
      text: 'My thoughts jump rapidly between distant memories and new schemes, and I find myself talking continually without pauses.',
      audioText: 'My thoughts jump rapidly between distant memories and new schemes, and I find myself talking continually without pauses.',
      followUp: { id: 'bp_senior_3_noticing', text: 'Did close family, neighbors, or friends comment that you seemed unusually worked up or agitated?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_senior_4',
      category: 'bipolar',
      domain: 'Impulsive Decisions with Savings/Assets',
      text: 'During these elevated times, I made sudden, large purchases, gave away funds impulsively, or altered estate/financial plans.',
      audioText: 'During these elevated times, I made sudden, large purchases, gave away funds impulsively, or altered estate/financial plans.',
      followUp: { id: 'bp_senior_4_regret', text: 'Did family members express deep concern about these unusual financial or life decisions?' },
      contextType: 'energy_impact'
    },
    {
      id: 'bp_senior_5',
      category: 'bipolar',
      domain: 'Heightened Irritability & Agitation',
      text: 'I become uncharacteristically snappy, impatient, and agitated by daily routines or family interactions that I normally enjoy.',
      audioText: 'I become uncharacteristically snappy, impatient, and agitated by daily routines or family interactions that I normally enjoy.',
      followUp: { id: 'bp_senior_5_alienation', text: 'Did this cause you to argue with loved ones or feel misunderstood by people close to you?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'bp_senior_6',
      category: 'bipolar',
      domain: 'Severe Depressive Drop & Isolation',
      text: 'These energetic phases give way to prolonged, heavy sadness where I lose all interest in daily activities and feel physically slowed down.',
      audioText: 'These energetic phases give way to prolonged, heavy sadness where I lose all interest in daily activities and feel physically slowed down.',
      followUp: { id: 'bp_senior_6_daily', text: 'Did you struggle with basic chores, self-care, or getting out of bed during these down periods?' },
      contextType: 'mood_shift_impact'
    }
  ]
};

// ============================================================================
// 5. SCHIZOPHRENIA ADAPTIVE QUESTIONS (Calibrated for 6-12, 13-17, 18-25, 26-39, 40-49, 50+)
// ============================================================================

export const SCHIZOPHRENIA_ADAPTIVE_QUESTIONS = {
  // ── Child Tier (6–12) ──
  '6-12': [
    {
      id: 'sc_child_1',
      category: 'schizophrenia',
      domain: 'Auditory Perception & Whispers',
      text: 'I hear whispers, murmurs, or my name being called when no one is around or when nobody in the room is speaking.',
      audioText: 'I hear whispers, murmurs, or my name being called when no one is around or when nobody in the room is speaking.',
      followUp: { id: 'sc_child_1_distress', text: 'Did these sounds sound as clear as a real person speaking right next to your ear?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_child_2',
      category: 'schizophrenia',
      domain: 'Visual Shadows & Movement',
      text: 'I often see shadows, figures, or movement in the corner of my eye that disappear when I turn to look directly.',
      audioText: 'I often see shadows, figures, or movement in the corner of my eye that disappear when I turn to look directly.',
      followUp: { id: 'sc_child_2_scared', text: 'Did these figures or shadows make you feel frightened to be in your room or bathroom alone?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_child_3',
      category: 'schizophrenia',
      domain: 'Thought Privacy & Mind Reading',
      text: 'I worry that other people can hear what I am thinking inside my head, or that my thoughts are somehow leaking out.',
      audioText: 'I worry that other people can hear what I am thinking inside my head, or that my thoughts are somehow leaking out.',
      followUp: { id: 'sc_child_3_protect', text: 'Did you try to block your thoughts or cover your ears so others could not read your mind?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_child_4',
      category: 'schizophrenia',
      domain: 'Suspicion & Feeling Watched',
      text: 'I get a strong feeling that people at school, strangers, or cameras are secretly watching me or plotting against me.',
      audioText: 'I get a strong feeling that people at school, strangers, or cameras are secretly watching me or plotting against me.',
      followUp: { id: 'sc_child_4_checking', text: 'Did you repeatedly check behind doors, windows, or ask parents if you were in danger?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_child_5',
      category: 'schizophrenia',
      domain: 'Unusual Somatic & Tactile Sensations',
      text: 'I feel strange sensations on my skin like invisible bugs crawling, tingling, or electric touches with no physical reason.',
      audioText: 'I feel strange sensations on my skin like invisible bugs crawling, tingling, or electric touches with no physical reason.',
      followUp: { id: 'sc_child_5_scratching', text: 'Did you keep scratching or checking your skin because the feeling felt so real?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_child_6',
      category: 'schizophrenia',
      domain: 'Reality Confusion & Vivid Illusions',
      text: 'I sometimes get confused about whether things I remembered actually happened or were vivid dreams or made-up tricks.',
      audioText: 'I sometimes get confused about whether things I remembered actually happened or were vivid dreams or made-up tricks.',
      followUp: { id: 'sc_child_6_asking', text: 'Did you need to keep asking parents or teachers to tell you what was real and what was not?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_child_7',
      category: 'schizophrenia',
      domain: 'Loss of Emotional Connection',
      text: 'I have days where I feel completely empty inside and cannot smile, laugh, or care about playing with friends at all.',
      audioText: 'I have days where I feel completely empty inside and cannot smile, laugh, or care about playing with friends at all.',
      followUp: { id: 'sc_child_7_recess', text: 'Did you sit by yourself during recess or lunch because you felt completely disconnected?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_child_8',
      category: 'schizophrenia',
      domain: 'Cognitive Noise & Concentration Collapse',
      text: 'My mind feels so noisy and jammed with competing thoughts that I can\'t understand what teachers or parents are saying.',
      audioText: 'My mind feels so noisy and jammed with competing thoughts that I can\'t understand what teachers or parents are saying.',
      followUp: { id: 'sc_child_8_frozen', text: 'Did you feel frozen or overwhelmed in school because of all the mental noise?' },
      contextType: 'thought_control_impact'
    }
  ],

  // ── Teen Tier (13–17) ──
  '13-17': [
    {
      id: 'sc_teen_1',
      category: 'schizophrenia',
      domain: 'Auditory Anomalies & Murmuring',
      text: 'I hear unexplained sounds, whispers, footsteps, or muffled voices when nobody else is around to hear them.',
      audioText: 'I hear unexplained sounds, whispers, footsteps, or muffled voices when nobody else is around to hear them.',
      followUp: { id: 'sc_teen_1_intelligible', text: 'Were the voices saying words or commenting on what you were doing at that moment?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_teen_2',
      category: 'schizophrenia',
      domain: 'Visual Distortions & Anomalous Figures',
      text: 'I see fleeting shadows, figures, flashes of light, or geometric patterns that others confirm are not physically present.',
      audioText: 'I see fleeting shadows, figures, flashes of light, or geometric patterns that others confirm are not physically present.',
      followUp: { id: 'sc_teen_2_frequent', text: 'Did this happen during normal daylight hours while studying or sitting with others?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_teen_3',
      category: 'schizophrenia',
      domain: 'Thought Broadcasting & Lack of Mental Privacy',
      text: 'I frequently experience the unsettling sensation that my private thoughts are somehow broadcasted or accessible to others.',
      audioText: 'I frequently experience the unsettling sensation that my private thoughts are somehow broadcasted or accessible to others.',
      followUp: { id: 'sc_teen_3_reactions', text: 'Did you scrutinize people’s facial expressions convinced they were reacting to your thoughts?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_teen_4',
      category: 'schizophrenia',
      domain: 'Ideas of Reference & Social Paranoia',
      text: 'I become convinced that strangers, song lyrics, online posts, or classmates are exchanging subtle coded messages about me.',
      audioText: 'I become convinced that strangers, song lyrics, online posts, or classmates are exchanging subtle coded messages about me.',
      followUp: { id: 'sc_teen_4_targeted', text: 'Did you avoid certain hallways, social media apps, or gatherings out of fear of being targeted?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_teen_5',
      category: 'schizophrenia',
      domain: 'Thought Insertion & External Influence',
      text: 'I experience thoughts entering my mind that feel completely foreign, intrusive, and not generated by my own consciousness.',
      audioText: 'I experience thoughts entering my mind that feel completely foreign, intrusive, and not generated by my own consciousness.',
      followUp: { id: 'sc_teen_5_source', text: 'Did it feel as if an outside force, device, or person was placing ideas directly into your brain?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_teen_6',
      category: 'schizophrenia',
      domain: 'Tactile, Thermal & Somatic Aberrations',
      text: 'I feel strange physical sensations like unexplainable electrical zaps, burning, or phantom touches across my body.',
      audioText: 'I feel strange physical sensations like unexplainable electrical zaps, burning, or phantom touches across my body.',
      followUp: { id: 'sc_teen_6_medical', text: 'Did you consult a nurse or doctor only to be told there was no physical medical explanation?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_teen_7',
      category: 'schizophrenia',
      domain: 'Emotional Flattening & Social Alienation',
      text: 'I feel an intense emotional numbness, finding it hard to feel joy, empathy, or connection even with my closest friends.',
      audioText: 'I feel an intense emotional numbness, finding it hard to feel joy, empathy, or connection even with my closest friends.',
      followUp: { id: 'sc_teen_7_withdrawal', text: 'Did you stop replying to texts, drop hobbies, and retreat entirely into your bedroom?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_teen_8',
      category: 'schizophrenia',
      domain: 'Cognitive Filtering Breakdown',
      text: 'My brain feels unable to filter out background noises and extraneous thoughts, leading to severe confusion and cognitive fatigue.',
      audioText: 'My brain feels unable to filter out background noises and extraneous thoughts, leading to severe confusion and cognitive fatigue.',
      followUp: { id: 'sc_teen_8_grades', text: 'Did this cognitive overload cause your school grades or ability to complete homework to plummet?' },
      contextType: 'thought_control_impact'
    }
  ],

  // ── Young Adult Tier (18–25) ──
  '18-25': [
    {
      id: 'sc_ya_1',
      category: 'schizophrenia',
      domain: 'Auditory Verbal Hallucinations',
      text: 'I hear distinct voices, running commentary, or whispering when alone or in quiet spaces that have no physical origin.',
      audioText: 'I hear distinct voices, running commentary, or whispering when alone or in quiet spaces that have no physical origin.',
      followUp: { id: 'sc_ya_1_content', text: 'Did the voices speak in full sentences, argue with one another, or give you commands?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_ya_2',
      category: 'schizophrenia',
      domain: 'Visual Distortions & Illusions',
      text: 'I see shapes, humanoid figures, or distortions in the environment that other people verify do not exist.',
      audioText: 'I see shapes, humanoid figures, or distortions in the environment that other people verify do not exist.',
      followUp: { id: 'sc_ya_2_daylight', text: 'Did these visual distortions occur in well-lit settings as well as during night hours?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_ya_3',
      category: 'schizophrenia',
      domain: 'Thought Broadcasting & Porous Mental Boundaries',
      text: 'I struggle with the terrifying conviction that my internal thoughts are being transmitted, heard, or monitored by people around me.',
      audioText: 'I struggle with the terrifying conviction that my internal thoughts are being transmitted, heard, or monitored by people around me.',
      followUp: { id: 'sc_ya_3_monitored', text: 'Did you change your behavior or avoid public transit/classes because you felt mentally exposed?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_ya_4',
      category: 'schizophrenia',
      domain: 'Persecutory Ideation & Surveillance Conviction',
      text: 'I have persistent feelings that a group, organization, or individuals are surveilling me, targeting me, or plotting harm.',
      audioText: 'I have persistent feelings that a group, organization, or individuals are surveilling me, targeting me, or plotting harm.',
      followUp: { id: 'sc_ya_4_precautions', text: 'Did you tape over cameras, switch phone numbers, or alter routes due to fear of surveillance?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_ya_5',
      category: 'schizophrenia',
      domain: 'Thought Insertion & External Control',
      text: 'I experience foreign thoughts or urges being forcibly implanted into my mind by an external power or entity.',
      audioText: 'I experience foreign thoughts or urges being forcibly implanted into my mind by an external power or entity.',
      followUp: { id: 'sc_ya_5_agency', text: 'Did you feel that your movements or thoughts were partially puppeted by an outside force?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_ya_6',
      category: 'schizophrenia',
      domain: 'Aberrant Somatosensory & Olfactory Experiences',
      text: 'I perceive unusual chemical, burning, or rotting smells, or odd electrical/fluid movements inside my body with no medical cause.',
      audioText: 'I perceive unusual chemical, burning, or rotting smells, or odd electrical/fluid movements inside my body with no medical cause.',
      followUp: { id: 'sc_ya_6_poison', text: 'Did these sensations lead you to suspect that food, water, or the air was poisoned or contaminated?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_ya_7',
      category: 'schizophrenia',
      domain: 'Severe Avolition & Emotional Blunting',
      text: 'I experience a profound loss of motivation, emotional warmth, and the ability to derive pleasure from any social or vocational activity.',
      audioText: 'I experience a profound loss of motivation, emotional warmth, and the ability to derive pleasure from any social or vocational activity.',
      followUp: { id: 'sc_ya_7_hygiene', text: 'Did basic grooming, preparing meals, or leaving your room become exhausting and neglected?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_ya_8',
      category: 'schizophrenia',
      domain: 'Cognitive Disorganization & Speech Derailment',
      text: 'My thought process becomes fragmented, disorganized, or blocked, making it difficult to construct coherent sentences or focus.',
      audioText: 'My thought process becomes fragmented, disorganized, or blocked, making it difficult to construct coherent sentences or focus.',
      followUp: { id: 'sc_ya_8_confusion', text: 'Did peers, professors, or coworkers mention that your explanations were jumbled or confusing?' },
      contextType: 'thought_control_impact'
    }
  ],

  // ── Adult Tier (26–39) ──
  '26-39': [
    {
      id: 'sc_adult_1',
      category: 'schizophrenia',
      domain: 'Auditory Hallucinations & Whispers',
      text: 'I perceive auditory voices, whispers, or running commentary regarding my actions when alone in workplace or domestic settings.',
      audioText: 'I perceive auditory voices, whispers, or running commentary regarding my actions when alone in workplace or domestic settings.',
      followUp: { id: 'sc_adult_1_critical', text: 'Were the voices critical, demanding, or threatening toward you or others?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_adult_2',
      category: 'schizophrenia',
      domain: 'Visual Anomalies & Complex Illusions',
      text: 'I see unexplained human figures, shifting shadows, or structural distortions in my physical environment.',
      audioText: 'I see unexplained human figures, shifting shadows, or structural distortions in my physical environment.',
      followUp: { id: 'sc_adult_2_reassurance', text: 'Did you need to repeatedly ask coworkers or family if they saw what you were seeing?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_adult_3',
      category: 'schizophrenia',
      domain: 'Thought Broadcasting & Mental Intrusion',
      text: 'I experience the profound, disturbing belief that my private thoughts are leaking out and being accessed by coworkers, family, or strangers.',
      audioText: 'I experience the profound, disturbing belief that my private thoughts are leaking out and being accessed by coworkers, family, or strangers.',
      followUp: { id: 'sc_adult_3_protection', text: 'Did this make you withdraw from workplace meetings, social gatherings, or digital devices?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_adult_4',
      category: 'schizophrenia',
      domain: 'Persecutory Ideation & Workplace Paranoia',
      text: 'I hold an intense suspicion that coworkers, organizations, or individuals are covertly conspiring to ruin my career, reputation, or safety.',
      audioText: 'I hold an intense suspicion that coworkers, organizations, or individuals are covertly conspiring to ruin my career, reputation, or safety.',
      followUp: { id: 'sc_adult_4_confront', text: 'Did you lodge formal complaints or confront people based on these persistent suspicions?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_adult_5',
      category: 'schizophrenia',
      domain: 'Delusional Control & External Agency',
      text: 'I feel that an outside technology, agency, or force is controlling my muscles, emotions, or thought processes against my will.',
      audioText: 'I feel that an outside technology, agency, or force is controlling my muscles, emotions, or thought processes against my will.',
      followUp: { id: 'sc_adult_5_signals', text: 'Did you believe electronic waves, frequencies, or microchips were influencing your brain?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_adult_6',
      category: 'schizophrenia',
      domain: 'Aberrant Chemical / Somatic Sensations',
      text: 'I smell persistent chemical, metallic, or poisonous odors, or feel strange crawling/burning sensations that have no physical source.',
      audioText: 'I smell persistent chemical, metallic, or poisonous odors, or feel strange crawling/burning sensations that have no physical source.',
      followUp: { id: 'sc_adult_6_investigate', text: 'Did you discard food, change locks, or hire environmental inspectors to find the source?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_adult_7',
      category: 'schizophrenia',
      domain: 'Avolition & Social Anhedonia',
      text: 'I struggle with emotional detachment, lack of empathy, and profound inability to maintain professional responsibilities or friendships.',
      audioText: 'I struggle with emotional detachment, lack of empathy, and profound inability to maintain professional responsibilities or friendships.',
      followUp: { id: 'sc_adult_7_isolate', text: 'Did you become completely isolated and neglect key household, financial, or personal duties?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_adult_8',
      category: 'schizophrenia',
      domain: 'Cognitive Fragmentation & Executive Collapse',
      text: 'My thought processing frequently gets blocked, fragmented, or lost mid-sentence, destroying my ability to manage complex tasks.',
      audioText: 'My thought processing frequently gets blocked, fragmented, or lost mid-sentence, destroying my ability to manage complex tasks.',
      followUp: { id: 'sc_adult_8_work', text: 'Did this cognitive breakdown cause you to fall behind on deadlines or jeopardize your employment?' },
      contextType: 'thought_control_impact'
    }
  ],

  // ── Mid-Life Tier (40–49) ──
  '40-49': [
    {
      id: 'sc_mid_1',
      category: 'schizophrenia',
      domain: 'Auditory Perceptual Intrusion',
      text: 'I hear whispering, muttering, or distinct voices making derogatory remarks or discussing my private life when nobody is near.',
      audioText: 'I hear whispering, muttering, or distinct voices making derogatory remarks or discussing my private life when nobody is near.',
      followUp: { id: 'sc_mid_1_walls', text: 'Did the sounds seem to come from through walls, vents, or from empty rooms in your home or office?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_mid_2',
      category: 'schizophrenia',
      domain: 'Complex Visual Perceptual Distortions',
      text: 'I see figures, shadows, or altered faces in my surroundings that vanish when scrutinized directly.',
      audioText: 'I see figures, shadows, or altered faces in my surroundings that vanish when scrutinized directly.',
      followUp: { id: 'sc_mid_2_fear', text: 'Did these apparitions make you install extra locks or check security cameras repeatedly?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_mid_3',
      category: 'schizophrenia',
      domain: 'Pervasive Surveillance & Sabotage Fears',
      text: 'I am convinced that neighbors, colleagues, or authorities are monitoring my communications, finances, or family movements.',
      audioText: 'I am convinced that neighbors, colleagues, or authorities are monitoring my communications, finances, or family movements.',
      followUp: { id: 'sc_mid_3_strain', text: 'Did this intense suspicion strain your relationship with your spouse, family, or long-term colleagues?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_mid_4',
      category: 'schizophrenia',
      domain: 'Thought Broadcasting & Boundary Dissolution',
      text: 'I feel that people around me are telepathically picking up on my private anxieties, thoughts, or internal judgments.',
      audioText: 'I feel that people around me are telepathically picking up on my private anxieties, thoughts, or internal judgments.',
      followUp: { id: 'sc_mid_4_avoidance', text: 'Did this cause you to avoid professional conferences, family gatherings, or public places?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_mid_5',
      category: 'schizophrenia',
      domain: 'Loss of Emotional Warmth & Apathy',
      text: 'I feel detached, emotionally cold, and unable to connect affectionately with my children, partner, or friends.',
      audioText: 'I feel detached, emotionally cold, and unable to connect affectionately with my children, partner, or friends.',
      followUp: { id: 'sc_mid_5_flat', text: 'Have loved ones told you that you appear emotionally distant, expressionless, or like a stranger?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_mid_6',
      category: 'schizophrenia',
      domain: 'Cognitive Disconnection & Overload',
      text: 'I experience episodes where my mind goes completely blank, thoughts freeze, and I cannot process basic written or spoken words.',
      audioText: 'I experience episodes where my mind goes completely blank, thoughts freeze, and I cannot process basic written or spoken words.',
      followUp: { id: 'sc_mid_6_workplace', text: 'Did this cognitive freezing make it impossible to handle administrative, executive, or household tasks?' },
      contextType: 'thought_control_impact'
    }
  ],

  // ── Senior Tier (50+) ──
  '50+': [
    {
      id: 'sc_senior_1',
      category: 'schizophrenia',
      domain: 'Auditory Murmurs & Perceptual Shifts',
      text: 'I hear music, voices, whispering, or tapping sounds in the home when the house is completely quiet and others hear nothing.',
      audioText: 'I hear music, voices, whispering, or tapping sounds in the home when the house is completely quiet and others hear nothing.',
      followUp: { id: 'sc_senior_1_searching', text: 'Did you repeatedly search the house, radio, or outside windows trying to locate the source?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_senior_2',
      category: 'schizophrenia',
      domain: 'Visual Shadow Apparitions',
      text: 'I frequently see shadowy figures, people, or animals in my peripheral vision or dimly lit rooms that are not physically there.',
      audioText: 'I frequently see shadowy figures, people, or animals in my peripheral vision or dimly lit rooms that are not physically there.',
      followUp: { id: 'sc_senior_2_unsettled', text: 'Did these experiences make you feel unsafe being alone in your home?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_senior_3',
      category: 'schizophrenia',
      domain: 'Suspicion of Theft, Tampering or Harm',
      text: 'I have persistent suspicions that neighbors, caregivers, or acquaintances are secretly entering my space, taking items, or plotting against me.',
      audioText: 'I have persistent suspicions that neighbors, caregivers, or acquaintances are secretly entering my space, taking items, or plotting against me.',
      followUp: { id: 'sc_senior_3_confront', text: 'Did you change locks, hide valuables, or accuse loved ones of taking things?' },
      contextType: 'thought_control_impact'
    },
    {
      id: 'sc_senior_4',
      category: 'schizophrenia',
      domain: 'Unusual Odors & Somatosensory Sensations',
      text: 'I frequently smell foul gas, chemical odors, or burning with no physical source, or feel unusual tingling/crawling sensations on my skin.',
      audioText: 'I frequently smell foul gas, chemical odors, or burning with no physical source, or feel unusual tingling/crawling sensations on my skin.',
      followUp: { id: 'sc_senior_4_gas', text: 'Did you contact utility companies or check appliances repeatedly only to find nothing wrong?' },
      contextType: 'perception_impact'
    },
    {
      id: 'sc_senior_5',
      category: 'schizophrenia',
      domain: 'Profound Social Withdrawal & Flatness',
      text: 'I feel deeply detached from the world, with no desire to see friends, talk to children/family, or participate in past interests.',
      audioText: 'I feel deeply detached from the world, with no desire to see friends, talk to children/family, or participate in past interests.',
      followUp: { id: 'sc_senior_5_neglect', text: 'Did you stop answering the phone, leaving the home, or keeping up with medical appointments?' },
      contextType: 'mood_shift_impact'
    },
    {
      id: 'sc_senior_6',
      category: 'schizophrenia',
      domain: 'Cognitive Blocking & Reality Confusion',
      text: 'I struggle with sudden mental blocks, confusion over whether past events were real or imagined, and difficulty following conversations.',
      audioText: 'I struggle with sudden mental blocks, confusion over whether past events were real or imagined, and difficulty following conversations.',
      followUp: { id: 'sc_senior_6_confusion', text: 'Did this make managing finances, medications, or daily errands confusing and stressful?' },
      contextType: 'thought_control_impact'
    }
  ]
};

// ============================================================================
// 6. ENGINE HELPER FUNCTIONS
// ============================================================================

/**
 * Returns the adaptive question list for a specific assessment type and age tier.
 */
export function getAdaptiveQuestions(assessmentType = 'bipolar', ageGroup = '18-25') {
  const normalizedAge = AGE_GROUPS.some(g => g.id === ageGroup) ? ageGroup : '18-25';
  
  if (assessmentType === 'bipolar') {
    return BIPOLAR_ADAPTIVE_QUESTIONS[normalizedAge] || BIPOLAR_ADAPTIVE_QUESTIONS['18-25'];
  }
  return SCHIZOPHRENIA_ADAPTIVE_QUESTIONS[normalizedAge] || SCHIZOPHRENIA_ADAPTIVE_QUESTIONS['18-25'];
}

/**
 * Returns the occupations list filtered strictly for the given age group.
 */
export function getOccupationsForAge(ageGroup = '18-25') {
  return OCCUPATIONS_BY_AGE[ageGroup] || OCCUPATIONS_BY_AGE['18-25'];
}

/**
 * Calculates standardized clinical scores from user answers.
 */
export function calculateAssessmentScores(answers = [], assessmentType = 'bipolar') {
  const activeSymptomAnswers = answers.filter(a => a.answer === 'True' || a.answer === 'Yes' || a.symptom === true);
  const symptomCount = activeSymptomAnswers.length;
  
  const schizSymptoms = answers.filter(
    a => (a.category === 'schizophrenia' || a.domain?.toLowerCase().includes('perceptual') || a.domain?.toLowerCase().includes('thought') || a.domain?.toLowerCase().includes('hallucin') || a.domain?.toLowerCase().includes('auditory') || a.domain?.toLowerCase().includes('visual')) &&
         (a.answer === 'True' || a.answer === 'Yes' || a.symptom === true)
  ).length;

  const bipolarSymptoms = answers.filter(
    a => (a.category === 'bipolar' || a.domain?.toLowerCase().includes('energy') || a.domain?.toLowerCase().includes('mood') || a.domain?.toLowerCase().includes('speech') || a.domain?.toLowerCase().includes('impuls') || a.domain?.toLowerCase().includes('sleep')) &&
         (a.answer === 'True' || a.answer === 'Yes' || a.symptom === true)
  ).length;

  const totalDistress = answers.reduce((sum, a) => {
    if (a.answer === 'True' || a.answer === 'Yes' || a.symptom === true) {
      const level = typeof a.distress_level === 'number' ? a.distress_level : (typeof a.distress === 'number' ? a.distress : 2);
      return sum + level;
    }
    return sum;
  }, 0);

  return {
    symptomCount,
    schizSymptoms: assessmentType === 'bipolar' ? 0 : schizSymptoms,
    bipolarSymptoms: assessmentType === 'schizophrenia' ? 0 : bipolarSymptoms,
    totalDistress
  };
}
