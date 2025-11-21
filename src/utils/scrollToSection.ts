/**
 * Map language-specific hash names to actual section IDs
 * This keeps section IDs consistent for DecorativeLines while allowing translated URLs
 */
const hashToSectionId: Record<string, string> = {
  // Lithuanian
  'apie-mus': 'about',
  'paslaugos-vidinese-muitinese': 'services',
  'paslaugos-pasieniuose': 'border-services',
  'DUK': 'faq',
  'kontaktai': 'contact-form',
  
  // English
  'about-us': 'about',
  'internal-customs-services': 'services',
  'border-services': 'border-services',
  'faq': 'faq',
  'contacts': 'contact-form',
  
  // Russian
  'o-nas': 'about',
  'vnutrennie-tamozhennye-uslugi': 'services',
  'uslugi-na-granice': 'border-services',
  'kontakty': 'contact-form',
  
  // Polish
  'o-nas': 'about',
  'wewnetrzne-uslugi-celne': 'services',
  'uslugi-na-granicy': 'border-services',
  'kontakt': 'contact-form',
  
  // Fallback to original IDs (in case direct section IDs are used)
  'about': 'about',
  'services': 'services',
  'border-services': 'border-services',
  'faq': 'faq',
  'contact-form': 'contact-form',
  'statistics': 'statistics',
};

/**
 * Utility function to smoothly scroll to a section with proper offset for fixed header
 * Works reliably across all devices and handles timing issues
 * 
 * Increased offset to 150px to ensure sections fully visible below fixed header
 */

export const scrollToSection = (
  hash: string,
  offset: number = 50,
  behavior: ScrollBehavior = 'smooth'
): void => {
  // Map the language-specific hash to the actual section ID
  const sectionId = hashToSectionId[hash] || hash;
  
  console.log(`[ScrollToSection] Hash: #${hash} -> Section ID: #${sectionId}`);
  
  // Wait a bit for any animations to settle
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Force a reflow to ensure accurate positioning
      element.getBoundingClientRect();
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      console.log(`[ScrollToSection] Found element #${sectionId}, scrolling to position: ${offsetPosition}`);
      
      window.scrollTo({
        top: Math.max(0, offsetPosition), // Prevent negative scroll
        behavior: behavior
      });
    } else {
      console.warn(`[ScrollToSection] Element #${sectionId} not found! (from hash: #${hash})`);
    }
  }, 150);
};

export const scrollToSectionImmediate = (
  hash: string,
  offset: number = 50
): void => {
  // Map the language-specific hash to the actual section ID
  const sectionId = hashToSectionId[hash] || hash;
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Force a reflow to ensure accurate positioning
    element.getBoundingClientRect();
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition), // Prevent negative scroll
      behavior: 'smooth'
    });
  }
};

/**
 * Extract hash from URL and scroll to it
 * Retries multiple times to handle lazy-loaded content
 */
export const handleHashScroll = (hash: string, delay: number = 250): void => {
  if (!hash) return;
  
  const hashWithoutSymbol = hash.replace('#', '');
  
  // Try multiple times to ensure element is rendered
  const tryScroll = (attempts: number = 0) => {
    // Map to actual section ID
    const sectionId = hashToSectionId[hashWithoutSymbol] || hashWithoutSymbol;
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Extra delay to ensure element is fully rendered and positioned
      setTimeout(() => {
        scrollToSection(hashWithoutSymbol, 50);
      }, 150);
    } else if (attempts < 10) {
      // Increased retry attempts for slower devices
      setTimeout(() => tryScroll(attempts + 1), 300);
    } else {
      console.error(`[ScrollToSection] Failed to find element after ${attempts} attempts. Hash: ${hashWithoutSymbol}, Expected section ID: ${sectionId}`);
    }
  };
  
  setTimeout(() => tryScroll(), delay);
};

