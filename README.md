<br />
<div align="center">

  <h3 align="center">https://where-to-next-cc.vercel.app </h3>
  <h2 align="center">Where to Next is currently only supported on Desktop browsers.</h2>
 
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
       <li>
      <a href="#basic-outline">Basic Outline</a>
      <ul>
        <li><a href="#frontend">Frontend</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[Rage](https://where-to-next-cc.vercel.app)

Missed traveling? Are you having daydreams of the next time you can get away?
Many of us are planning on getting back out there in 2023. But sometimes the hardest part of planning for a trip is figuring out where to go.
Where to Next has a new adventure ready for you. Where to Next is a friendly competition where travelers can earn points and badges by saving and sharing their travel memories. Try the Find Trip option to be given an exciting new locale and set off on your next best journey.
These are the technologies that make Where to Next go.
Best of luck for your upcoming adventure on Where to Next and beyond.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Each of the following platforms requires an account in order to service the Where to Next app.

- Firebase
- Vercel
- AWS S3
- Skyscanner

After signing up for those accounts, refer to the .env.example to setting up the environment variables for those platforms.
AWS S3 will require additional setup for an IAM user and S3 bucket.  Please refer to this detailed documentation for setting up AWS S3 - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-examples.html


### Installation

_Below you will find the basics on installation and set up._

1. Clone the repo
   ```sh
   git clone https://github.com/Where-to-next/Where-to-next.git
   ```
2. Go to local cloned repository
   ```sh
   open terminal at ./Where-to-next
   npm install
   ```
3. Install dependenty packages
   ```sh
   npm install --force
   ```
4. Build the application
   ```sh
   npm run build
   ```
5. Setup your .env.local file
   ```js
   Add credentials / keys of registered accounts to firebase, aws, and skyscanner
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Basic Outline

The following is a rough breakdown of the application.

### Frontend

#### Components

Full front end functionality listed here for react

    App → Profile
    App → AddTrip
    App → FindTrip
    App → Achievements
    App → Sidebar → Home
    App → Sidebar → Settings
    App → Sidebar → Logout

#### Account

User will be able to see his/her previously traveled destinations.  Clicking on a destination image will take the user to a personalization page where he/she can upload images of said trip and set highlight.


#### AddTrip

User will be able to add a previously traveled destination.


### FindTrip

User will be able to set the following criteria in order for Where to Next to generate 4 random destinations for travel:
- budget
- departing airport
- start date
- return date


### Achievements

User will be able to view his/her acquired points and badges.


### Home

This is the landing page.  The user will be able to see the top 10 most well-traveled members of this app.  Those top 10 members can be viewed when clicked upon and the user can leave comments for those traveled destinations.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Social media integration
- [ ] captchas for frequent searches
- [ ] fix autocomplete for airports
- [ ] likes for comments
- [ ] Ability to ban users who do not follow community guidelines
- [ ] Mobile support
- [ ] Multi-language Support

See the [open issues](https://github.com/Where-to-next/Where-to-next/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

- Harry Cleveland - [@hccleveland](https://github.com/hccleveland) - hcleveland17@gmail.com
- David Wattellier - [@DavidWattellier](https://github.com/DavidWattellier) - wattellierd@yahoo.fr
- Kenneth Man - [@kman-cc](https://github.com/kman-cc) - kenneth_man@icloud.com
- Eric Nicolas - [@ericNull](https://github.com/ericNull) - eric.e.nicolas@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

It's impossible to add every single resource that helped to make this possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
