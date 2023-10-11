# Nightbot Exporter

## Installation
``` bash
git clone https://github.com/redbeardymcgee/nightbot-exporter
cd nightbot-exporter
npm install
npm start
```

## Usage
1. In your browser, navigate to [localhost:3000](http://localhost:3000).
2. Click `Authorize` to allow access to your Nightbot data.
3. Toggle the switches for each category that you wish to export.
4. Click `Export`.

A file named `nightbot-export.json` will be downloaded automatically.

### Warning!
This tool currently downloads the raw data from Nightbot's API without making any effort to clean or organize it whatsoever. There is quite a bit of extraneous metadata attached to each object. I am preserving this metadata on purpose, for now, in case it is useful for importing elsewhere (such as a different chatbot).

If you have large amounts of data to export, the resulting JSON file can be large. Beware, as this can result in your text editor becoming sluggish, hanging, or even not responding for a few seconds. Any modern editor **should** still happily load the file.

