# Navigation Testing Guide

## How to Test Navigation Links

### Step 1: Open Browser Console
- Press F12 or right-click → Inspect → Console tab
- You should see console logs when clicking navigation links

### Step 2: Test Each Menu Link

Open the menu and click each link. You should see console logs like:
```
[ScrollToSection] Attempting to scroll to: #about
[ScrollToSection] Found element #about, scrolling to position: 1234
```

### Menu Links to Test:

1. **Apie mus / About Us** → Should scroll to `#about` section
2. **Paslaugos** → Submenu opens
   - **Vidinėse muitinėse** → Should scroll to `#services`
   - **Pasieniuose** → Should scroll to `#border-services`
3. **DUK / FAQ** → Should scroll to `#faq`
4. **Kontaktai / Contacts** → Should scroll to `#contact-form`

### Expected Behavior:

✅ **Correct:**
- Click link → Menu closes → Page scrolls smoothly
- Section appears below the fixed header (not hidden behind it)
- Console shows: "Found element #[id], scrolling to position..."

❌ **Incorrect:**
- Console shows: "Element #[id] not found!"
- Section is cut off by header
- Need to click twice

### Section IDs on Homepage:

| Menu Link | Section ID | Location |
|-----------|-----------|----------|
| Apie mus | `about` | About section |
| Vidinėse muitinėse | `services` | Internal services carousel |
| Pasieniuose | `border-services` | Border services grid |
| DUK | `faq` | FAQ accordion |
| Kontaktai | `contact-form` | Contact form at bottom |

### Troubleshooting:

**If console shows "Element not found":**
- Check if the section ID exists in Home.tsx
- Check browser console for the exact ID being searched

**If scrolling is cut off:**
- Increase the offset value in `scrollToSection.ts` (currently 150px)

**If menu doesn't close:**
- Check if `toggleMenu()` is being called
- Look for errors in console

## Testing Across Languages

Test in all languages to ensure links work:
- Lithuanian (LT): http://localhost:5173/
- English (EN): http://localhost:5173/en/
- Russian (RU): http://localhost:5173/ru/
- Polish (PL): http://localhost:5173/pl/

All menu links should work the same in all languages!



