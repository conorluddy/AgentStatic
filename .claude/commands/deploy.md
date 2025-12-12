# Deploy Site

You are building and deploying the AgentStatic site.

**Arguments:** `$ARGUMENTS` (currently unused)

## Step 1: Build

Run the build command:

```bash
npm run build
```

Check the output for errors. If build fails:
1. Report the error
2. Suggest fixes
3. Do not proceed with deployment

## Step 2: Verify Build

Check that `dist/` contains the expected files:
- `index.html` and other pages
- `styles.css`
- `assets/` directory (if applicable)

Report what was generated.

## Step 3: Stage Changes

Stage all changes including the dist folder:

```bash
git add .
```

## Step 4: Commit

Create a commit with a descriptive message:

```bash
git commit -m "Build and deploy site

- Updated dist/ with latest build
- [list any notable changes]

🤖 Generated with Claude Code"
```

## Step 5: Push

Push to the remote:

```bash
git push
```

## Step 6: Report Success

Confirm deployment:
- Commit hash
- Branch pushed to
- If GitHub Pages is configured, remind user of the URL pattern:
  `https://{username}.github.io/{repo}/`

---

**Start by running the build command.**
