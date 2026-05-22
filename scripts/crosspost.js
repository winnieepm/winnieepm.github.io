#!/usr/bin/env node
// Cross-posts a blog post from this site to the Scholars' Lab Jekyll repo.
// Usage: npm run crosspost -- collections/blogs/YYYY-MM-DD-post-name.md
// Optional flag: --category <category>  (defaults to "essay")

const fs = require('fs');
const path = require('path');

const SLAB_REPO    = path.resolve(__dirname, '../../scholarslab.github.io');
const SLAB_POSTS   = path.join(SLAB_REPO, 'collections/_posts');
const SLAB_IMAGES  = path.join(SLAB_REPO, 'assets/post-media');
const MY_IMAGES    = path.resolve(__dirname, '../assets/images');
const AUTHOR_SLUG  = 'winnie-e-pérez-martínez';

// Parses the raw frontmatter string into a plain object.
// Handles proper YAML lists ("- item") and your site's compact form ("-item").
function parseFrontmatter(text) {
  const result = {};
  let currentKey = null;
  let inList = false;

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;

    const properListItem = line.match(/^\s+-\s+(.+)$/);
    const compactListItem = line.match(/^\s+-(\S.*)$/);
    const keyVal = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*):\s*(.*)$/);

    if ((properListItem || compactListItem) && inList) {
      const val = (properListItem || compactListItem)[1].trim();
      result[currentKey].push(val);
    } else if (keyVal) {
      currentKey = keyVal[1];
      const raw = keyVal[2].trim().replace(/^["']|["']$/g, '');
      if (raw === '') {
        result[currentKey] = [];
        inList = true;
      } else if (raw.startsWith('-')) {
        // inline compact list on same line as key: "-value"
        result[currentKey] = [raw.slice(1).trim()];
        inList = true;
      } else {
        result[currentKey] = raw;
        inList = false;
      }
    }
  }

  return result;
}

function buildJekyllFrontmatter(fm, slug, date, category) {
  const tags = (Array.isArray(fm.labels) ? fm.labels : [])
    .map(l => l.replace(/^-/, '').trim())
    .filter(l => l && l !== 'crossPosted');

  const lines = [
    '---',
    `author: ${AUTHOR_SLUG}`,
    `date: ${date}`,
    'layout: post',
    `slug: ${slug}`,
    `title: "${fm.title}"`,
  ];

  if (fm.logline) lines.push(`summary: "${fm.logline}"`);
  lines.push(`category: ${category}`);

  if (tags.length > 0) {
    lines.push('tags:');
    tags.forEach(t => lines.push(`- ${t}`));
  }

  lines.push('---');
  return lines.join('\n');
}

// Finds image filenames referenced in content via src= or markdown image syntax.
function findReferencedImages(content) {
  const images = new Set();
  const patterns = [
    /src="\/assets\/images\/([^"]+)"/g,
    /!\[[^\]]*\]\(\/assets\/images\/([^)]+)\)/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) images.add(m[1]);
  }
  return [...images];
}

function copyImagesAndUpdatePaths(content) {
  const images = findReferencedImages(content);
  if (images.length === 0) return content;

  for (const img of images) {
    const src  = path.join(MY_IMAGES, img);
    const dest = path.join(SLAB_IMAGES, img);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`  Copied: assets/images/${img} → scholarslab/assets/post-media/${img}`);
    } else {
      console.warn(`  Warning: image not found locally — copy manually: assets/images/${img}`);
    }
  }

  return content
    .replace(/src="\/assets\/images\//g, 'src="/assets/post-media/')
    .replace(/\(\/assets\/images\//g, '(/assets/post-media/');
}

// Removes the "Crossposted in the Scholars' Lab blog" line if present.
function stripCrosspostNote(content) {
  return content.replace(/\[Crossposted[^\]]*\]\([^)]*\)\.\n\n?/, '');
}

function main() {
  const args = process.argv.slice(2);
  const inputPath = args.find(a => !a.startsWith('--'));
  const categoryFlag = args.indexOf('--category');
  const category = categoryFlag !== -1 ? args[categoryFlag + 1] : 'essay';

  if (!inputPath) {
    console.error('Usage: npm run crosspost -- <path-to-post> [--category <category>]');
    process.exit(1);
  }

  const absPath = path.resolve(inputPath);
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(absPath, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    console.error('No frontmatter block (---) found in file.');
    process.exit(1);
  }

  const fm = parseFrontmatter(fmMatch[1]);
  let body = fmMatch[2];

  const filename = path.basename(absPath).replace(/\.md\.md$/, '.md'); // fix double .md if present
  const dateFromFilename = filename.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  const date = fm.date || dateFromFilename;

  if (!date) {
    console.error('Cannot determine date. Add a "date:" field to frontmatter or use YYYY-MM-DD-slug.md filename.');
    process.exit(1);
  }

  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');

  body = stripCrosspostNote(body);
  body = copyImagesAndUpdatePaths(body);

  const outputFilename = `${date}-${slug}.md`;
  const outputPath = path.join(SLAB_POSTS, outputFilename);

  if (fs.existsSync(outputPath)) {
    console.warn(`\nNote: ${outputFilename} already exists in the Scholars' Lab repo — overwriting.`);
  }

  const jekyllFm = buildJekyllFrontmatter(fm, slug, date, category);
  fs.writeFileSync(outputPath, jekyllFm + '\n' + body, 'utf8');

  console.log(`\nCreated: scholarslab.github.io/collections/_posts/${outputFilename}`);
  console.log('\nNext steps:');
  console.log('  1. cd ../scholarslab.github.io');
  console.log('     bundle exec jekyll serve');
  console.log(`  2. Preview: http://localhost:4000/blog/${slug}/`);
  console.log('  3. Open a PR on scholarslab/scholarslab.github.io when satisfied.');
}

main();
