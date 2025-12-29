import fs from 'fs';

const FILE_PATH = 'src/data/modules/musicCards.ts';

function extractObjects(content) {
  const arrayMatch = content.match(/export default \[(.*?)\];/s);
  if (!arrayMatch) return null;

  const arrayContent = arrayMatch[1];
  const objects = [];
  let braceCount = 0;
  let startIndex = -1;

  for (let i = 0; i < arrayContent.length; i++) {
    if (arrayContent[i] === '{') {
      if (braceCount === 0) startIndex = i;
      braceCount++;
    } else if (arrayContent[i] === '}') {
      braceCount--;
      if (braceCount === 0 && startIndex !== -1) {
        objects.push(arrayContent.substring(startIndex, i + 1));
        startIndex = -1;
      }
    }
  }

  return objects;
}

function extractBilibiliBV(objStr) {
  const urlMatch = objStr.match(/url:\s*"([^"]+)"/);
  if (!urlMatch || !urlMatch[1].includes('bilibili.com/video/')) return null;

  const bvMatch = urlMatch[1].match(/BV[0-9A-Za-z]+/);
  return bvMatch ? bvMatch[0] : null;
}

async function getBilibiliViewCount(bv) {
  try {
    const response = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bv}`);
    if (!response.ok) return null;

    const json = await response.json();
    return json.code === 0 && json.data ? json.data.stat.view : null;
  } catch {
    return null;
  }
}

function formatViewCount(count) {
  if (count >= 100000000) return (count / 100000000).toFixed(1) + '亿';
  if (count >= 10000) return (count / 10000).toFixed(1) + 'W';
  return count.toString();
}

async function processObjects(objects) {
  const bvMap = new Map();

  for (let i = 0; i < objects.length; i++) {
    const bv = extractBilibiliBV(objects[i]);
    if (bv) bvMap.set(i, bv);
  }

  const viewCounts = await Promise.all(
    Array.from(bvMap.values()).map(bv => {
      console.log(`正在获取 ${bv} 的播放量...`);
      return getBilibiliViewCount(bv);
    })
  );

  const bvValues = Array.from(bvMap.values());
  const viewCountMap = new Map();
  for (let i = 0; i < bvValues.length; i++) {
    viewCountMap.set(bvValues[i], viewCounts[i]);
  }

  return objects.map((objStr, index) => {
    const bv = bvMap.get(index);
    if (!bv) return objStr;

    const viewCount = viewCountMap.get(bv);
    if (!viewCount) return objStr;

    const formattedViewCount = formatViewCount(viewCount);
    return objStr.replace(/btnText:\s*"[^"]+"/, `btnText: "${formattedViewCount} views 🎥"`);
  });
}

async function main() {
  try {
    const fileContent = fs.readFileSync(FILE_PATH, 'utf8');
    const objects = extractObjects(fileContent);

    if (!objects || objects.length === 0) {
      console.error('无法解析文件内容');
      process.exit(1);
    }

    const processedObjects = await processObjects(objects);
    const newArrayContent = processedObjects.join(',\n  ');
    const newFileContent = fileContent.replace(
      /export default \[(.*?)\];/s,
      `export default [\n  ${newArrayContent}\n];`
    );

    fs.writeFileSync(FILE_PATH, newFileContent, 'utf8');
    console.log('更新完成！');
  } catch (error) {
    console.error('更新过程中出错:', error);
    process.exit(1);
  }
}

main();
