document.addEventListener('DOMContentLoaded', () => {
    const username = 'brainwagon';
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const listElement = document.getElementById('repo-list');
    const introElement = document.getElementById('intro');

    // Fetch and render intro.md
    fetch('intro.md')
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Could not load intro.md');
        })
        .then(markdown => {
            introElement.innerHTML = marked.parse(markdown);
        })
        .catch(error => {
            console.log('Intro load failed, keeping default text:', error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            // Filter for repos that have pages enabled
            const pagesRepos = repos.filter(repo => repo.has_pages);

            listElement.innerHTML = ''; // Clear loading message

            if (pagesRepos.length === 0) {
                listElement.innerHTML = '<li>No GitHub Pages repositories found.</li>';
                return;
            }

            pagesRepos.forEach(repo => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                
                // Use homepage if set, otherwise construct the standard GH Pages URL
                let pageUrl = repo.homepage;
                if (!pageUrl) {
                    if (repo.name.toLowerCase() === `${username.toLowerCase()}.github.io`) {
                        pageUrl = `https://${username}.github.io/`;
                    } else {
                        pageUrl = `https://${username}.github.io/${repo.name}/`;
                    }
                }

                link.href = pageUrl;
                link.textContent = repo.name;
                
                const desc = document.createElement('span');
                desc.className = 'description';
                desc.textContent = repo.description || 'No description provided.';

                li.appendChild(link);
                li.appendChild(desc);
                listElement.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            listElement.innerHTML = `<li>Error loading repositories: ${error.message}. Please try again later.</li>`;
        });
});
