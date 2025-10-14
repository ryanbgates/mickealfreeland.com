// ========== BASIC MARQUEE STATUS ==========
// Background marquees run purely on CSS animations
// All headshots are displayed simultaneously - no slideshow needed

// ========== ACTOR CONFIGURATION ==========
let actorConfig = null;

// Load actor configuration
async function loadActorConfig() {
    try {
        const response = await fetch('actor-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        actorConfig = await response.json();
        console.log('✅ Actor configuration loaded:', actorConfig);
        return actorConfig;
    } catch (error) {
        console.error('❌ Failed to load actor configuration:', error);
        // Fallback to default config if file doesn't exist
        actorConfig = { portfolio: { hasReel: true } };
        return actorConfig;
    }
}

// Configure navigation based on actor settings
function configureNavigation() {
    if (!actorConfig) {
        console.error('❌ Actor config not loaded, using defaults');
        return;
    }
    
    const hasReel = actorConfig.portfolio?.hasReel !== false; // Default to true if not specified
    const hasAgent = actorConfig.portfolio?.hasAgent !== false; // Default to true if not specified
    const reelNavItem = document.querySelector('.nav-item:nth-child(3)'); // Reel is the 3rd nav-item
    const navMenu = document.querySelector('.nav-menu');
    const contactCard = document.querySelector('.contact-card');
    
    console.log(`🎬 Reel configuration: hasReel = ${hasReel}`);
    console.log(`👤 Agent configuration: hasAgent = ${hasAgent}`);
    console.log('🔍 Looking for reel nav item...');
    console.log('Reel nav item:', reelNavItem);
    
    // Handle reel configuration
    if (!hasReel) {
        // Hide reel and apply no-reel layout
        if (reelNavItem) {
            console.log('🎬 Hiding reel navigation item');
            reelNavItem.style.display = 'none';
        }
        
        if (navMenu) {
            console.log('📋 Adding no-reel-layout class to nav-menu');
            navMenu.classList.add('no-reel-layout');
            console.log('📋 Nav menu classes:', navMenu.className);
        } else {
            console.error('❌ Nav menu not found!');
        }
    } else {
        // Show reel and remove no-reel layout
        if (reelNavItem) {
            console.log('🎬 Showing reel navigation item');
            reelNavItem.style.display = 'flex'; // Restore to flex (original nav-item display)
        }
        
        if (navMenu) {
            console.log('📋 Removing no-reel-layout class from nav-menu');
            navMenu.classList.remove('no-reel-layout');
            console.log('📋 Nav menu classes:', navMenu.className);
        }
    }
    
    // Handle agent configuration
    if (!hasAgent) {
        if (contactCard) {
            console.log('👤 Adding no-agent-layout class to contact-card');
            contactCard.classList.add('no-agent-layout');
        } else {
            console.error('❌ Contact card not found!');
        }
    } else {
        if (contactCard) {
            console.log('👤 Removing no-agent-layout class from contact-card');
            contactCard.classList.remove('no-agent-layout');
        }
    }
    
    console.log('✅ Navigation configured based on actor settings');
}

function initializeMarquees() {
    const topMarquee = document.querySelector('.marquee-right');
    const bottomMarquee = document.querySelector('.marquee-left');
    
    if (!topMarquee || !bottomMarquee) {
        console.error('❌ Marquees not found!');
        return;
    }
    
    console.log('✅ Marquees initialized successfully');
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Ryan B. Gates Portfolio Loading...');
    
    // Load actor configuration first
    await loadActorConfig();
    
    // Initialize loading sequence
    initializePageLoad();
    
    // Configure navigation based on actor settings
    configureNavigation();
    
    // Force fresh page state - reset any transition classes that might persist
    console.log('🔄 Resetting page to clean state...');
    document.body.classList.remove('page-transition-active', 'parallax-slide-out');
    
    // Ensure marquees are in their original state
    const marquees = document.querySelectorAll('.marquee');
    marquees.forEach(marquee => {
        marquee.style.animation = ''; // Reset any inline animation styles
        marquee.style.transform = ''; // Reset any inline transforms
        marquee.style.opacity = ''; // Reset any inline opacity
    });
    
    // Reset headshot container
    const headshotContainer = document.querySelector('.headshot-container');
    if (headshotContainer) {
        headshotContainer.style.transform = '';
        headshotContainer.style.opacity = '';
    }
    
    // Check that all headshots are loaded
    const headshots = document.querySelectorAll('.headshot');
    console.log(`📸 Found ${headshots.length} headshots`);
    
    // Initialize marquees
    initializeMarquees();
    
    // Note: Navigation now uses device detection instead of preloading
    console.log('🔄 Navigation ready - will detect device type on click...');
    
    // Initialize contact handlers (phone and email)
    initializeContactHandlers();
    
    console.log('✅ Portfolio loaded and ready!');
});

