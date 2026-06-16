# API Documentation
## SP Planning Secretariat Portal — REST API

**Base URL:** `https://api.your-domain.lk`  
**Version:** 1.0  
**Data Format:** All requests and responses use `application/json`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Error Responses](#2-error-responses)
3. [Rate Limiting](#3-rate-limiting)
4. [Portal Endpoints](#4-portal-endpoints)
   - [Health Check](#41-health-check)
   - [News Bar](#42-news-bar)
   - [Contact & Complaints](#43-contact--complaints)
5. [SMP — Auth Endpoints](#5-smp--auth-endpoints)
6. [SMP — Users](#6-smp--users)
7. [SMP — Inventory Items](#7-smp--inventory-items)
8. [SMP — Unique Item IDs](#8-smp--unique-item-ids)
9. [SMP — Issued Items](#9-smp--issued-items)
10. [SMP — Borrow & Returns](#10-smp--borrow--returns)
11. [SMP — Reservations](#11-smp--reservations)
12. [SMP — Disposal](#12-smp--disposal)
13. [SMP — Reports](#13-smp--reports)
14. [Appendix — Quick Reference](#appendix--quick-reference)

---

## 1. Authentication

### How it works

The Store Management Portal (SMP) uses **JWT Bearer token** authentication.

1. Call `POST /api/smp/auth/login` with your username and password.
2. You receive a `token` in the response.
3. Include this token in the `Authorization` header of every subsequent request.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Tokens expire after **8 hours**. After expiry, log in again to get a new token.

### Access Levels

Most SMP endpoints check the role embedded in your token. There are three roles:

| Role | What they can do |
|---|---|
| `admin` | Full access to everything |
| `storekeeper` | Manage inventory, issue items, create disposals. Cannot manage users or approve disposals. |
| `viewer` | Read-only access to all data |

In this document, the **Auth** column on each endpoint uses these short labels:

| Label | Meaning |
|---|---|
| `None` | No token required |
| `Any` | Valid token required — any role |
| `SK+` | Storekeeper or admin |
| `Admin` | Admin only |

---

## 2. Error Responses

All error responses follow this consistent format:

```json
{ "error": "A human-readable description of what went wrong." }
```

| HTTP Status | Meaning |
|---|---|
| `400 Bad Request` | Missing required field or invalid value |
| `401 Unauthorized` | Token missing, expired, or invalid |
| `403 Forbidden` | Token is valid but your role cannot perform this action |
| `404 Not Found` | The requested record does not exist |
| `409 Conflict` | A unique constraint was violated (e.g., username or unique ID already in use) |
| `429 Too Many Requests` | Rate limit exceeded on the login endpoint |
| `500 Internal Server Error` | Unexpected server-side error |

---

## 3. Rate Limiting

The login endpoint is rate-limited to prevent brute-force attacks.

| Limit | Window | Scope |
|---|---|---|
| 10 login attempts | 15 minutes | Per IP address |

When exceeded, the server returns:

```json
HTTP 429
{ "error": "Too many login attempts. Please wait 15 minutes." }
```

---

## 4. Portal Endpoints

These endpoints serve the public-facing website. No authentication is required.

---

### 4.1 Health Check

---

#### `GET /api/health`

Verify the backend is running.

**Auth:** None

**Response `200`**
```json
{ "status": "ok" }
```

---

### 4.2 News Bar

The scrolling ticker displayed on the public home page.

---

#### `GET /api/news-bar`

Get all news bar items.

**Auth:** None

**Response `200`**
```json
[
  { "text": "Provincial Planning Meeting scheduled for 20th June 2026" },
  { "text": "Annual budget submission deadline: 30th June 2026" }
]
```

---

#### `PUT /api/news-bar`

Replace all news bar items. The entire array is replaced in a single call.  
This is called by the CMS whenever news bar edits are saved.

**Auth:** None

**Request body**
```json
[
  { "text": "Updated news item one" },
  { "text": "Updated news item two" }
]
```

**Response `200`**
```json
{ "ok": true }
```

---

### 4.3 Contact & Complaints

---

#### `POST /api/contact`

Submit a contact form message from the public portal.  
The record is saved immediately. Two emails are then sent in the background — one to the admin and one to the submitter — without delaying the response.

**Auth:** None

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Submitter full name |
| `email` | string | Yes | Must be a valid email format |
| `phone` | string | No | Contact phone number |
| `type` | string | No | See accepted values below. Default: `General Inquiry` |
| `dept` | string | No | Relevant department name |
| `subject` | string | Yes | Brief subject line |
| `message` | string | Yes | Minimum 20 characters |

**Accepted `type` values**
- `Complaint`
- `Suggestion`
- `General Inquiry`
- `Service Feedback`
- `Right to Information (RTI)`

**Example request**
```json
{
  "name": "Kamal Perera",
  "email": "kamal@example.com",
  "phone": "0771234567",
  "type": "Complaint",
  "dept": "Accounts",
  "subject": "Delayed payment processing",
  "message": "My payment has been pending for over 30 days without any update."
}
```

**Response `201`**
```json
{
  "ok": true,
  "id": 1718500000000
}
```

`id` is a Unix timestamp in milliseconds. The last 8 digits are used as the human-readable reference number shown in the confirmation emails (e.g., `#00000000`).

---

#### `GET /api/contact`

List all submitted complaints and contact messages, newest first.

**Auth:** None

**Response `200`**
```json
[
  {
    "id": 1718500000000,
    "createdAt": "2026-06-16T08:30:00.000Z",
    "status": "New",
    "name": "Kamal Perera",
    "email": "kamal@example.com",
    "phone": "0771234567",
    "type": "Complaint",
    "dept": "Accounts",
    "subject": "Delayed payment processing",
    "message": "My payment has been pending for over 30 days without any update."
  }
]
```

**Possible `status` values:** `New` · `In Review` · `Resolved` · `Closed`

---

#### `PATCH /api/contact/:id`

Update the status of a submission.

**Auth:** None  
**URL parameter:** `id` — the numeric ID of the submission

**Request body**

| Field | Type | Required | Accepted values |
|---|---|---|---|
| `status` | string | Yes | `New`, `In Review`, `Resolved`, `Closed` |

**Example request**
```json
{ "status": "In Review" }
```

**Response `200`**
```json
{
  "ok": true,
  "item": { "...updated submission object..." }
}
```

---

#### `DELETE /api/contact/:id`

Permanently delete a submission.

**Auth:** None  
**URL parameter:** `id` — the numeric ID of the submission

**Response `200`**
```json
{ "ok": true }
```

---

## 5. SMP — Auth Endpoints

---

#### `POST /api/smp/auth/login`

Log in and receive a JWT token.

**Auth:** None  
**Rate limit:** 10 attempts per 15 minutes per IP

**Request body**

| Field | Type | Required |
|---|---|---|
| `username` | string | Yes |
| `password` | string | Yes |

**Example request**
```json
{
  "username": "Store",
  "password": "Store@123"
}
```

**Response `200`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-...",
    "username": "Store",
    "role": "admin",
    "name": "Store Manager",
    "email": "store@example.com"
  }
}
```

**Response `401`** — returned for both wrong username and wrong password (intentionally generic to prevent username guessing)
```json
{ "error": "Invalid username or password" }
```

---

#### `POST /api/smp/auth/logout`

Record the logout time for the current session.

**Auth:** Any  
**Request body:** None

**Response `200`**
```json
{ "ok": true }
```

---

#### `GET /api/smp/auth/me`

Get the current user's profile. The password is never included.

**Auth:** Any

**Response `200`**
```json
{
  "id": "a1b2c3d4-...",
  "username": "Store",
  "role": "admin",
  "name": "Store Manager",
  "email": "store@example.com",
  "active": true,
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

---

## 6. SMP — Users

All user management endpoints require the `admin` role.

---

#### `GET /api/smp/users`

List all users. Passwords are never included in any response.

**Auth:** Admin

**Response `200`**
```json
[
  {
    "id": "a1b2c3d4-...",
    "username": "Store",
    "role": "admin",
    "name": "Store Manager",
    "email": "store@example.com",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

#### `POST /api/smp/users`

Create a new user. The password is hashed by the server before saving.

**Auth:** Admin

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `username` | string | Yes | Must be unique (case-insensitive check) |
| `password` | string | Yes | Plain text — server hashes with bcrypt |
| `role` | string | Yes | `admin`, `storekeeper`, or `viewer` |
| `name` | string | Yes | Display name |
| `email` | string | No | Email address |

**Example request**
```json
{
  "username": "nimal",
  "password": "SecurePass@456",
  "role": "storekeeper",
  "name": "Nimal Jayasena",
  "email": "nimal@example.com"
}
```

**Response `201`** — the created user object (without password)

---

#### `PATCH /api/smp/users/:id`

Update a user's details. Only include the fields you want to change.

**Auth:** Admin  
**URL parameter:** `id` — the user's UUID

**Updatable fields**

| Field | Type | Notes |
|---|---|---|
| `name` | string | Update display name |
| `email` | string | Update email address |
| `role` | string | `admin`, `storekeeper`, or `viewer` |
| `active` | boolean | Set to `false` to prevent login |
| `password` | string | New password (plain text — hashed by server) |

**Example — disable a user account**
```json
{ "active": false }
```

**Response `200`** — the updated user (without password)

---

#### `DELETE /api/smp/users/:id`

Delete a user. You cannot delete your own account.

**Auth:** Admin  
**URL parameter:** `id` — the user's UUID

**Response `200`**
```json
{ "ok": true }
```

**Error — attempting to delete self `400`**
```json
{ "error": "Cannot delete yourself" }
```

---

#### `PATCH /api/smp/users/me/password`

Change your own password. Available to all authenticated users regardless of role.

**Auth:** Any

**Request body**

| Field | Type | Required |
|---|---|---|
| `currentPassword` | string | Yes |
| `newPassword` | string | Yes |

**Example request**
```json
{
  "currentPassword": "Store@123",
  "newPassword": "NewSecure@789"
}
```

**Response `200`**
```json
{ "ok": true }
```

**Response `401`** — current password does not match
```json
{ "error": "Current password incorrect" }
```

---

## 7. SMP — Inventory Items

---

#### `GET /api/smp/items`

Get all inventory items. Each item includes three computed fields calculated at read time.

**Auth:** Any

**Computed fields added to every item**

| Field | Type | Description |
|---|---|---|
| `status` | string | `available`, `out_of_stock`, `reserved`, or `damaged` |
| `availableQty` | number | `qty` minus `reservedQty` |
| `uniqueIdCount` | number | Count of unique unit records linked to this item |

**Example response item**
```json
{
  "id": "uuid",
  "name": "A4 Paper Ream",
  "sku": "SPPS-42801",
  "category": "Stationery",
  "description": "500-sheet A4 80gsm paper ream",
  "qty": 50,
  "condition": "Good",
  "reservedQty": 5,
  "purchaseValue": 1200.00,
  "currentValue": 1150.00,
  "createdBy": "Store",
  "createdAt": "2026-01-15T10:00:00.000Z",
  "updatedAt": "2026-06-01T08:30:00.000Z",
  "status": "reserved",
  "availableQty": 45,
  "uniqueIdCount": 50
}
```

---

#### `GET /api/smp/items/:id`

Get a single item by UUID.

**Auth:** Any  
**URL parameter:** `id` — item UUID

**Response `200`** — single item object (same shape as list response)  
**Response `404`** — `{ "error": "Item not found" }`

---

#### `POST /api/smp/items`

Create a new inventory item. You must provide one unique ID string per physical unit.

**Auth:** SK+

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Item name |
| `category` | string | No | Default: `General` |
| `description` | string | No | |
| `qty` | number | Yes | Must be greater than 0 |
| `condition` | string | No | `Good`, `Damaged`, or `Worn`. Default: `Good` |
| `purchaseValue` | number | No | Purchase price per unit in LKR |
| `currentValue` | number | No | Current assessed value per unit in LKR |
| `uniqueIds` | string[] | Yes | Array of ID strings — must have exactly `qty` entries |

> Each value in `uniqueIds` must be unique across the entire system. Submitting a duplicate returns `409 Conflict`.

**Example request — adding 3 chairs**
```json
{
  "name": "Office Chair",
  "category": "Furniture",
  "description": "Adjustable ergonomic office chair, blue fabric",
  "qty": 3,
  "condition": "Good",
  "purchaseValue": 15000.00,
  "currentValue": 14000.00,
  "uniqueIds": ["CHR-001", "CHR-002", "CHR-003"]
}
```

**Response `201`** — the created item with computed fields  
The server auto-generates a `sku` in the format `SPPS-NNNNN`.

---

#### `PATCH /api/smp/items/:id`

Update item details. Only the fields listed below can be changed. To change stock quantity, use the stock-in or stock-out endpoints instead.

**Auth:** SK+  
**URL parameter:** `id` — item UUID

**Editable fields**

| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `category` | string | |
| `description` | string | |
| `condition` | string | `Good`, `Damaged`, or `Worn` |
| `purchaseValue` | number | Change is automatically recorded in `valueHistory` |
| `currentValue` | number | Change is automatically recorded in `valueHistory` |

**Example request**
```json
{
  "condition": "Worn",
  "currentValue": 12000.00
}
```

**Response `200`** — the updated item

---

#### `DELETE /api/smp/items/:id`

Permanently delete an item and all its linked unique ID records.

**Auth:** Admin  
**URL parameter:** `id` — item UUID

**Response `200`**
```json
{ "ok": true }
```

---

#### `POST /api/smp/items/:id/stock-in`

Add more units to an existing item. New unique IDs must be supplied for every unit added.

**Auth:** SK+  
**URL parameter:** `id` — item UUID

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `qty` | number | Yes | Number of units to add |
| `uniqueIds` | string[] | Yes | Must have exactly `qty` entries, all unique |
| `supplier` | string | No | Supplier name |
| `purchaseDate` | string | No | Date of purchase |
| `invoiceNo` | string | No | Invoice reference number |
| `condition` | string | No | Condition for the new units |
| `note` | string | No | Additional note |

**Example request**
```json
{
  "qty": 2,
  "uniqueIds": ["CHR-004", "CHR-005"],
  "supplier": "Office Supplies Ltd",
  "invoiceNo": "INV-2026-0042",
  "note": "Mid-year restocking"
}
```

**Response `200`** — the updated item

---

#### `POST /api/smp/items/:id/stock-out`

Remove units from stock without tracking individual units. Used for write-offs, losses, or manual adjustments.

**Auth:** SK+  
**URL parameter:** `id` — item UUID

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `qty` | number | Yes | Number of units to remove |
| `reason` | string | No | Reason for removal |
| `approvedBy` | string | No | Authorizing officer |
| `note` | string | No | Additional note |

**Response `200`** — the updated item

---

### Categories

---

#### `GET /api/smp/items/meta/categories`

Get all item categories.

**Auth:** Any

**Response `200`**
```json
[
  { "id": "uuid", "name": "Stationery", "color": "#6366F1", "createdAt": "..." },
  { "id": "uuid", "name": "Furniture",  "color": "#F59E0B", "createdAt": "..." }
]
```

**Default categories** created by the seed script:  
`Stationery` · `Furniture` · `Electronics` · `Cleaning` · `Printing` · `Borrowable` · `Equipment` · `Tools`

---

#### `POST /api/smp/items/meta/categories`

Create a new category.

**Auth:** Admin

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Must be unique |
| `color` | string | No | Hex color code. Default: `#6366F1` |

**Example request**
```json
{ "name": "Medical Supplies", "color": "#10B981" }
```

**Response `201`** — the created category  
**Response `409`** — category with this name already exists

---

## 8. SMP — Unique Item IDs

Every physical unit of an item has its own unique ID record. These records track the individual status and location of each unit (e.g., serial numbers, asset tags, barcode values).

---

#### `GET /api/smp/items/:id/unique-ids`

Get all unique ID records for a specific item, sorted by unique number.

**Auth:** Any  
**URL parameter:** `id` — parent item UUID

**Response `200`**
```json
[
  {
    "id": "record-uuid",
    "parentItemId": "item-uuid",
    "itemName": "Office Chair",
    "sku": "SPPS-42801",
    "category": "Furniture",
    "uniqueNo": "CHR-001",
    "status": "available",
    "condition": "Good",
    "purchaseValue": 15000.00,
    "currentValue": 14000.00,
    "location": "Store Room A",
    "note": "",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
]
```

**Possible `status` values:** `available` · `reserved` · `issued` · `borrowed` · `disposed`

---

#### `GET /api/smp/items/unique-ids/all`

Get all unique ID records across every item in the system.

**Auth:** Any

**Response `200`** — array of unique ID objects (same shape as above), sorted by unique number

---

#### `PATCH /api/smp/items/unique-ids/:uid`

Update a specific unique ID record's status, condition, location, or note.

**Auth:** SK+  
**URL parameter:** `uid` — the unique ID record's own UUID (the `id` field, not `uniqueNo`)

**Request body** — all fields are optional; only include what you want to change

| Field | Type | Accepted values |
|---|---|---|
| `status` | string | `available`, `reserved`, `issued`, `borrowed`, `disposed` |
| `condition` | string | `Good`, `Damaged`, `Worn` |
| `location` | string | Physical location description |
| `note` | string | Free-text note |

**Example request**
```json
{
  "condition": "Damaged",
  "location": "Repair Workshop",
  "note": "Screen cracked — sent for repair on 2026-06-16"
}
```

**Response `200`** — the updated unique ID record

---

## 9. SMP — Issued Items

Issuing transfers items to a person. Unlike borrowing, issued items are not expected to be tracked for return.

---

#### `POST /api/smp/issued`

Issue items to a recipient. Reduces the item's stock quantity immediately.

**Auth:** SK+

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `itemId` | string | Yes | UUID of the item to issue |
| `qty` | number | Yes | Number of units to issue |
| `receiverName` | string | Yes | Full name of the recipient |
| `purpose` | string | Yes | Reason for issuing |
| `receiverNIC` | string | No | National ID number |
| `receiverDept` | string | No | Recipient's department |
| `receiverPhone` | string | No | Contact number |
| `approvedBy` | string | No | Name of approving officer |
| `carrierName` | string | No | Name of person collecting on recipient's behalf |
| `expectedReturnDate` | string | No | ISO date — only if return is expected |
| `note` | string | No | Additional note |

**Example request**
```json
{
  "itemId": "item-uuid-here",
  "qty": 2,
  "receiverName": "Sunil Rathnayake",
  "receiverNIC": "198812345678",
  "receiverDept": "Accounts Division",
  "receiverPhone": "0712345678",
  "purpose": "Required for budget documentation work",
  "approvedBy": "Deputy Secretary"
}
```

**Response `201`** — the issued record

---

#### `GET /api/smp/issued`

List issued records, newest first. Supports filtering.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `itemId` | Filter by item UUID |
| `receiver` | Partial match on receiver name (case-insensitive) |

**Example**
```
GET /api/smp/issued?receiver=sunil
```

**Response `200`** — array of issued records

---

#### `GET /api/smp/issued/:id`

Get a single issued record.

**Auth:** Any  
**URL parameter:** `id` — issued record UUID

**Response `200`** — single issued record

---

## 10. SMP — Borrow & Returns

Borrowing is for items that are expected to be returned. The item's quantity is reduced while borrowed and restored on return.

---

#### `POST /api/smp/borrow`

Create a borrow record. Reduces the item's available quantity.

**Auth:** SK+

> The item must have `borrowable: true`. Check the item's details before calling this endpoint.

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `itemId` | string | Yes | UUID of the item |
| `qty` | number | Yes | Number of units to borrow |
| `borrowerName` | string | Yes | Full name of the borrower |
| `expectedReturnDate` | string | Yes | ISO date e.g. `2026-07-01` |
| `borrowerNIC` | string | No | National ID number |
| `borrowerDept` | string | No | Borrower's department |
| `borrowerPhone` | string | No | Contact number |
| `purpose` | string | No | Reason for borrowing |
| `approvedBy` | string | No | Approving officer's name |
| `note` | string | No | Additional note |

**Example request**
```json
{
  "itemId": "item-uuid-here",
  "qty": 1,
  "borrowerName": "Chamara Wickramasinghe",
  "borrowerNIC": "199023456789",
  "borrowerDept": "Planning Division",
  "expectedReturnDate": "2026-07-01",
  "purpose": "Required for inter-provincial meeting"
}
```

**Response `201`** — the borrow record with `status: "borrowed"`

---

#### `GET /api/smp/borrow`

List all borrow records, newest first. Includes an `overdue` computed field.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `status` | `borrowed` or `returned` |
| `itemId` | Filter by item UUID |

The `overdue` field is `true` when `status === "borrowed"` and `expectedReturnDate` is in the past.

**Response `200`** — array of borrow records

---

#### `PATCH /api/smp/borrow/:id/return`

Process the return of a borrowed item. Restores the item's stock quantity.

**Auth:** SK+  
**URL parameter:** `id` — borrow record UUID

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `returnCondition` | string | No | `Good`, `Damaged`, or `Worn`. Default: `Good` |
| `returnNote` | string | No | Notes about the condition on return |

**Example request**
```json
{
  "returnCondition": "Good",
  "returnNote": "Returned in original condition, no damage"
}
```

**Response `200`** — the updated borrow record with `status: "returned"` and `returnedAt` timestamp

---

## 11. SMP — Reservations

Reservations hold a quantity of an item for an institution over a specific date range. The system prevents double-booking by checking for overlaps automatically.

---

#### `POST /api/smp/borrow/reservations`

Create a reservation. The system checks that sufficient stock is available for the entire date range.

**Auth:** SK+

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `itemId` | string | Yes | UUID of the item |
| `qty` | number | Yes | Number of units to reserve |
| `instituteName` | string | Yes | Name of the reserving institution |
| `reservationStartDate` | string | Yes | ISO date e.g. `2026-07-10` |
| `reservationEndDate` | string | Yes | ISO date — must be after start date |
| `uniqueItemIds` | string[] | No | Lock specific unit UUIDs. Count must equal `qty`. |
| `reservedFromDivision` | string | No | Division making the reservation |
| `approvedBy` | string | No | Approving officer |
| `notes` | string | No | Additional notes |

**Example request**
```json
{
  "itemId": "item-uuid-here",
  "qty": 5,
  "instituteName": "Matara District Secretariat",
  "reservationStartDate": "2026-07-10",
  "reservationEndDate": "2026-07-15",
  "reservedFromDivision": "Administration",
  "approvedBy": "Director"
}
```

**Response `201`** — the reservation record with `reservationStatus: "pending"`

The server generates a `reservationId` in the format `RES-XXXXXXXXX` (e.g., `RES-LQ7T4KA1W`).

**Overlap conflict `400`**
```json
{ "error": "Only 2 available during that period" }
```

---

#### `GET /api/smp/borrow/reservations`

List all reservations, newest first. Supports filtering.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `itemId` | Filter by item UUID |
| `status` | Filter by reservation status |
| `instituteName` | Partial match on institution name (case-insensitive) |

**Reservation statuses:** `pending` · `approved` · `active` · `completed` · `cancelled`

**Response `200`** — array of reservation records

---

#### `GET /api/smp/borrow/reservations/:id`

Get a single reservation by UUID.

**Auth:** Any  
**URL parameter:** `id` — reservation UUID

**Response `200`** — single reservation record

---

#### `PATCH /api/smp/borrow/reservations/:id/approve`

Approve a pending reservation.

**Auth:** Admin  
**Allowed transition:** `pending` → `approved`

**Response `200`** — updated reservation with `reservationStatus: "approved"`

---

#### `PATCH /api/smp/borrow/reservations/:id/activate`

Mark a reservation as active (items have been physically handed over).

**Auth:** SK+  
**Allowed transition:** `pending` or `approved` → `active`

**Response `200`** — updated reservation with `reservationStatus: "active"`

---

#### `PATCH /api/smp/borrow/reservations/:id/complete`

Complete a reservation (items returned to store). Releases the reserved stock and unlocks any locked unique IDs.

**Auth:** SK+  
**Allowed transition:** `active` or `approved` → `completed`

**Response `200`** — updated reservation with `reservationStatus: "completed"`

---

#### `PATCH /api/smp/borrow/reservations/:id/cancel`

Cancel a reservation. Releases the reserved stock and unlocks any locked unique IDs.

**Auth:** SK+  
**Allowed transition:** Any status except `completed` or `cancelled`

**Response `200`** — updated reservation with `reservationStatus: "cancelled"`

---

## 12. SMP — Disposal

Disposal records items being permanently removed from inventory.

---

#### `POST /api/smp/disposal`

Create a disposal record. Immediately reduces the item's stock quantity. Status begins at `pending_approval`.

**Auth:** SK+

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `itemId` | string | Yes | UUID of the item |
| `qty` | number | Yes | Number of units to dispose |
| `disposalReason` | string | Yes | Why the item is being disposed |
| `disposalMethod` | string | Yes | How the item will be disposed — see values below |
| `uniqueItemIds` | string[] | No | UUIDs of specific units to mark as disposed |
| `institute` | string | No | Receiving institute (for donations or auctions) |
| `authorizedBy` | string | No | Authorizing officer's name |
| `disposalNotes` | string | No | Additional notes |
| `estimatedDisposalValue` | number | No | Estimated recovery value in LKR |

**Accepted `disposalMethod` values**
- `Written Off`
- `Auctioned`
- `Recycled`
- `Donated`
- `Destroyed`

**Example request**
```json
{
  "itemId": "item-uuid-here",
  "qty": 2,
  "disposalReason": "Beyond economical repair — screen and keyboard damaged",
  "disposalMethod": "Written Off",
  "uniqueItemIds": ["uid-record-uuid-1", "uid-record-uuid-2"],
  "authorizedBy": "Deputy Secretary",
  "estimatedDisposalValue": 0
}
```

**Response `201`** — the disposal record with `status: "pending_approval"`

---

#### `GET /api/smp/disposal`

List disposal records, newest first. Supports filtering.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `status` | Filter by disposal status |
| `itemId` | Filter by item UUID |
| `from` | ISO date — records on or after this date |
| `to` | ISO date — records on or before this date |

**Disposal statuses:** `pending_approval` · `approved` · `disposed` · `recycled` · `auctioned` · `written_off`

**Response `200`** — array of disposal records

---

#### `GET /api/smp/disposal/:id`

Get a single disposal record.

**Auth:** Any  
**URL parameter:** `id` — disposal UUID

**Response `200`** — single disposal record

---

#### `PATCH /api/smp/disposal/:id/approve`

Approve a disposal that is awaiting approval.

**Auth:** Admin  
**Allowed transition:** `pending_approval` → `approved`

**Response `200`** — updated disposal with `status: "approved"`, `approvedAt` timestamp, and `approvedBy` username

---

#### `PATCH /api/smp/disposal/:id/status`

Set any valid status on a disposal record directly.

**Auth:** Admin  
**URL parameter:** `id` — disposal UUID

**Request body**

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | Any valid disposal status |
| `notes` | string | No | Appended to existing disposal notes |

**Example request**
```json
{
  "status": "written_off",
  "notes": "Confirmed at board meeting on 2026-06-15"
}
```

**Response `200`** — the updated disposal record

---

## 13. SMP — Reports

All report endpoints are read-only and available to any authenticated role.

---

#### `GET /api/smp/reports/dashboard`

Get aggregated statistics for the SMP dashboard overview.

**Auth:** Any

**Response `200`**
```json
{
  "totalItems": 48,
  "totalQty": 312,
  "outOfStockCount": 3,
  "activeUsers": 4,
  "pendingDisposals": 2,
  "totalDisposals": 15,
  "totalStockValue": 2850000.00,
  "categoryBreakdown": [
    { "name": "Stationery", "count": 12, "qty": 150 },
    { "name": "Furniture",  "count": 8,  "qty": 42  }
  ],
  "monthlyMovement": [
    { "month": "2026-01", "stock_in": 45, "stock_out": 12, "issued": 20, "disposed": 3 },
    { "month": "2026-06", "stock_in": 30, "stock_out": 8,  "issued": 15, "disposed": 1 }
  ],
  "recentTransactions": [ "...last 15 transaction objects..." ],
  "actionCounts": {
    "created": 48, "stock_in": 23, "issued": 87, "disposed": 15
  },
  "topDisposedItems": [
    { "name": "Office Chair", "count": 6 }
  ]
}
```

`totalStockValue` = sum of (`currentValue × qty`) for all items, in LKR.  
`monthlyMovement` covers the last 6 months. Each entry shows total units moved per action type.  
`recentTransactions` is the 15 most recent transactions.  
`topDisposedItems` is the top 5 items by total disposed quantity.

---

#### `GET /api/smp/reports/transactions`

Get the full transaction log with optional filters. Returns newest first.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `action` | Filter by transaction action type |
| `itemId` | Filter by item UUID |
| `userId` | Filter by user UUID |
| `from` | ISO date — transactions on or after |
| `to` | ISO date — transactions on or before |

**Transaction action types:**  
`created` · `edited` · `deleted` · `stock_in` · `stock_out` · `issued` · `borrowed` · `returned` · `reserved` · `disposed`

**Example**
```
GET /api/smp/reports/transactions?action=issued&from=2026-06-01&to=2026-06-30
```

**Transaction record shape**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "Store",
  "action": "issued",
  "itemId": "uuid",
  "itemName": "A4 Paper Ream",
  "qtyBefore": 50,
  "qtyAfter": 48,
  "note": "Issued to Kamal Perera (Accounts) for: Budget documentation",
  "meta": { "issuedId": "uuid" },
  "createdAt": "2026-06-16T09:15:00.000Z"
}
```

**Response `200`** — array of transaction records

---

#### `GET /api/smp/reports/audit-logs`

Get the audit log of all write operations recorded by the system.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `userId` | Filter by user UUID |
| `action` | Filter by action string |
| `from` | ISO date |
| `to` | ISO date |

**Response `200`** — array of audit log records, newest first

---

#### `GET /api/smp/reports/login-logs`

Get the login history for all SMP users.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `username` | Partial match on username (case-insensitive) |
| `status` | `success` or `failed` |
| `from` | ISO date — filter by login time |
| `to` | ISO date |

**Login log record shape**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "Store",
  "loginTime": "2026-06-16T08:00:00.000Z",
  "logoutTime": "2026-06-16T16:00:00.000Z",
  "ip": "203.94.95.96",
  "deviceInfo": "Mozilla/5.0 (Windows NT 10.0; Win64)...",
  "status": "success",
  "failReason": null,
  "createdAt": "2026-06-16T08:00:00.000Z"
}
```

**`failReason` values:** `null` (success) · `invalid_credentials` (user not found or inactive) · `wrong_password`

> Login logs older than **28 days** are automatically purged every midnight (Asia/Colombo timezone).

**Response `200`** — array of login log records, newest first

---

#### `GET /api/smp/reports/disposals`

Get disposal records filtered by status and/or date range. Equivalent to `GET /api/smp/disposal` but intended for reporting views.

**Auth:** Any

**Query parameters** — all optional

| Parameter | Description |
|---|---|
| `status` | Filter by disposal status |
| `from` | ISO date |
| `to` | ISO date |

**Response `200`** — array of disposal records, newest first

---

#### `GET /api/smp/reports/value-summary`

Get a summary of purchase value and current assessed value for all items.

**Auth:** Any

**Response `200`**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Office Chair",
      "sku": "SPPS-42801",
      "category": "Furniture",
      "qty": 3,
      "purchaseValue": 15000.00,
      "currentValue": 14000.00
    }
  ],
  "totalPurchaseValue": 2900000.00,
  "totalCurrentValue": 2750000.00
}
```

All monetary values are in **LKR (Sri Lankan Rupees)**.  
`totalPurchaseValue` and `totalCurrentValue` are simple sums of the per-item values (not multiplied by quantity).

---

## Appendix — Quick Reference

### All Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | None | Health check |
| GET | `/api/news-bar` | None | Get news bar items |
| PUT | `/api/news-bar` | None | Replace all news bar items |
| POST | `/api/contact` | None | Submit contact form |
| GET | `/api/contact` | None | List all submissions |
| PATCH | `/api/contact/:id` | None | Update submission status |
| DELETE | `/api/contact/:id` | None | Delete submission |
| POST | `/api/smp/auth/login` | None | Login — receive JWT token |
| POST | `/api/smp/auth/logout` | Any | Record logout time |
| GET | `/api/smp/auth/me` | Any | Get current user profile |
| GET | `/api/smp/users` | Admin | List all users |
| POST | `/api/smp/users` | Admin | Create user |
| PATCH | `/api/smp/users/:id` | Admin | Update user |
| DELETE | `/api/smp/users/:id` | Admin | Delete user |
| PATCH | `/api/smp/users/me/password` | Any | Change own password |
| GET | `/api/smp/items` | Any | List all items |
| GET | `/api/smp/items/:id` | Any | Get single item |
| POST | `/api/smp/items` | SK+ | Create item |
| PATCH | `/api/smp/items/:id` | SK+ | Edit item details |
| DELETE | `/api/smp/items/:id` | Admin | Delete item |
| POST | `/api/smp/items/:id/stock-in` | SK+ | Add stock units |
| POST | `/api/smp/items/:id/stock-out` | SK+ | Remove stock units |
| GET | `/api/smp/items/meta/categories` | Any | List categories |
| POST | `/api/smp/items/meta/categories` | Admin | Create category |
| GET | `/api/smp/items/:id/unique-ids` | Any | Get unique IDs for an item |
| GET | `/api/smp/items/unique-ids/all` | Any | Get all unique IDs |
| PATCH | `/api/smp/items/unique-ids/:uid` | SK+ | Update unique ID record |
| POST | `/api/smp/issued` | SK+ | Issue items to a person |
| GET | `/api/smp/issued` | Any | List issued records |
| GET | `/api/smp/issued/:id` | Any | Get single issued record |
| POST | `/api/smp/borrow` | SK+ | Create borrow record |
| GET | `/api/smp/borrow` | Any | List borrow records |
| PATCH | `/api/smp/borrow/:id/return` | SK+ | Process item return |
| POST | `/api/smp/borrow/reservations` | SK+ | Create reservation |
| GET | `/api/smp/borrow/reservations` | Any | List reservations |
| GET | `/api/smp/borrow/reservations/:id` | Any | Get single reservation |
| PATCH | `/api/smp/borrow/reservations/:id/approve` | Admin | Approve reservation |
| PATCH | `/api/smp/borrow/reservations/:id/activate` | SK+ | Activate reservation |
| PATCH | `/api/smp/borrow/reservations/:id/complete` | SK+ | Complete reservation |
| PATCH | `/api/smp/borrow/reservations/:id/cancel` | SK+ | Cancel reservation |
| POST | `/api/smp/disposal` | SK+ | Create disposal record |
| GET | `/api/smp/disposal` | Any | List disposal records |
| GET | `/api/smp/disposal/:id` | Any | Get single disposal |
| PATCH | `/api/smp/disposal/:id/approve` | Admin | Approve disposal |
| PATCH | `/api/smp/disposal/:id/status` | Admin | Set disposal status |
| GET | `/api/smp/reports/dashboard` | Any | Dashboard metrics |
| GET | `/api/smp/reports/transactions` | Any | Transaction log |
| GET | `/api/smp/reports/audit-logs` | Any | Audit log |
| GET | `/api/smp/reports/login-logs` | Any | Login history |
| GET | `/api/smp/reports/disposals` | Any | Disposal report |
| GET | `/api/smp/reports/value-summary` | Any | Stock value summary |
