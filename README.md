# cookie and tea

CAT (cookie and tea) is a web application similer to Buy Me a Coffe and Ko-fi:
Users can support their work with a support message or a donation.
If users want to donate ones work, there are three options:
- The tea icon represents 5 dollars.
- The cookie icon represents 7 dollars.
- The cookie and tea icon represents 12 dollars. 

In this app, there is no like properties as others have because this is a supporting platform so the only mattered things is supporting. With liking properties, users are distracted by liking numbers so to prevent this, this property isn't added.
To encourage users to support others only shows donations and support comments. 

Users can neither comment to  posts, there is no nested comment section too, nor like others comments.

Users can share text, images or videos about their work.

## Tools
- Figma
- WebStorm

## Technologies
- Tailwind 4 
- React-Vite
- Mailtrap
- EmailJS
- GSAP
- Zod 
- Junie AI 
- CodeRabbit AI
- Gemini

In this project used AI percentage is around 30%. Mostly used for designing if components had the similar design already used.


### Figma Design
I have basic Figma knowledge, I used this tool to make a guide for the frontend. You can check most pages with this link:
- [@figma/cookieandtea](https://www.figma.com/design/RjrtJpLfLmu4fB0rpPdoM5/cookie-and-tea?node-id=0-1&t=CBxPWczmMarrrqL3-1)


### Prompt examples used in the project, used AI model is Junie AI:
#### Prompt Example One
check Nabvar in the components folder do same thing for the usernavbar component in the components folder
Usernavbar has 3 icons:
1. the bell is for the notifications
2. home icon is for feed page inside the pages folder
3. settings icon is for the settings page inside the page folder and activity page
do:
- your page redirects user to user's own page → profile
- make connections between those icons with the pages I mentioned above
- you can change size of the icons if you find them big or small
- check the page color pattern for example posts component or feed components for hover effect or etc. You can check index.css for color palette and font style etc
do necessary things do not overengineering
- in activity page user can see all actions in there, likes comment and donation so that for the activity design you can check people components which shows followers and followings 
#### Prompt Example Two
for the notification and settings hover, do them clickable so users can interact with it, make settings icon for only settings page, for  notification make hover as clickable and after view all show all other users activity and add others and yours; in others show followed users activities these are: likes, comments and donations
yours is account owners activities likes, comments, and donations do not add posts here. 