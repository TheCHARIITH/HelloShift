/**
 * 🌍 HelloShift - Dynamic Greeting SVG Generator
 * A Vercel Serverless Function that generates personalized greetings
 * based on the visitor's local time.
 */

// ============================================
// 📝 DEFAULT GREETINGS DATABASE
// ============================================

const DEFAULT_GREETINGS = {
  morning: [
    { emoji: '☀️', text: 'Good Morning!' },
    { emoji: '🌅', text: 'Rise and Shine!' },
    { emoji: '☕', text: 'Coffee Time!' },
    { emoji: '🌞', text: 'Hello, Early Bird!' },
    { emoji: '🌻', text: 'Have a Great Day!' },
    { emoji: '🍳', text: 'Wakey Wakey!' },
    { emoji: '🐓', text: 'The Early Bird Gets the Worm!' },
    { emoji: '✨', text: 'Make Today Amazing!' },
  ],
  afternoon: [
    { emoji: '☀️', text: 'Good Afternoon!' },
    { emoji: '🌤️', text: 'Hello There!' },
    { emoji: '🎯', text: 'Stay Focused!' },
    { emoji: '💪', text: 'Keep Going Strong!' },
    { emoji: '🌴', text: 'Halfway Through the Day!' },
    { emoji: '🚀', text: 'Crushing It!' },
    { emoji: '⚡', text: 'Powering Through!' },
    { emoji: '🔥', text: "You're On Fire!" },
  ],
  evening: [
    { emoji: '🌆', text: 'Good Evening!' },
    { emoji: '🌇', text: 'Enjoy Your Evening!' },
    { emoji: '🍽️', text: 'Dinner Time Soon?' },
    { emoji: '🌅', text: 'Beautiful Sunset Vibes!' },
    { emoji: '🎮', text: 'Time to Relax!' },
    { emoji: '🌙', text: 'Evening Coder?' },
    { emoji: '🍕', text: 'Pizza Time!' },
    { emoji: '📺', text: 'Winding Down?' },
  ],
  night: [
    { emoji: '🌙', text: 'Good Night!' },
    { emoji: '🌟', text: 'Sweet Dreams!' },
    { emoji: '🦉', text: 'Hello, Night Owl!' },
    { emoji: '💤', text: 'Go to Sleep!' },
    { emoji: '🌃', text: 'Late Night Coder?' },
    { emoji: '⭐', text: 'Burning the Midnight Oil?' },
    { emoji: '🛏️', text: 'Bed is Calling!' },
    { emoji: '🌌', text: 'Stargazing Hours!' },
  ],
};

// ============================================
// 🎨 THEME DEFINITIONS
// ============================================

