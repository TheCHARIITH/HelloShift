/**
 * 🌍 HelloShift - Dynamic Greeting SVG Generator
 * Clean, Minimalist, Modern Design with Apple-style Emojis
 */

// ============================================
// GREETINGS DATABASE
// ============================================

const DEFAULT_GREETINGS = {
  morning: [
    { emoji: '2600', text: 'Good Morning' },
    { emoji: '1F305', text: 'Rise and Shine' },
    { emoji: '2615', text: 'Coffee Time' },
    { emoji: '1F31E', text: 'Hello, Early Bird' },
    { emoji: '1F33B', text: 'Have a Great Day' },
    { emoji: '2728', text: 'Make Today Amazing' },
    { emoji: '1F304', text: 'Beautiful Morning' },
    { emoji: '1F31F', text: 'Shine Bright Today' },
  ],
  afternoon: [
    { emoji: '2600', text: 'Good Afternoon' },
    { emoji: '1F324', text: 'Hello There' },
    { emoji: '1F3AF', text: 'Stay Focused' },
    { emoji: '1F4AA', text: 'Keep Going Strong' },
    { emoji: '1F680', text: 'Crushing It' },
    { emoji: '26A1', text: 'Powering Through' },
    { emoji: '1F525', text: 'You\'re On Fire' },
    { emoji: '1F4A1', text: 'Bright Ideas Ahead' },
  ],
  evening: [
    { emoji: '1F307', text: 'Good Evening' },
    { emoji: '1F306', text: 'Enjoy Your Evening' },
    { emoji: '1F37D', text: 'Dinner Time Soon' },
    { emoji: '1F3AE', text: 'Time to Relax' },
    { emoji: '1F319', text: 'Evening Vibes' },
    { emoji: '1F3B5', text: 'Wind Down Time' },
    { emoji: '1F4FA', text: 'Relax and Unwind' },
    { emoji: '2728', text: 'Peaceful Evening' },
  ],
  night: [
    { emoji: '1F319', text: 'Good Night' },
    { emoji: '2B50', text: 'Sweet Dreams' },
    { emoji: '1F989', text: 'Hello, Night Owl' },
    { emoji: '1F4A4', text: 'Time for Sleep' },
    { emoji: '1F303', text: 'Late Night Coder' },
    { emoji: '1F31F', text: 'Burning Midnight Oil' },
    { emoji: '1F6CF', text: 'Rest Well' },
    { emoji: '1F30C', text: 'Stargazing Hours' },
  ],
};

// ============================================
// THEME DEFINITIONS - MINIMALIST
// ============================================

