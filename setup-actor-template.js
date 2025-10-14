const fs = require('fs');
const path = require('path');

// Read the configuration file
function loadConfig() {
    try {
        const configPath = path.join(__dirname, 'actor-config.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('Error reading config file:', error);
        process.exit(1);
    }
}

// Replace content in a file with comprehensive pattern matching
function replaceInFile(filePath, replacements) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        replacements.forEach(({ from, to, isRegex }) => {
            if (isRegex) {
                // Use the regex directly
                content = content.replace(from, to);
            } else {
                // Use global regex to replace all instances
                const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                content = content.replace(regex, to);
            }
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Updated: ${filePath}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Get all HTML files to update
function getHtmlFiles() {
    const files = [
        'index.html',
        'about/about-desktop.html',
        'about/about-mobile.html',
        'work/work-desktop.html',
        'work/work-mobile.html',
        'photos/photos-desktop.html',
        'photos/photos-mobile.html',
        'reel/reel-desktop.html',
        'reel/reel-mobile.html'
    ];
    
    return files.filter(file => fs.existsSync(file));
}

// Main setup function
function setupActorTemplate() {
    const config = loadConfig();
    console.log(`Setting up template for: ${config.actor.name}`);
    
    // Define all replacements needed - Replace Jane Smith template with config data
    const replacements = [
        // === LOADER DOMAIN ===
        { from: 'janesmith.com</div>', to: `${config.actor.domain}</div>` },
        
        // === ACTOR NAME REPLACEMENTS ===
        { from: 'JANE SMITH', to: config.actor.name },
        { from: 'Jane Smith', to: config.actor.fullName },
        { from: 'Jane', to: config.actor.firstName },
        
        // Navigation and button text
        { from: 'About Jane', to: `About ${config.actor.firstName}` },
        
        // === PAGE TITLES AND META TAGS ===
        { from: 'Jane Smith - Actor Portfolio', to: `${config.actor.fullName} - Actor Portfolio` },
        { from: 'Jane Smith - Professional Actor', to: `${config.actor.fullName} - Professional Actor` },
        { from: 'Jane Smith Actor Portfolio', to: `${config.actor.fullName} Actor Portfolio` },
        { from: 'About Jane Smith - Actor', to: `About ${config.actor.fullName} - Actor` },
        { from: 'Work & Credits - Jane Smith', to: `Work & Credits - ${config.actor.fullName}` },
        { from: 'Credits - Jane Smith', to: `Credits - ${config.actor.fullName}` },
        { from: 'Credits - Jane Smith Actor', to: `Credits - ${config.actor.fullName} Actor` },
        { from: 'Photos - Jane Smith', to: `Photos - ${config.actor.fullName}` },
        { from: 'Reel - Jane Smith', to: `Reel - ${config.actor.fullName}` },
        
        // Meta descriptions with Jane Smith
        { from: /View Jane Smith' acting credits/g, to: `View ${config.actor.fullName}' acting credits`, isRegex: true },
        { from: /View Jane Smith' professional acting credits/g, to: `View ${config.actor.fullName}' professional acting credits`, isRegex: true },
        { from: /Learn about Jane Smith, a professional actor/g, to: `Learn about ${config.actor.fullName}, a professional actor`, isRegex: true },
        
        // Meta keywords
        { from: 'Jane Smith credits, actor filmography, Jane Gates movies', to: `${config.actor.fullName} credits, actor filmography, ${config.actor.fullName} movies` },
        
        // === DOMAIN REPLACEMENTS ===
        { from: 'janesmith.com', to: config.actor.domain },
        { from: 'https://janesmith.com', to: `https://${config.actor.domain}` },
        
        // === CONTACT INFORMATION ===
        // Phone numbers
        { from: /tel:555-123-4567/g, to: `tel:${config.contact.directPhone}`, isRegex: true },
        { from: /data-phone="555-123-4567"/g, to: `data-phone="${config.contact.directPhone}"`, isRegex: true },
        { from: />555-123-4567</g, to: `>${config.contact.directPhone}<`, isRegex: true },
        
        // Agent phone
        { from: /tel:555-987-6543/g, to: `tel:${config.contact.agentPhone}`, isRegex: true },
        { from: /data-phone="555-987-6543"/g, to: `data-phone="${config.contact.agentPhone}"`, isRegex: true },
        { from: />555-987-6543</g, to: `>${config.contact.agentPhone}<`, isRegex: true },
        
        // Emails - Use flexible patterns to catch emails regardless of domain changes
        { from: /mailto:jane@[^"]+/g, to: `mailto:${config.contact.directEmail}`, isRegex: true },
        { from: /data-email="jane@[^"]+"/g, to: `data-email="${config.contact.directEmail}"`, isRegex: true },
        { from: />jane@[^<]+</g, to: `>${config.contact.directEmail}<`, isRegex: true },
        
        // Agent email
        { from: /mailto:agent@talentgroup\.com/g, to: `mailto:${config.contact.agentEmail}`, isRegex: true },
        { from: /data-email="agent@talentgroup\.com"/g, to: `data-email="${config.contact.agentEmail}"`, isRegex: true },
        { from: />agent@talentgroup\.com</g, to: `>${config.contact.agentEmail}<`, isRegex: true },
        
        // === PHYSICAL STATS - Use regex to replace ANY current values ===
        { from: /Height: [^|]+/g, to: `Height: ${config.physical.height}`, isRegex: true },
        { from: /Weight: [^|]+/g, to: `Weight: ${config.physical.weight}`, isRegex: true },
        { from: /Hair: [^|]+/g, to: `Hair: ${config.physical.hair}`, isRegex: true },
        { from: /Eyes: [^<]+/g, to: `Eyes: ${config.physical.eyes}`, isRegex: true },
        { from: /Age: [^|]+/g, to: `Age: ${config.personal.age}`, isRegex: true },
        { from: /Can play: [^<]+/g, to: `Can play: ${config.personal.playingAge}`, isRegex: true },
        
        // === SOCIAL MEDIA ===
        { from: 'https://www.instagram.com/janesmith_actor', to: config.social.instagram },
        
        // === FOLDER REFERENCES - Photo paths ===
        { from: /janesmith\.com headshots\//g, to: `${config.actor.fullName.toLowerCase().replace(/\s+/g, '')}.com headshots/`, isRegex: true },
        { from: /janesmith\.com still photos\//g, to: `${config.actor.fullName.toLowerCase().replace(/\s+/g, '')}.com still photos/`, isRegex: true },
        
        // === SEO CONTENT ===
        { from: 'Jane Smith is a professional actor from Texas with credits in film, television, and commercials. View her portfolio, headshots, reel, and contact information.', to: config.seo.description },
        { from: 'Jane Smith, actor, Texas actor, film actor, commercial actor, headshots, acting reel, casting', to: config.seo.keywords },
        
        // === ADDITIONAL META TAG PATTERNS ===
        { from: /alt="Jane Smith"/g, to: `alt="${config.actor.fullName}"`, isRegex: true },
        { from: /title="Jane Smith/g, to: `title="${config.actor.fullName}`, isRegex: true },
        { from: /"Jane Smith -/g, to: `"${config.actor.fullName} -`, isRegex: true },
        { from: /content="Jane Smith"/g, to: `content="${config.actor.fullName}"`, isRegex: true }
    ];
    
    // Update all HTML files
    const htmlFiles = getHtmlFiles();
    htmlFiles.forEach(file => {
        replaceInFile(file, replacements);
    });
    
    console.log('\n📝 Next steps:');
    console.log('1. Replace photos in the headshots and still photos folders');
    console.log('2. Update the biography in about/about-desktop.html and about/about-mobile.html');
    console.log('3. Update the credits/resume in work/work-desktop.html and work/work-mobile.html');
    console.log('4. Replace the PDF resume file');
    console.log('5. Test the website locally');
    
    console.log('\n✅ Template setup complete!');
}

// Run the setup
setupActorTemplate();