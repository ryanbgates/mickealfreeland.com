# Testing Your New Actor Portfolio

## Local Testing

### 1. Start Local Server
**Option A: Python (if Python is installed):**
```powershell
python -m http.server 8000
```

**Option B: Node.js (if Node.js is installed):**
```powershell
npx http-server -p 8000
```

**Option C: VS Code Live Server Extension:**
- Install "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"

### 2. Test All Pages
Navigate to each page and verify content:

**Desktop Pages:**
- Homepage: `http://localhost:8000`
- About: `http://localhost:8000/about/about-desktop.html`
- Work: `http://localhost:8000/work/work-desktop.html`
- Photos: `http://localhost:8000/photos/photos-desktop.html`
- Reel: `http://localhost:8000/reel/reel-desktop.html`

**Mobile Pages:**
- About Mobile: `http://localhost:8000/about/about-mobile.html`
- Work Mobile: `http://localhost:8000/work/work-mobile.html`
- Photos Mobile: `http://localhost:8000/photos/photos-mobile.html`
- Reel Mobile: `http://localhost:8000/reel/reel-mobile.html`

### 3. Mobile Responsiveness Testing
**Using Browser Dev Tools:**
1. Press F12 to open Developer Tools
2. Click the device toggle button (phone/tablet icon)
3. Select different device presets:
   - iPhone 12/13/14
   - Samsung Galaxy S20
   - iPad
   - Custom dimensions

**Test Points:**
- Navigation works on mobile
- Images scale properly
- Text is readable
- Touch targets are appropriate size
- Page loads switch between desktop/mobile versions

### 4. Content Verification Checklist

**Actor Information:**
- [ ] Name appears correctly everywhere
- [ ] Contact information is accurate
- [ ] Physical stats are correct
- [ ] Social media links work

**Images:**
- [ ] All headshots load properly
- [ ] Production photos display correctly
- [ ] Images are appropriately sized
- [ ] No broken image links

**Navigation:**
- [ ] All menu items work
- [ ] Internal links function properly
- [ ] External links open correctly
- [ ] Back/forward browser buttons work

**Content:**
- [ ] Biography reads well
- [ ] Credits are formatted properly
- [ ] Skills list is accurate
- [ ] Contact forms work (if applicable)

## Pre-Production Testing

### 1. Performance Testing
**Check Loading Speed:**
```powershell
# Install lighthouse (requires Node.js)
npm install -g lighthouse

# Run performance audit
lighthouse http://localhost:8000 --view
```

**Manual Checks:**
- Images load quickly
- No excessive file sizes
- Smooth scrolling and animations

### 2. Cross-Browser Testing
Test in multiple browsers:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari (if on Mac)
- Mobile browsers

### 3. SEO Testing
**Meta Tags Verification:**
- Check page titles in browser tabs
- Verify meta descriptions
- Confirm Open Graph tags for social sharing

**Accessibility Testing:**
- Use screen reader mode
- Check color contrast
- Verify keyboard navigation
- Test with images disabled

## Production Deployment

### 1. File Upload
**Via FTP/SFTP:**
```powershell
# Example using WinSCP or FileZilla
# Upload all files to web server root directory
```

**Via Git (recommended):**
```powershell
git init
git add .
git commit -m "Initial actor portfolio setup"
git remote add origin [your-repo-url]
git push -u origin main
```

### 2. Domain Configuration
**DNS Settings:**
- Point A record to server IP
- Configure CNAME for www subdomain
- Set up SSL certificate

**Web Server Configuration:**
- Configure clean URLs (remove .html extensions)
- Set up proper MIME types
- Enable compression

### 3. Final Production Tests
**Live Site Checklist:**
- [ ] All pages load via domain
- [ ] SSL certificate works (https://)
- [ ] Clean URLs function
- [ ] Contact forms submit properly
- [ ] Analytics tracking works
- [ ] Social media links function

### 4. SEO Submission
**Search Engine Registration:**
- Submit sitemap to Google Search Console
- Register with Bing Webmaster Tools
- Update social media profiles with new domain

## Troubleshooting Common Issues

### Images Not Loading
- Check file paths are correct
- Verify image files uploaded properly
- Ensure proper file permissions

### Mobile Version Issues
- Confirm mobile HTML files exist
- Check responsive CSS rules
- Test viewport meta tag

### Performance Problems
- Optimize large images
- Enable server compression
- Minimize CSS/JS files

### Contact Form Issues
- Verify form action URLs
- Check server-side form processing
- Test spam protection measures

## Maintenance Schedule

**Monthly:**
- Check all links still work
- Verify images load properly
- Test contact forms
- Review analytics data

**Quarterly:**
- Update headshots if needed
- Refresh resume/credits
- Review and update biography
- Check for broken external links

**Annually:**
- Renew SSL certificates
- Update copyright year
- Review overall site design
- Consider content updates