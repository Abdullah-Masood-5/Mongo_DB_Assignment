# Mongo Listings API

This project is a simple API for managing property listings using MongoDB, Express, and Mongoose. It supports pagination, filtering, sorting, and robust error handling.

## Project Structure

The project directory is structured as follows:

```
/Mongo_DB_Assignment
├── .env                
├── .gitignore          
├── app.js              
├── listing.json        
├── models/
│   └── Listing.js      
├── package.json        
└── routes/
    └── listings.js     
```


## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Abdullah-Masood-5/Mongo_DB_Assignment.git
    cd /Mongo_DB_Assignment
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```
    MONGODB_URI=mongodb://localhost:27017/sample_airbnb
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### GET /api/listings

Fetch all listings with support for pagination, filtering, and sorting.

#### Query Parameters
##### Optional Paramters
- `page` : default: 1
- `limit` : default: 10
- `sortBy`: default: `price`
- `order` : `asc` or `desc`, default: `asc`
- `price` 
- `property_type` 
- `bedrooms`


#### Example Response

```json
{
  "listings": [
    {
      "name": "Family Apartment with Playground Access",
      "summary": "A spacious family apartment with child-friendly amenities.",
      "property_type": "Apartment",
      "bedrooms": 3,
      "bathrooms": 2,
      "price": 2400,
      "address": {
        "street": "12 Park Ln",
        "suburb": "Sunnydale",
        "country": "USA"
      },
      "amenities": ["Playground", "Community Pool", "Gym", "Balcony"],
      "images": {
        "picture_url": "https://example.com/images/family_apartment2.jpg"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```
#### Example Error Response
```json
{
  "message": "Error fetching listings",
  "error": "Detailed error message"
}
```
```javascript
const ListingSchema = new mongoose.Schema({
    name: String,
    summary: String,
    property_type: String,
    bedrooms: Number,
    bathrooms: Number,
    price: Number,
    address: {
        street: String,
        suburb: String,
        country: String
    },
    amenities: [String],
    images: {
        picture_url: String
    }
});
```
