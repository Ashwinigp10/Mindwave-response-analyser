// Clinical Question Sets & Age-Specific Setup Data for MindWave

export const AGE_GROUPS = [
  { id: '6-12', label: '6–12 years', title: 'Child' },
  { id: '13-18', label: '13–18 years', title: 'Adolescent' },
  { id: '19-25', label: '19–25 years', title: 'Young Adult' },
  { id: '26-31', label: '26–31 years', title: 'Early Career Adult' },
  { id: '32-36', label: '32–36 years', title: 'Working Adult' },
  { id: '37-43', label: '37–43 years', title: 'Mid-Career Adult' },
  { id: '44-50', label: '44–50 years', title: 'Experienced Professional' },
  { id: '50+', label: '50+ years', title: 'Senior Adult' }
];

export const PROFESSIONS_BY_AGE = {
  '6-12': [
    { id: 'school_student', label: 'School Student' },
    { id: 'homeschool', label: 'Homeschool / Alternative Learning' },
    { id: 'sports_arts', label: 'Sports / Arts / Music Student' },
    { id: 'other', label: 'Other Childhood Activities' }
  ],
  '13-18': [
    { id: 'school_hs_student', label: 'High School / Secondary Student' },
    { id: 'vocational_training', label: 'Vocational / Apprentice Student' },
    { id: 'student_part_time', label: 'Student with Part-Time Job' },
    { id: 'creative_athlete', label: 'Competitive Sports / Creative Arts' },
    { id: 'other', label: 'Other Student / Activities' }
  ],
  '19-25': [
    { id: 'student', label: 'Student (College / University)' },
    { id: 'software_it', label: 'Software / IT / Tech' },
    { id: 'healthcare', label: 'Healthcare / Nursing' },
    { id: 'education', label: 'Teaching / Education' },
    { id: 'corporate', label: 'Corporate / Office Employee' },
    { id: 'business', label: 'Business / Freelancer / Startup' },
    { id: 'creative', label: 'Creative / Media / Design' },
    { id: 'skilled_trades', label: 'Skilled Trades / Technician' },
    { id: 'job_seeker', label: 'Job Seeker' },
    { id: 'other', label: 'Other' }
  ],
  '26-31': [
    { id: 'software_it', label: 'Software / IT Professional' },
    { id: 'corporate', label: 'Corporate Manager / Employee' },
    { id: 'healthcare', label: 'Healthcare Professional' },
    { id: 'education', label: 'Teacher / Lecturer' },
    { id: 'business', label: 'Business Owner / Entrepreneur' },
    { id: 'public_sector', label: 'Public Sector / Civil Service' },
    { id: 'skilled_trades', label: 'Engineering / Skilled Trades' },
    { id: 'homemaker', label: 'Homemaker / Caregiver' },
    { id: 'career_transition', label: 'Career Transition / Job Seeker' },
    { id: 'other', label: 'Other' }
  ],
  '32-36': [
    { id: 'software_it', label: 'Senior Tech / IT Lead' },
    { id: 'corporate', label: 'Corporate Management / Operations' },
    { id: 'healthcare', label: 'Healthcare Specialist / Doctor' },
    { id: 'business', label: 'Business Owner / Enterprise' },
    { id: 'education', label: 'Faculty / Educator' },
    { id: 'public_sector', label: 'Government / Public Sector' },
    { id: 'skilled_trades', label: 'Senior Trades / Logistics' },
    { id: 'homemaker', label: 'Homemaker / Caregiver' },
    { id: 'other', label: 'Other' }
  ],
  '37-43': [
    { id: 'leadership', label: 'Executive / Corporate Leadership' },
    { id: 'healthcare', label: 'Senior Clinician / Healthcare Head' },
    { id: 'tech_lead', label: 'Technology Director / Architect' },
    { id: 'business', label: 'Enterprise Owner / Founder' },
    { id: 'academic', label: 'Professor / Academic Leader' },
    { id: 'public_service', label: 'Senior Public Service / Administration' },
    { id: 'consultant', label: 'Independent Consultant / Specialist' },
    { id: 'homemaker', label: 'Homemaker / Family Caregiver' },
    { id: 'other', label: 'Other' }
  ],
  '44-50': [
    { id: 'executive', label: 'Corporate Executive / VP / Director' },
    { id: 'healthcare', label: 'Senior Medical Specialist' },
    { id: 'business', label: 'Established Business Owner' },
    { id: 'academic', label: 'Dean / Senior Professor' },
    { id: 'public_service', label: 'Public Officer / Judiciary / Policy' },
    { id: 'consultant', label: 'Senior Advisor / Consultant' },
    { id: 'homemaker', label: 'Homemaker / Family Caregiver' },
    { id: 'other', label: 'Other' }
  ],
  '50+': [
    { id: 'senior_leader', label: 'Senior Professional / Director' },
    { id: 'retired', label: 'Retired / Semi-Retired' },
    { id: 'healthcare_veteran', label: 'Healthcare Veteran / Consultant' },
    { id: 'business', label: 'Business Owner / Board Member' },
    { id: 'educator_mentor', label: 'Professor Emeritus / Mentor' },
    { id: 'community', label: 'Community Leader / Public Servant' },
    { id: 'homemaker', label: 'Homemaker / Family Caregiver' },
    { id: 'artisan', label: 'Artisan / Craftsman / Hobbyist' },
    { id: 'other', label: 'Other' }
  ]
};