const THEMES = {
  default: {
    gradient: ['#667eea', '#764ba2'],
    textLight: '#1a1a2e',
    textDark: '#ffffff',
    subtextLight: '#4a4a6a',
    subtextDark: '#e0e0e0',
  },
  ocean: {
    gradient: ['#00c6fb', '#005bea'],
    textLight: '#0a2540',
    textDark: '#ffffff',
    subtextLight: '#1a4a6a',
    subtextDark: '#b0d4f1',
  },
  sunset: {
    gradient: ['#fa709a', '#fee140'],
    textLight: '#4a1a2a',
    textDark: '#ffffff',
    subtextLight: '#6a3a4a',
    subtextDark: '#ffe4e1',
  },
  forest: {
    gradient: ['#11998e', '#38ef7d'],
    textLight: '#0a3a2a',
    textDark: '#ffffff',
    subtextLight: '#1a5a4a',
    subtextDark: '#b0f4d4',
  },
  midnight: {
    gradient: ['#232526', '#414345'],
    textLight: '#1a1a1a',
    textDark: '#ffffff',
    subtextLight: '#3a3a3a',
    subtextDark: '#c0c0c0',
  },
  aurora: {
    gradient: ['#a8edea', '#fed6e3'],
    textLight: '#2a4a5a',
    textDark: '#ffffff',
    subtextLight: '#4a6a7a',
    subtextDark: '#e0f0f0',
  },
  fire: {
    gradient: ['#f12711', '#f5af19'],
    textLight: '#4a1a0a',
    textDark: '#ffffff',
    subtextLight: '#6a3a1a',
    subtextDark: '#ffe4c4',
  },
  lavender: {
    gradient: ['#c471f5', '#fa71cd'],
    textLight: '#3a1a4a',
    textDark: '#ffffff',
    subtextLight: '#5a3a6a',
    subtextDark: '#f0d4f4',
  },
  monochrome: {
    gradient: ['#bdc3c7', '#2c3e50'],
    textLight: '#1a1a1a',
    textDark: '#ffffff',
    subtextLight: '#3a3a3a',
    subtextDark: '#d0d0d0',
  },
  cyberpunk: {
    gradient: ['#ff00ff', '#00ffff'],
    textLight: '#1a0a2a',
    textDark: '#00ff00',
    subtextLight: '#3a1a4a',
    subtextDark: '#ff00ff',
  },
  minimal: {
    gradient: ['#ffffff', '#f5f5f5'],
    textLight: '#1a1a1a',
    textDark: '#ffffff',
    subtextLight: '#6a6a6a',
    subtextDark: '#c0c0c0',
  },
  nord: {
    gradient: ['#4c566a', '#2e3440'],
    textLight: '#2e3440',
    textDark: '#eceff4',
    subtextLight: '#4c566a',
    subtextDark: '#d8dee9',
  },
  dracula: {
    gradient: ['#bd93f9', '#ff79c6'],
    textLight: '#282a36',
    textDark: '#f8f8f2',
    subtextLight: '#44475a',
    subtextDark: '#6272a4',
  },
};

// ============================================
// 🔧 UTILITY FUNCTIONS
// ============================================

/**
 * Get current hour based on timezone
 */
function getCurrentHour(timezone) {
  try {
    const options = { hour: 'numeric', hour12: false, timeZone: timezone };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return parseInt(formatter.format(new Date()), 10);
  } catch (error) {
    // Fallback to UTC
    return new Date().getUTCHours();
  }
}

/**
 * Determine time block based on hour
 */
function getTimeBlock(hour, customBlocks = null) {
  const blocks = customBlocks || {
    morning: { start: 5, end: 12 },
    afternoon: { start: 12, end: 17 },
    evening: { start: 17, end: 21 },
    night: { start: 21, end: 5 },
  };

  if (hour >= blocks.morning.start && hour < blocks.morning.end) return 'morning';
  if (hour >= blocks.afternoon.start && hour < blocks.afternoon.end) return 'afternoon';
  if (hour >= blocks.evening.start && hour < blocks.evening.end) return 'evening';
  return 'night';
}

/**
 * Get random item from array
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Parse custom greetings from query params
 */
function parseCustomGreetings(query) {
  const customGreetings = {};
  
  ['morning', 'afternoon', 'evening', 'night'].forEach((block) => {
    const param = query[`greetings_${block}`];
    if (param) {
      try {
        const greetings = param.split('|').map((g) => {
          const [emoji, ...textParts] = g.split(' ');
          return { emoji, text: textParts.join(' ') };
        });
        if (greetings.length > 0) {
          customGreetings[block] = greetings;
        }
      } catch (e) {
        // Use defaults if parsing fails
      }
    }
  });

  return Object.keys(customGreetings).length > 0 ? customGreetings : null;
}

/**
 * Parse custom time blocks from query params
 */
function parseCustomBlocks(query) {
  try {
    if (query.blocks) {
      const blocks = JSON.parse(decodeURIComponent(query.blocks));
      return blocks;
    }
  } catch (e) {
    // Return null if parsing fails
  }
  return null;
}

/**
 * Get font CSS (supports Google Fonts)
 */
