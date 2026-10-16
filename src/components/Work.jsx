import { useEffect, useRef, useState } from 'react'

// Drop photos/videos into src/work/ and they appear here automatically.
const files = import.meta.glob('../work/*.{jpg,jpeg,png,webp,avif,svg,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const ITEMS = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, video: /\.(mp4|webm|mov)$/i.test(path), name: path.split('/').pop() }))

export default function Work() {
  const [open, setOpen] = useState(null)
  const dlg = useRef(null)

  useEffect(() => {
    const d = dlg.current
    if (open === null) { if (d?.open) d.close(); return }
    if (d && !d.open) d.showModal()
  }, [open])

  const step = (n) => setOpen((i) => (i + n + ITEMS.length) % ITEMS.length)
  const cur = open !== null ? ITEMS[open] : null

  return (
    <section className="section alt" id="work">
      <div className="wrap">
        <p className="eyebrow reveal">Proof of work</p>
        <h2 className="reveal">Installed, tested, running.</h2>
        {ITEMS.length === 0 ? (
          <div className="gallery reveal">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="tile empty"><span>Photo / video {i + 1}</span></div>
            ))}
            <p className="note full">Add your images and videos to <code>src/work/</code> — they show up here automatically.</p>
          </div>
        ) : (
          <div className="gallery reveal">
            {ITEMS.map((it, i) => (
              <button key={it.src} className="tile" onClick={() => setOpen(i)} aria-label={`Open ${it.name}`}>
                {it.video
                  ? <><video src={`${it.src}#t=0.5`} preload="metadata" muted playsInline /><span className="badge">▶ Video</span></>
                  : <img src={it.src} alt={`Installation work ${i + 1}`} loading="lazy" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <dialog ref={dlg} className="lightbox" onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && setOpen(null)}>
        {cur && (
          <div className="lb-body">
            {cur.video ? <video src={cur.src} controls autoPlay playsInline /> : <img src={cur.src} alt="" />}
            <button className="lb-x" onClick={() => setOpen(null)} aria-label="Close">✕</button>
            {ITEMS.length > 1 && (
              <>
                <button className="lb-nav prev" onClick={() => step(-1)} aria-label="Previous">‹</button>
                <button className="lb-nav next" onClick={() => step(1)} aria-label="Next">›</button>
              </>
            )}
          </div>
        )}
      </dialog>
    </section>
  )
}
