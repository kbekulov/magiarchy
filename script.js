const navLinks = document.querySelectorAll('.menu a');
const characterButtons = document.querySelectorAll('#character-switch .chip');
const relationshipButtons = document.querySelectorAll('#relationships-switch .chip');
const magicButtons = document.querySelectorAll('#magic-switch .chip');
const locationButtons = document.querySelectorAll('#locations-switch .chip');
const organizationButtons = document.querySelectorAll('#organizations-switch .chip');

const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const characterSubtitle = document.getElementById('character-subtitle');
const characterAbout = document.getElementById('character-about');
const characterProfile = document.getElementById('character-profile');
const secondaryTitle = document.getElementById('secondary-title');
const secondaryList = document.getElementById('secondary-list');
const guideNotes = document.getElementById('guide-notes');
const axisQuote = document.getElementById('axis-quote');
const magicStage = document.getElementById('magic-stage');
const locationStage = document.getElementById('location-stage');
const panelTitle = document.getElementById('panel-title');
const characterSwitch = document.getElementById('character-switch');
const relationshipsSwitch = document.getElementById('relationships-switch');
const magicSwitch = document.getElementById('magic-switch');
const locationsSwitch = document.getElementById('locations-switch');
const organizationsSwitch = document.getElementById('organizations-switch');
const storyView = document.getElementById('story-view');
const eventsView = document.getElementById('events-view');
const organizationsView = document.getElementById('organizations-view');
const characterView = document.getElementById('character-view');
const relationshipsView = document.getElementById('relationships-view');
const magicView = document.getElementById('magic-view');
const locationsView = document.getElementById('locations-view');
const relationshipLynKyrien = document.getElementById('relationship-lyn-kyrien');
const relationshipFelixReiner = document.getElementById('relationship-felix-reiner');
const magicTabFoundations = document.getElementById('magic-tab-foundations');
const magicTabMechanics = document.getElementById('magic-tab-mechanics');
const magicTabGovernance = document.getElementById('magic-tab-governance');
const locationMageAcademy = document.getElementById('location-mage-academy');
const locationLynleitHome = document.getElementById('location-lynleit-home');
const locationCountry = document.getElementById('location-country');
const organizationMSF = document.getElementById('organization-msf');
const organizationMagiarchy = document.getElementById('organization-magiarchy');
const organizationAristocracy = document.getElementById('organization-aristocracy');
const organizationGovernment = document.getElementById('organization-government');
const locationMark = document.querySelector('.location-mark');
let activeSection = 'story';

const locationImages = {
  country: {
    src: 'gallery/locations/country_1.png',
    alt: 'The Country geopolitical map placeholder',
    title: 'The Country'
  },
  'mage-academy': {
    src: 'gallery/locations/mage-academy_1.png',
    alt: 'White Cathedral-Monastery-Academy',
    title: 'White Cathedral-Monastery-Academy'
  },
  'lynleit-home': {
    src: 'gallery/characters/lynleit_1.png',
    alt: "Lynleit's Home placeholder visual",
    title: "Lynleit's Home"
  }
};

