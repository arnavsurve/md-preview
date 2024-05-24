// public/script.js

import { marked } from 'marked';
const textarea = document.getElementById('markdown');
const preview = document.getElementById('preview');

const fetchMarkdown = async () => {
  try {
    const response = await fetch('/markdown')
    const data = await response.json();
    preview.innerHTML = marked(data.content);
  } catch (err) {
    console.error('error fetching markdown: ', err);
  }
};

// initial fetch
fetchMarkdown();

// polling for changes (every second)
setInterval(fetchMarkdown, 1000);

// document.addEventListener('DOMContentLoaded', () => {
//   const textarea = document.getElementById('markdown');
//   const preview = document.getElementById('preview');
//
//   textarea.addEventListener('input', () => {
//     const markdown = textarea.value;
//     preview.innerHTML = marked(markdown);
//   });
// });