// New function to handle the loading sequence
function initializePageLoad() {
    console.log('🎬 Initializing page load sequence...');
    
    const pageLoader = document.querySelector('.page-loader');
    const isMobile = window.innerWidth <= 768;
    
    if (!pageLoader) {
        console.error('❌ Page loader not found!');
        // Fallback: show content immediately if loader is missing
        document.body.classList.add('content-ready');
        return;
    }
    
    // Keep original "mickealfreeland.com" text - don't update with actor name
    // const loaderLogo = pageLoader.querySelector('.loader-logo');
    // if (loaderLogo && actorConfig && actorConfig.actor && actorConfig.actor.name) {
    //     loaderLogo.textContent = actorConfig.actor.name;
    // }
    
    // Mobile-specific preloading strategy
    if (isMobile) {
        console.log('📱 Mobile device detected - using enhanced preloading strategy');
        
        // Force marquee animations to be ready for mobile
        const marquees = document.querySelectorAll('.marquee');
        marquees.forEach(marquee => {
            marquee.style.willChange = 'transform';
            marquee.style.backfaceVisibility = 'hidden';
            marquee.style.perspective = '1000px';
        });
        
        // Pre-initialize touch events for mobile responsiveness
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Ensure viewport is properly set for mobile
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    // Ensure all images are loaded before showing content
    const allImages = document.querySelectorAll('img');
    const headshots = document.querySelectorAll('.headshot');
    
    let loadedImages = 0;
    const totalImages = allImages.length;
    
    console.log(`📸 Loading ${totalImages} images...`);
    
    // Function to check if all images are loaded
    function checkAllImagesLoaded() {
        loadedImages++;
        console.log(`📸 Loaded ${loadedImages}/${totalImages} images`);
        
        if (loadedImages >= totalImages) {
            console.log('✅ All images loaded, starting fade sequence...');
            
            // Mobile-specific delay to ensure smooth rendering
            const mobileDelay = isMobile ? 300 : 0;
            setTimeout(() => {
                startFadeSequence();
            }, mobileDelay);
        }
    }
    
    // Enhanced image loading with mobile optimization
    allImages.forEach((img, index) => {
        if (img.complete && img.naturalHeight !== 0) {
            // Image already loaded and rendered
            checkAllImagesLoaded();
        } else {
            // Wait for image to load
            img.addEventListener('load', checkAllImagesLoaded);
            img.addEventListener('error', () => {
                console.warn(`⚠️ Image ${index} failed to load: ${img.src}`);
                checkAllImagesLoaded(); // Count failed images as "loaded" to prevent hanging
            });
            
            // Force load if not already loading (mobile optimization)
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
        }
    });
    
    // Extended timeout for mobile devices
    const timeoutDuration = isMobile ? 4000 : 3000;
    setTimeout(() => {
        if (loadedImages < totalImages) {
            console.log(`⏰ Timeout reached, showing content anyway (${loadedImages}/${totalImages} loaded)`);
            startFadeSequence();
        }
    }, timeoutDuration);
    
    function startFadeSequence() {
        console.log('🎭 Starting fade sequence...');
        
        // Mobile-specific pre-fade setup
        if (isMobile) {
            // Ensure animations are paused until fade is complete
            const backgroundMarquees = document.querySelector('.background-marquees');
            if (backgroundMarquees) {
                backgroundMarquees.style.animationPlayState = 'paused';
            }
            
            // Force hardware acceleration for mobile
            document.body.style.transform = 'translateZ(0)';
            document.body.style.webkitTransform = 'translateZ(0)';
        }
        
        // Remove loading class from body and make content ready
        document.body.classList.remove('home-page-loading');
        document.body.classList.add('content-ready');
        
        // Wait a moment to ensure everything is rendered
        const renderDelay = isMobile ? 400 : 200;
        setTimeout(() => {
            // Fade out the loader
            pageLoader.classList.add('fade-out');
            
            // Mobile-specific post-fade setup
            if (isMobile) {
                setTimeout(() => {
                    // Resume animations after fade is complete
                    const backgroundMarquees = document.querySelector('.background-marquees');
                    if (backgroundMarquees) {
                        backgroundMarquees.style.animationPlayState = 'running';
                    }
                    
                    // Remove hardware acceleration hints
                    document.body.style.transform = '';
                    document.body.style.webkitTransform = '';
                }, 500);
            }
            
            // Remove the loader after animation completes
            const fadeOutDuration = isMobile ? 1200 : 1000;
            setTimeout(() => {
                if (document.body.contains(pageLoader)) {
                    document.body.removeChild(pageLoader);
                }
                console.log('✅ Loading complete - portfolio ready!');
            }, fadeOutDuration);
        }, renderDelay);
    }
}

// ========== BROWSER BACK BUTTON HANDLING ==========
// Handle browser back button to ensure fresh page state
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was restored from browser cache (back button used)
        console.log('🔙 Page restored from cache - forcing fresh state');
        location.reload(); // Force complete page reload for clean state
    }
});

