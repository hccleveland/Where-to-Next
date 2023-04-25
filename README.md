
# Where to Next?

---

## Table of Contents
1. [About the Project](#about-the-project)
    - [Built With](#built-with)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Basic Outline](#basic-outline)
    - [Frontend](#frontend)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [Contact](#contact)
7. [Acknowledgments](#acknowledgments)

---

## About The Project

**Where to Next? is currently only supported on Desktop browsers.**

Missed traveling? Are you having daydreams of the next time you can get away?  
Many of us are planning on getting back out there in 2023. But sometimes the hardest part of planning for a trip is figuring out where to go.  
Where to Next has a new adventure ready for you. Where to Next is a friendly competition where travelers can earn points and badges by saving and sharing their travel memories. Try the Find Trip option to be given an exciting new locale and set off on your next best journey.  
Best of luck for your upcoming adventure on Where to Next and beyond.

[(Back to Top)](#where-to-next)

## Built With
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

[(Back to Top)](#where-to-next)

## Getting Started
To get a local copy up and running, follow these simple steps:

## Prerequisites
Each of the following platforms requires an account in order to service the Where to Next app.

- Firebase
- Vercel
- AWS S3
- Skyscanner

After signing up for these accounts, refer to the `.env.example` to setting up the environment variables for those platforms.

AWS S3 will require additional setup for an IAM user and S3 bucket.  Please refer to this detailed documentation for setting up AWS S3 - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-examples.html

## Installation
*Below you will find the basics on installation and set up.*

1. Clone the repo
   ```js
   git clone https://github.com/Where-to-next/Where-to-next.git
   ```
2. Go to local cloned repository
   ```js
   open terminal at ./Where-to-next
   npm install
   ```
3. Install dependenty packages
   ```js
   npm install --force
   ```
4. Build the application
   ```js
   npm run build
   ```
5. Setup your `.env.local` file
   ```js
   Add credentials / keys of registered accounts to firebase, aws, and skyscanner
   ```

[(Back to Top)](#where-to-next)

## Basic Outline
The following is a rough breakdown of the application.

## Frontend

### Components
Full frontend functionality listed here:

    App → Profile
    App → AddTrip
    App → FindTrip
    App → Achievements
    App → Sidebar → Home
    App → Sidebar → Settings
    App → Sidebar → Logout

#### Account
Users will be able to see their previously traveled destinations.  Clicking on a destination image will take the user to a personalization page where they can upload images of said trip and set highlight.

#### AddTrip
Users will be able to add a previously-traveled destination.

#### FindTrip
Users will be able to set the following criteria in order for Where to Next to generate 4 random destinations for travel:
- Travel Budget
- Departing Airport
- Start Date
- Return Date

#### Achievements
Users will be able to view their acquired points and badges.

#### Home
This is the landing page.  The user will be able to see the top 10 most well-traveled members of this app.  Those top 10 members can be viewed when clicked upon and the user can leave comments for those traveled destinations.

[(Back to Top)](#where-to-next)

## Roadmap
- [ ] Social Media Integration
- [ ] Captchas for Frequent Searches
- [ ] Set Autocomplete for Airport IATA Codes
- [ ] Likes for Comments
- [ ] Ability to Ban Users Who Do Not Follow Community Guidelines
- [ ] Mobile Support
- [ ] Multi-Language Support

[(Back to Top)](#where-to-next)

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make **Where to Next?** better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create Your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[(Back to Top)](#where-to-next)

## Contact
- Harry Cleveland - [@hccleveland](https://github.com/hccleveland)
- David Wattellier - [@DavidWattellier](https://github.com/DavidWattellier)
- Kenneth Man - [@kman-cc](https://github.com/kman-cc)
- Eric Nicolas - [@ericNull](https://github.com/ericNull)

[(Back to Top)](#where-to-next)

## Acknowledgments
It's impossible to add every single resource that helped to make **Where to Next?** possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)

[(Back to Top)](#where-to-next)
