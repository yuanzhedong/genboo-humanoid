# Genboo · Humanoid Cohort

Subsite for [humanoid.genboo.com](https://humanoid.genboo.com) — landing page for the Humanoid Cohort program.

## Deployment

Hosted on **GitHub Pages** with custom subdomain `humanoid.genboo.com`.

- DNS: `humanoid` `CNAME` → `<github-username>.github.io` (at GoDaddy)
- Pages: enabled on `main` branch, root `/`
- Custom domain: `humanoid.genboo.com` (declared in `/CNAME`)

Any push to `main` auto-deploys in ~30 seconds.

## Files

- `index.html` — the deployed page (standalone, no build step, no CSS/JS frameworks; styles and scripts are inline)
- `assets/img/` — responsive WebP images (`<name>-<width>.webp`). Student photos come from the TALE 2026 paper figures, faces already blurred
- `assets/videos/toddlerbot-cart-720p.mp4` — muted 720p platform demo (ToddlerBot research team's video, not student work); `push_cart.mp4` is the unused original
- `assets/videos/sim-keyframe-wave.mp4` — muted MuJoCo keyframe clip (from `~/toddlerbot_demos/demo_wave.mp4`) used in the Simulate stage
- `og-image.jpg` — 1200×630 social-share image
- `HumanoidCohort.jsx` — original React component source (reference only, not served; out of date)
- `favicon.svg` — site icon
- `CNAME` — custom domain configuration for GitHub Pages

### Adding images

```sh
cwebp -q 78 -resize 640 0 -metadata none photo.jpg -o assets/img/photo-640.webp
cwebp -q 78 -resize 1200 0 -metadata none photo.jpg -o assets/img/photo-1200.webp
```

Reference them with `srcset`, explicit `width`/`height`, and `loading="lazy"` below the fold. Confirm guardian consent before publishing identifiable student photos.

## Related

Main site repo: [genboo-website](https://github.com/yuanzhedong/genboo-website) — serves `www.genboo.com`.
