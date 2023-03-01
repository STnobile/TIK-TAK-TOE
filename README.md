# TIC-TAC-TOE

![devises reponsive](/assets/images/favicon.png)

This is an easy game of tic tac toe made with HTML, CSS, JS.

Tic Tac Toe  is a site that hopes to demonstrate how pure JavaScript works in a real-world context. The site will be targeted toward people who not only love to implement more advanced JavaScript concepts but also logic. Tic Tac Toe is a fully responsive JavaScript logic game that will allow users to compete against ist the computer.

# Features 

* The Tic Tac Toe Logo and heading
  - Featured at the top of the page, Tic Tac Toe logo and Heading is easy to see for the user and brings some memories from your childhood. The users are able to see the name of the game.

  * You find the rules of the game at the left of the page. It is easy to read and understand. As most of us is familiar with this game.


![devises reponsive](/assets/images/frontpage.png)
  


   # The Game Area 

  * This section will allow the user to play the Tic Tac Toe. The user will be able to easily see the game table. 
  * The user will be able to compete against the computer using the Os meanwhile the computer will be using the Xs.

![devises reponsive](/assets/images/gametable.png)
    
# Features to implement 

* Add a section that allow the user to choose to play with O or X.

* Add a light/dark mode.

 
* At the end of each game it will appear a screen with the result of game. Then the player will have two chooses:

## Next and Replay buttons.

Those are bottoms with different functions, let start with the first next.
It has the function to keep the score of the games throughout the limit of 5 games played.

![devises reponsive](/assets/images/bnt_next_replay.png)

The second bottom called Replay, has the function to reset the score to zero and restart the game.


---
In case of the user of playing over the amount of game will pop a message on the top of the page, asking to restart the game.


![devises reponsive](/assets/images/scoretable.png)


# Game explanation and AI integration 
* The game is really simple, consists to have three Os in a row horizontal, vertical or diagonal to win.

* I used an AI to compete against the user called "minimax algorithms". It is made to test the patience of the user before the person is going to break his own device since AI is unbeatable.



# Testing 

![devises reponsive](/assets/images/amiresponsive.png)

* My project is responsive in different browsers: Chrome, Safari and FireFox.
* This project is responsive and looks good and is working in all the standard screen sizes. I tested it using devtools device toolbar.
* I confirmed that the Header, Game  are readable and easy to understand.
* The site is working fine with all the resolutions such as: 

 1920×1080 (9.94%)
 1366×768 (6.22%)
 360×640 (5.88%)
 414×896 (4.21%)
 1536×864 (3.94%)
 375×667 (3.74%)

* The game is working fine, once you will manage to beat the AI the cell will color in darkblue and a message will appear with the opposition to replay the game. 

![devises reponsive](/assets/images/computerwon.png)

* In case of tie game, the background will color itself with a coral background.

![devises reponsive](/assets/images/tieGame.png)

* In case of user winning the game, after making three O in a row, the background will color pink.

* In case of the user of playing over the amount of game will pop a message on the top of the page, asking to restart the game.

![devises reponsive](/assets/images/scoretable.png)


* We have a score table that is useful to keep the point on sight. 
  
  - You is the user player's score.
  - Tie is to check how many time the game has been even.
  - Ai is the computer that you compete.

![devises reponsive](/assets/images/score_point.png)


# Debugging 
 * Had some issue to insert the favicon images, after few research I realized that of some typos errors, so it was Impossible to get the file.

 * Met some issue on the logic of the keeping the score on display, also I was not able to connect the result to the inner text.
 I actually managed to fix this issue creating different variables for user, computer and game tie and after that I create a document get element and connected to the inner text on my html file.  


 # Validator Testing
## HTML
![device reponsive](/assets/images/validator.html.png)

---
## CSS
![device reponsive](/assets/images/css.vali.png)

---
## JS
![device reponsive](/assets/images/jscheck.png)

 ## Lighthouse score
![device reponsive](/assets/images/lighthouse.png)

  # Deployment 
  * The website was deployed to GitHub pages. The steps to deploy are as follows:
    - In the GitHub repository, navigate to the setting tab
    - From the sours section menu, select Pages
    - Select the live link that I provided below 

    ### https://stnobile.github.io/TIK-TAK-TOE/
  # Cloning a repository

        * Link below
       ###  https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository


   * On GitHub.com, navigate to the main page of the repository.

   * Above the list of files, click  Code.
    "Code" button

   * Copy the URL for the repository.

   * To clone the repository using HTTPS, under 
    "HTTPS", click.
   To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.

   To clone a repository using GitHub CLI, click GitHub CLI, then click .
   The clipboard icon for copying the URL to clone a repository with GitHub CLI
   Open Terminal.

Change the current working directory to the location where you want the cloned directory.

Type git clone, and then paste the URL you copied earlier.

 * git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
Press Enter to create your local clone.

* git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

> Cloning into `Spoon-Knife`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.

 # Credit
 * I took inspiration from the CI Love Math Project.
 * I watched plenty of videos on youtube to get some inspiration of javascript's project,
  that helped me to create the Tic Tac oe game.

 ## Implement Minimax algorithm 
   A minimax algorithm is a recursive program written to find the 
   best game play that minimizes any tendency to lose a game 
   while maximizing any opportunity to win the game

 * Tic Tac Toe: Understanding the Minimax Algorithm.
 * look at the link below
  https://alialaa.com/blog/tic-tac-toe-js-minimax
  ![device reponsive](/assets/images/minimaxalg.png)
  
  Few of the YouTube channel that i watched to get inspired :
  https://www.youtube.com/watch?v=oZrp3Atkz18
  https://www.youtube.com/watch?v=AzvpHNkjqsg
  https://www.youtube.com/watch?v=P2TcQ3h0ipQ
  https://www.youtube.com/watch?v=Y-GkMjUZsmM