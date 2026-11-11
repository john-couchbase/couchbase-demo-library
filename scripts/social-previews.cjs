// Run with NODE_PATH pointing to a sharp installation. Artwork stays editable SVG.
const fs=require('fs'),path=require('path'),sharp=require('sharp');
const root=process.env.DEMO_WORKSPACE || path.resolve(__dirname,'../..');
const logo=fs.readFileSync(root+'/couchbase-demo-library/dist/assets/couchbase-logo.svg','utf8').replace(/<svg[^>]*>/,'<svg x="73" y="59" width="255" height="53" viewBox="-16 -16 1472 302.97">');
const common='<circle cx="920" cy="310" r="164" fill="#F7E09E"/><path d="M865 415l83-120 77 120z" fill="#E9A343"/><circle cx="1075" cy="387" r="31" fill="#DD3327"/>';
const tile=(x,y,c,icon,angle)=>`<g transform="translate(${x} ${y}) rotate(${angle} 60 60)"><rect width="120" height="120" rx="20" fill="${c}"/><g fill="none" stroke="#FFF8EE" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${icon}</g></g>`;
const hotel=tile(765,230,'#EA6B4E','<path d="M30 78h60M36 70a24 24 0 0148 0M60 38v-5"/>',-12)+tile(945,155,'#2D6573','<rect x="32" y="25" width="56" height="70" rx="3"/><path d="M47 42h1m24 0h1M47 59h1m24 0h1M55 94V78h10v16"/>',12);
const air=tile(765,230,'#EA6B4E','<path d="M30 60h60M67 38l23 22-23 22"/>',-12)+tile(945,155,'#2D6573','<path d="M28 71l64-43-26 66-9-28-29 5zM57 66l35-38"/>',12);
const library=tile(765,230,'#EA6B4E','<path d="M35 82V60m25 22V42m25 40V30"/>',-12)+tile(945,155,'#2D6573','<rect x="28" y="28" width="64" height="64" rx="5"/><path d="M28 49h64M50 49v43"/>',12);
const cards=[
 ['hotel','Hotel','concierge','A better stay, thoughtfully.','Meet your concierge',hotel,'couchbase-ai-learning/demos/harborline/public/assets'],
 ['air','Air','recovery','Every disruption. A way forward.','Explore flight recovery',air,'aidp-air/web/public'],
 ['library','Internal','demo library','See it. Try it. Build on it.','Explore the demos',library,'couchbase-demo-library/dist/assets']
];
(async()=>{for(const [id,a,b,sub,cta,art,dir] of cards){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#FFF8EE"/><rect x="20" y="20" width="1160" height="590" rx="30" fill="none" stroke="#E9DCC9"/>${logo}<g font-family="Arial, Helvetica, sans-serif"><text x="74" y="245" font-size="76" font-weight="700" fill="#202420">${a}</text><text x="74" y="330" font-size="76" font-weight="700" fill="#202420">${b}</text><text x="77" y="400" font-size="29" fill="#565E59">${sub}</text><rect x="76" y="466" width="302" height="64" rx="12" fill="#DD3327"/><text x="227" y="507" text-anchor="middle" font-size="23" font-weight="700" fill="white">${cta}</text></g>${common}${art}</svg>`; const dest=path.join(root,dir);fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,'social-preview-v3.svg'),svg);await sharp(Buffer.from(svg)).png().toFile(path.join(dest,'social-preview-v3.png')); console.log(id+' preview rendered');}})();
