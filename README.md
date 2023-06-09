# Royale Raves
![Mobile-Responsive Mockup image](src/assets/resources/mockup.png)

Live link to demo: [Royale Raves](https://royale-raves.netlify.app/)

## Project Summary

### Overview 
Royale Raves is the #1 destination for lovers of the popular Supercell mobile game: Clash Royale. The site's primary feature is a forum of sorts, where users can create posts that feature their very own Clash Royale decks. In order to create a post, users will create their own individualized deck with a custom deck builder that features many of the cards found in Clash Royale. These posts will also include different pieces of information about the deck, such as an overview of the deck, a summary of the deck's strategy, and a personal difficulty rating for the deck. Users are then able to browse all of the existing posts on the website, with the ability to search and filter by various criteria if they wish. All of these features features come together to provide a platform for avid Clash Royale fans to share and discuss their own decks and the strategies associated with them! Players are also potentially able to identify new decks by browsing the website's collection of various posts.

The site also features a 'Cards' page, where users can browse the entire selection of available cards integrated with the website. On this page, users can click on the different cards to view various pieces of information and key artwork of each card!

### Target Audience & User Goals

All in all, the main goal of the website is to provide a platform for Clash Royale players to share and discuss different decks and strategies. This website will be useful for any Clash Royale player, as they can either spread the word about their own unique deck that they would like others to know about, or they can discover new decks and strategies previously unbeknownst to them. Existing Clash Royale websites are usually more data-oriented and display useful information about existing decks and card statistics — however, they are lacking in user freedom and options, since users generally aren't able to create their own decks to be archived and saved on these websites. 

Royale Raves enables easy and enjoyable access to a platform where Clash Royale lovers can freely create as many posts about any number of decks they'd like. Ultimately, this allows for these players to have fun and be creative, without being limited by any constraints or restrictions. The existence of a custom deck builder and an individual cards page also allows users to interact with elements from Clash Royale outside of the game itself, enriching their website experience and making it all the more enjoyable.

On the design end of the website, users should be able to engage in full CRUD functionality with posts — being able to Create, Read, Update and Delete posts to and from the BackEnd database (through the Express server) whenever relevant.

## UI/UX Elements

### Structure & Wireframes
![Structure Diagram image](src/assets/resources/structure.png)

![Wireframe image](src/assets/resources/wireframes.png)

![Wireframe image 2](src/assets/resources/wireframes2.png)

### Design Decisions

#### Color Scheme
![Color Scheme image](src/assets/resources/color-palette.png)

The main color scheme of the website revolves around cream/bisque & beige-colored components and forms, with additional accents of gold and blue. The cream and beige colors provide a clean, light look to the website, allowing for clear, coherent elements. These light colors are also easy on the eyes, avoiding any jarring effects and creating an affable atmosphere to the website.

The chosen gold and blue colors were directly extracted from the [official Clash Royale Logo](https://clashroyale.com/), helping link the website to the game and its theme. The rich gold navigation bar exudes a sense of luxury, royalty and fortune, providing a strong, bold presence to establish the top of every page. The blue gradient that backs every page evokes feelings of calmness, imagination and inspiration, supplying a strong sense of emotion to each page. These colors also come together to complement each other nicely, allowing for the website to maintain a sense of interconnectedness while staying true to the Clash Royale theme.

Other colors were also used subtly across the website, either for accentuating visual effects or providing delicate details to various components. Ultimately, this makes the website very colorful in nature, which is in line with the goal of presenting the website in a fun, friendly manner for its target audience.

#### Fonts

- *Play* is a minimalistic typeface that has been designed to appear both square and circular at the same time. Each letter derives from the letter 'O' - which allows for a sense of balance and interconnectedness. This was chosen as the primary font of the website's forms and card texts, allowing for a friendly and sleek overall appearance for the user, with the text being very legible and easy on the eyes.
- *Roboto Condensed* was selected as the font for displaying all of the posts on the website. As each post is relatively text-heavy, this geometric yet friendly font supplements their appearance well. The font settles the text on each post well, leaving letters to follow their natural widths. This ultimately provides a seamless reading experience, allowing users to fall into their natural reading rhythms.
- *Yusei Magic* is a font that was designed based on handwritten letters with a permanent marker. Having a thick vertical stroke and a thin horizontal stroke, this font helps the main header text of the website stand out, maintaining the impact of bold lettering with elegant use of space. This complements the overall website's appearance well, providing a casual and easy feel.
- *Alkatra* and *Kanit* were selected as bonus fonts to style the additional 'Cards' page. Alkatra utilizes the alphabets of four different languages: Bangla, Devanagari, Odia and Latin. It draws inspiration from wall graffitis in Bengal, India, which in turn provides a beautiful and captivating header text for each card's display body header. Kanit combines concepts and designs from Thai and Latin typefaces, as well as the Sans Serif Motif, to allow for a contemporary and futuristic display.. Special care has been taken when designing this font, allowing for decreased spacing between letters while preserving legibility. This font suits the card display body text, differentiating it from other pages on the website while maintaining a smooth and stylish appearance.

All in all, the selected fonts are directly in-line with the goal of making the website modern and gamified, while maintaining a clean and professional feeling.

#### Other Design Elements

The website features a range of animations to make it more interactive and engaging. Said animations were implemented to stay in line with the goal of making the website captivating and alluring to the target audience, as fun animations would appeal to gamers and hold their attention.

---

## Features

| Features | Description |
| ----------- | ----------- |
| Clash Royale Deck Builder | This feature enables users to create their own custom decks from a pool of available cards, with full interaction and logic implemented. Users can select cards to add to their deck, which will be displayed in a separate section of the deck builder. Users can remove cards from their deck by clicking on the cards in the deck display section, and users cannot select repeat cards or more than 8 cards at any given time. |
| Post Creation & Modification | This feature allows users to create a new post based on the deck they have built. These posts include various details about the deck, including a deck name, an overview of the deck, a brief strategic explanation of how the deck is meant to be played, the deck's archetype, the user's personal rating of the deck out of 10, and the user's personal rating of the deck's difficulty level out of 5. Users can also edit existing posts, having the ability to modify any of the information listed above. They can also modify the deck of the post with another integrated deck builder, adding and removing cards as they see fit. Lastly, users can outright delete a post, removing it from the database and collection of posts entirely. |
| Post Search Engine | This feature enables users to search for and filter different posts based on four pieces of criteria: the post's name, the post's deck's archetype, the post's deck's minimum rating, and the post's deck's maximum difficulty. |
| Cards Page | This feature allows users to view every single card available on the website at once, with each card being displayed in a neat grid on its own page. Clicking on any card will also reveal further information about said card — providing more interactivity and exploration options for users. |

---

## Limitations and Future Implementations
- User login & authentication system
    - Currently, the website has certain elements and pages that are tied to a user login system, but no actual processes to enable such functionality. Authentication could be incorporated to enable posts to be tied to individual user accounts, which opens up a range of possibilites features-wise: a post can only be edited/deleted by the user that created it (currently, anyone can perform both operations on a post), and users could also have profile pages that display all of their created posts. An example of a method to implement such a system would be the [JSON Web Token](https://jwt.io/).
- Comments section & functionality
    - The website could feature a comments section under each post, allowing other users to leave their own remarks and ratings on all of the different decks featured in posts on the website. This would result in more interaction between users of the website. Comments could also be tied to users, which once again goes back to the user login & authentication system.
    - Currently, routes for comment functionality have already been written in the Express server, however they were not integrated in time with the website's frontend display.
- Available selection of cards
    - The website's deck system (including the deck builder) is centralized around the Cards collection in the MongoDB Database for this project. However, seeing as each card and its info is stored as an individual document manually inputted into the collection, the entire selection of cards in Clash Royale is unavailable. There are 109 total cards in Clash Royale, which means I would have to create 109 different documents. There are 56 fully-fledged cards available in the database at the moment.
    - Champion cards from Clash Royale have also not been implemented with the website and its deck builder. If they were to be included, the logic for the deck builder would have to be updated, as only one Champion card can be included in each deck at any given time.
- Integration with the official Clash Royale API
    - Clash Royale provides an [official API for developers](https://developer.clashroyale.com/), which can be used to retrieve data and various statistics from the game & its players. This API could be utilized by the website, opening up the possibility of more pages and functionality for the website. For example, graphs and charts of aggregate user data (cards and decks used, or other statistics from special gamemodes in the game) could be displayed using [Recharts](https://recharts.org/en-US/).

---

## Technologies Used

### FrontEnd 
1. HTML

2. CSS

3. JavaScript

4. [React](https://legacy.reactjs.org/docs/getting-started.html)
  - Used for creation of the webpage and its FrontEnd elements

5. [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
  - Used for styling the website, implementing mobile-responsiveness

6. [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
  - Used for styling the website, implementing new components, mobile-responsiveness and interaction between components and state

7. [Axios](https://github.com/axios/axios)
  - Used for communication with my Express server to perform CRUD actions with the database: create, read, update and delete

### BackEnd

1. JavaScript

2. [Express](https://expressjs.com/)
  - Used for creating the server that provides a RESTful API with the MongoDB database

3. [MongoDB](https://www.mongodb.com/)
  - Used for hosting all of the website's documents, storing as a database

4. [CORS](https://www.npmjs.com/package/cors)
  - Middleware to enable Cross-Origin Resource Sharing (CORS)

5. [dotenv](https://www.npmjs.com/package/dotenv)
  - To enable the loading of environment variables from .env files

--- 

## Testing
| Test Case / Page | Test Steps | Expected Results |
| ----------- | -----------  | ----------- |
| Loading of website and its components (Mobile / Tablet / Desktop) | Go to the website via the URL: https://royale-raves.netlify.app/ | The website should load, with all of the data being loaded from the API (cards for deck builder in create post page & cards page, as well as posts for view posts page). |
| Home --> Create a Post | Click on the "Create a Post" navigation link in the navbar (from any page other than the page itself) | The website should be redicted to the Create a Post page. |
| Create a Post: Deck Builder | Navigate to the deck builder component, and click on various cards from the pool of available cards ("Card Selector" section). Once some cards have been selected, click on various cards from the "Selected Deck" section. | Selected cards from the card pool should be highlighted (with a border) upon selection, as well as automatically appear in the "Selected Deck" section. Clicking on a card that is already selected should not duplicate its selection. Cards clicked from the "Selected Deck" section should automatically disappear from the section, getting unselected and losing their highlighting. Overall, a maximum of 8 cards should be able to be chosen for any given deck, and attempting to select any other cards once the deck is full should not provide any results. |
| Create a Post: Error Validation | Input text into the various fields available in the post creation form, and leave some fields and other components (archetype filter) blank. | Error messages should appear where relevant in the form, highlighting the user's error and how they can rectify it. For example, inputting a post name less than 7 characters or more than 50 characters should prompt the user to either input a longer or shorter name, accordingly. The submit button will be disabled by default, and leaving any fields blank will result in it remaining disabled. It should only activate once data has been properly inputted into every field. For the rating and difficulty sliders, they are set to default middle values, so the user does not need to interact with them if they wouldn't like to, or in case they miss them. |
| Create a Post: Submit Post | Once all fields in the form have been successfully filled out, click on the "Submit Post" button | The website should send an API request to the server, successfully creating a new post and inserting it into the database with all the appropriate information. |
| Home --> View Posts | Click on the "View Posts" navigation link in the navbar (from any page other than the page itself) | The website should be redicted to the View Posts page. |
| View Posts: Search Filter | Navigate to the search options component, and fill in the filter options. Subsequently, click on the "Find Results" button. | Different posts should appear based on the filter options selected; for example, posts whose titles contain the text of the input in the search bar. If no search filter options were selected, all of the posts should appear, as normal. |
| View Posts: Edit a Post | Click on the "Edit" button at the bottom of the post | A modal popup window should appear, displaying a form that allows the user to edit any of the existing post information. All of the fields should be filled out preemptively, matching the data that already exists within the post. This includes the deck tied to the post, which should already be fully selected in the deck builder component. |
| View Posts: Edit Post Deck Builder | Navigate to the deck builder component, and click on various cards from the pool of available cards ("Card Selector" section). Once some cards have been selected, click on various cards from the "Selected Deck" section. | Just as with the Create Post Deck Builder, the deck builder component when editing a post should come with all the same features, including card selection and deselection. A maximum of 8 cards should be able to be selected at any given time, and the user should be able to only remove a few cards from the deck, replacing them as they see fit — the deck will retain all 8 of its previous cards by default. |
| View Posts: Edit Post Validation | Input text into the various fields available in the post editing form, deleting existing bodies of text and modifying other bodies of text. | Just as with the Create Post form, validation should also exist for the editing form, enforcing error validation and prompting the uesr to fix their errors with relevant messages to be displayed on the modal. |
| View Posts: Delete a Post | Click on the "Delete" button at the bottom of the post, then click on the "Delete" button at the resulting modal popup window to confirm deletion. | The website should first display a modal popup window asking the user to confirm their deletion request, as this is a potentially dangerous feature. Subsequently, upon confirmation, the website should send an API request to the server, successfully deleting the post from the database based on its ID. The website should return to the View Posts page, and the deleted post should not be visible anymore. |
| Home --> Cards | Click on the "Cards" navigation link in the navbar (from any page other than the page itself) | The website should be redicted to the Cards page. |
| Cards: Card Interaction | Click on any of the cards in the displayed card grid. | A modal popup window should appear, displaying various details of the card that was clicked on, including its name, a render image (if available), a card description, the card rarity, and the card categories. |

---

## Deployment

### Front-End
The web application is hosted on and was deployed through [Netlify](https://www.netlify.com/), directly from this GitHub repository.

### Back-End
The Express server is hosted on and was deployed through [Render](https://render.com/), directly from the main branch of [this GitHub repository](https://github.com/shiv-iyer/Project-2-BackEnd).

---

## Credits and Acknowledgment

### Icons

- [React Icons](https://react-icons.github.io/react-icons/) — Used for various icons throughout the website

### Custom Fonts from Google Fonts

- [Play](https://fonts.google.com/specimen/Play)
- [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed)
- [Yusei Magic](https://fonts.google.com/specimen/Yusei+Magic)
- [Alkatra](https://fonts.google.com/specimen/Alkatra)
- [Kanit](https://fonts.google.com/specimen/Kanit)

### Assets

- [CreateMockup](https://www.createmockup.com/generate/) - Used to create the mobile-responsive mockup for the website
- [Excalidraw](https://excalidraw.com/) — Used to create the structure diagram & wireframes for the website
- [Coolors](https://coolors.co/) — Used to create the base color palette asset for the website

Thank you so much to my lecturer, Paul, my teaching assistant, Wesley, as well as my classmates for help, guidance and support throughout this project.