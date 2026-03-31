/**
 * 🌍 HelloShift - Dynamic Greeting SVG Generator
 * Clean, Minimalist Design with Native Emojis
 */

// ============================================
// GREETINGS DATABASE
// ============================================

const DEFAULT_GREETINGS = {
  morning: [
    { emoji: '☀️', text: 'Good Morning' },
    { emoji: '🌅', text: 'Rise and Shine' },
    { emoji: '☕', text: 'Coffee Time' },
    { emoji: '🌞', text: 'Hello, Early Bird' },
    { emoji: '🌻', text: 'Have a Great Day' },
    { emoji: '✨', text: 'Make Today Amazing' },
    { emoji: '🌄', text: 'Beautiful Morning' },
    { emoji: '🌟', text: 'Shine Bright Today' },
  ],
  afternoon: [
    { emoji: '☀️', text: 'Good Afternoon' },
    { emoji: '🌤️', text: 'Hello There' },
    { emoji: '🎯', text: 'Stay Focused' },
    { emoji: '💪', text: 'Keep Going Strong' },
    { emoji: '🚀', text: 'Crushing It' },
    { emoji: '⚡', text: 'Powering Through' },
    { emoji: '🔥', text: "You're On Fire" },
    { emoji: '💡', text: 'Bright Ideas Ahead' },
  ],
  evening: [
    { emoji: '🌇', text: 'Good Evening' },
    { emoji: '🌆', text: 'Enjoy Your Evening' },
    { emoji: '🍽️', text: 'Dinner Time Soon' },
    { emoji: '🎮', text: 'Time to Relax' },
    { emoji: '🌙', text: 'Evening Vibes' },
    { emoji: '🎵', text: 'Wind Down Time' },
    { emoji: '📺', text: 'Relax and Unwind' },
    { emoji: '✨', text: 'Peaceful Evening' },
  ],
  night: [
    { emoji: '🌙', text: 'Good Night' },
    { emoji: '⭐', text: 'Sweet Dreams' },
    { emoji: '🦉', text: 'Hello, Night Owl' },
    { emoji: '💤', text: 'Time for Sleep' },
    { emoji: '🌃', text: 'Late Night Coder' },
    { emoji: '🌟', text: 'Burning Midnight Oil' },
    { emoji: '🛏️', text: 'Rest Well' },
    { emoji: '🌌', text: 'Stargazing Hours' },
  ],
};

// ============================================
// THEMES - MINIMALIST
// ============================================

