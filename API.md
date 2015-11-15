# APIs

## Session

### GET /refresh

新しいSessionが返されます。このリクエストに利用したSessionを破棄され、利用できなくなります。

#### Request

none

#### Response

```json
{
  "result": {
    "session": Session
  }
}
```

### POST /generate

`User#email`、password文字列を用いて、新しいSessionを生成して返します。

#### Request

```json
{
  "email": "",
  "password": ""
}
```

#### Response

```json
{
  "result": {
    "session": Session
  }
}
```

### DELETE /destory

リクエストに利用したSessionを破棄します。破棄されたSessionは利用できなくなります。

#### Request

none

#### Response

```json
{
  "result": {
  }
}
```

## Article

### GET /

Articleのリストが返されます。

#### Request URL Query

- `page` - ページ番号。`(page - 1) * perPage`件目から取得しはじめます。
- `perPage` - 何件で1ページとするかの数値。

```json
{
  "page": 1,
  "perPage": 30,
}
```

#### Response

```json
{
  "result": {
    "articles": [...Article]
  }
}
```

### GET /:id

指定のArticleを返されます。

#### Request URL Params

- `id` - 対象となるArticleの`Article#id`。

#### Response

```json
{
  "result": {
    "article": Article
  }
}
```

### PUT /:id

対象のArticleを更新します。更新後のArticleが返されます。

#### Request URL Params

- `id` - 対象となるArticleの`Article#id`。

#### Request Body

```json
{
  "article": Article
}
```

- `article`に参照されているArticleの`Article#id`は無視されます。

#### Response

```json
{
  "result": {
    "article": Article
  }
}
```

### DELETE /:id

対象のArticleを削除します。

#### Request URL Params

- `id` -  対象となるArticleの`Article#id`。

#### Response

```json
{
  "result": {
  }
}
```

### POST /

新しいArticleを作成します。作成されたのArticleが返されます。

#### Request

```json
{
  "article": Article
}
```

- `article`に参照されているArticleの`Article#id`は無視されます。

#### Response

```json
{
  "result": {
    "article": Article
  }
}
```

## Tag

### GET /

Tagのリストを取得します。

#### Request URL Query

- `page` - ページ番号。`(page - 1) * perPage`件目から取得しはじめます。
- `parPage` - 何件で1ページとするかの数値。
- `filter` - フィルタ条件。
    - `nameStartsBy` - `Tag#name`に対する前方一致。
    - ~~`nameIncludesBy` - `Tag#name`に対する部分一致。~~

#### Response

```json
{
  "tags": [...Tag]
}
```

### GET /:id

指定のTagを取得します。

#### Request URL Params

- `id` - 対象となるTagの`Tag#id`。

#### Response Body

```json
{
  "result": {
    "tag": Tag
  }
}
```

### PUT /:id

指定のTagを更新します。更新後のTagが返ります。

#### Request URL Params

- `id` - 対象となるTagの`Tag#id`。

#### Request Body

```json
{
  "tag": Tag
}
```

- `article`に参照されているArticleの`Article#id`は無視されます。

#### Response

```json
{
  "result": {
    "tag": Tag
  }
}
```

### DELETE /:id

指定のTagを削除します。

#### Request URL Params

- `id` - 対象となるTagの`Tag#id`。

#### Response

```json
{
  "result": {
  }
}
```

### POST /

新しいTagを作成します。作成されたTagが返されます。

#### Request Body

```json
{
  "tag": Tag
}
```

#### Response

```json
{
  "result": {
    "tag": Tag
  }
}
```

## Image

### GET /:key

指定の画像ファイルが返されます。

#### Request URL Params

- `key` - 対象となる

### DELETE /:key

### POST /upload

画像ファイルをアップロードします。作成されたImageが返されます。

#### Request Body

```json
{
  "base64": "a base64 encoded string from an image"
}
```

#### Response

```json
{
  "image": Image
}
```
