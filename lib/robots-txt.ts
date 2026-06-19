export function isPathBlocked(robotsTxtContent: string, path: string, userAgent: string): boolean {
  const lines = robotsTxtContent.split(/\r?\n/);
  let currentAgents: string[] = [];
  let isBlocked = false;

  const normalizedPath = path.startsWith('/') ? path : '/' + path;

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(':');
    if (parts.length < 2) continue;

    const key = parts[0].trim().toLowerCase();
    const value = parts.slice(1).join(':').trim();

    if (key === 'user-agent') {
      // If we had agents from previous blocks and are starting a new block of agents,
      // reset currentAgents if the previous line wasn't also user-agent.
      const lineIndex = lines.indexOf(line);
      const prevLine = lineIndex > 0 ? lines[lineIndex - 1]?.trim().toLowerCase() : '';
      if (currentAgents.length > 0 && prevLine && !prevLine.startsWith('user-agent') && !prevLine.startsWith('#')) {
        currentAgents = [];
      }
      currentAgents.push(value.toLowerCase());
    } else if (key === 'disallow' || key === 'allow') {
      const isDisallow = key === 'disallow';
      const applies = currentAgents.includes('*') || currentAgents.some(agent => userAgent.toLowerCase().includes(agent));

      if (applies) {
        let pattern = value;
        if (!pattern) {
          if (isDisallow) {
            isBlocked = false; // Disallow: (empty) means ALLOW everything
          }
          continue;
        }

        const regexStr = '^' + pattern
          .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape regex chars
          .replace(/\*/g, '.*')               // wildcard matching
          .replace(/\?$/, '');                 // trailing question mark
        
        try {
          const regex = new RegExp(regexStr);
          if (regex.test(normalizedPath)) {
            isBlocked = isDisallow;
          }
        } catch {
          if (normalizedPath.startsWith(pattern)) {
            isBlocked = isDisallow;
          }
        }
      }
    }
  }

  return isBlocked;
}

export async function checkRobotsTxt(pageUrl: string): Promise<string[]> {
  const blockedCrawlers: string[] = [];
  try {
    const parsed = new URL(pageUrl);
    const robotsUrl = `${parsed.origin}/robots.txt`;
    const path = parsed.pathname + parsed.search;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(robotsUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    clearTimeout(timeout);

    if (res.status === 200) {
      const robotsTxt = await res.text();
      const agentsToCheck = [
        { name: 'WhatsApp', userAgent: 'WhatsApp' },
        { name: 'Twitterbot', userAgent: 'Twitterbot' },
        { name: 'LinkedInBot', userAgent: 'LinkedInBot' },
        { name: 'Slackbot', userAgent: 'Slackbot' },
        { name: 'Discordbot', userAgent: 'Discordbot' },
        { name: 'Facebook', userAgent: 'facebookexternalhit' }
      ];

      for (const agent of agentsToCheck) {
        if (isPathBlocked(robotsTxt, path, agent.userAgent)) {
          blockedCrawlers.push(agent.name);
        }
      }
    }
  } catch (err) {
    // If robots.txt fetch fails, assume no bots are blocked by default
  }
  return blockedCrawlers;
}