// Also handle visibility change in case page was cached
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible - check if we need to reset
        if (document.body.classList.contains('page-transition-active') || 
            document.body.classList.contains('parallax-slide-out')) {
            console.log('🔄 Detected stale transition state - reloading page');
            location.reload();
        }
    }
});

// ========== PARALLAX PAGE TRANSITION ==========
class ParallaxTransition {
    constructor() {
        this.isTransitioning = false;
        console.log('🎯 ParallaxTransition class initialized');
    }
    
    async transitionToAbout() {
        console.log('🚀 TRANSITION TO ABOUT TRIGGERED');
        
        if (this.isTransitioning) {
            console.log('⚠️ Transition already in progress, ignoring click');
            return;
        }
        
        console.log('✅ Starting transition sequence...');
        this.isTransitioning = true;
        
        console.log('🔒 Adding page-transition-active class to body');
        document.body.classList.add('page-transition-active');
        
        console.log('🎬 Adding parallax-slide-out class for visual transition');
        document.body.classList.add('parallax-slide-out');
        
        console.log('⏱️ Starting 825ms timer before navigation...');
        setTimeout(() => {
            const aboutPath = getNavigationPath('about');
            console.log('🔗 Timer complete, navigating to About URL:', aboutPath);
            window.location.href = aboutPath;
        }, 825);
        
        console.log('🎯 Transition sequence setup complete');
    }
    
    async transitionToWork() {
        console.log('🚀 TRANSITION TO WORK & CREDITS TRIGGERED');
        
        if (this.isTransitioning) {
            console.log('⚠️ Transition already in progress, ignoring click');
            return;
        }
        
        console.log('✅ Starting transition sequence...');
        this.isTransitioning = true;
        
        console.log('🔒 Adding page-transition-active class to body');
        document.body.classList.add('page-transition-active');
        
        console.log('🎬 Adding parallax-slide-out class for visual transition');
        document.body.classList.add('parallax-slide-out');
        
        console.log('⏱️ Starting 825ms timer before navigation...');
        setTimeout(() => {
            const workPath = getNavigationPath('work');
            console.log('🔗 Timer complete, navigating to Work URL:', workPath);
            window.location.href = workPath;
        }, 825); // Tight timing for seamless transition
        
        console.log('🎯 Transition sequence setup complete');
    }
    
