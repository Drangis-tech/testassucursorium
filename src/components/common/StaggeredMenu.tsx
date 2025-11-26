import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CaretDown } from '@phosphor-icons/react';
import { scrollToSection } from '@/utils/scrollToSection';
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  children?: {
    label: string;
    link: string;
  }[];
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  isFixed?: boolean;
  currentLanguage?: string;
  alwaysShowLogo?: boolean;
  socialTitle?: string;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  isFixed = false,
  currentLanguage = 'lt',
  onMenuOpen,
  onMenuClose,
  alwaysShowLogo = false,
  socialTitle = 'Kalbos'
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    
    // Handle external links
    if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:')) {
      window.location.href = link;
      if (openRef.current) toggleMenu();
      return;
    }

    // Parse link
    const hashIndex = link.indexOf('#');
    const targetPath = hashIndex !== -1 ? link.substring(0, hashIndex) : link;
    const hash = hashIndex !== -1 ? link.substring(hashIndex + 1) : '';

    // Normalize paths (remove trailing slash for comparison, unless root)
    const normalize = (p: string) => (p.length > 1 && p.endsWith('/')) ? p.slice(0, -1) : p;
    const currentPath = normalize(location.pathname);
    // If targetPath is empty (e.g. "#hash"), it implies current path
    const targetPathNorm = targetPath === '' ? currentPath : normalize(targetPath);
    
    const isSamePage = targetPathNorm === currentPath;

    if (isSamePage) {
      if (hash) {
        // Update URL
        window.history.pushState({}, '', link);
        // Close menu
        if (openRef.current) toggleMenu();
        // Scroll with delay
        setTimeout(() => scrollToSection(hash, 50), 500);
      } else {
        // Home link click on home page -> Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (openRef.current) toggleMenu();
      }
    } else {
      // Navigate to new page
      if (openRef.current) toggleMenu(true);
      navigate(link);
    }
  };

  const toggleItemExpand = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { 
        xPercent: offscreen,
        force3D: true
      });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0, force3D: true });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90, force3D: true });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%', force3D: true });
      gsap.set(textInner, { yPercent: 0, force3D: true });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10, force3D: true });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0, force3D: true });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0, force3D: true });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el, 
        { xPercent: ls.start }, 
        { xPercent: 0, duration: 0.5, ease: 'power4.out', force3D: true }, 
        i * 0.07
      );
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out', force3D: true },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
          force3D: true
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            force3D: true
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            force3D: true,
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback((instant = false) => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: instant ? 0 : 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      force3D: true,
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10, force3D: true });
        }
        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0, force3D: true });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0, force3D: true });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean, instant = false) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { 
        rotate: 225, 
        duration: instant ? 0 : 0.8, 
        ease: 'power4.out', 
        overwrite: 'auto',
        force3D: true
      });
    } else {
      spinTweenRef.current = gsap.to(icon, { 
        rotate: 0, 
        duration: instant ? 0 : 0.35, 
        ease: 'power3.inOut', 
        overwrite: 'auto',
        force3D: true
      });
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean, instant = false) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: instant ? 0 : 0.18,
          duration: instant ? 0 : 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean, instant = false) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0, force3D: true });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: instant ? 0 : (0.5 + lineCount * 0.07),
      ease: 'power4.out',
      force3D: true
    });
  }, []);

  const toggleMenu = useCallback((instant = false) => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose(instant);
      // Reset expanded items when closing menu
      setTimeout(() => {
        setExpandedItems({});
      }, instant ? 0 : 400);
    }
    animateIcon(target, instant);
    animateColor(target, instant);
    animateText(target, instant);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openRef.current && 
        panelRef.current && 
        !panelRef.current.contains(event.target as Node) &&
        !toggleBtnRef.current?.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  // Restore styles for new items when content changes while menu is open
  useLayoutEffect(() => {
    if (open && panelRef.current) {
      const numberEls = Array.from(
        panelRef.current.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
      ) as HTMLElement[];
      
      if (numberEls.length) {
        gsap.set(numberEls, { '--sm-num-opacity': 1, overwrite: true, force3D: true });
      }

      const itemEls = Array.from(panelRef.current.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
      if (itemEls.length) {
        gsap.set(itemEls, { yPercent: 0, rotate: 0, overwrite: true, force3D: true });
      }
    }
  }, [items, open]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <Link to={currentLanguage === 'lt' ? '/' : `/${currentLanguage}`} className={`sm-logo ${alwaysShowLogo ? 'absolute left-8 top-1/2 -translate-y-1/2' : ''}`} aria-label="Logo" onClick={(e) => {
          // If already on homepage, scroll to top
          const path = window.location.pathname;
          const isHome = path === '/' || path === `/${currentLanguage}` || (currentLanguage === 'lt' && path === '/');
          if (isHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <img
            src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}
            alt="Logo"
            className={`sm-logo-img ${alwaysShowLogo ? '' : '[@media(min-width:1470px)]:hidden'}`}
            draggable={false}
            width={110}
            height={24}
          />
        </Link>
        <button
          ref={toggleBtnRef}
          className="sm-toggle ml-auto"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={() => toggleMenu()}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => {
                const hasChildren = it.children && it.children.length > 0;
                const isExpanded = expandedItems[idx];

                return (
                  <li className="sm-panel-itemWrap" key={it.label + idx}>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <a 
                          href={it.link}
                          className="sm-panel-item" 
                          aria-label={it.ariaLabel} 
                          data-index={idx + 1}
                          onClick={(e) => {
                            if (hasChildren) {
                              toggleItemExpand(idx, e);
                            } else {
                              handleNavigation(e, it.link);
                            }
                          }}
                        >
                          <span className="sm-panel-itemLabel flex items-center gap-2">
                            {it.label}
                            {hasChildren && (
                              <CaretDown 
                                weight="bold" 
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                size={32}
                              />
                            )}
                          </span>
                        </a>
                      </div>

                      {/* Submenu */}
                      {hasChildren && (
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                        >
                          <ul className="flex flex-col gap-2">
                            {it.children!.map((child, childIdx) => (
                              <li key={childIdx}>
                                <a
                                  href={child.link}
                                  className="text-2xl font-semibold text-gray-500 hover:text-[#F2CA50] transition-colors duration-200 block py-1 uppercase"
                                  onClick={(e) => handleNavigation(e, child.link)}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title uppercase text-black">{socialTitle}</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => {
                  const langCode = s.link.replace('#lang-', '').toLowerCase();
                  const isActive = langCode === currentLanguage.toLowerCase();
                  return (
                    <li key={s.label + i} className="sm-socials-item">
                      <a 
                        href={s.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="sm-socials-link"
                        onClick={() => {
                          if (openRef.current) {
                            toggleMenu(true);
                          }
                        }}
                        style={{
                          fontWeight: isActive ? 'bold' : 'normal',
                          textDecoration: isActive ? 'underline' : 'none',
                          textDecorationColor: isActive ? '#F2CA50' : 'transparent',
                          textDecorationThickness: isActive ? '2px' : '0px',
                          textUnderlineOffset: isActive ? '4px' : '0px',
                        }}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;

