# Groupme API Endpoints
## Responses

```json
{
	response: { ... },
	meta: {
		code: 400,
		errors: ["Name is required"]
	}
}
```

response:

-The target or resulting object. Sometimes a list with additional meta data.

meta.code:

-For clients that cannot read HTTP status codes.

meta.errors:

-If you receive 4XX response codes, you can expect an array of errors.

Note: We omit the envelope for brevity when documenting responses.

Data Types

- IDs are unordered alphanumeric strings.

- Timestamps are integer seconds since the UNIX epoch.

- Phone numbers are sent as +<country  code>  <number>

Format

All data is sent and received as JSON.

While most requests will work as expected with standard HTTP params, it is especially important to send data as JSON in the request body to ensure consistent hash ordering (e.g. when sending multiple members).

Status Codes

We try to return the most appropriate HTTP status code.

|Code|Text|Description|
|--|--|--|
|200|OK|Success!|
|201|Created|Resource was created successfully.|
|204|No Content|Resource was deleted successfully.|
|304|Not Modified|There was no new data to return.|
|400|Bad Request|Returned when an invalid format or invalid data is specified in the request.|
|401|Unauthorized|Authentication credentials were missing or incorrect.|
|403|Forbidden|The request is understood, but it has been refused. An accompanying error message will explain why. This code is used when requests are being denied due to update limits.|
|404|Not Found|The URI requested is invalid or the resource requested, such as a user, does not exists.|
|420|Enhance Your Calm|Returned when you are being rate limited. Chill the heck out.|
|500|Internal Server Error|Something unexpected occurred. GroupMe will be notified.|
|502|Bad Gateway|GroupMe is down or being upgraded.|
|503|Service Unavailable|The GroupMe servers are up, but overloaded with requests. Try again later.|

## API Reference

## Groups
### Index

List the authenticated user's active groups.

The response is paginated, with a default of 10 groups per page.

Please consider using of omit=memberships parameter. Not including member lists might significantly improve user experience of your app for users who are participating in huge groups.

#### Request

GET /groups

#### Parameters

page

integer — Fetch a particular page of results. Defaults to 1.

per_page

integer — Define page size. Defaults to 10.

omit

string — Comma separated list of data to omit from output. Currently supported value is only "memberships". If used then response will contain empty (null) members field.

#### Responses

Status: 200 OK

1.  [
2.    {
3.    "id":  "1234567890",
4.    "name":  "Family",
5.    "type":  "private",
6.    "description":  "Coolest Family Ever",
7.    "image_url":  "https://i.groupme.com/123456789",
8.    "creator_user_id":  "1234567890",
9.    "created_at":  1302623328,
10.    "updated_at":  1302623328,
11.    "members":  [
12.    {
13.    "user_id":  "1234567890",
14.    "nickname":  "Jane",
15.    "muted":  false,
16.    "image_url":  "https://i.groupme.com/123456789"
17.    }
18.    ],
19.    "share_url":  "https://groupme.com/join_group/1234567890/SHARE_TOKEN",
20.    "messages":  {
21.    "count":  100,
22.    "last_message_id":  "1234567890",
23.    "last_message_created_at":  1302623328,
24.    "preview":  {
25.    "nickname":  "Jane",
26.    "text":  "Hello world",
27.    "image_url":  "https://i.groupme.com/123456789",
28.    "attachments":  [
29.    {
30.    "type":  "image",
31.    "url":  "https://i.groupme.com/123456789"
32.    },
33.    {
34.    "type":  "image",
35.    "url":  "https://i.groupme.com/123456789"
36.    },
37.    {
38.    "type":  "location",
39.    "lat":  "40.738206",
40.    "lng":  "-73.993285",
41.    "name":  "GroupMe HQ"
42.    },
43.    {
44.    "type":  "split",
45.    "token":  "SPLIT_TOKEN"
46.    },
47.    {
48.    "type":  "emoji",
49.    "placeholder":  "☃",
50.    "charmap":  [
51.    [
52.    1,
53.    42
54.    ],
55.    [
56.    2,
57.    34
58.    ]
59.    ]
60.    }
61.    ]
62.    }
63.    }
64.    }
65.  ]

