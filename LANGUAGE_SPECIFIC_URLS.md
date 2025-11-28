# Language-Specific Navigation URLs

## ✅ Implementation Complete

The navigation now uses **language-specific hash URLs** while keeping the actual section IDs consistent for DecorativeLines.tsx.

## 🌍 URL Structure by Language

### English (Default)
- About Us: `/#about-us` → scrolls to section `id="about"`
- Services (Internal): `/#internal-customs-services` → scrolls to section `id="services"`
- Services (Border): `/#border-services` → scrolls to section `id="border-services"`
- FAQ: `/#faq` → scrolls to section `id="faq"`
- Contacts: `/#contacts` → scrolls to section `id="contact-form"`

### Lithuanian
- About Us: `/lt/#apie-mus` → scrolls to section `id="about"`
- Services (Internal): `/lt/#paslaugos-vidinese-muitinese` → scrolls to section `id="services"`
- Services (Border): `/lt/#paslaugos-pasieniuose` → scrolls to section `id="border-services"`
- FAQ: `/lt/#DUK` → scrolls to section `id="faq"`
- Contacts: `/lt/#kontaktai` → scrolls to section `id="contact-form"`

### Russian
- About Us: `/ru/#o-nas` → scrolls to section `id="about"`
- Services (Internal): `/ru/#vnutrennie-tamozhennye-uslugi` → scrolls to section `id="services"`
- Services (Border): `/ru/#uslugi-na-granice` → scrolls to section `id="border-services"`
- FAQ: `/ru/#faq` → scrolls to section `id="faq"`
- Contacts: `/ru/#kontakty` → scrolls to section `id="contact-form"`

### Polish
- About Us: `/pl/#o-nas` → scrolls to section `id="about"`
- Services (Internal): `/pl/#wewnetrzne-uslugi-celne` → scrolls to section `id="services"`
- Services (Border): `/pl/#uslugi-na-granicy` → scrolls to section `id="border-services"`
- FAQ: `/pl/#faq` → scrolls to section `id="faq"`
- Contacts: `/pl/#kontakt` → scrolls to section `id="contact-form"`

## 🔧 How It Works

### 1. **Mapping System**
Created in `src/utils/scrollToSection.ts`:

```typescript
const hashToSectionId = {
  // Lithuanian
  'apie-mus': 'about',
  'paslaugos-vidinese-muitinese': 'services',
  // ... etc
  
  // English
  'about-us': 'about',
  'internal-customs-services': 'services',
  // ... etc
}
```

### 2. **URL Update**
When clicking a menu link:
1. Prevent default behavior
2. Update URL with `window.history.pushState({}, '', link)`
3. Close menu (450ms animation)
4. Map language-specific hash to section ID
5. Scroll to actual section with 150px offset

### 3. **Section IDs Stay Same**
The actual HTML sections keep their original IDs:
- `id="about"` (NOT `id="apie-mus"`)
- `id="services"` (NOT `id="paslaugos-vidinese-muitinese"`)
- `id="border-services"`
- `id="faq"`
- `id="contact-form"`

This ensures **DecorativeLines.tsx continues to work** without any changes!

## 📝 Files Modified

1. ✅ `src/utils/scrollToSection.ts` - Added hash mapping system
2. ✅ `src/components/common/Header.tsx` - Updated to use language-specific links
3. ✅ `src/components/common/StaggeredMenu.tsx` - Added URL update before scrolling
4. ✅ `src/components/ui/flow-button.tsx` - Added URL update for CTA buttons

## 🧪 Testing

### What You'll See in Browser:

**English Page:**
1. Click "About Us" → URL changes to `/#about-us`
2. Console: `[ScrollToSection] Hash: #about-us -> Section ID: #about`
3. Page scrolls to About section

**Lithuanian Page:**
1. Click "Apie mus" → URL changes to `/lt/#apie-mus`
2. Console: `[ScrollToSection] Hash: #apie-mus -> Section ID: #about`
3. Page scrolls to same About section

### Expected Behavior:
✅ URL updates immediately with language-specific hash
✅ Menu closes smoothly
✅ Page scrolls to correct section
✅ Section appears below fixed header
✅ Console shows hash → section ID mapping
✅ DecorativeLines remain connected properly
✅ Works on all devices

## 🎨 DecorativeLines Compatibility

**Important:** The section IDs in Home.tsx **remain unchanged**:
- `<section id="about">` ✅
- `<section id="services">` ✅
- `<section id="border-services">` ✅
- `<section id="faq">` ✅
- `<section id="contact-form">` ✅

DecorativeLines.tsx references these IDs and continues to work perfectly!

## 🔍 Console Debugging

Open browser console (F12) to see the mapping in action:
```
[ScrollToSection] Hash: #paslaugos-vidinese-muitinese -> Section ID: #services
[ScrollToSection] Found element #services, scrolling to position: 1234
```

This confirms:
1. ✅ Language-specific hash is received
2. ✅ Mapped to correct section ID
3. ✅ Section found and scroll initiated

## 🌐 SEO & Sharing Benefits

- **Better URLs:** `/#kontaktai` vs `/#contact-form` (more natural for Lithuanian users)
- **Language Context:** URLs reflect the site language
- **Shareable:** Users can copy/paste language-specific URLs
- **Bookmarkable:** URLs are more meaningful in user's language