    async transitionToPhotos() {
        console.log('🚀 TRANSITION TO PHOTOS TRIGGERED');
        
        if (this.isTransitioning) {
            console.log('⚠️ Transition already in progress, ignoring click');
            return;
        }
        
        console.log('✅ Starting transition sequence...');
        this.isTransitioning = true;
        
        console.log('🔒 Adding page-transition-active class to body');
        document.body.classList.add('page-transition-active');
        
        console.log('🎬 Adding parallax-slide-out class for visual transition');
        document.body.classList.add('parallax-slide-out');
        
        console.log('⏱️ Starting 825ms timer before navigation...');
        setTimeout(() => {
            const photosPath = getNavigationPath('photos');
            console.log('🔗 Timer complete, navigating to Photos URL:', photosPath);
            window.location.href = photosPath;
        }, 825); // Tight timing for seamless transition
        
        console.log('🎯 Transition sequence setup complete');
    }
    
    async transitionToReel() {
        console.log('🚀 TRANSITION TO REEL TRIGGERED');
        
        if (this.isTransitioning) {
            console.log('⚠️ Transition already in progress, ignoring click');
            return;
        }
        
        console.log('✅ Starting transition sequence...');
        this.isTransitioning = true;
        
        console.log('🔒 Adding page-transition-active class to body');
        document.body.classList.add('page-transition-active');
        
        console.log('🎬 Adding parallax-slide-out class for visual transition');
        document.body.classList.add('parallax-slide-out');
        
        console.log('⏱️ Starting 825ms timer before navigation...');
        setTimeout(() => {
            const reelPath = getNavigationPath('reel');
            console.log('🔗 Timer complete, navigating to Reel URL:', reelPath);
            window.location.href = reelPath;
        }, 825); // Tight timing for seamless transition
        
        console.log('🎯 Reel transition sequence setup complete');
    }
}

// Initialize transition manager
console.log('🔧 Creating ParallaxTransition instance...');
const parallaxTransition = new ParallaxTransition();

