import { readFile, writeFile } from 'node:fs/promises';

const site = 'https://github.com/Whiteware-Lab/shopmatepro-site/releases';
const release = JSON.parse(await readFile(process.argv[2], 'utf8'));
const version = /^v(\d+\.\d+\.\d+)-build\.([1-9]\d{0,8})$/.exec(release.tagName);
if (!version) throw new Error('Expected a release tag vVERSION-build.BUILD');

function assetUrl(name) {
  const asset = release.assets.find((asset) => asset.name === name);
  const expected = `${site}/download/${release.tagName}/${name}`;
  if (asset?.state !== 'uploaded' || asset.url !== expected || asset.size <= 0) {
    throw new Error(`Missing or incomplete release asset ${name}`);
  }
  return expected;
}

const replacements = {
  VERSION: version[1],
  BUILD: version[2],
  ANDROID_URL: assetUrl('ShopmatePro-Android.apk'),
  WINDOWS_URL: assetUrl('ShopmatePro-Setup.exe'),
  CHECKSUMS_URL: assetUrl('SHA256SUMS.txt'),
  RELEASE_URL: `${site}/tag/${release.tagName}`,
};
const page = new URL('../dist/index.html', import.meta.url);
const html = await readFile(page, 'utf8');
await writeFile(page, html.replace(/\{\{([A-Z_]+)\}\}/g, (token, key) => {
  if (!(key in replacements)) throw new Error(`Unexpected placeholder ${token}`);
  return replacements[key];
}));
await writeFile(new URL('../dist/latest-build.txt', import.meta.url), version[2] + '\n');