### Former

List they groups you have left but can rejoin.

#### Request

GET /groups/former

#### Responses

Status: 200 OK

1.  [
2.    {
3.    "id":  "1234567890",
4.    "name":  "Family",
5.    "type":  "private",
6.    "description":  "Coolest Family Ever",
7.    "image_url":  "https://i.groupme.com/123456789",
8.    "creator_user_id":  "1234567890",
9.    "created_at":  1302623328,
10.    "updated_at":  1302623328,
11.    "members":  [
12.    {
13.    "user_id":  "1234567890",
14.    "nickname":  "Jane",
15.    "muted":  false,
16.    "image_url":  "https://i.groupme.com/123456789"
17.    }
18.    ],
19.    "share_url":  "https://groupme.com/join_group/1234567890/SHARE_TOKEN",
20.    "messages":  {
21.    "count":  100,
22.    "last_message_id":  "1234567890",
23.    "last_message_created_at":  1302623328,
24.    "preview":  {
25.    "nickname":  "Jane",
26.    "text":  "Hello world",
27.    "image_url":  "https://i.groupme.com/123456789",
28.    "attachments":  [
29.    {
30.    "type":  "image",
31.    "url":  "https://i.groupme.com/123456789"
32.    },
33.    {
34.    "type":  "image",
35.    "url":  "https://i.groupme.com/123456789"
36.    },
37.    {
38.    "type":  "location",
39.    "lat":  "40.738206",
40.    "lng":  "-73.993285",
41.    "name":  "GroupMe HQ"
42.    },
43.    {
44.    "type":  "split",
45.    "token":  "SPLIT_TOKEN"
46.    },
47.    {
48.    "type":  "emoji",
49.    "placeholder":  "☃",
50.    "charmap":  [
51.    [
52.    1,
53.    42
54.    ],
55.    [
56.    2,
57.    34
58.    ]
59.    ]
60.    }
61.    ]
62.    }
63.    }
64.    }
65.  ]

### Show

Load a specific group.

#### Request

GET /groups/:id

#### Parameters

id  required

string

#### Responses

Status: 200 OK

1.  {
2.    "id":  "1234567890",
3.    "name":  "Family",
4.    "type":  "private",
5.    "description":  "Coolest Family Ever",
6.    "image_url":  "https://i.groupme.com/123456789",
7.    "creator_user_id":  "1234567890",
8.    "created_at":  1302623328,
9.    "updated_at":  1302623328,
10.    "members":  [
11.    {
12.    "user_id":  "1234567890",
13.    "nickname":  "Jane",
14.    "muted":  false,
15.    "image_url":  "https://i.groupme.com/123456789"
16.    }
17.    ],
18.    "share_url":  "https://groupme.com/join_group/1234567890/SHARE_TOKEN",
19.    "messages":  {
20.    "count":  100,
21.    "last_message_id":  "1234567890",
22.    "last_message_created_at":  1302623328,
23.    "preview":  {
24.    "nickname":  "Jane",
25.    "text":  "Hello world",
26.    "image_url":  "https://i.groupme.com/123456789",
27.    "attachments":  [
28.    {
29.    "type":  "image",
30.    "url":  "https://i.groupme.com/123456789"
31.    },
32.    {
33.    "type":  "image",
34.    "url":  "https://i.groupme.com/123456789"
35.    },
36.    {
37.    "type":  "location",
38.    "lat":  "40.738206",
39.    "lng":  "-73.993285",
40.    "name":  "GroupMe HQ"
41.    },
42.    {
43.    "type":  "split",
44.    "token":  "SPLIT_TOKEN"
45.    },
46.    {
47.    "type":  "emoji",
48.    "placeholder":  "☃",
49.    "charmap":  [
50.    [
51.    1,
52.    42
53.    ],
54.    [
55.    2,
56.    34
57.    ]
58.    ]
59.    }
60.    ]
61.    }
62.    }
63.  }

## Members

### Results