// Add click handler for About button with detailed logging
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Setting up About button click handler...');
    
    // Wait a moment for all elements to be fully rendered
    setTimeout(() => {
        console.log('🔍 Searching for About button after DOM render...');
        
        // First, let's find ALL possible About buttons
        const allLinks = document.querySelectorAll('a');
        console.log(`🔍 Found ${allLinks.length} total links on page`);
        
        allLinks.forEach((link, index) => {
            const href = link.getAttribute('href') || 'no-href';
            const text = link.textContent.trim();
            console.log(`   Link ${index + 1}: href="${href}" text="${text}"`);
        });
        
        // Try multiple selectors for the About button
        const aboutSelectors = [
            'a[href="#about"]',
            'a:contains("About Ryan")',
            '.nav-link:contains("About")'
        ];
        
        let aboutButton = null;
        let usedSelector = null;
        
        // Try each selector
        for (const selector of aboutSelectors) {
            try {
                if (selector.includes(':contains')) {
                    // Manual search for text content
                    const links = Array.from(document.querySelectorAll('a'));
                    aboutButton = links.find(link => 
                        link.textContent.toLowerCase().includes('about')
                    );
                    if (aboutButton) {
                        usedSelector = 'text-content-search';
                        break;
                    }
                } else {
                    aboutButton = document.querySelector(selector);
                    if (aboutButton) {
                        usedSelector = selector;
                        break;
                    }
                }
            } catch (e) {
                console.log(`⚠️ Selector "${selector}" failed:`, e.message);
            }
        }
        
        console.log('🎯 About button search result:', aboutButton);
        console.log('🔧 Used selector:', usedSelector);
        
        if (aboutButton) {
            console.log('✅ Found About button, adding click handler');
            console.log('📍 About button element:', aboutButton.outerHTML);
            
            // Test if the button is actually clickable
            const rect = aboutButton.getBoundingClientRect();
            console.log('📐 Button position:', {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                visible: rect.width > 0 && rect.height > 0
            });
            
            aboutButton.addEventListener('click', (e) => {
                console.log('🖱️ ABOUT BUTTON CLICKED!');
                console.log('🚫 Preventing default link behavior');
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎬 Calling parallaxTransition.transitionToAbout()');
                parallaxTransition.transitionToAbout();
            });
            
            // Also add mouseenter/mouseleave for hover debugging
            aboutButton.addEventListener('mouseenter', () => {
                console.log('🖱️ Mouse entered About button');
            });
            
            aboutButton.addEventListener('mouseleave', () => {
                console.log('🖱️ Mouse left About button');
            });
            
            console.log('✅ About button click handler successfully attached');
            
            // ========== WORK & CREDITS BUTTON HANDLER ==========
            console.log('🔍 Setting up Work & Credits button click handler...');
            const workButton = document.querySelector('a[href="work.html"]');
            
            if (workButton) {
                console.log('✅ Found Work & Credits button, adding click handler');
                
                workButton.addEventListener('click', (e) => {
                    console.log('🖱️ WORK & CREDITS BUTTON CLICKED!');
                    e.preventDefault();
                    e.stopPropagation();
                    parallaxTransition.transitionToWork();
                });
                
                console.log('✅ Work & Credits button click handler successfully attached');
            } else {
                console.error('❌ Work & Credits button not found!');
            }
            
            // ========== PHOTOS BUTTON HANDLER ==========
            console.log('🔍 Setting up Photos button click handler...');
            const photosButton = document.querySelector('a[href="#photos"]');
            
            if (photosButton) {
                console.log('✅ Found Photos button, adding click handler');
                console.log('📍 Photos button element:', photosButton.outerHTML);
                
                photosButton.addEventListener('click', (e) => {
                    console.log('🖱️ PHOTOS BUTTON CLICKED!');
                    console.log('🚫 Preventing default link behavior');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🎬 Calling parallaxTransition.transitionToPhotos()');
                    parallaxTransition.transitionToPhotos();
                });
                
                console.log('✅ Photos button click handler successfully attached');
            } else {
                console.error('❌ Photos button not found!');
            }
            
            // ========== REEL BUTTON HANDLER ==========
            console.log('🔍 Setting up Reel button click handler...');
            const reelButton = document.querySelector('a[href="#reel"]');
            
            if (reelButton) {
                console.log('✅ Found Reel button, adding click handler');
                console.log('📍 Reel button element:', reelButton.outerHTML);
                
                reelButton.addEventListener('click', (e) => {
                    console.log('🖱️ REEL BUTTON CLICKED!');
                    console.log('🚫 Preventing default link behavior');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🎬 Calling parallaxTransition.transitionToReel()');
                    parallaxTransition.transitionToReel();
                });
                
                console.log('✅ Reel button click handler successfully attached');
            } else {
                console.error('❌ Reel button not found!');
            }
            
        } else {
            console.error('❌ About button not found with any selector!');
            
            // Last resort: attach to all nav links
            const navLinks = document.querySelectorAll('.nav-link');
            console.log(`� Attaching to all ${navLinks.length} nav links as fallback...`);
            
            navLinks.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    const text = link.textContent.trim();
                    console.log(`�️ Nav link ${index + 1} clicked: "${text}"`);
                    
                    if (text.toLowerCase().includes('about')) {
                        console.log('🎯 This appears to be the About link!');
                        e.preventDefault();
                        parallaxTransition.transitionToAbout();
                    } else if (text.toLowerCase().includes('work') && text.toLowerCase().includes('credits')) {
                        console.log('🎯 This appears to be the Work & Credits link!');
                        e.preventDefault();
                        parallaxTransition.transitionToWork();
                    }
                });
            });
        }
    }, 100); // Wait 100ms for DOM to settle
});

// ========== DEVICE DETECTION AND NAVIGATION ==========
function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'blackberry', 'webos'];
    const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isSmallScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isMobileUserAgent || (isSmallScreen && isTouchDevice);
}

// Detect if we're running locally vs production
function isLocalDevelopment() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // Local development indicators
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' || 
           hostname === '0.0.0.0' ||
           port === '8000' || 
           port === '3000' || 
           port === '5000';
}

// Get the appropriate path for navigation based on environment and device
function getNavigationPath(section) {
    if (isLocalDevelopment()) {
        // Local development - use direct file paths
        const isMobile = isMobileDevice();
        const suffix = isMobile ? '-mobile.html' : '-desktop.html';
        return `${section}/${section}${suffix}`;
    } else {
        // Production - use clean URLs (Nginx handles the routing)
        return `/${section}`;
    }
}

