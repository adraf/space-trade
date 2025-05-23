# Space Station Trading Post

## Description

A front end site utilising a [Jelly Faas API](https://app.jellyfaas.com/function/spacestation/readme) to display data from a Space Station Trading API. 

## Getting Started/Code Installation

#### Packages to download
PrimeFlex, PrimeVue, dotenv, chart.js

## Timeframe

Solo project - 8 hours in total.

## Technologies Used

Vite, Vue, PrimeFlex, PrimeVue, dotenv, chart.js, VS Code.

## Brief

#### Overview
Build a user interface that displays data from our Space Station Trading API. You’re free to pick your framework and style it however you like.

#### Technical Requirements

To use the API you’ll need to:  
* Authenticate by fetching a JFWT token (Jelly Faas version of a JWT token)  
* Fetch the data from the API by including the JFWT token in the subsequent requests.  
* The function will have three parameters:   
  * Space Station name `station=BetaHydri`  
  * Artifact (Gold, Silver, etc) `artifact=steel`  
  * History (the prices for the last 10 days) `historic=true`


## Planning

#### Structure
This was a short window of time so I knew the key points that needed to be met to be successful.  
1. Get the JFWT token.  
2. Call the endpoint with the basic parameters.  
3. Add in the ability for users to choose parameters and carry out the same calls.   
4. Use the information to display to the users on the front end.   
5. Styling.  


## Build/Code Process

#### Wednesday - 2 hours
I began by building out the project, creating a repo on GitHub and using Vite and Vue to get the basic structure. I then created my JavaScript functions, to start, getting my JWFT token, and then my second function to call the API with the basic example parameters:
```bash
https://api.jellyfaas.com/spacestation-cvm2ffq9io6g00dj7vpg-1-s?station=beta%20Hydri&artifact=gold&historic=true' --header 'jfwt: <TOKEN>
```

I then checked all the proper information was coming in and tested variations on the parameters. I also added in constants with example refs to make sure that I could also search with given values from my component, not just hard coded parameters.
I ran into CORS header errors which I will cover in Challenges below.

#### Thursday - 6 hours
I added in PrimeVue and PrimeFlex to use their UI components and styling. I then set up the arrays for each parameter’s options to be used in a Listbox that users could then select for their personalised searches. This then made up the parameters from which I could search the API. I wanted to be able to visualise the pricing history data that was coming in, so I used PrimeVue’s Chart which runs from chart.js to show a simple bar chart for the last 10 days. I then continued with styling, and added in some space station images to show more information on each search with a switch function to display the relevant picture.


## Challenges

I had some issues with CORS Headers so I couldn’t get the API information properly to begin with, for a short term fix I made edits to the vite config file as a work around so I could get the API information and continue to finish the project. 
```js
export default defineConfig({
 plugins: [vue()],
 server: {
   proxy: {
     '/api': {
       target: 'https://api.jellyfaas.com',
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, ''),
     },
   },
 },
})
```

Adding in the chart was fairly simple with PrimeVue but the data wouldn’t load in properly and was showing incorrect, and missing amounts. The data was coming in as a list but wasn’t in quite the right format to be an array of numbers, so this had to be changed: 
```vue
data: Array.isArray(props.stationData?.artifacts?.[0]?.history)
                 ? props.stationData.artifacts[0].history.map(Number)
                 : [],

```


## Wins

The structure I’d set out for myself to get the API up and running and being able to interact with the data went to plan and within the short time constraints I’d set myself. Also being able to take the UI a bit further with the chart paid off and wasn’t as difficult to implement as I believed it might be.

![site preview](https://github.com/adraf/space-trade/blob/main/app/src/assets/stations/Screenshot.png)

## Key Learnings/Takeaways

Always leave more time than you think for styling. Sadly this isn’t the vision I had for the user interface but it’s clean and shows the data for the user in the time constraints I had. Prepare better with wireframing and set time aside to implement the vision.


## Bugs

The price history chart doesn’t reload without refreshing the page, or removing all the selections and submitting again. If a user selects a new artifact after already submitting and clicks submit again, the data will change but the graph data will not. 


## Future Improvements

* Mobile and more responsive styling.  
* The ability for a user to select ‘All’ for Space Stations and Artifacts so that they can see more than one at a time.
* Add favicons.
