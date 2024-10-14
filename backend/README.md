<p align="center">
  <img src="../logo.svg" width="280" alt="CityTrip" />
</p>

# CityTrip

![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Introduction
CityTrip helps you navigate your city effortlessly, whether you're biking or exploring on foot. We make city exploration easier and more enjoyable by helping you find the nearest bike stations and water fountains.

#### Bike Rental/Return
Find bike rental stations quickly, check bike availability in real-time, and locate bike return
stations. CityTrip makes renting and returning bikes simple with up-to-date info on
availability and docking spaces.

#### Water Fountain Mapping
Stay hydrated with CityTrip! Find water fountains on a map, see details like location and
type.

#### General Features
1. Interactive Map
  - User-friendly map interface with zoom and pan capabilities.
  - Directions to bike stations and fountains from user’s current location.
2. Search and Filters
  - Search functionality for specific bike stations or fountains by location.
  - Filters for bike stations based on bike type (e.g., regular, electric).
3. Accessibility
  - Multilingual support to cater to diverse user groups.
4. Rating
  - Allow signed-in users to rate bike stations and water fountains.
  - Ratings are visible in the station/fountain overview.
5. Feedback and Support
  - Feedback mechanism for users to suggest improvements or report issues.

## Setup
1. Set Up Environment Configuration:
 - Duplicate the `.env.example` file and rename it to `.env`.
 - Open `.env` and update it with your environment-specific settings.
2. Install PHP Dependencies:
```
composer install
```
3. Run Database Migrations:
```
php artisan migrate
```
4. Launch the Development Server:
```
php artisan serve
```

---

## References

* Laravel: https://laravel.com/
* Gravatar: https://docs.gravatar.com/

## Contributors

* Developer: [joeyin](https://www.linkedin.com/in/chiweiyin/)