const characters = {
  lyn: {
    name: 'Lynleit',
    subtitle: 'Visible Protagonist • Acting Heir-Director',
    image: 'gallery/characters/lynleit_1.png',
    about:
      'A 28-year-old sole heir to a successful private intelligence company (MSF), Lynleit steps into leadership early to prevent collapse after internal family instability. She refuses rule-by-fear and treats trust as infrastructure, not sentiment.',
    profile: [
      ['Age', '28'],
      ['Gender', 'Female'],
      ['Narrative Role', 'Visible protagonist and public decision-maker'],
      ['Occupation', 'Acting head of a private intelligence company (MSF)'],
      ['Core Goal', 'Hold the structure together without abandoning ethics'],
      ['Key Dynamic', 'Public legitimacy paired with hidden contingency support']
    ],
    secondaryTitle: 'Leadership Style',
    secondary: [
      'Uses direct personal communication and minimizes executive distance.',
      'Builds loyalty through emotional presence and transparency.',
      'Prefers cohesion over control, alignment over obedience.',
      'Faces distrust from traditionalists who equate warmth with weakness.'
    ],
    notes: [
      'Psychology: matured early under succession pressure; knows legitimacy must be earned in real time.',
      'Strategic evolution: keeps her philosophy but accepts selective opacity when deterrence is required.',
      'Narrative tension: must prove proximity is strength, not softness, and make at least one costly trust-based decision.',
      'Writer tone: portray composure and conviction; her vulnerability is conscious and chosen.'
    ],
    axis:
      'Visible power attempting to remain ethical: she writes the public narrative while relying on shadow capability to keep the system survivable.'
  },
  kyrien: {
    name: 'Kyrien',
    subtitle: 'Independent Ally • Hidden Contingency',
    image: 'gallery/characters/kyrien_1.png',
    about:
      'A 28-year-old urban tactician shaped by early exposure to lethal knowledge after his father’s suspicious removal from elite power circles. He specializes in systems, logistics, surveillance, and vulnerability mapping instead of status-driven force.',
    profile: [
      ['Age', '28'],
      ['Gender', 'Male'],
      ['Narrative Role', 'Main-character gravity, but not the visible protagonist'],
      ['Occupation', 'Off-chart tactical operator and infrastructure strategist'],
      ['Core Goal', 'Preserve structural survivability without becoming controllable'],
      ['Key Dynamic', 'Independent ally to Lynleit; essential during systemic crises']
    ],
    secondaryTitle: 'Combat & Method',
    secondary: [
      'Fights through spacing, leverage, timing, and environmental control.',
      'Rewrites combat narratives by altering terrain, light, and momentum.',
      'Minimizes spectacle; violence is concise and functional.',
      'Prioritizes outcomes over optics and rejects performative dominance.'
    ],
    notes: [
      'Fundamental philosophy: "If it bleeds, it breaks. If it moves, it has structure. If it has structure, it has a failure point."',
      'Psychology: emotionally restrained rather than empty; distrusts centralized authority but values competent structure.',
      'Operating code: loyalty is durable, harm is minimized where possible, outcomes matter more than approval.',
      'Narrative tension: withholds plans, acts autonomously, and should fail emotionally at least once.',
      'Writer tone: underplay him; precision over legend, competence over theatrics.'
    ],
    axis:
      'He does not disrespect magic; he refuses to mythologize it. Shadow capability inside institutions: he edits invisible drafts while she executes visible strategy, creating equilibrium between openness and concealment.'
  }
};

function createPlaceholderCharacter(name) {
  return {
    name,
    subtitle: 'Profile Placeholder',
    image: 'gallery/characters/lynleit_1.png',
    about: `${name} is listed as a placeholder character. Detailed narrative profile will be added in a future update.`,
    profile: [
      ['Status', 'Placeholder entry'],
      ['Age', 'TBD'],
      ['Role', 'TBD'],
      ['Affiliations', 'TBD'],
      ['Core Goal', 'TBD']
    ],
    secondaryTitle: 'Current Notes',
    secondary: [
      'Character registered in the roster.',
      'Narrative function pending writer-provided doctrine.',
      'Relationships, history, and operational traits are TBD.'
    ],
    notes: [
      'Use this slot as a temporary scaffold for upcoming content.',
      'Replace placeholder fields with finalized writer-guide data.',
      'Maintain naming consistency with world canon.'
    ],
    axis: `${name} currently has no finalized thematic axis. Placeholder active.`
  };
}

[
  'drake',
  'sherie',
  'heyk',
  'felix',
  'reiner',
  'fionn',
  'helena',
  'yulia',
  'hiyu',
  'natalia',
  'lester',
  'myka',
  'tien'
].forEach((id) => {
  if (!characters[id]) {
    const display = id.charAt(0).toUpperCase() + id.slice(1);
    characters[id] = createPlaceholderCharacter(display);
  }
});

function renderList(target, items, formatter) {
  target.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = formatter(item);
    target.appendChild(li);
  });
}