const THEMES = {
  default: {
    bg: '#ffffff',
    bgDark: '#0d1117',
    text: '#1a1a1a',
    textDark: '#f0f0f0',
    subtext: '#6b7280',
    subtextDark: '#8b949e',
    border: '#e5e7eb',
    borderDark: '#30363d',
  },
  clean: {
    bg: '#fafafa',
    bgDark: '#161b22',
    text: '#111827',
    textDark: '#e6edf3',
    subtext: '#6b7280',
    subtextDark: '#8b949e',
    border: '#e5e7eb',
    borderDark: '#30363d',
  },
  ocean: {
    bg: '#f0f9ff',
    bgDark: '#0c1929',
    text: '#0c4a6e',
    textDark: '#e0f2fe',
    subtext: '#0369a1',
    subtextDark: '#7dd3fc',
    border: '#bae6fd',
    borderDark: '#1e3a5f',
  },
  forest: {
    bg: '#f0fdf4',
    bgDark: '#0a1f0d',
    text: '#14532d',
    textDark: '#dcfce7',
    subtext: '#15803d',
    subtextDark: '#86efac',
    border: '#bbf7d0',
    borderDark: '#1a3d21',
  },
  lavender: {
    bg: '#faf5ff',
    bgDark: '#1a0d24',
    text: '#581c87',
    textDark: '#f3e8ff',
    subtext: '#7e22ce',
    subtextDark: '#d8b4fe',
    border: '#e9d5ff',
    borderDark: '#2d1a42',
  },
  rose: {
    bg: '#fff1f2',
    bgDark: '#1f0a0d',
    text: '#9f1239',
    textDark: '#ffe4e6',
    subtext: '#be123c',
    subtextDark: '#fda4af',
    border: '#fecdd3',
    borderDark: '#3d1a20',
  },
  amber: {
    bg: '#fffbeb',
    bgDark: '#1a1508',
    text: '#92400e',
    textDark: '#fef3c7',
    subtext: '#b45309',
    subtextDark: '#fcd34d',
    border: '#fde68a',
    borderDark: '#3d2e0a',
  },
  slate: {
    bg: '#f8fafc',
    bgDark: '#0f172a',
    text: '#1e293b',
    textDark: '#e2e8f0',
    subtext: '#64748b',
    subtextDark: '#94a3b8',
    border: '#e2e8f0',
    borderDark: '#334155',
  },
  midnight: {
    bg: '#f5f5f5',
    bgDark: '#09090b',
    text: '#18181b',
    textDark: '#fafafa',
    subtext: '#52525b',
    subtextDark: '#a1a1aa',
    border: '#e4e4e7',
    borderDark: '#27272a',
  },
  nord: {
    bg: '#eceff4',
    bgDark: '#2e3440',
    text: '#2e3440',
    textDark: '#eceff4',
    subtext: '#4c566a',
    subtextDark: '#d8dee9',
    border: '#d8dee9',
    borderDark: '#3b4252',
  },
  mono: {
    bg: '#ffffff',
    bgDark: '#000000',
    text: '#000000',
    textDark: '#ffffff',
    subtext: '#666666',
    subtextDark: '#999999',
    border: '#eeeeee',
    borderDark: '#222222',
  },
  paper: {
    bg: '#fdfcfb',
    bgDark: '#1c1917',
    text: '#292524',
    textDark: '#fafaf9',
    subtext: '#78716c',
    subtextDark: '#a8a29e',
    border: '#e7e5e4',
    borderDark: '#44403c',
  },
  sky: {
    bg: '#f0f9ff',
    bgDark: '#082f49',
    text: '#0c4a6e',
    textDark: '#e0f2fe',
    subtext: '#0284c7',
    subtextDark: '#38bdf8',
    border: '#bae6fd',
    borderDark: '#075985',
  },
};

// ============================================
// TWEMOJI CDN (Apple-style emojis)
// ============================================

const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg';

function getEmojiUrl(codepoint) {
  return `${TWEMOJI_BASE}/${codepoint.toLowerCase()}.svg`;
}

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
          // Convert emoji to codepoint if it's an actual emoji
          let codepoint = emoji;
          if (emoji.length <= 4 && !/^[0-9A-Fa-f]+$/.test(emoji)) {
            codepoint = emoji.codePointAt(0).toString(16).toUpperCase();
          }
          return { emoji: codepoint, text };
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
  } catch (e) {
    // Return null
  }
  return null;
}