function navigateToAbout() {
    console.log('🧭 Navigating to About page with parallax transition...');
    
    // Trigger parallax animation first, then navigate
    if (typeof parallaxTransition !== 'undefined') {
        parallaxTransition.transitionToAbout();
    } else {
        console.error('❌ ParallaxTransition not available, direct navigation');
        const aboutPath = getNavigationPath('about');
        console.log('🔗 Using path:', aboutPath);
        window.location.href = aboutPath;
    }
}

function navigateToWork() {
    console.log('🧭 Navigating to Work & Credits page with parallax transition...');
    
    // Trigger parallax animation first, then navigate
    if (typeof parallaxTransition !== 'undefined') {
        parallaxTransition.transitionToWork();
    } else {
        console.error('❌ ParallaxTransition not available, direct navigation');
        const workPath = getNavigationPath('work');
        console.log('🔗 Using path:', workPath);
        window.location.href = workPath;
    }
}

function navigateToPhotos() {
    console.log('🧭 Navigating to Photos page with parallax transition...');
    
    // Trigger parallax animation first, then navigate
    if (typeof parallaxTransition !== 'undefined') {
        parallaxTransition.transitionToPhotos();
    } else {
        console.error('❌ ParallaxTransition not available, direct navigation');
        const photosPath = getNavigationPath('photos');
        console.log('🔗 Using path:', photosPath);
        window.location.href = photosPath;
    }
}

function navigateToReel() {
    console.log('🧭 Navigating to Reel page with parallax transition...');
    
    // Trigger parallax animation first, then navigate
    if (typeof parallaxTransition !== 'undefined') {
        parallaxTransition.transitionToReel();
    } else {
        console.error('❌ ParallaxTransition not available, direct navigation');
        const reelPath = getNavigationPath('reel');
        console.log('🔗 Using path:', reelPath);
        window.location.href = reelPath;
    }
}

// ========== CONTACT CARD FUNCTIONALITY ==========
function toggleContactCard(event) {
    console.log('📞 Contact toggle triggered');
    
    // Prevent default link behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const contactCard = document.querySelector('.contact-card');
    const headshotContainer = document.querySelector('.headshot-container');
    
    if (!contactCard || !headshotContainer) {
        console.error('❌ Contact card or headshot container not found!');
        return;
    }
    
    const isContactVisible = contactCard.classList.contains('show');
    
    if (isContactVisible) {
        // Hide contact card, show headshot container
        console.log('📞 Hiding contact card, showing headshot container');
        contactCard.classList.remove('show');
        headshotContainer.style.display = 'flex';
    } else {
        // Show contact card, hide headshot container
        console.log('📞 Showing contact card, hiding headshot container');
        contactCard.classList.add('show');
        headshotContainer.style.display = 'none';
    }
}

// ========== PHONE NUMBER HANDLING ==========
function handlePhoneClick(event, phoneNumber) {
    console.log('📱 Phone number clicked:', phoneNumber);
    
    if (isMobileDevice()) {
        // On mobile: allow default tel: link behavior for direct calling
        console.log('📱 Mobile device - initiating direct call');
        return true; // Allow default behavior
    } else {
        // On desktop: copy to clipboard
        event.preventDefault();
        event.stopPropagation();
        
        console.log('🖥️ Desktop device - copying to clipboard');
        
        // Copy to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
            console.log('✅ Phone number copied to clipboard');
            showCopyConfirmation(phoneNumber);
        }).catch(err => {
            console.error('❌ Failed to copy to clipboard:', err);
            // Fallback for older browsers
            fallbackCopyToClipboard(phoneNumber);
        });
        
        return false;
    }
}

// ========== EMAIL HANDLING ==========
function handleEmailClick(event, emailAddress) {
    console.log('📧 Email address clicked:', emailAddress);
    
    if (isMobileDevice()) {
        // On mobile: allow default mailto: link behavior
        console.log('📱 Mobile device - opening email app');
        return true; // Allow default behavior
    } else {
        // On desktop: copy to clipboard
        event.preventDefault();
        event.stopPropagation();
        
        console.log('🖥️ Desktop device - copying email to clipboard');
        
        // Copy to clipboard
        navigator.clipboard.writeText(emailAddress).then(() => {
            console.log('✅ Email address copied to clipboard');
            showCopyConfirmation(emailAddress);
        }).catch(err => {
            console.error('❌ Failed to copy email to clipboard:', err);
            // Fallback for older browsers
            fallbackCopyToClipboard(emailAddress);
        });
        
        return false;
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('✅ Phone number copied using fallback method');
            showCopyConfirmation(text);
        } else {
            console.error('❌ Fallback copy failed');
        }
    } catch (err) {
        console.error('❌ Fallback copy error:', err);
    }
    
    document.body.removeChild(textArea);
}