const THEMES = {
  default: {
    bg: '#ffffff',
    bgDark: '#0d1117',
    text: '#1f2328',
    textDark: '#f0f6fc',
    border: '#d1d9e0',
    borderDark: '#30363d',
  },
  clean: {
    bg: '#fafafa',
    bgDark: '#161b22',
    text: '#1f2328',
    textDark: '#e6edf3',
    border: '#e5e7eb',
    borderDark: '#30363d',
  },
  ocean: {
    bg: '#f0f9ff',
    bgDark: '#0c1929',
    text: '#0c4a6e',
    textDark: '#e0f2fe',
    border: '#bae6fd',
    borderDark: '#1e3a5f',
  },
  forest: {
    bg: '#f0fdf4',
    bgDark: '#0a1f0d',
    text: '#14532d',
    textDark: '#dcfce7',
    border: '#bbf7d0',
    borderDark: '#1a3d21',
  },
  lavender: {
    bg: '#faf5ff',
    bgDark: '#1a0d24',
    text: '#581c87',
    textDark: '#f3e8ff',
    border: '#e9d5ff',
    borderDark: '#2d1a42',
  },
  rose: {
    bg: '#fff1f2',
    bgDark: '#1f0a0d',
    text: '#9f1239',
    textDark: '#ffe4e6',
    border: '#fecdd3',
    borderDark: '#3d1a20',
  },
  amber: {
    bg: '#fffbeb',
    bgDark: '#1a1508',
    text: '#92400e',
    textDark: '#fef3c7',
    border: '#fde68a',
    borderDark: '#3d2e0a',
  },
  slate: {
    bg: '#f8fafc',
    bgDark: '#0f172a',
    text: '#1e293b',
    textDark: '#e2e8f0',
    border: '#e2e8f0',
    borderDark: '#334155',
  },
  midnight: {
    bg: '#f5f5f5',
    bgDark: '#09090b',
    text: '#18181b',
    textDark: '#fafafa',
    border: '#e4e4e7',
    borderDark: '#27272a',
  },
  nord: {
    bg: '#eceff4',
    bgDark: '#2e3440',
    text: '#2e3440',
    textDark: '#eceff4',
    border: '#d8dee9',
    borderDark: '#3b4252',
  },
  mono: {
    bg: '#ffffff',
    bgDark: '#000000',
    text: '#000000',
    textDark: '#ffffff',
    border: '#e5e5e5',
    borderDark: '#262626',
  },
  paper: {
    bg: '#fdfcfb',
    bgDark: '#1c1917',
    text: '#292524',
    textDark: '#fafaf9',
    border: '#e7e5e4',
    borderDark: '#44403c',
  },
  sky: {
    bg: '#f0f9ff',
    bgDark: '#082f49',
    text: '#0c4a6e',
    textDark: '#e0f2fe',
    border: '#bae6fd',
    borderDark: '#075985',
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentHour(timezone) {
  try {
    const options = { hour: 'numeric', hour12: false, timeZone: timezone };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return parseInt(formatter.format(new Date()), 10);
  } catch (error) {
    return new Date().getUTCHours();
  }
}

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

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function parseCustomGreetings(query) {
  const customGreetings = {};
  
  ['morning', 'afternoon', 'evening', 'night'].forEach((block) => {
    const param = query[`greetings_${block}`];
    if (param) {
      try {
        const greetings = param.split('|').map((g) => {
          const parts = g.trim().split(' ');
          const emoji = parts[0];
          const text = parts.slice(1).join(' ');
          return { emoji, text };
        });
        if (greetings.length > 0) {
          customGreetings[block] = greetings;
        }
      } catch (e) {
        // Use defaults
      }
    }
  });

  return Object.keys(customGreetings).length > 0 ? customGreetings : null;
}

function parseCustomBlocks(query) {
  try {
    if (query.blocks) {
      return JSON.parse(decodeURIComponent(query.blocks));
    }
  } catch (e) {}
  return null;
}

function getFontCSS(fontParam) {
  if (!fontParam) {
    return {
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontImport: '',
    };
  }

  if (fontParam.includes('fonts.googleapis.com')) {
    const urlMatch = fontParam.match(/family=([^:&]+)/);
    const fontName = urlMatch ? urlMatch[1].replace(/\+/g, ' ') : 'Inter';
    return {
      fontFamily: `'${fontName}', sans-serif`,
      fontImport: `@import url('${fontParam}');`,
    };
  }

  return {
    fontFamily: `'${fontParam}', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontImport: '',
  };
}

function parseColor(color) {
  if (!color) return null;
  return color.replace(/%23/g, '#');
}

// ============================================
// SVG GENERATOR
// ============================================

function generateSVG(greeting, options = {}) {
  const {
    width = 400,
    height = 60,
    theme = 'default',
    themeMode = 'auto',
    fontSize = 18,
    fontFamily = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontImport = '',
    customBg = null,
    customTextColor = null,
    borderRadius = 10,
    showBorder = true,
  } = options;

  const themeColors = THEMES[theme] || THEMES.default;
  
  const bgLight = customBg ? parseColor(customBg) : themeColors.bg;
  const bgDark = themeColors.bgDark;
  const textLight = customTextColor ? parseColor(customTextColor) : themeColors.text;
  const textDark = customTextColor ? parseColor(customTextColor) : themeColors.textDark;
  const borderLight = themeColors.border;
  const borderDark = themeColors.borderDark;

  // Build theme styles
  let themeStyles = '';
  
  if (themeMode === 'auto') {
    themeStyles = `
      .card-bg { fill: ${bgLight}; stroke: ${showBorder ? borderLight : 'none'}; }
      .greeting { fill: ${textLight}; }
      @media (prefers-color-scheme: dark) {
        .card-bg { fill: ${bgDark}; stroke: ${showBorder ? borderDark : 'none'}; }
        .greeting { fill: ${textDark}; }
      }
    `;
  } else if (themeMode === 'dark') {
    themeStyles = `
      .card-bg { fill: ${bgDark}; stroke: ${showBorder ? borderDark : 'none'}; }
      .greeting { fill: ${textDark}; }
    `;
  } else {
    themeStyles = `
      .card-bg { fill: ${bgLight}; stroke: ${showBorder ? borderLight : 'none'}; }
      .greeting { fill: ${textLight}; }
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    ${fontImport}
    .greeting {
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      font-weight: 500;
      letter-spacing: -0.01em;
    }
    ${themeStyles}
  </style>
  <rect class="card-bg" x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${borderRadius}" stroke-width="1"/>
  <text class="greeting" x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="central">${greeting.emoji} ${greeting.text}</text>
</svg>`;

  return svg.trim();
}

// ============================================
// MAIN HANDLER
// ============================================

module.exports = async (req, res) => {
  try {
    const query = req.query;
    
    // Timezone
    let timezone = 'UTC';
    if (query.timezone) {
      timezone = query.timezone;
    } else if (query.auto !== 'false') {
      const vercelTimezone = req.headers['x-vercel-ip-timezone'];
      if (vercelTimezone) timezone = vercelTimezone;
    }
    
    // Time block
    const customBlocks = parseCustomBlocks(query);
    const currentHour = getCurrentHour(timezone);
    
    let timeBlock;
    if (query.block && ['morning', 'afternoon', 'evening', 'night'].includes(query.block)) {
      timeBlock = query.block;
    } else {
      timeBlock = getTimeBlock(currentHour, customBlocks);
    }
    
    // Greeting
    const customGreetings = parseCustomGreetings(query);
    const greetingsSource = customGreetings || DEFAULT_GREETINGS;
    const greetingsArray = greetingsSource[timeBlock] || DEFAULT_GREETINGS[timeBlock];
    const greeting = getRandomItem(greetingsArray);
    
    // Options
    const theme = query.theme || 'default';
    const themeMode = query.mode || 'auto';
    const { fontFamily, fontImport } = getFontCSS(query.font);
    
    const svg = generateSVG(greeting, {
      width: parseInt(query.width, 10) || 400,
      height: parseInt(query.height, 10) || 60,
      theme,
      themeMode,
      fontSize: parseInt(query.fontSize, 10) || 18,
      fontFamily,
      fontImport,
      customBg: query.bg,
      customTextColor: query.textColor,
      borderRadius: parseInt(query.borderRadius, 10) || 10,
      showBorder: query.border !== 'false',
    });
    
    // Response
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    if (query.debug === 'true') {
      res.setHeader('X-HelloShift-Timezone', timezone);
      res.setHeader('X-HelloShift-Hour', currentHour.toString());
      res.setHeader('X-HelloShift-Block', timeBlock);
    }
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error('HelloShift Error:', error);
    
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60" viewBox="0 0 400 60">
  <rect fill="#fef2f2" width="400" height="60" rx="10"/>
  <text fill="#991b1b" x="200" y="30" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14">Something went wrong</text>
</svg>`;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.status(500).send(errorSvg);
  }
};