// ── LIFE STAGE & OCCUPATION MAPPING HELPERS ─────────────────────────────────
export function getAgeTier(ageGroup) {
  if (ageGroup === '6-12') return 'child';
  if (ageGroup === '13-18') return 'teen';
  if (ageGroup === '19-25') return 'young_adult';
  if (ageGroup === '26-31' || ageGroup === '32-36') return 'working_adult';
  if (ageGroup === '37-43' || ageGroup === '44-50') return 'mature_adult';
  if (ageGroup === '50+') return 'senior';
  return 'young_adult';
}

export function getProfCategory(profession) {
  if (!profession) return 'general';
  if (['school_student', 'school_hs_student', 'student', 'homeschool', 'student_part_time'].includes(profession)) return 'student';
  if (['software_it', 'tech_lead'].includes(profession)) return 'tech';
  if (['healthcare', 'healthcare_veteran'].includes(profession)) return 'healthcare';
  if (['corporate', 'leadership', 'executive'].includes(profession)) return 'corporate';
  if (['business'].includes(profession)) return 'business';
  if (['education', 'academic', 'educator_mentor'].includes(profession)) return 'education';
  if (['homemaker'].includes(profession)) return 'homemaker';
  if (['retired'].includes(profession)) return 'retired';
  if (['creative', 'sports_arts', 'creative_athlete', 'artisan'].includes(profession)) return 'creative';
  if (['skilled_trades', 'vocational_training'].includes(profession)) return 'trades';
  if (['public_sector', 'public_service', 'community'].includes(profession)) return 'public';
  return 'general';
}