// Show confirmation when number is copied
function showCopyConfirmation(phoneNumber) {
    // Create or find existing notification
    let notification = document.querySelector('.copy-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: Georgia, serif;
            font-size: 14px;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = `📋 Copied: ${phoneNumber}`;
    notification.style.opacity = '1';
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}

// Initialize phone number and email click handlers
function initializeContactHandlers() {
    console.log('📞 Initializing contact handlers...');
    
    // Phone number handlers
    const phoneLinks = document.querySelectorAll('.phone-link');
    console.log(`📞 Found ${phoneLinks.length} phone links`);
    
    phoneLinks.forEach((link, index) => {
        const phoneNumber = link.getAttribute('data-phone');
        console.log(`📞 Setting up handler for phone ${index + 1}: ${phoneNumber}`);
        
        link.addEventListener('click', (event) => {
            handlePhoneClick(event, phoneNumber);
        });
    });
    
    // Email handlers
    const emailLinks = document.querySelectorAll('.email-link');
    console.log(`📧 Found ${emailLinks.length} email links`);
    
    emailLinks.forEach((link, index) => {
        const emailAddress = link.getAttribute('data-email');
        console.log(`📧 Setting up handler for email ${index + 1}: ${emailAddress}`);
        
        link.addEventListener('click', (event) => {
            handleEmailClick(event, emailAddress);
        });
    });
    
    console.log('✅ Contact handlers initialized');
}

// ========== RESUME DOWNLOAD FUNCTIONALITY ==========
function downloadResume(event) {
    console.log('📄 Resume download triggered');
    
    // Prevent default link behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Path to the resume file - using the new resume image
    const resumePath = 'MickealFreeland Resume.jpg';
    
    // Check if the file exists by attempting to fetch it
    fetch(resumePath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // File exists, proceed with download
                console.log('✅ Resume file found, initiating download');
                
                // Create a temporary anchor element to trigger download
                const link = document.createElement('a');
                link.href = resumePath;
                link.download = 'MickealFreeland-Resume.jpg'; // Suggested filename for download
                link.style.display = 'none';
                
                // Add to DOM, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success notification
                showDownloadNotification('Resume download started!', 'success');
                
            } else {
                console.error('❌ Resume file not found at:', resumePath);
                showDownloadNotification('Resume file not available', 'error');
            }
        })
        .catch(error => {
            console.error('❌ Error checking resume file:', error);
            
            // Fallback: try to download anyway in case it's a CORS issue
            console.log('🔄 Attempting download anyway...');
            const link = document.createElement('a');
            link.href = resumePath;
            link.download = 'MickealFreeland-Resume.jpg';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showDownloadNotification('Download attempted - please check your downloads folder', 'info');
        });
}

// Show download notification
function showDownloadNotification(message, type = 'info') {
    // Create or find existing notification
    let notification = document.querySelector('.download-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-family: Georgia, serif;
            font-size: 14px;
            z-index: 10001;
            opacity: 0;
            transition: all 0.3s ease-in-out;
            pointer-events: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            max-width: 300px;
            word-wrap: break-word;
        `;
        document.body.appendChild(notification);
    }
    
    // Set color based on type
    let borderColor = 'rgba(255, 255, 255, 0.2)';
    let icon = '📄';
    
    switch (type) {
        case 'success':
            borderColor = 'rgba(0, 255, 0, 0.3)';
            icon = '✅';
            break;
        case 'error':
            borderColor = 'rgba(255, 0, 0, 0.3)';
            icon = '❌';
            break;
        case 'info':
            borderColor = 'rgba(255, 215, 0, 0.3)';
            icon = 'ℹ️';
            break;
    }
    
    notification.style.borderColor = borderColor;
    notification.textContent = `${icon} ${message}`;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
    }, 4000);
}