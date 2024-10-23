### API Documentation

## Endpoints

### 1. Get Records

**Endpoint:** `GET /records`

**Description:** Retrieves a paginated list of records for the authenticated user.

**Query Parameters:**

- [`apiToken`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (string, required): The API token for authentication.
- [`page`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, optional): The page number for pagination (default is 1).
- [`limit`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A22%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, optional): The number of records per page (default is 10).

**Response:**

- `200 OK`: Returns a JSON object containing the paginated records.
  ```json
  {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalRecords": 50,
    "records": [
      {
        "humidity": 45.5,
        "temperature": 22.3,
        "deviceTime": "2023-10-01T12:34:56.789Z"
      },
      ...
    ]
  }
  ```
- `400 Bad Request`: Invalid page or limit number.
- `401 Unauthorized`: Missing or invalid API token.

**Example Request:**

```sh
curl -X GET "http://localhost:3000/records?apiToken=your_api_token_here&page=1&limit=10"
```

### 2. Create Record

**Endpoint:** `POST /records`

**Description:** Creates a new record for the authenticated user.

**Query Parameters:**

- [`apiToken`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (string, required): The API token for authentication.

**Request Body:**

- [`humidity`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A57%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, required): The humidity value (must be >= 0).
- [`temperature`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A58%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, required): The temperature value (must be >= -273.15).
- [`deviceTime`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A59%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (string, required): The device time in ISO format.

**Response:**

- `200 OK`: Record created successfully.
- `400 Bad Request`: Invalid request body.
- `401 Unauthorized`: Missing or invalid API token.

**Example Request:**

```sh
curl -X POST "http://localhost:3000/records?apiToken=your_api_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "humidity": 45.5,
    "temperature": 22.3,
    "deviceTime": "2023-10-01T12:34:56.789Z"
  }'
```

### 3. Create Multiple Records

**Endpoint:** `POST /records/bulk`

**Description:** Creates multiple records for the authenticated user.

**Query Parameters:**

- [`apiToken`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (string, required): The API token for authentication.

**Request Body:**

- An array of record objects, each containing:
  - [`humidity`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A57%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, required): The humidity value (must be >= 0).
  - [`temperature`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A58%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (number, required): The temperature value (must be >= -273.15).
  - [`deviceTime`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A59%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") (string, required): The device time in ISO format.

**Response:**

- `200 OK`: Records created successfully.
- `400 Bad Request`: Invalid request body.
- `401 Unauthorized`: Missing or invalid API token.

**Example Request:**

```sh
curl -X POST "http://localhost:3000/records/bulk?apiToken=your_api_token

_here

" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "humidity": 45.5,
      "temperature": 22.3,
      "deviceTime": "2023-10-01T12:34:56.789Z"
    },
    {
      "humidity": 50.1,
      "temperature": 23.4,
      "deviceTime": "2023-10-01T13:45:12.345Z"
    },
    {
      "humidity": 55.2,
      "temperature": 24.5,
      "deviceTime": "2023-10-01T14:56:23.456Z"
    }
  ]'
```

### Error Responses

- **400 Bad Request**: The request was invalid or cannot be otherwise served. An accompanying error message will explain further.
- **401 Unauthorized**: Authentication is required and has failed or has not yet been provided.

### Notes

- Ensure that the [`apiToken`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A8%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") is included in the query parameters for authentication.
- The [`deviceTime`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fzhaxal%2FDocuments%2FProjects%2Fdata-server%2Fbackend%2Fsrc%2Froutes%2Fapi%2FrecordsRouter.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A59%2C%22character%22%3A2%7D%7D%5D%2C%2203303b74-b461-41d9-80b4-97ed223d9380%22%5D "Go to definition") should be in ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.sssZ`).

This documentation provides an overview of the available endpoints, their parameters, request bodies, and example `curl` commands for interacting with the API.