// ── DYNAMIC PQ-16 SCHIZOPHRENIA PRODROMAL SCREENING QUESTIONS ────────────────
export function getSchizophreniaQuestions(ageGroup = '19-25', profession = 'student') {
  const age = getAgeTier(ageGroup);
  const prof = getProfCategory(profession);

  // Q1: Suspiciousness & Social Distrust
  let q1Text = "Have you felt unusually suspicious of others or felt people were talking about you behind your back?";
  if (age === 'child') {
    q1Text = "Have you felt that other children at school or in the playground are whispering about you, making fun of you, or trying to trick you?";
  } else if (age === 'teen') {
    q1Text = prof === 'student'
      ? "Have you felt paranoid that classmates, teachers, or groups on social media are secretly gossiping about you or watching you behind your back?"
      : "Have you felt that peers, teammates, or friends are talking about you behind your back or deliberately trying to isolate you?";
  } else if (prof === 'tech') {
    q1Text = "At work, have you felt unusually suspicious that colleagues, sprint teammates, or leadership are secretly monitoring you or talking about you behind your back?";
  } else if (prof === 'healthcare') {
    q1Text = "During your clinical shifts, have you felt an unusual sense that hospital colleagues or supervisors are scrutinizing your actions or whispering behind your back?";
  } else if (prof === 'corporate') {
    q1Text = "Have you felt paranoid in the office that coworkers or managers are orchestrating corporate politics against you or talking behind your back?";
  } else if (prof === 'business') {
    q1Text = "Have you felt intense suspicion that business partners, clients, or competitors are secretly conspiring against you or trying to sabotage your business?";
  } else if (prof === 'education') {
    q1Text = "Have you felt unusually distrustful that department colleagues, students, or administrators are privately criticizing or questioning you behind your back?";
  } else if (prof === 'homemaker') {
    q1Text = "At home or in your neighborhood, have you felt that neighbors, in-laws, or family members are secretly judging, watching, or talking about you?";
  } else if (age === 'senior' || prof === 'retired') {
    q1Text = "In your daily life or neighborhood, have you felt that people around you, relatives, or strangers are whispering about you or keeping secrets from you?";
  } else if (prof === 'student') {
    q1Text = "Have you felt unusually distrustful of your campus peers, roommates, or classmates, suspecting hidden motives or hostility?";
  }

  // Q2: Cognitive Focus & Attention
  let q2Text = "Have you recently experienced difficulty in concentrating on daily tasks or following conversations?";
  if (age === 'child') {
    q2Text = "Do you find it very hard to pay attention to your teacher in class, read your schoolbooks, or finish homework because your thoughts feel foggy or wander off?";
  } else if (age === 'teen' || prof === 'student') {
    q2Text = "Have you experienced sudden difficulty concentrating on exam preparation, lectures, or homework assignments, where you lose your train of thought completely?";
  } else if (prof === 'tech') {
    q2Text = "Have you struggled to concentrate on your code, system design, technical tickets, or complex logic because your thoughts feel scattered or fragmented?";
  } else if (prof === 'healthcare') {
    q2Text = "Have you experienced concerning mental lapses or difficulty maintaining focus while managing patient care, clinical notes, or medical protocols?";
  } else if (prof === 'corporate') {
    q2Text = "Have you had difficulty staying focused during strategy meetings, drafting reports, or managing your day-to-day work deliverables?";
  } else if (prof === 'business') {
    q2Text = "Have you found it hard to focus on business operations, financial figures, or negotiations because your thoughts drift or feel absent?";
  } else if (prof === 'education') {
    q2Text = "Have you found it difficult to concentrate while delivering lectures, grading coursework, or focusing on academic research?";
  } else if (prof === 'homemaker') {
    q2Text = "Have you found it unusually difficult to keep track of daily household tasks, budgeting, or family schedules because your mind feels scattered?";
  } else if (age === 'senior' || prof === 'retired') {
    q2Text = "Have you noticed growing difficulty following conversations, reading, or concentrating on daily activities you used to do effortlessly?";
  }

  // Q3: Social Motivation & Engagement
  let q3Text = "Have you experienced social withdrawal or losing interest in activities you normally enjoy?";
  if (age === 'child') {
    q3Text = "Do you want to stay away from your friends at school, stop playing games you love, and prefer sitting completely alone?";
  } else if (age === 'teen') {
    q3Text = "Have you pulled away from your friend circle, stopped participating in school clubs, gaming, or sports, preferring to isolate yourself in your room?";
  } else if (prof === 'student') {
    q3Text = "Have you withdrawn from college friends and social campus events, losing all motivation for your hobbies or future goals?";
  } else if (prof === 'homemaker') {
    q3Text = "Have you withdrawn from friends, family get-togethers, or community circles, feeling depleted and wanting to be left alone?";
  } else if (age === 'senior' || prof === 'retired') {
    q3Text = "Have you found yourself avoiding visits with family, grandchildren, or social clubs, preferring to spend days in isolation?";
  } else {
    q3Text = "Have you experienced deep withdrawal from coworkers and social networks, feeling zero desire to interact with team members or friends?";
  }

  // Q4: Emotional Expression & Flattening
  let q4Text = "Do you often feel emotionally numb or detached from your surroundings and family?";
  if (age === 'child') {
    q4Text = "Do you feel emotionally empty inside, as if you can't feel happy or sad when good or bad things happen at school or home?";
  } else if (age === 'teen') {
    q4Text = "Do you often feel completely numb or detached from your family and closest friends, unable to feel genuine joy or empathy?";
  } else if (age === 'senior' || prof === 'retired') {
    q4Text = "Do you feel emotionally distant or flat, struggling to feel warmth or emotional connection with loved ones during daily routines?";
  } else {
    q4Text = "Do you frequently feel emotionally blunted or detached from your partner, family, and workplace surroundings, as though living on autopilot?";
  }

  // Q5: Sensory Variations (Taste & Smell)
  let q5Text = "I sometimes smell or taste things that other people cannot smell or taste.";
  if (age === 'child') {
    q5Text = "Do you sometimes smell or taste strange things in your school lunch, water, or bedroom that your parents and classmates cannot smell or taste?";
  } else if (age === 'teen' || prof === 'student') {
    q5Text = "Have you experienced odd chemical, metallic, or burnt smells and tastes while studying or at home that nobody else around you notices?";
  } else if (prof === 'healthcare') {
    q5Text = "During shifts or at home, have you noticed distinct chemical, phantom smells or odd tastes that colleagues around you confirm are not present?";
  } else if (age === 'senior' || prof === 'retired') {
    q5Text = "Have you experienced unusual phantom tastes in your food or odd smells around your house that family members cannot detect?";
  } else {
    q5Text = "Have you noticed phantom tastes or strange chemical odors at your workplace or home that others present insist are not there?";
  }

  // Q6: Auditory Perception & Tones
  let q6Text = "I often hear unusual sounds like clicking, hissing, clapping, or ringing in my ears.";
  if (age === 'child') {
    q6Text = "Do you hear weird noises like buzzing, clicking, tapping on walls, or whistling in your ears when your room or classroom is quiet?";
  } else if (age === 'teen' || prof === 'student') {
    q6Text = "Do you frequently hear unusual ringing, clicking, muffled sounds, or whistling when studying in quiet rooms or trying to sleep?";
  } else if (prof === 'tech') {
    q6Text = "While working at your computer or wearing headphones, do you frequently hear phantom clicks, hissing, or tapping sounds that have no physical source?";
  } else if (age === 'senior' || prof === 'retired') {
    q6Text = "Do you frequently hear phantom clicks, hissing, or faint ringing sounds in your ears or home that have no physical source?";
  }

  // Q7: Reality Testing & Confusion
  let q7Text = "I have been confused at times whether something I experienced was real or imaginary.";
  if (age === 'child') {
    q7Text = "Have there been times when you couldn't tell if something you saw or heard was a dream, your imagination, or really happened at school or home?";
  } else if (age === 'teen' || prof === 'student') {
    q7Text = "Have you felt bewildered wondering whether a vivid event, conversation, or memory in your day was real or just created in your mind?";
  } else if (age === 'senior' || prof === 'retired') {
    q7Text = "Have you found yourself second-guessing whether something you observed or experienced in your home was actual reality or an illusion?";
  } else {
    q7Text = "Have you felt confused or questioned whether an interaction, sound, or experience during your workday was genuinely real or imaginary?";
  }

  // Q8: Visual Distortion & Facial Shifts
  let q8Text = "When I look at someone or in a mirror, I have seen the face change right before my eyes.";
  if (age === 'child') {
    q8Text = "When you look at your teacher, family, or in the bathroom mirror, have you seen their face warp, melt, or change into something scary?";
  } else if (age === 'teen' || prof === 'student') {
    q8Text = "When looking in a mirror or at people around you in school/college, have you noticed their facial features subtly shifting, morphing, or looking distorted?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q8Text = "When looking at coworkers on video calls, in person, or in the mirror, have you perceived brief distortions or shifts in facial structure?";
  } else {
    q8Text = "When looking at someone directly or in a mirror, have you experienced their face subtly shifting, warping, or distorting before your eyes?";
  }

  // Q9: Visual Perception & Shadows
  let q9Text = "I have seen shapes, shadows, or things that other people apparently cannot see.";
  if (age === 'child') {
    q9Text = "Have you seen mysterious shadows, shapes moving in the corner of your eye, or figures in your bedroom that disappear when you look?";
  } else if (age === 'teen' || prof === 'student') {
    q9Text = "Have you glimpsed figures, dark shapes, or fleeting movements in your peripheral vision while studying or relaxing that nobody else can see?";
  } else if (age === 'senior' || prof === 'retired') {
    q9Text = "Have you seen fleeting shapes, shadows, or silhouettes passing through doorways in your home that turn out to be nothing when you look directly?";
  } else {
    q9Text = "Have you caught sight of unexpected silhouettes, shadows, or fleeting movement at the edge of your vision in your workplace or home?";
  }

  // Q10: Thought Intensity & Echo
  let q10Text = "My thoughts are sometimes so intense or loud that I can almost hear them.";
  if (age === 'child') {
    q10Text = "Are your thoughts sometimes so loud in your head that you feel like someone next to you in class or at home might hear them?";
  } else if (age === 'teen' || prof === 'student') {
    q10Text = "Do your internal thoughts sometimes echo or feel so intensely loud in quiet exam halls or your room that it feels like they are spoken out loud?";
  } else {
    q10Text = "Do your thoughts sometimes feel so magnified, resonant, or loud in your mind during work or rest that you feel like they could be heard by others?";
  }

  // Q11: Ideas of Reference & Meaning
  let q11Text = "I sometimes see special hidden meanings in signs, television, or the arrangement of items around me.";
  if (age === 'child') {
    q11Text = "Do you feel that cartoons, TV shows, or classroom signs are sending secret, personal messages specifically meant for you?";
  } else if (age === 'teen' || prof === 'student') {
    q11Text = "Do you ever feel that posts on social media, song lyrics, or video feeds contain hidden personal messages specifically directed at you?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q11Text = "Have you felt that announcements, code patterns, news feeds, or incidental coincidences hold special hidden messages meant just for you?";
  } else {
    q11Text = "I sometimes see special hidden meanings or personal signs in television broadcasts, public announcements, or everyday coincidences.";
  }

  // Q12: Thought Interference & Agency
  let q12Text = "Sometimes I have felt that I am not in full control of my own ideas or thoughts.";
  if (age === 'child') {
    q12Text = "Have you ever felt like someone or something else was putting thoughts into your head or taking your thoughts away?";
  } else if (age === 'teen' || prof === 'student') {
    q12Text = "Have you felt that your private thoughts were being influenced, blocked, or controlled by an external force outside yourself?";
  } else {
    q12Text = "Sometimes I have felt that I am not in full control of my own ideas, as though external influences or forces were interfering with my mind.";
  }

  // Q13: Auditory Vocal Experiences
  let q13Text = "I have heard voices whispering or talking when nobody was around.";
  if (age === 'child') {
    q13Text = "Have you heard faint voices calling your name or whispering in the hallway or bedroom when no one is actually there?";
  } else if (age === 'teen' || prof === 'student') {
    q13Text = "Have you heard voices whispering, murmuring, or commenting on what you are doing when you are alone in your study space or room?";
  } else if (age === 'senior' || prof === 'retired') {
    q13Text = "Have you heard voices whispering or speaking words in your home when you know nobody else is present?";
  } else {
    q13Text = "Have you heard distinct voices talking, whispering, or calling out when alone at home or in your workplace?";
  }

  // Q14: Somatic & Body Sensations
  let q14Text = "I feel that parts of my body have changed in an unusual way or are not working as before.";
  if (age === 'child') {
    q14Text = "Have you felt weird feelings inside your body, like your organs moving around or strange electricity under your skin?";
  } else if (age === 'teen' || prof === 'student') {
    q14Text = "Have you experienced strange physical sensations, such as electric tingles, internal vibrations, or feeling like your body is changing unnaturally?";
  } else {
    q14Text = "I feel that parts of my body have changed in an unusual way, or experience strange internal sensations that feel foreign and unexplained.";
  }

  // Q15: Sense of External Presence
  let q15Text = "I have had a strong sense that an unseen person or force was in the room near me.";
  if (age === 'child') {
    q15Text = "Have you felt a strong, scary feeling that an invisible person or presence was standing right behind you in your bedroom or classroom?";
  } else if (age === 'teen' || prof === 'student') {
    q15Text = "Have you had an overwhelming feeling that an unseen presence, person, or entity was watching you or standing close by in the room?";
  } else {
    q15Text = "I have had a strong, undeniable sense that an unseen person, presence, or force was in the room near me even when completely alone.";
  }

  // Q16: Derealization & Detached Reality
  let q16Text = "I have had the experience of things not feeling real, or of feeling detached from my own body or self.";
  if (age === 'child') {
    q16Text = "Do things around you at school or home sometimes feel fake like a movie, or do you feel like you are floating outside your body?";
  } else if (age === 'teen' || prof === 'student') {
    q16Text = "Have you felt that your surroundings, campus, or home feel completely artificial and unreal, or felt detached from your own reflection?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q16Text = "Have you experienced episodes where your workplace, computer screen, or colleagues felt artificial, two-dimensional, or dreamlike?";
  } else {
    q16Text = "I have had the experience of things around me not feeling real, or feeling as though I am an outside observer detached from my own body.";
  }

  return [
    { id: 1, domain: "Suspiciousness & Social Distrust", text: q1Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 2, domain: "Cognitive Focus & Attention", text: q2Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 3, domain: "Social Motivation & Engagement", text: q3Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 4, domain: "Emotional Expression & Flattening", text: q4Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 5, domain: "Sensory Variations (Taste & Smell)", text: q5Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 6, domain: "Auditory Perception & Tones", text: q6Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 7, domain: "Reality Testing & Confusion", text: q7Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 8, domain: "Visual Distortion & Facial Shifts", text: q8Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 9, domain: "Visual Perception & Shadows", text: q9Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 10, domain: "Thought Intensity & Echo", text: q10Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 11, domain: "Ideas of Reference & Meaning", text: q11Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 12, domain: "Thought Interference & Agency", text: q12Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 13, domain: "Auditory Vocal Experiences", text: q13Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 14, domain: "Somatic & Body Sensations", text: q14Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 15, domain: "Sense of External Presence", text: q15Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 16, domain: "Derealization & Detached Reality", text: q16Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" }
  ];
}

// ── DYNAMIC MDQ BIPOLAR DISORDER SCREENING QUESTIONS ────────────────────────
export function getBipolarQuestions(ageGroup = '19-25', profession = 'student') {
  const age = getAgeTier(ageGroup);
  const prof = getProfCategory(profession);

  // Q1: Energy & Psychomotor Activation
  let q1Text = "Have you experienced periods where you felt so hyper, energetic, or full of energy that it was unusual for you?";
  if (age === 'child') {
    q1Text = "Have you experienced times where you felt super bouncy, hyper, running around non-stop without feeling tired at all?";
  } else if (age === 'teen' || prof === 'student') {
    q1Text = "Have you experienced periods where you felt an intense surge of energy, staying hyperactive late into the night, feeling like you could do anything?";
  } else if (prof === 'tech') {
    q1Text = "Have you had phases where you felt an extreme, non-stop surge of hyper energy, coding around the clock or brainstorming features without feeling tired?";
  } else if (prof === 'healthcare') {
    q1Text = "Have you experienced spells where you felt supercharged with intense energy during demanding hospital shifts, working at double speed without fatigue?";
  } else if (prof === 'corporate' || prof === 'business') {
    q1Text = "Have you had phases where you felt an extraordinary, unstoppable surge of drive, launching multiple initiatives at once with manic energy?";
  } else if (prof === 'homemaker') {
    q1Text = "Have you experienced periods where you felt unusually hyperactive, cleaning, reorganizing, or multitasking constantly without stopping to rest?";
  }

  // Q2: Sleep Efficiency & Decreased Need
  let q2Text = "Have you gone for days with very little sleep and still felt energized rather than tired?";
  if (age === 'child') {
    q2Text = "Have you stayed up super late or slept only a couple hours for several nights and still felt wide awake and full of energy the next morning?";
  } else if (age === 'teen' || prof === 'student') {
    q2Text = "Have you gone for consecutive days with only 2 or 3 hours of sleep for study or gaming, yet felt completely charged up rather than tired?";
  } else if (prof === 'tech') {
    q2Text = "Have you pulled multiple all-nighters working on code, needing only 2–3 hours of sleep while still feeling fully alert and energetic?";
  } else if (prof === 'homemaker') {
    q2Text = "Have you slept only a couple of hours each night while still managing the entire household at full energy without feeling tired?";
  }

  // Q3: Racing Thoughts & Flight of Ideas
  let q3Text = "Have you experienced thoughts racing so fast through your mind that you could not keep up?";
  if (age === 'child') {
    q3Text = "Do your thoughts sometimes zoom through your head like a runaway race car so fast that your words can't keep up?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q3Text = "Have you experienced racing thoughts so rapid that solutions, features, and ideas were firing faster than you could organize or communicate them?";
  } else if (prof === 'business') {
    q3Text = "Have you had moments where new business ventures, deal strategies, and marketing ideas were racing through your head at dizzying speed?";
  }

  // Q4: Grandiosity & Inflated Self-Esteem
  let q4Text = "Have you felt much more confident, invincible, or authoritative than your normal self?";
  if (age === 'child') {
    q4Text = "Have you felt like you had special powers, or felt you were much smarter and more important than all your classmates and teachers?";
  } else if (age === 'teen' || prof === 'student') {
    q4Text = "Have you felt extraordinarily gifted, destined for fame, or far superior in capability and intellect compared to teachers and classmates?";
  } else if (prof === 'tech') {
    q4Text = "Have you felt completely infallible, convinced your technical architecture and engineering vision was vastly superior to anyone on your team?";
  } else if (prof === 'business' || prof === 'corporate') {
    q4Text = "Have you felt supreme confidence, convinced your commercial plans were genius and untouchable, dismissing all warnings from colleagues?";
  }

  // Q5: Pressured Speech & Rapid Talking
  let q5Text = "Did you become unusually talkative or feel an uncontrollable urge to keep speaking rapidly?";
  if (age === 'child') {
    q5Text = "Did you find yourself talking a mile a minute so fast that friends or teachers had to tell you to slow down or stop?";
  } else if (prof === 'corporate' || prof === 'tech') {
    q5Text = "Did you notice yourself speaking rapidly and forcefully during team standups, meetings, or calls, where others struggled to interrupt?";
  }

  // Q6: Impulsivity & Spending Patterns
  let q6Text = "Have you made impulsive decisions or spent money unusually freely that later caused distress?";
  if (age === 'child') {
    q6Text = "Have you impulsively taken dangerous dares, broken rules, or spent allowance money on things you later got into big trouble for?";
  } else if (age === 'teen' || prof === 'student') {
    q6Text = "Have you made impulsive, reckless purchases, online shopping sprees, or taken big financial risks that later created serious regret?";
  } else if (prof === 'tech' || prof === 'business' || prof === 'corporate') {
    q6Text = "Have you made rash investments, high-risk financial commitments, or extravagant spending sprees that later caused distress?";
  } else if (prof === 'homemaker') {
    q6Text = "Have you gone on sudden impulsive shopping sprees or made large unneeded purchases that strained your family budget?";
  }

  // Q7: Goal-Directed Multitasking
  let q7Text = "Do you start multiple ambitious projects at once but struggle to complete any of them?";
  if (age === 'child') {
    q7Text = "Do you start building lots of different toys, drawings, or games all at once but get distracted and leave them all unfinished?";
  } else if (prof === 'tech') {
    q7Text = "Have you started multiple new codebases, apps, or ambitious side-projects in a burst of enthusiasm, struggling to finish any of them?";
  } else if (prof === 'corporate' || prof === 'business') {
    q7Text = "Do you initiate multiple ambitious business projects or strategic campaigns simultaneously, struggling to bring any to completion?";
  }

  // Q8: Irritability & Affective Reactivity
  let q8Text = "Have you experienced intense irritability or sudden temper outbursts lasting several days?";
  if (age === 'child') {
    q8Text = "Have you had spells where you got super angry, screaming or throwing tantrums at parents or friends over tiny things for days?";
  } else if (prof === 'corporate' || prof === 'tech' || prof === 'healthcare') {
    q8Text = "Have you experienced intense irritability, snapping with sudden rage at coworkers, clients, or subordinates over minor issues for days?";
  }

  // Q9: Mood Cycling & Polarity Shifts
  let q9Text = "Have you noticed dramatic shifts between feeling on top of the world and later feeling deeply low?";
  if (age === 'child') {
    q9Text = "Do your feelings swing like a roller coaster between being super excited and happy, to suddenly feeling deeply sad and crying for days?";
  } else if (prof === 'student' || prof === 'tech' || prof === 'corporate') {
    q9Text = "Have you experienced dramatic cycles between euphoric, high-output productivity phases followed later by crashes of deep burnout and low mood?";
  }

  // Q10: Social Notice & Observable Changes
  let q10Text = "Have close family, colleagues, or friends commented on noticeable sudden changes in your mood or energy?";
  if (age === 'child') {
    q10Text = "Have your teachers, parents, or classmates noticed and told you that you were acting totally different, wild, or out of control?";
  } else if (prof === 'tech' || prof === 'corporate' || prof === 'healthcare') {
    q10Text = "Have colleagues, managers, or close friends commented on noticeable sudden shifts in your energy, intensity, or demeanor at work?";
  }

  // Q11: Functional Interference in Daily Life
  let q11Text = "Have these mood or energy shifts caused difficulties in your work, school, or personal relationships?";
  if (age === 'child') {
    q11Text = "Did these wild or angry periods get you into trouble at school, hurt your grades, or cause fights with your friends and family?";
  } else if (age === 'teen' || prof === 'student') {
    q11Text = "Have these mood swings interfered with your exam results, school/college attendance, or caused serious fights with friends and family?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q11Text = "Have these mood swings interfered with your sprint deadlines, work deliverables, team collaboration, or professional reputation?";
  } else if (prof === 'healthcare') {
    q11Text = "Have these energetic or low periods impacted your clinical duties, relationships with healthcare staff, or day-to-day focus?";
  } else if (prof === 'business') {
    q11Text = "Have these volatile shifts created serious conflict with business partners, delayed client projects, or harmed company operations?";
  } else if (prof === 'homemaker') {
    q11Text = "Have these mood swings created disruption in managing household responsibilities, caring for family, or maintaining peace at home?";
  }

  // Q12: Distractibility & Attention Lability
  let q12Text = "During energetic periods, did you become easily distracted by irrelevant sights or noises around you?";
  if (age === 'child') {
    q12Text = "During hyper times, did you get distracted by every sound or toy in class so you couldn't listen to your teacher?";
  } else if (prof === 'tech' || prof === 'corporate') {
    q12Text = "During high-energy phases, were you constantly derailed from key tasks by new ideas, notifications, or trivial details?";
  }

  // Q13: Uncharacteristic Behavior Patterns
  let q13Text = "Have you engaged in risky or uncharacteristic behaviors that you would never do normally?";
  if (age === 'child') {
    q13Text = "Have you done dangerous or wild things on a dare that you know are wrong and would normally never do?";
  } else if (age === 'teen' || prof === 'student') {
    q13Text = "Have you engaged in reckless stunts, dangerous driving, or out-of-character behavior that shocked your friends and family?";
  }

  // Q14: Clustering & Episode Synchrony
  let q14Text = "Did several of these elevated mood experiences occur at the same time period in your life?";
  if (age === 'child') {
    q14Text = "Did several of these super energetic, fast-talking, and rule-breaking behaviors happen at the very same time?";
  }

  // Q15: Emotional Control & Self-Regulation
  let q15Text = "Have you felt that your emotions and energy levels swing completely out of your conscious control?";
  if (age === 'child') {
    q15Text = "Have you felt like your feelings and energy were completely out of control, like you couldn't hit the brakes no matter what?";
  }

  return [
    { id: 1, domain: "Energy & Psychomotor Activation", text: q1Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 2, domain: "Sleep Efficiency & Decreased Need", text: q2Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 3, domain: "Racing Thoughts & Flight of Ideas", text: q3Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 4, domain: "Grandiosity & Inflated Self-Esteem", text: q4Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 5, domain: "Pressured Speech & Rapid Talking", text: q5Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 6, domain: "Impulsivity & Spending Patterns", text: q6Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 7, domain: "Goal-Directed Multitasking", text: q7Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 8, domain: "Irritability & Affective Reactivity", text: q8Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 9, domain: "Mood Cycling & Polarity Shifts", text: q9Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 10, domain: "Social Notice & Observable Changes", text: q10Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 11, domain: "Functional Interference in Daily Life", text: q11Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 12, domain: "Distractibility & Attention Lability", text: q12Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 13, domain: "Uncharacteristic Behavior Patterns", text: q13Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 14, domain: "Clustering & Episode Synchrony", text: q14Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" },
    { id: 15, domain: "Emotional Control & Self-Regulation", text: q15Text, followUp1: "How frequently do you experience this?", followUp2: "How much does this affect your daily life?" }
  ];
}

// Main getter for tests, dynamically tailored to age group and profession
export function getQuestionsForTest(testType = 'schizophrenia', ageGroup = '19-25', profession = 'student') {
  if (testType === 'bipolar') {
    return getBipolarQuestions(ageGroup, profession);
  }
  return getSchizophreniaQuestions(ageGroup, profession);
}

// Helpers for human-readable labels
export function getAgeLabel(ageId) {
  const match = AGE_GROUPS.find(g => g.id === ageId);
  return match ? `${match.label} (${match.title})` : (ageId || 'Age Group');
}

export function getProfessionLabel(ageId, profId) {
  const list = PROFESSIONS_BY_AGE[ageId] || [];
  const match = list.find(p => p.id === profId);
  if (match) return match.label;
  for (const group of Object.values(PROFESSIONS_BY_AGE)) {
    const found = group.find(p => p.id === profId);
    if (found) return found.label;
  }
  return profId || 'Profession';
}

// Backward-compatible static default question exports
export const SCHIZOPHRENIA_QUESTIONS = getSchizophreniaQuestions('19-25', 'student');
export const BIPOLAR_QUESTIONS = getBipolarQuestions('19-25', 'student');

