## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|email|string|null: false|

### Association
- has_many :messages
- has_many :groups, though:members
- has_many :members


### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :messages
- has_many :users, though:members
- has_many :members


### membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