function getFontCSS(fontParam) {
  if (!fontParam) {
    return {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontImport: '',
    };
  }

  // Check if it's a Google Fonts URL
  if (fontParam.includes('fonts.googleapis.com')) {
    const urlMatch = fontParam.match(/family=([^:&]+)/);
    const fontName = urlMatch ? urlMatch[1].replace(/\+/g, ' ') : 'Roboto';
    return {
      fontFamily: `'${fontName}', sans-serif`,
      fontImport: `@import url('${fontParam}');`,
    };
  }

  // Treat as font family name
  return {
    fontFamily: `'${fontParam}', sans-serif`,
    fontImport: '',
  };
}

/**
 * Parse color - supports hex, rgb, and named colors
 */
function parseColor(color) {
  if (!color) return null;
  // Handle URL encoded # symbol
  return color.replace(/%23/g, '#');
}

// ============================================
// 🖼️ SVG GENERATOR
// ============================================

function generateSVG(greeting, options = {}) {
  const {
    width = 450,
    height = 120,
    theme = 'default',
    themeMode = 'auto', // 'auto', 'light', 'dark'
    fontSize = 24,
    fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontImport = '',
    customBg = null,
    customTextColor = null,
    customGradient = null,
    borderRadius = 15,
    showSubtext = true,
    subtext = "Welcome to my profile!",
    animationEnabled = true,
  } = options;

  // Get theme colors
  const themeColors = THEMES[theme] || THEMES.default;
  
  // Parse custom gradient
  let gradient = themeColors.gradient;
  if (customGradient) {
    const colors = customGradient.split(',').map(c => parseColor(c.trim()));
    if (colors.length >= 2) gradient = colors;
  }
  if (customBg) {
    const colors = customBg.split(',').map(c => parseColor(c.trim()));
    if (colors.length >= 2) gradient = colors;
    else if (colors.length === 1) gradient = [colors[0], colors[0]];
  }

  // Determine text colors based on mode
  let textColorLight = customTextColor ? parseColor(customTextColor) : themeColors.textLight;
  let textColorDark = customTextColor ? parseColor(customTextColor) : themeColors.textDark;
  let subtextColorLight = themeColors.subtextLight;
  let subtextColorDark = themeColors.subtextDark;

  // Animation CSS
  const animationCSS = animationEnabled ? `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .greeting-text { animation: fadeIn 0.6s ease-out; }
    .emoji { animation: pulse 2s ease-in-out infinite; }
  ` : '';

  // Build theme mode styles
  let themeStyles = '';
  
  if (themeMode === 'auto') {
    themeStyles = `
      .greeting-text { fill: ${textColorLight}; }
      .subtext { fill: ${subtextColorLight}; }
      @media (prefers-color-scheme: dark) {
        .greeting-text { fill: ${textColorDark}; }
        .subtext { fill: ${subtextColorDark}; }
      }
    `;
  } else if (themeMode === 'dark') {
    themeStyles = `
      .greeting-text { fill: ${textColorDark}; }
      .subtext { fill: ${subtextColorDark}; }
    `;
  } else {
    themeStyles = `
      .greeting-text { fill: ${textColorLight}; }
      .subtext { fill: ${subtextColorLight}; }
    `;
  }

  // Calculate positions
  const emojiSize = fontSize * 1.5;
  const textY = showSubtext ? height / 2 - 5 : height / 2 + 8;
  const subtextY = height / 2 + 25;
  const emojiX = 30;
  const textX = emojiX + emojiSize + 15;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <style>
    ${fontImport}
    
    * {
      font-family: ${fontFamily};
    }
    
    .card {
      filter: url(#shadow);
    }
    
    .greeting-text {
      font-size: ${fontSize}px;
      font-weight: 600;
      dominant-baseline: middle;
    }
    
    .subtext {
      font-size: ${Math.max(12, fontSize * 0.5)}px;
      font-weight: 400;
      dominant-baseline: middle;
      opacity: 0.8;
    }
    
    .emoji {
      font-size: ${emojiSize}px;
      dominant-baseline: middle;
    }
    
    ${themeStyles}
    ${animationCSS}
  </style>
  
  <!-- Card Background -->
  <rect 
    class="card"
    x="5" 
    y="5" 
    width="${width - 10}" 
    height="${height - 10}" 
    rx="${borderRadius}" 
    ry="${borderRadius}" 
    fill="url(#bgGradient)"
  />
  
  <!-- Emoji -->
  <text 
    class="emoji" 
    x="${emojiX}" 
    y="${height / 2}"
    dominant-baseline="middle"
  >${greeting.emoji}</text>
  
  <!-- Greeting Text -->
  <text 
    class="greeting-text" 
    x="${textX}" 
    y="${textY}"
  >${greeting.text}</text>
  
  ${showSubtext ? `
  <!-- Subtext -->
  <text 
    class="subtext" 
    x="${textX}" 
    y="${subtextY}"
  >${subtext}</text>
  ` : ''}
</svg>`.trim();

  return svg;
}

// ============================================
// 🚀 MAIN HANDLER
// ============================================

module.exports = async (req, res) => {
  try {
    const query = req.query;
    
    // ========== TIMEZONE HANDLING ==========
    let timezone = 'UTC';
    
    if (query.timezone) {
      // User specified timezone
      timezone = query.timezone;
    } else if (query.auto !== 'false') {
      // Auto-detect from Vercel headers
      const vercelTimezone = req.headers['x-vercel-ip-timezone'];
      if (vercelTimezone) {
        timezone = vercelTimezone;
      }
    }
    
    // ========== TIME BLOCK DETERMINATION ==========
    const customBlocks = parseCustomBlocks(query);
    const currentHour = getCurrentHour(timezone);
    
    // Allow forcing a specific block
    let timeBlock;
    if (query.block && ['morning', 'afternoon', 'evening', 'night'].includes(query.block)) {
      timeBlock = query.block;
    } else {
      timeBlock = getTimeBlock(currentHour, customBlocks);
    }
    
    // ========== GREETING SELECTION ==========
    const customGreetings = parseCustomGreetings(query);
    const greetingsSource = customGreetings || DEFAULT_GREETINGS;
    const greetingsArray = greetingsSource[timeBlock] || DEFAULT_GREETINGS[timeBlock];
    const greeting = getRandomItem(greetingsArray);
    
    // ========== THEME AND STYLING ==========
    const theme = query.theme || 'default';
    const themeMode = query.mode || 'auto'; // 'auto', 'light', 'dark'
    
    // Font handling
    const { fontFamily, fontImport } = getFontCSS(query.font);
    
    // ========== GENERATE SVG ==========
    const svg = generateSVG(greeting, {
      width: parseInt(query.width, 10) || 450,
      height: parseInt(query.height, 10) || 120,
      theme,
      themeMode,
      fontSize: parseInt(query.fontSize, 10) || 24,
      fontFamily,
      fontImport,
      customBg: query.bg,
      customTextColor: query.textColor,
      customGradient: query.gradient,
      borderRadius: parseInt(query.borderRadius, 10) || 15,
      showSubtext: query.subtext !== 'false' && query.subtext !== '',
      subtext: query.subtext && query.subtext !== 'true' ? query.subtext : 'Welcome to my profile!',
      animationEnabled: query.animation !== 'false',
    });
    
    // ========== RESPONSE ==========
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Add debug headers in development
    if (query.debug === 'true') {
      res.setHeader('X-HelloShift-Timezone', timezone);
      res.setHeader('X-HelloShift-Hour', currentHour.toString());
      res.setHeader('X-HelloShift-Block', timeBlock);
    }
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error('HelloShift Error:', error);
    
    // Return error SVG
    const errorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="120" viewBox="0 0 450 120">
  <rect x="5" y="5" width="440" height="110" rx="15" fill="#ff6b6b"/>
  <text x="225" y="60" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">
    ⚠️ HelloShift Error - Please check your parameters
  </text>
</svg>`.trim();
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(500).send(errorSvg);
  }
};