function renderCharacter(id) {
  const data = characters[id];
  if (!data) return;

  characterImage.src = data.image;
  characterImage.alt = `${data.name} portrait`;
  characterName.textContent = data.name;
  characterSubtitle.textContent = data.subtitle;
  characterAbout.textContent = data.about;
  secondaryTitle.textContent = data.secondaryTitle;
  axisQuote.textContent = data.axis;

  renderList(characterProfile, data.profile, ([label, value]) => `<strong>${label}:</strong> ${value}`);
  renderList(secondaryList, data.secondary, (text) => text);
  renderList(guideNotes, data.notes, (text) => text);

  characterButtons.forEach((button) => {
    const isActive = button.dataset.character === id;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
}

function setSection(section) {
  activeSection = section;
  const isStory = section === 'story';
  const isEvents = section === 'events';
  const isOrganizations = section === 'organizations';
  const isRelationships = section === 'relationships';
  const isMagic = section === 'magic';
  const isLocations = section === 'locations';

  panelTitle.textContent = isLocations
    ? 'The Country'
    : isMagic
    ? 'Law Of Magistry'
    : isOrganizations
      ? 'Organizations'
    : isRelationships
      ? 'Relationship Dynamics'
      : isEvents
        ? 'Events & Chapters'
      : isStory
        ? 'Story Universe'
      : 'Character Dossier';

  characterSwitch.classList.toggle('view-hidden', isStory || isEvents || isOrganizations || isRelationships || isMagic || isLocations);
  relationshipsSwitch.classList.toggle('view-hidden', !isRelationships);
  magicSwitch.classList.toggle('view-hidden', !isMagic);
  locationsSwitch.classList.toggle('view-hidden', !isLocations);
  organizationsSwitch.classList.toggle('view-hidden', !isOrganizations);
  storyView.classList.toggle('view-hidden', !isStory);
  eventsView.classList.toggle('view-hidden', !isEvents);
  organizationsView.classList.toggle('view-hidden', !isOrganizations);
  characterView.classList.toggle('view-hidden', isStory || isEvents || isOrganizations || isRelationships || isMagic || isLocations);
  relationshipsView.classList.toggle('view-hidden', !isRelationships);
  magicView.classList.toggle('view-hidden', !isMagic);
  locationsView.classList.toggle('view-hidden', !isLocations);

  magicStage.classList.toggle('view-hidden', !isMagic);
  locationStage.classList.toggle('view-hidden', !isLocations);
  characterName.classList.toggle('view-hidden', isStory || isEvents || isOrganizations || isMagic || isLocations);
  characterSubtitle.classList.toggle('view-hidden', isStory || isEvents || isOrganizations || isMagic || isLocations);

  if (isStory || isEvents || isOrganizations) {
    const image = locationImages.country;
    characterImage.src = image.src;
    characterImage.alt = image.alt;
  } else if (isMagic) {
    characterImage.alt = 'Arcane doctrine visual';
  } else if (isLocations) {
    const activeLocationButton = [...locationButtons].find((button) => button.classList.contains('active'));
    const activeLocationId = activeLocationButton?.dataset.locationView || 'country';
    const image = locationImages[activeLocationId];
    if (image) {
      characterImage.src = image.src;
      characterImage.alt = image.alt;
      panelTitle.textContent = image.title;
      if (locationMark) locationMark.textContent = image.title;
    } else {
      characterImage.alt = 'Location visual';
    }
  } else {
    const currentName = characterName.textContent || 'Character';
    characterImage.alt = `${currentName} portrait`;
  }
}

function setMagicView(id) {
  const isFoundations = id === 'foundations';
  const isMechanics = id === 'mechanics';
  const isGovernance = id === 'governance';

  magicTabFoundations.classList.toggle('view-hidden', !isFoundations);
  magicTabMechanics.classList.toggle('view-hidden', !isMechanics);
  magicTabGovernance.classList.toggle('view-hidden', !isGovernance);

  magicButtons.forEach((button) => {
    const isActive = button.dataset.magicView === id;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
}

function setLocationView(id) {
  const isCountry = id === 'country';
  const isMageAcademy = id === 'mage-academy';
  const isLynleitHome = id === 'lynleit-home';

  locationCountry.classList.toggle('view-hidden', !isCountry);
  locationMageAcademy.classList.toggle('view-hidden', !isMageAcademy);
  locationLynleitHome.classList.toggle('view-hidden', !isLynleitHome);

  locationButtons.forEach((button) => {
    const isActive = button.dataset.locationView === id;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  if (activeSection === 'locations') {
    const image = locationImages[id];
    if (image) {
      characterImage.src = image.src;
      characterImage.alt = image.alt;
      panelTitle.textContent = image.title;
      if (locationMark) locationMark.textContent = image.title;
    }
  }
}

function setRelationshipView(id) {
  const isFelixReiner = id === 'felix-reiner';
  relationshipLynKyrien.classList.toggle('view-hidden', isFelixReiner);
  relationshipFelixReiner.classList.toggle('view-hidden', !isFelixReiner);

  relationshipButtons.forEach((button) => {
    const isActive = button.dataset.relationship === id;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
}

function setOrganizationView(id) {
  const isMSF = id === 'msf';
  const isMagiarchy = id === 'magiarchy';
  const isAristocracy = id === 'aristocracy';
  const isGovernment = id === 'government';

  organizationMSF.classList.toggle('view-hidden', !isMSF);
  organizationMagiarchy.classList.toggle('view-hidden', !isMagiarchy);
  organizationAristocracy.classList.toggle('view-hidden', !isAristocracy);
  organizationGovernment.classList.toggle('view-hidden', !isGovernment);

  organizationButtons.forEach((button) => {
    const isActive = button.dataset.organizationView === id;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
}

function activateNavLink(link) {
  navLinks.forEach((node) => {
    node.classList.remove('active');
    node.removeAttribute('aria-current');
  });

  link.classList.add('active');
  link.setAttribute('aria-current', 'page');

  const section = link.dataset.section;
  if (
    section === 'story' ||
    section === 'events' ||
    section === 'organizations' ||
    section === 'characters' ||
    section === 'relationships' ||
    section === 'magic' ||
    section === 'locations'
  ) {
    setSection(section);
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateNavLink(link);
  });

  link.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...navLinks].indexOf(link);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % navLinks.length;
    }

    if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = navLinks.length - 1;
    }

    const nextLink = navLinks[nextIndex];
    activateNavLink(nextLink);
    nextLink.focus();
  });
});

characterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    renderCharacter(button.dataset.character);
  });

  button.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...characterButtons].indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % characterButtons.length;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + characterButtons.length) % characterButtons.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = characterButtons.length - 1;
    }

    const nextButton = characterButtons[nextIndex];
    renderCharacter(nextButton.dataset.character);
    nextButton.focus();
  });
});

relationshipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setRelationshipView(button.dataset.relationship);
  });

  button.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...relationshipButtons].indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % relationshipButtons.length;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + relationshipButtons.length) % relationshipButtons.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = relationshipButtons.length - 1;
    }

    const nextButton = relationshipButtons[nextIndex];
    setRelationshipView(nextButton.dataset.relationship);
    nextButton.focus();
  });
});

magicButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setMagicView(button.dataset.magicView);
  });

  button.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...magicButtons].indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % magicButtons.length;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + magicButtons.length) % magicButtons.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = magicButtons.length - 1;
    }

    const nextButton = magicButtons[nextIndex];
    setMagicView(nextButton.dataset.magicView);
    nextButton.focus();
  });
});

locationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setLocationView(button.dataset.locationView);
  });

  button.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...locationButtons].indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % locationButtons.length;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + locationButtons.length) % locationButtons.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = locationButtons.length - 1;
    }

    const nextButton = locationButtons[nextIndex];
    setLocationView(nextButton.dataset.locationView);
    nextButton.focus();
  });
});

organizationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setOrganizationView(button.dataset.organizationView);
  });

  button.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const currentIndex = [...organizationButtons].indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % organizationButtons.length;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + organizationButtons.length) % organizationButtons.length;
    }

    if (event.key === 'Home') {
      nextIndex = 0;
    }

    if (event.key === 'End') {
      nextIndex = organizationButtons.length - 1;
    }

    const nextButton = organizationButtons[nextIndex];
    setOrganizationView(nextButton.dataset.organizationView);
    nextButton.focus();
  });
});

renderCharacter('lyn');
setSection('story');
setRelationshipView('lyn-kyrien');
setMagicView('foundations');
setLocationView('country');
setOrganizationView('msf');
