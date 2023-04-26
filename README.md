
# Where to Next?

## Table of Contents
1. [About the Project](#about-the-project)
    - [Built With](#built-with)
2. [Basic Outline](#basic-outline)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [Contact](#contact)
7. [Acknowledgments](#acknowledgments)


## About The Project
Missed traveling? Are you having daydreams of the next time you can get away?

Many of us are planning on getting back out there in 2023. But sometimes the hardest part of planning for a trip is figuring out where to go.

Where to Next has a new adventure ready for you. Where to Next is a friendly competition where travelers can earn points and badges by saving and sharing their travel memories. Try the Find Trip option to be given an exciting new locale and set off on your next best journey.

Best of luck for your upcoming adventure on Where to Next and beyond.

### Built With
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

[Back to Top](#where-to-next)


## Basic Outline
**Where to Next?** is a full-stack web application where travelers can save previous travels, interact with fellow travelers, earn points and badges, and find new destinations based on their budget and availability.

The following is a quick breakdown of the application and how its features work.

### Home
Upon accessing the app, users will be greeted with the Ranking Board and map of the current champion. The Ranking Board displays the current Top 10 point-getters on **Where to Next?** and their profiles can be viewed by clicking on their user name.

### Navigation
Navigating the application can be done through the NavBar at the top. Initially, this will include options to **Register** for the app and **Login** using a registered email address and password. 

Upon logging in, users will see their *User Name* which links to their own **Profile**, along with the ability to **Add Trip**, **Find Trip**, see **Achievements**, and from the dropdown list at the top right to return **Home**, **Logout**, and adjust personal **Settings**.

### Profile
The profile displays the user's previously-traveled destinations on their own personalized travel map. Below the map are their currently earned badges and previous trips on a personal timeline. 

Clicking on a destination image from the timeline will take the user to a personalization page where they can upload images from the trip and provide a trip highlight which is shared with the greater community when they come across the same location. Below each highlight is a space for users to add comments about the specific trip.

### Add Trip
Users are able to add travel destinations to their profile. This includes previously-traveled and upcoming trips. To add a trip, users add the date(s) of their trip, country, and city. Clicking the **Find Trip Event** button will display the location, picture and dates of the destination which can then be added to the profile.

### Achievements
Achievements displays users' acquired points and badges. They can also see a progress bar for each of the badges and what is needed to earn the next level.

### Find Trip
**Where to Next?** generates randomized destination suggestions for users based on their travel budget and time availability. Users receive 4 random destionations upon entering the following criteria:
- Travel Budget
- Departing Airport
- Start Date
- Return Date  

Trip options include international or domestic, as well as one-way and return trips.

[Back to Top](#where-to-next)


## Getting Started
**Where to Next? is currently only supported on Desktop browsers.**

Here are the prerequisites and instructions for running a local copy of **Where to Next?**:

## Prerequisites
Each of the following platforms requires an account in order to service the **Where to Next?** app:

- **Firebase** (For Authentication + Database Integration with **Firestore**)
- **Skyscanner API** (For Travel Information)
- **AWS S3** (For Trip Personalization Images)
- **Vercel** (For Deployment)

After signing up for these accounts, refer to the `.env.example` to set up the environment variables for those platforms.

**AWS S3** will require additional setup for an IAM user and S3 bucket. Please refer to this detailed documentation for setting up AWS S3 - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-examples.html

## Installation
*Below you will find the basics on installation and set-up.*

1. Clone the Repository
   ```
   git clone https://github.com/Where-to-next/Where-to-next.git
   ```
2. Initialize the Locally-Cloned Repository
   Open the Terminal at `./Where-to-next`
   ```js
   npm install
   ```
3. Install Dependency Packages
   ```js
   npm install --force
   ```
4. Build the Application
   ```js
   npm run build
   ```
5. Set Up Your `.env.local` File
   ```
   Add Credentials / Keys of Registered Accounts for Firebase, AWS, and Skyscanner
   ```

[Back to Top](#where-to-next)


## Roadmap
- [ ] Set Autocomplete for Airport IATA Codes
- [ ] Mobile Support
- [ ] Social Media Integration
- [ ] Likes for Comments
- [ ] Captchas for Frequent Searches
- [ ] Ability to Ban Users Who Do Not Follow Community Guidelines
- [ ] Multi-Language Support

[Back to Top](#where-to-next)


## Contributing
If you have a suggestion that would make **Where to Next?** better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create Your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[Back to Top](#where-to-next)


## Contact
- **Harry Cleveland** - [@hccleveland](https://github.com/hccleveland)
- **David Wattellier** - [@DavidWattellier](https://github.com/DavidWattellier)
- **Kenneth Man** - [@kman-cc](https://github.com/kman-cc)
- **Eric Nicolas** - [@ericNull](https://github.com/ericNull)

[Back to Top](#where-to-next)


## Acknowledgments
It's impossible to add every single resource that helped to make **Where to Next?** possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)

[Back to Top](#where-to-next)