function getFontCSS(fontParam) {
  if (!fontParam) {
    return {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
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
// SVG GENERATOR - CLEAN MINIMALIST DESIGN
// ============================================

function generateSVG(greeting, options = {}) {
  const {
    width = 420,
    height = 100,
    theme = 'default',
    themeMode = 'auto',
    fontSize = 20,
    fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
    fontImport = '',
    customBg = null,
    customTextColor = null,
    borderRadius = 12,
    showSubtext = true,
    subtext = 'Welcome to my profile',
    showBorder = true,
    padding = 24,
  } = options;

  const themeColors = THEMES[theme] || THEMES.default;
  
  // Custom colors override
  const bgLight = customBg ? parseColor(customBg) : themeColors.bg;
  const bgDark = themeColors.bgDark;
  const textLight = customTextColor ? parseColor(customTextColor) : themeColors.text;
  const textDark = customTextColor ? parseColor(customTextColor) : themeColors.textDark;
  const subtextLight = themeColors.subtext;
  const subtextDark = themeColors.subtextDark;
  const borderLight = themeColors.border;
  const borderDark = themeColors.borderDark;

  // Emoji settings
  const emojiSize = 32;
  const emojiUrl = getEmojiUrl(greeting.emoji);
  
  // Layout calculations
  const emojiX = padding;
  const textX = padding + emojiSize + 16;
  const contentHeight = showSubtext ? 44 : 24;
  const textY = (height - contentHeight) / 2 + (showSubtext ? 14 : 16);
  const subtextY = textY + 24;

  // Build theme styles
  let themeStyles = '';
  
  if (themeMode === 'auto') {
    themeStyles = `
      .card-bg { fill: ${bgLight}; }
      .card-border { stroke: ${borderLight}; }
      .greeting-text { fill: ${textLight}; }
      .subtext { fill: ${subtextLight}; }
      
      @media (prefers-color-scheme: dark) {
        .card-bg { fill: ${bgDark}; }
        .card-border { stroke: ${borderDark}; }
        .greeting-text { fill: ${textDark}; }
        .subtext { fill: ${subtextDark}; }
      }
    `;
  } else if (themeMode === 'dark') {
    themeStyles = `
      .card-bg { fill: ${bgDark}; }
      .card-border { stroke: ${borderDark}; }
      .greeting-text { fill: ${textDark}; }
      .subtext { fill: ${subtextDark}; }
    `;
  } else {
    themeStyles = `
      .card-bg { fill: ${bgLight}; }
      .card-border { stroke: ${borderLight}; }
      .greeting-text { fill: ${textLight}; }
      .subtext { fill: ${subtextLight}; }
    `;
  }

  const borderStyle = showBorder ? `stroke-width="1"` : `stroke-width="0"`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    ${fontImport}
    
    .greeting-text {
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    
    .subtext {
      font-family: ${fontFamily};
      font-size: ${Math.max(12, fontSize * 0.65)}px;
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    
    ${themeStyles}
  </style>
  
  <rect 
    class="card-bg card-border"
    x="0.5" 
    y="0.5" 
    width="${width - 1}" 
    height="${height - 1}" 
    rx="${borderRadius}" 
    ry="${borderRadius}"
    ${borderStyle}
  />
  
  <image 
    href="${emojiUrl}" 
    x="${emojiX}" 
    y="${(height - emojiSize) / 2}"
    width="${emojiSize}" 
    height="${emojiSize}"
  />
  
  <text 
    class="greeting-text" 
    x="${textX}" 
    y="${textY}"
    dominant-baseline="middle"
  >${greeting.text}</text>
  
  ${showSubtext ? `
  <text 
    class="subtext" 
    x="${textX}" 
    y="${subtextY}"
    dominant-baseline="middle"
  >${subtext}</text>
  ` : ''}
</svg>`;

  return svg.trim();
}

// ============================================
// MAIN HANDLER
// ============================================

module.exports = async (req, res) => {
  try {
    const query = req.query;
    
    // Timezone handling
    let timezone = 'UTC';
    
    if (query.timezone) {
      timezone = query.timezone;
    } else if (query.auto !== 'false') {
      const vercelTimezone = req.headers['x-vercel-ip-timezone'];
      if (vercelTimezone) {
        timezone = vercelTimezone;
      }
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
    
    // Greeting selection
    const customGreetings = parseCustomGreetings(query);
    const greetingsSource = customGreetings || DEFAULT_GREETINGS;
    const greetingsArray = greetingsSource[timeBlock] || DEFAULT_GREETINGS[timeBlock];
    const greeting = getRandomItem(greetingsArray);
    
    // Theme and styling
    const theme = query.theme || 'default';
    const themeMode = query.mode || 'auto';
    
    // Font handling
    const { fontFamily, fontImport } = getFontCSS(query.font);
    
    // Generate SVG
    const svg = generateSVG(greeting, {
      width: parseInt(query.width, 10) || 420,
      height: parseInt(query.height, 10) || 100,
      theme,
      themeMode,
      fontSize: parseInt(query.fontSize, 10) || 20,
      fontFamily,
      fontImport,
      customBg: query.bg,
      customTextColor: query.textColor,
      borderRadius: parseInt(query.borderRadius, 10) || 12,
      showSubtext: query.subtext !== 'false' && query.subtext !== '',
      subtext: query.subtext && query.subtext !== 'true' ? decodeURIComponent(query.subtext) : 'Welcome to my profile',
      showBorder: query.border !== 'false',
      padding: parseInt(query.padding, 10) || 24,
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
    
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="100" viewBox="0 0 420 100">
  <style>
    .bg { fill: #fef2f2; }
    .text { fill: #991b1b; font-family: -apple-system, sans-serif; font-size: 14px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #1f0a0a; }
      .text { fill: #fecaca; }
    }
  </style>
  <rect class="bg" width="420" height="100" rx="12"/>
  <text class="text" x="210" y="55" text-anchor="middle">Something went wrong</text>
</svg>`;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(500).send(errorSvg);
  }
};
