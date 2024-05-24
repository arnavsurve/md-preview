#!/usr/bin/env node
// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const marked = require('marked');


const app = express();
const PORT = 9999;

const fileName = process.argv[2];

// set path to file passed as argument
if (!fileName) {
    console.error('Please provide a path to a markdown file');
    process.exit(1);
  }
const filePath = path.join(process.cwd(), process.argv[2]);

// set path to file
// const filePath = path.join(__dirname, 'sample.md');

let markdownContent = '';

const readFile = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('error reading file', err);
      markdownContent = '';
      return;
    }

    markdownContent = data;
  });
}

// read md file
readFile(filePath);

// watch for changes in the file
chokidar.watch(filePath).on('change', () => {
  console.log('file changed');
  readFile(filePath);
});

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get markdown content
app.get('/markdown', (req, res) => {
  res.json({ content: markdownContent });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
