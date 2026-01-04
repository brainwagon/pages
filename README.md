# GitHub Pages Directory

This project is a simple, dynamic landing page designed to list all GitHub Pages-enabled repositories for a specific GitHub user (currently hardcoded to `brainwagon`).

## How It Works

*   **`index.html`**: Provides the semantic structure for the page.
*   **`script.js`**: 
    1.  Fetches the list of public repositories for the user via the GitHub API.
    2.  Filters the results to include only those repositories where GitHub Pages is enabled (`has_pages: true`).
    3.  Dynamically generates a list of links. It prioritizes the repository's "homepage" URL if set; otherwise, it constructs the standard `https://<user>.github.io/<repo>/` URL.
*   **`style.css`**: Provides a clean, responsive layout resembling standard GitHub styling.

## Usage

To use this for your own profile:
1.  Open `script.js`.
2.  Change the `const username = 'brainwagon';` line to match your GitHub username.
3.  Deploy this repository to your User GitHub Pages repository (typically named `<username>.github.io`).

---

## Setting up a Custom Domain on GitHub Pages

You can serve your GitHub Pages site from a custom domain (e.g., `www.example.com` instead of `username.github.io`).

### Step 1: Purchase and Configure DNS

1.  **Buy a domain** from a registrar (e.g., Namecheap, GoDaddy, Google Domains).
2.  **Configure DNS records** in your registrar's dashboard:
    *   **For a root domain (e.g., `example.com`):**
        *   Create `A` records that point to GitHub's IP addresses:
            *   `185.199.108.153`
            *   `185.199.109.153`
            *   `185.199.110.153`
            *   `185.199.111.153`
    *   **For a subdomain (e.g., `www.example.com` or `blog.example.com`):**
        *   Create a `CNAME` record that points to your GitHub Pages URL:
            *   `username.github.io` (replace `username` with your actual GitHub username).

### Step 2: Configure GitHub Repository

1.  Go to your repository on GitHub.
2.  Click on **Settings** > **Pages** (in the left sidebar).
3.  Scroll down to the **Custom domain** section.
4.  Enter your custom domain (e.g., `www.example.com`) in the field.
5.  Click **Save**.
6.  GitHub will create a file named `CNAME` in the root of your repository automatically.

### Step 3: Enforce HTTPS

Once your domain is verified and the DNS has propagated (this can take up to 24 hours, though often faster):
1.  Return to **Settings** > **Pages**.
2.  Check the box **Enforce HTTPS** to ensure your site is served securely.
