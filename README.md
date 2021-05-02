# NewsApp

## Preview
![NewsAppPreview](https://user-images.githubusercontent.com/62086687/112749025-98051d00-8ffa-11eb-944c-a23f9db9cfad.PNG)
![NewsAppPreview2](https://user-images.githubusercontent.com/62086687/112749028-9b98a400-8ffa-11eb-8c90-f2e9a26a6511.PNG)
![NewsAppPreview3](https://user-images.githubusercontent.com/62086687/112749031-9fc4c180-8ffa-11eb-994b-f67d60e2777f.PNG)


## Overview

- Hosted with github pages(To see the search results, use npm start instead; new API reject any request using the key that is not coming from localhost). 
- [Demo](https://chj2788.github.io/newsapp/#/) (**TEST ACCOUNT id: alice, password: alice123**)

- Dynamic client side rendering with React Router to maintain the seamless user experience.

- Fetch data from news API in order to display the search results while a favorite article list and login info stored in a local storage.

- Stack
    - React
    - TypeScript
    - Material UI Framework
- *plan to update the login feature with GraphQL and JWT*

## Features

- Search articles with various sorting options(by relevancy, popularity, most recent)
- pagination (max 100 articles with free account, 20 articles per page)
- Favorite articles only available for logged-in users
- Edit author, title, and description of favorite articles.

