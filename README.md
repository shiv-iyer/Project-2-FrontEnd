# Royale Raves
![Mobile-Responsive Mockup image](assets/resources/mockup.png)

Live link to demo: [Fluff Finder](https://fluff-finder.netlify.app/)

## Project Summary

### Overview 
Royale Raves is the #1 destination for lovers of the popular Supercell mobile game: Clash Royale. The site's primary feature is a forum of sorts, where users can create posts that feature their very own Clash Royale decks. In order to create a post, users will create their own individualized deck with a custom deck builder that features many of the cards found in Clash Royale. These posts will also include different pieces of information about the deck, such as an overview of the deck, a summary of the deck's strategy, and a personal difficulty rating for the deck. Users are then able to browse all of the existing posts on the website, with the ability to search and filter by various criteria if they wish. All of these features features come together to provide a platform for avid Clash Royale fans to share and discuss their own decks and the strategies associated with them! Players are also potentially able to identify new decks by browsing the website's collection of various posts.

The site also features a 'Cards' page, where users can browse the entire selection of available cards integrated with the website. On this page, users can click on the different cards to view various pieces of information and key artwork of each card!

### Target Audience & User Goals

All in all, the main goal of the website is to assist Singaporeans in finding any relevant locations for their pets. This website will be useful for any dog & cat owners in Singapore, as many animal-friendly locations fly under the radar and can be quite difficult to pinpoint. As an example, it is relatively common for dog owners to ask online groups about where they can discover new and fun dog-friendly locations, especially dog cafés. Generally, no one memorizes a list of every single mall that allows dogs. Sometimes, you just want to go for a nice outing and enjoy the company of your pet, but limited information makes this task a bit more difficult.

Fluff Finder enables easy and near-instantaneous access to crucial information - such as names and addresses - about any relevant areas & services pet owners might require. Ultimately, this saves users time and hassle, enriching the overall experience for all pet owners and their fluffy friends!

## UI/UX Elements

### Structure & Wireframes
![Structure Diagram image](assets/resources/structure.png)

[!Wireframe image](assets/resources/wireframes.png)

### Design Decisions

#### Color Scheme
![Color Scheme image](assets/resources/color-palette.jpg)

The main color scheme of the website revolves around cream & beige-colored components and forms, with additional accents of gold and blue. The cream and beige colors provide a clean, light look to the website, allowing for clear, coherent elements. These light colors are also easy on the eyes, avoiding any jarring effects and creating an affable atmosphere to the website.

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
| Search for pet-friendly locations | This search feature enables users to search for various pet-friendly locations, with the ability to fine-tune their search by entering a name, selecting a category, and choosing the number of results (from 10-50) to display. Every time a successful search is completed, all previous results will be cleared from the map. This functions by matching the selected parameters of the search to the results from the data set, with said results being extracted for processing later on. |
| Display locations as markers & show location information | Search results are displayed as markers on the map, being easily-accessible by simply clicking on them. Markers are 'clustered' into individual groups based on their categories, and each cluster is organized into its own layer. Upon user click, the marker will display a popup with location information: name, type of location, and exact address. The map will also fly to each marker whenever one is clicked. |
| Display search results | All search results are displayed in a formatted list that is shown on a side panel, which is toggleable with a button. Upon clicking on a search result, the map will zoom to the corresponding marker on the map, opening its popup to display information. | 
| Map controls | The map has controls to zoom in and out of the map, as well as a toggleable controller to hide and show any of the category layers at the user's discretion. | 
| Subscription form | The website features a subscription form, enabling the user to submit their email to receive special updates pertaining to the website. This form has been designed with a few validation rules, which prevent invalid inputs from being submitted. Note: the form submission does not have backend functionality, due to the scope of the project. | 
| Display randomly-generated dog images | The website's second functional page features two card components with dog facts. The refresh button on the page allows the user to update the cards to display a newly-randomized dog image. | 

---

## Limitations and Future Implementations
- User authentication system
    - Currently, the website . An example of a method to implement such a system would be the [JSON Web Token](https://jwt.io/).
- Available selection of cards
    - The website's deck system (including the deck builder) is centralized around the Cards collection in the MongoDB Database for this project. However, seeing as each card and its info is stored as an individual document manually inputted into the collection, the entire selection of cards in Clash Royale is unavailable. There are 109 total cards in Clash Royale, which means I would have to create 109 different documents. There are 24 fully-fledged cards available in the database at the moment.
    - Champion cards from Clash Royale have also not been implemented with the website and its deck builder. If they were to be included, the logic for the deck builder would have to be updated, as only one Champion card can be included in each deck at any given time.
- Comments section & functionality
    - comments backend routes in Express complete
- Integration with the official Clash Royale API
    - Clash Royale provides an [official API for developers](https://developer.clashroyale.com/), which can be used to retrieve data and various statistics from the game & its players. 
    
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
| Test Case | Steps | Expected Result |
| ----------- | -----------  | ----------- |
| User searches for results | Select parameters, click on search button | Various markers display on the map |
| User inputs erroneous search data | Input invalid data in the results field: special characters or numbers out of the 10-50 range | Error validation and displaying of an error message the map update form |
| User opens search results pane | Click on search results button after a successful search | Search canvas slides into the page, displaying results in a formatted list |
| User randomizes dog image | Click on refresh button | A new image is appended to the card |

---

## Deployment
The web application is hosted on and was deployed through [Netlify](https://www.netlify.com/).

---

## Credits and Acknowledgment

### Data
- [FourSquare API](https://foursquare.com/) — Used for all location data (lat/long coordinates, names, addresses)
- [RandomDog API](https://random.dog/woof.json) — Used for retrieving random dog images

### Icons

- [FlatIcon](https://www.flaticon.com/) — Used for map marker icons on the website
- [FontAwesome](https://fontawesome.com/icons) - Used for inline button icons on the website

#### Custom Fonts from Google Fonts

- [Play](https://fonts.google.com/specimen/Play)
- [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed)
- [Yusei Magic](https://fonts.google.com/specimen/Yusei+Magic)
- [Alkatra](https://fonts.google.com/specimen/Alkatra)
- [Kanit](https://fonts.google.com/specimen/Kanit)

### Assets

- [CreateMockup](https://www.createmockup.com/generate/) - Used to create the mobile-responsive mockup for the website
- [Excalidraw](https://excalidraw.com/) — Used to create the structure diagram for the website
- [Coolors](https://coolors.co/) — Used to create the base color palette asset for the website

Thank you so much to my lecturer, Paul, my teaching assistant, Wesley, as well as my classmates for help, guidance and support throughout this project.