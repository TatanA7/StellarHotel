<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Local instalation

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Database migration 
Before to migrate you need to configure .env file, if you don't have this file you will need to create it in the proyect root and add the following variable.
```bash
DATABASE_URL="postgresql://postgres:root@localhost:5432/stellarHotel"
```

And after you can run the migration comand
```bash
  npx prisma migrate deploy
```
Now you can generate the client 
```bash
  npx prisma generate
```

## Seeder
Now we are going to create the inital data into `roomTypes` and `rooms`tables and a couple of store procedure (`get_available_rooms`, `sp_reservation_details`).
```bash
  npx ts-node prisma/seeders/seed.ts\
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## And everything is ready, you can go to [localhost:](http://localhost:3000/graphql) http://localhost:3000/graphql
there you can see all the documentation made with by graphql serve

Request examples
<details>
  <summary>get Availables Rooms</summary>

  ```graphql
  query {
    getAvailablesRooms(
      input:{
        checkinDate: "2024-10-21", 
        checkoutDate: "2024-10-25", 
        Amountguests: 2,
        breakfast: true
      }) {
      roomid
      baserate
      totalprice
      roomtype
      maxoccupancy
      breakDown{
        discount
        additionalChange{
          breakfastcost
          weekendincrease
        }
      }
    }
  }
  ```
</details>

<details>
  <summary>Create Reservations</summary>

  ```graphql
    mutation{
      createReservation(
        input:{
          roomId: 5
          checkinDate: "2024-10-21", 
          checkoutDate: "2024-10-25", 
          numberOfGuests: 2,
          breakfastIncluded: true
        }
      ){
        id
        roomId
        checkIn
        checkOut
        isCancelled
        breakfastIncluded
        numberOfGuests
      }
    }
  ```
</details>
<details>
  <summary>Get all reservation</summary>

  ```graphql
    query{
      getAllReservation{
        past{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
        onGoing{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
        futures{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
      }
    }
  ```
</details>

<details>
  <summary>Cancel Reservations</summary>

  ```graphql
    mutation{
      cancelReservation(cancelReservationInput:{reservationId:1}){
        id
        numberOfGuests
        breakfastIncluded
        isCancelled
        room{
          id
          roomTypeId
          hasOceanView
          roomType{
            id
            name
            price
          }
        }
      }
    }
  ```
</details>

<details>
  <summary>Get reservtion details</summary>

  ```graphql
    query{ 
      getReservationDetail(reservationId:1){
        id
        roomid
        baserate
        totalprice
        roomtype
        maxoccupancy
        numberOfGuests
        breakDown{
          discount
          additionalChange{
            breakfastcost
            weekendincrease
            
          }
        }
      }
    }
  ```
</details>

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

# Docker instalation

If you are using `docker` you can use the follow command to run the container
```bash
  $ docker-compose up --build  
```
This case the proyect will be exposed in the same route [localhost:](http://localhost:3000/graphql) http://localhost:3000/graphql

if you have some problem with you container can run :
```bash
  $ docker system prune -a    
```
And try again

# Hosting enviroment
The service will be expose in this route [stellarhotel.onrender.com/graphql:](http://stellarhotel.onrender.com/graphql) 
you can to test everything with postman or in the documentation page 
if you want to use postman in the root proyect you will fing a postman file `StellaHotels.postman_collection.json` to import in your postman

Anyway here each schema again
Request examples
<details>
  <summary>get Availables Rooms</summary>

  ```graphql
  query {
    getAvailablesRooms(
      input:{
        checkinDate: "2024-10-21", 
        checkoutDate: "2024-10-25", 
        Amountguests: 2,
        breakfast: true
      }) {
      roomid
      baserate
      totalprice
      roomtype
      maxoccupancy
      breakDown{
        discount
        additionalChange{
          breakfastcost
          weekendincrease
        }
      }
    }
  }
  ```
</details>

<details>
  <summary>Create Reservations</summary>

  ```graphql
    mutation{
      createReservation(
        input:{
          roomId: 5
          checkinDate: "2024-10-21", 
          checkoutDate: "2024-10-25", 
          numberOfGuests: 2,
          breakfastIncluded: true
        }
      ){
        id
        roomId
        checkIn
        checkOut
        isCancelled
        breakfastIncluded
        numberOfGuests
      }
    }
  ```
</details>
<details>
  <summary>Get all reservation</summary>

  ```graphql
    query{
      getAllReservation{
        past{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
        onGoing{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
        futures{
          id
          roomId
          checkIn
          checkOut
          breakfastIncluded
          room{
            id
            roomTypeId
            hasOceanView
            roomType{
              name
              price
            }
          }
        }
      }
    }
  ```
</details>

<details>
  <summary>Cancel Reservations</summary>

  ```graphql
    mutation{
      cancelReservation(cancelReservationInput:{reservationId:1}){
        id
        numberOfGuests
        breakfastIncluded
        isCancelled
        room{
          id
          roomTypeId
          hasOceanView
          roomType{
            id
            name
            price
          }
        }
      }
    }
  ```
</details>

<details>
  <summary>Get reservtion details</summary>

  ```graphql
    query{ 
      getReservationDetail(reservationId:1){
        id
        roomid
        baserate
        totalprice
        roomtype
        maxoccupancy
        numberOfGuests
        breakDown{
          discount
          additionalChange{
            breakfastcost
            weekendincrease
            
          }
        }
      }
    }
  ```
</details>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jhonathan Ascencio](https://jhonathan.ascenciog@gmail.com)
<!-- - Website - [https://nestjs.com](https://nestjs.com/) -->
- Github - [@TatanA7](https://github.com/TatanA7/StellarHotel)

## License

Nest is [MIT licensed](LICENSE).
