// Add your own files to assets/ and list them here.
// type: 'image' | 'video'; for videos, optional poster image.
const WORK = [
  {type:'image', src:'assets/images/work-1.jpg', alt:'Goods lift installation'},
  {type:'image', src:'assets/images/work-2.jpg', alt:'Passenger elevator shaft'},
  {type:'video', src:'assets/videos/work-1.mp4', poster:'assets/images/work-1.jpg', alt:'Lift test run'},
];

const root = document.documentElement;
document.getElementById('theme').onclick = () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const next = dark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
};
document.getElementById('year').textContent = new Date().getFullYear();

const gallery = document.getElementById('gallery');
const box = document.getElementById('lightbox'), body = document.getElementById('lbBody');
WORK.forEach(w => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Open: ' + w.alt);
  b.innerHTML = w.type === 'video'
    ? `<video src="${w.src}" poster="${w.poster || ''}" preload="metadata" muted></video><span class="play">▶ Video</span>`
    : `<img src="${w.src}" alt="${w.alt}" loading="lazy">`;
  b.onclick = () => {
    body.innerHTML = w.type === 'video'
      ? `<video src="${w.src}" controls autoplay></video>`
      : `<img src="${w.src}" alt="${w.alt}">`;
    box.showModal();
  };
  gallery.appendChild(b);
});
const closeBox = () => { body.innerHTML = ''; box.close(); };
document.getElementById('close').onclick = closeBox;
box.addEventListener('click', e => { if (e.target === box) closeBox(); });
box.addEventListener('close', () => body.innerHTML = '');
