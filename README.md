1.Create a new repository 
git init

2.Create a separate folder for each project 
mkdir DemoProject_Frontend DemoProject_Backend Code_Blocks

3.Add Each Repository as a Remote and Import Its History.
Example for DemoProject_Frontend:
git remote add DemoProject_Frontend-remote <url-of-DemoProject_Frontend-repo>
git fetch DemoProject_Frontend-remote

4.Create a branch for DemoProject_Frontend history:
git checkout -b DemoProject_Frontend-main DemoProject_Frontend-remote/main

5.Move all files into the DemoProject_Frontend folder and commit the changes:

Get-ChildItem -Path . -Exclude .git, DemoProject_Frontend | ForEach-Object {
    git mv $_.Name DemoProject_Frontend/
}

git commit -m "Move DemoProject_Frontend files into DemoProject_Frontend/ directory"

6.Switch back to the monorepo’s main branch:
git checkout main

7.Merge the DemoProject_Frontend branch into the main branch of the monorepo:
git merge --allow-unrelated-histories DemoProject_Frontend-main -m "Merge DemoProject_Frontend into monorepo"


8. Clean Up Remotes and Branches:
Remove the individual project remotes if they’re no longer needed:
git remote remove DemoProject_Frontend-remote
git remote remove DemoProject_Backend-remote
git remote remove Code_Blocks-remote

Delete the temporary project branches if desired:
git branch -d DemoProject_Frontend-main
git branch -d DemoProject_Backend-main
git branch -d Code_Blocks-main

9. Push the Monorepo to a Remote Repository:
git remote add origin <url-of-your-monorepo>
git push -u origin main

10. For all projects need to start at root level:
create a package.json file in root level.
npm install concurrently --dev
package.json:

{
    "name": "my-monorepo",
    "private": true,
    "workspaces": [
      "Code_Blocks",        
      "DemoProject_Frontend",
      "DemoProject_Backend" 
    ],
    "scripts": {
      "start": "concurrently \"npm --prefix DemoProject_Backend run start\"  \"npm --prefix DemoProject_Frontend run start\" \"npm --prefix Code_Blocks run dev\""
    }
  }
  





