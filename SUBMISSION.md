# GetSetup Backend Coding Challenge

This is a coding challenge project for GetSetup Backend Role.

## Assumptions

- 2 endpoints are implemented
    - GET /api/v1/availabilities with an optional query param `guideId`
    - POST /api/v1/availabilities
- Assuming authentication is provided elsewhere, there is no authentication implemented but I would probably choose JWT as bearer token if it was a requirement.
- Guides can register an availability with overwrapping times because there are no specifications given on this condition.
- There are no delete function for availability because there are no requirements.

## Decisions

Were the instructions clear?
- For the most part, yes. But there is one thing, I might have misunderstood was this emphasis on "a given week" in

	>	submit and retrieve their "teaching availability" for a given week

	I could not come up with a valid solution utilzing a week number. Therefore, I decided to use a range of datetime to represent an availability.

What data storage did you use?
- I picked sqlite for simplicity of setting up. But I would usually pick postgres.

Have you thought about using NoSQL database?
- I thought about using dynamoDB but decided not to use it because attributes for models are fixed, no varieties of attributes involved.

Tell me about data modeling
- Design was quite simple. I created two tables Guide and Availability with a guide having has-many relationship to availabilities.

Have I used a framework such as Express, Hapi, Koa, etc?
- I used "express" by using a bootstrap app called [Express API Starter](https://github.com/w3cj/express-api-starter)

What does the setup involve?
- "Express API Starter", "Prisma", and "Prettier"
