# Manual Updates Required After Running Script

## 1. Photo Replacements
- **Headshots Folder**: Replace all 3 JPG files in `ryanbgates.com headshots/`
  - Keep the same filenames: `Headshot 1.JPG`, `Headshot 2.JPG`, `Headshot 3.JPG`
  
- **Production Photos**: Replace all photos in `ryanbgates.com still photos/`
  - Keep existing filenames or update the marquee references in `index.html`

## 2. Biography Update
**Files to edit:**
- `about/about-desktop.html` (lines ~50-70)
- `about/about-mobile.html` (similar section)

Replace the entire biography section with the new actor's story.

## 3. Credits/Resume Update
**Files to edit:**
- `work/work-desktop.html` (Film Projects, Web Series, TV/Commercials, Education, Skills sections)
- `work/work-mobile.html` (same sections)

Update all:
- Film titles and roles
- Director names
- Training schools
- Skills list

## 4. Resume PDF
- Replace `Ryan B. Gates Actor Resume.pdf` with new actor's resume
- Keep the same filename format: `[Actor Name] Actor Resume.pdf`

## 5. Folder Renaming (Optional)
- Rename `ryanbgates.com headshots/` to `[actorname] headshots/`
- Rename `ryanbgates.com still photos/` to `[actorname] still photos/`
- Update all references in HTML files if you rename folders

## 6. Domain-Specific Updates
If using a different domain:
- Update Nginx configuration
- Update SSL certificates
- Update DNS settings

## 7. Detailed Content Areas to Update

### Homepage (index.html)
- Hero image and background
- Marquee/carousel photos
- Any embedded text or quotes

### About Pages
- Full biography text
- Personal story details
- Career highlights
- Training background

### Work Pages
- Complete filmography
- Television credits
- Commercial work
- Theater credits
- Training and education
- Special skills

### Photos Pages
- All headshot images
- Production stills
- Behind-the-scenes photos

### Reel Page
- Video files
- Video thumbnails
- Reel descriptions

## 8. Technical Considerations
- Ensure all image file sizes are web-optimized
- Maintain consistent image dimensions where possible
- Test all links and navigation
- Verify mobile responsiveness after changes
- Check loading times with new images