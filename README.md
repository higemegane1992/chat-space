# データベース設計

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|VARCHAR(255)|null: false|

### Associaiton
- has_many :message
- has_many :group_user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|VARCHAR(255)|null: false|
|email|VARCHAR(255)|null: false, unique: true|
|password|VARCHAR(255)|null: false, unique: true|

### Association
- has_many :message
- has_many :group_user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|VARCHAR(255)||
|image|VARCHAR(255)||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user