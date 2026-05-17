# Genboo · Humanoid Cohort

Subsite for [humanoid.genboo.com](https://humanoid.genboo.com) — landing page for the Humanoid Cohort program.

## Deployment

Hosted on **GitHub Pages** with custom subdomain `humanoid.genboo.com`.

- DNS: `humanoid` `CNAME` → `<github-username>.github.io` (at GoDaddy)
- Pages: enabled on `main` branch, root `/`
- Custom domain: `humanoid.genboo.com` (declared in `/CNAME`)

Any push to `main` auto-deploys in ~30 seconds.

## Files

- `index.html` — the deployed page (standalone, no build step)
- `HumanoidCohort.jsx` — original React component source (reference only, not served)
- `favicon.svg` — site icon
- `CNAME` — custom domain configuration for GitHub Pages

## Related

Main site repo: [genboo-website](https://github.com/yuanzhedong/genboo-website) — serves `www.genboo.com`.