Get the membership results from an  [add call](https://dev.groupme.com/docs/v3#members_add).

Successfully created memberships will be returned, including any GUIDs that were sent up in the add request. If GUIDs were absent, they are filled in automatically. Failed memberships and invites are omitted.

Keep in mind that results are  **temporary**  -- they will only be available for 1 hour after the add request.

#### Request

GET /groups/:group_id/members/results/:results_id

#### Parameters

results_id  required

string — This is the guid that's returned from an add request.

#### Responses

Status: 200 OK

1.  {
2.    "members":  [
3.    {
4.    "id":  "1000",
5.    "user_id":  "10000",
6.    "nickname":  "John",
7.    "muted":  false,
8.    "image_url":  "https://i.groupme.com/AVATAR",
9.    "autokicked":  false,
10.    "app_installed":  true,
11.    "guid":  "GUID-1"
12.    },
13.    {
14.    "id":  "2000",
15.    "user_id":  "20000",
16.    "nickname":  "Anne",
17.    "muted":  false,
18.    "image_url":  "https://i.groupme.com/AVATAR",
19.    "autokicked":  false,
20.    "app_installed":  true,
21.    "guid":  "GUID-2"
22.    }
23.    ]
24.  }

Status: 503 Service Unavailable

Results aren't ready. Try again in a little bit.

Status: 404 Not Found

Results are no longer available. Don't try again.

### Remove

Remove a member (or yourself) from a group.

Note: The creator of the group cannot be removed or exit.

#### Request

POST /groups/:group_id/members/:membership_id/remove

#### Parameters

membership_id  required

string — Please note that this isn't the same as the user ID. In the  `members`  key in the group JSON, this is the  `id`  value, not the  `user_id`.

#### Responses

Status: 200 OK

### Update

Update your nickname in a group. The nickname must be between 1 and 50 characters.

#### Request

POST /groups/:group_id/memberships/update

1.  {
2.    "membership":  {
3.    "nickname":  "NEW NICKNAME"
4.    }
5.  }

#### Responses

Status: 200 OK

1.  {
2.    "id":  "MEMBERSHIP ID",
3.    "user_id":  "USER ID",
4.    "nickname":  "NEW NICKNAME",
5.    "muted":  false,
6.    "image_url":  "AVATAR URL",
7.    "autokicked":  false,
8.    "app_installed":  true
9.  }

## Messages

### Index

Retrieve messages for a group.

By default, messages are returned in groups of 20, ordered by  `created_at`  descending. This can be raised or lowered by passing a  `limit`  parameter, up to a maximum of 100 messages.

Messages can be scanned by providing a message ID as either the  `before_id`,  `since_id`, or  `after_id`  parameter. If  `before_id`  is provided, then messages  _immediately preceding_  the given message will be returned, in descending order. This can be used to continually page back through a group's messages.

The  `after_id`  parameter will return messages that  _immediately follow_  a given message, this time in  _ascending order_  (which makes it easy to pick off the last result for continued pagination).

Finally, the  `since_id`  parameter also returns messages created after the given message, but it retrieves the  _most recent_  messages. For example, if more than twenty messages are created after the  `since_id`  message, using this parameter will omit the messages that immediately follow the given message. This is a bit counterintuitive, so take care.

If no messages are found (e.g. when filtering with  `before_id`) we return code  `304`.

Note that for historical reasons, likes are returned as an array of user ids in the  `favorited_by`  key.

#### Request

GET /groups/:group_id/messages

#### Parameters

before_id

string — Returns messages created before the given message ID

since_id

string — Returns most recent messages created after the given message ID

after_id

string — Returns messages created immediately after the given message ID

limit

integer — Number of messages returned. Default is 20. Max is 100.

#### Responses

Status: 200 OK

1.  {
2.    "count":  123,
3.    "messages":  [
4.    {
5.    "id":  "1234567890",
6.    "source_guid":  "GUID",
7.    "created_at":  1302623328,
8.    "user_id":  "1234567890",
9.    "group_id":  "1234567890",
10.    "name":  "John",
11.    "avatar_url":  "https://i.groupme.com/123456789",
12.    "text":  "Hello world ☃☃",
13.    "system":  true,
14.    "favorited_by":  [
15.    "101",
16.    "66",
17.    "1234567890"
18.    ],
19.    "attachments":  [
20.    {
21.    "type":  "image",
22.    "url":  "https://i.groupme.com/123456789"
23.    },
24.    {
25.    "type":  "image",
26.    "url":  "https://i.groupme.com/123456789"
27.    },
28.    {
29.    "type":  "location",
30.    "lat":  "40.738206",
31.    "lng":  "-73.993285",
32.    "name":  "GroupMe HQ"
33.    },
34.    {
35.    "type":  "split",
36.    "token":  "SPLIT_TOKEN"
37.    },
38.    {
39.    "type":  "emoji",
40.    "placeholder":  "☃",
41.    "charmap":  [
42.    [
43.    1,
44.    42
45.    ],
46.    [
47.    2,
48.    34
49.    ]
50.    ]
51.    }
52.    ]
53.    }
54.    ]
55.  }

### Create

Send a message to a group

If you want to attach an image, you must first process it through our  [image service](https://dev.groupme.com/docs/image_service).

Attachments of type  `emoji`  rely on data from emoji PowerUps.

Clients use a  `placeholder`  character in the message  `text`  and specify a replacement  `charmap`  to substitute emoji characters

The character map is an array of arrays containing rune data (`[[{pack_id,offset}],...]`).

The  `placeholder`  should be a high-point/invisible UTF-8 character.

#### Request

POST /groups/:group_id/messages

1.  {
2.    "message":  {
3.    "source_guid":  "GUID",
4.    "text":  "Hello world ☃☃",
5.    "attachments":  [
6.    {
7.    "type":  "image",
8.    "url":  "https://i.groupme.com/123456789"
9.    },
10.    {
11.    "type":  "image",
12.    "url":  "https://i.groupme.com/123456789"
13.    },
14.    {
15.    "type":  "location",
16.    "lat":  "40.738206",
17.    "lng":  "-73.993285",
18.    "name":  "GroupMe HQ"
19.    },
20.    {
21.    "type":  "split",
22.    "token":  "SPLIT_TOKEN"
23.    },
24.    {
25.    "type":  "emoji",
26.    "placeholder":  "☃",
27.    "charmap":  [
28.    [
29.    1,
30.    42
31.    ],
32.    [
33.    2,
34.    34
35.    ]
36.    ]
37.    }
38.    ]
39.    }
40.  }

#### Parameters

source_guid  required

string — Client-side IDs for messages. This can be used by clients to set their own identifiers on messages, but the server also scans these for de-duplication. That is, if two messages are sent with the same  `source_guid`  within one minute of each other, the second message will fail with a  `409 Conflict`  response.  _So it's important to set this to a unique value for each message._

text  required

string — This can be omitted if at least one  `attachment`  is present. The maximum length is  **1,000**  characters.

attachments

array — A polymorphic list of attachments (locations, images, etc). You may have You may have more than one of any type of attachment, provided clients can display it.

-   **object**
    -   **type**  (string) —  **“image”**  required
    -   **url**  (string)  required  — Must be an image service (i.groupme.com) URL
-   **object**
    -   **type**  (string) —  **“location”**  required
    -   **name**  (string)  required
    -   **lat**  (string)  required
    -   **lng**  (string)  required
-   **object**
    -   **type**  (string) —  **“split”**  required
    -   **token**  (string)  required
-   **object**
    -   **type**  (string) —  **“emoji”**  required
    -   **placeholder**  (string) —  **“☃”**  required
    -   **charmap**  (array) —  **“[{pack_id},{offset}]”**  required

#### Responses

Status: 201 Created

1.  {
2.    "message":  {
3.    "id":  "1234567890",
4.    "source_guid":  "GUID",
5.    "created_at":  1302623328,
6.    "user_id":  "1234567890",
7.    "group_id":  "1234567890",
8.    "name":  "John",
9.    "avatar_url":  "https://i.groupme.com/123456789",
10.    "text":  "Hello world ☃☃",
11.    "system":  true,
12.    "favorited_by":  [
13.    "101",
14.    "66",
15.    "1234567890"
16.    ],
17.    "attachments":  [
18.    {
19.    "type":  "image",
20.    "url":  "https://i.groupme.com/123456789"
21.    },
22.    {
23.    "type":  "image",
24.    "url":  "https://i.groupme.com/123456789"
25.    },
26.    {
27.    "type":  "location",
28.    "lat":  "40.738206",
29.    "lng":  "-73.993285",
30.    "name":  "GroupMe HQ"
31.    },
32.    {
33.    "type":  "split",
34.    "token":  "SPLIT_TOKEN"
35.    },
36.    {
37.    "type":  "emoji",
38.    "placeholder":  "☃",
39.    "charmap":  [
40.    [
41.    1,
42.    42
43.    ],
44.    [
45.    2,
46.    34
47.    ]
48.    ]
49.    }
50.    ]
51.    }
52.  }

## Chats

### Index

Returns a paginated list of direct message chats, or conversations, sorted by  `updated_at`  descending.

#### Request

GET /chats

#### Parameters

page

integer — Page number

per_page

integer — Number of chats per page

#### Responses

Status: 200 OK

1.  [
2.    {
3.    "created_at":  1352299338,
4.    "updated_at":  1352299338,
5.    "last_message":  {
6.    "attachments":  [

8.    ],
9.    "avatar_url":  "https://i.groupme.com/200x200.jpeg.abcdef",
10.    "conversation_id":  "12345+67890",
11.    "created_at":  1352299338,
12.    "favorited_by":  [

14.    ],
15.    "id":  "1234567890",
16.    "name":  "John Doe",
17.    "recipient_id":  "67890",
18.    "sender_id":  "12345",
19.    "sender_type":  "user",
20.    "source_guid":  "GUID",
21.    "text":  "Hello world",
22.    "user_id":  "12345"
23.    },
24.    "messages_count":  10,
25.    "other_user":  {
26.    "avatar_url":  "https://i.groupme.com/200x200.jpeg.abcdef",
27.    "id":  12345,
28.    "name":  "John Doe"
29.    }
30.    }
31.  ]

## Likes

### Create

Like a message.

#### Request

POST /messages/:conversation_id/:message_id/like

#### Responses

Status: 200 OK

### Destroy

Unlike a message.

#### Request

POST /messages/:conversation_id/:message_id/unlike

#### Responses

Status: 200 OK

## Bots

### Create

Create a bot. See our  [Bots Tutorial](https://dev.groupme.com/tutorials/bots)  for a full walkthrough.

#### Request

POST /bots

#### Parameters

bot[name]  required

string

bot[group_id]  required

string

bot[avatar_url]

string

bot[callback_url]

string

bot[dm_notification]

boolean

bot[active]  required

boolean

#### Responses

Status: 201 Created

1.  {
2.    "bot_id":  "1234567890",
3.    "group_id":  "1234567890",
4.    "name":  "hal9000",
5.    "avatar_url":  "https://i.groupme.com/123456789",
6.    "callback_url":  "https://example.com/bots/callback",
7.    "dm_notification":  false,
8.    "active":  true
9.  }

### Post a Message

Post a message from a bot

#### Request

POST /bots/post

#### Parameters

bot_id  required

string

text  required

string

picture_url

string — Image must be processed through  [image service](https://dev.groupme.com/docs/image_service).

#### Responses

Status: 201 Created

### Index

List bots that you have created

#### Request

GET /bots

#### Responses

Status: 200 OK

1.  [
2.    {
3.    "bot_id":  "1234567890",
4.    "group_id":  "1234567890",
5.    "name":  "hal9000",
6.    "avatar_url":  "https://i.groupme.com/123456789",
7.    "callback_url":  "https://example.com/bots/callback",
8.    "dm_notification":  false,
9.    "active":  true
10.    }
11.  ]

### Destroy

Remove a bot that you have created

#### Request

POST /bots/destroy

#### Parameters

bot_id  required

#### Responses

Status: 200 OK

## Users

### Me

Get details about the authenticated user

#### Request

GET /users/me

#### Responses

Status: 200 OK

1.  {
2.    "id":  "1234567890",
3.    "phone_number":  "+1 2123001234",
4.    "image_url":  "https://i.groupme.com/123456789",
5.    "name":  "Ronald Swanson",
6.    "created_at":  1302623328,
7.    "updated_at":  1302623328,
8.    "email":  "me@example.com",
9.    "sms":  false
10.  }

### Update

Update attributes about your own account

#### Request

POST /users/update

1.  {
2.    "avatar_url":  "https://4.bp.blogspot.com/-GAeMYT8SZoI/TtBTK209xMI/AAAAAAAAWts/5nmvpmmvoWo/s1600/TopGun_059Pyxurz.jpg",
3.    "name":  "Tom Skerritt",
4.    "email":  "viper@topgun.usaf.mil",
5.    "zip_code":  "92145"
6.  }

#### Parameters

avatar_url

string — URL to valid JPG/PNG/GIF image. URL will be converted into an image service link (https://i.groupme.com/....)

name

string — Name must be of the form FirstName LastName

email

string — Email address. Must be in name@domain.com form.

zip_code

string — Zip code.

#### Responses

Status: 200 OK

1.  {
2.    "id":  "1234567890",
3.    "phone_number":  "+1 2123001234",
4.    "image_url":  "https://i.groupme.com/123456789",
5.    "name":  "Ronald Swanson",
6.    "created_at":  1302623328,
7.    "updated_at":  1302623328,
8.    "email":  "me@example.com",
9.    "sms":  false
10.  }

## Blocks

### Index

A list of contacts you have blocked. These people cannot DM you.

#### Request

GET /blocks?user=<your user id>

#### Responses

Status: 200 OK

1.  {
2.    "blocks":  [
3.    {
4.    "user_id":  "1234567890",
5.    "blocked_user_id":  "1234567890",
6.    "created_at":  1302623328
7.    }
8.    ]
9.  }

### Block Between

Asks if a block exists between you and another user id

#### Request

GET /blocks/between?user=<you>&otherUser=<other user>

#### Responses

Status: 200 OK

1.  {
2.    "between":  true
3.  }

### Create Block

Creates a block between you and the contact

#### Request

POST /blocks?user=<you>&otherUser=<other user>

#### Parameters

user  required

string — your user id.

otherUser  required

string — user id of person you want to block.

#### Responses

Status: 201 Created

1.  {
2.    "block":  {
3.    "user_id":  "1234567890",
4.    "blocked_user_id":  "1234567890",
5.    "created_at":  1302623328
6.    }
7.  }

### Unblock

Removes block between you and other user

#### Request

DELETE /blocks?user=<you>&otherUser=<other user>

#### Responses

Status: 200 OK

### Unblock

Removes block between you and other user

#### Request

POST /blocks/delete?user=<you>&otherUser=<other user>

#### Responses

Status: 200 OK

## Image Service
# Image Service

https://image.groupme.com

Images uploaded to image service will return a URL that looks like this:

https://i.groupme.com/{width}x{height}.{format}.{id}

Where {width} and {height} are in pixels, {format} is for example "png" or "jpeg" and {id} is a unique id e.g.

https://i.groupme.com/480x325.jpeg.9e20b71dd6af4b58bbd132d4a7dec009

## To try this out via cURL:

Store your access token in the GM_TOKEN environment variable first.

curl 'https://image.groupme.com/pictures' -X POST -H "X-Access-Token: $GM_TOKEN" -H "Content-Type: image/jpeg" --data-binary @AwesomePicture.jpg

## Thumbnails

Images are automatically thumbnailed at the following sizes:

suffix

size

example

preview

200x200, centered and cropped

https://i.groupme.com/100x100.png.123456789.preview

large

960x960, preserve aspect ratio so largest side is 960

https://i.groupme.com/100x100.png.123456789.large

avatar

60x60, centered and cropped

https://i.groupme.com/100x100.png.123456789.avatar

## Pictures

### Pictures

Upload image data

We will process, store, and thumbnail it

#### Request

POST /pictures

1.  "... binary image data..."

#### Parameters

access_token  required

string

#### Responses

Status: 200 OK

1.  {
2.    "payload":  {
3.    "url":  "https://i.groupme.com/123456789",
4.    "picture_url":  "https://i.groupme.com/123456789"
5.    }
6.  }