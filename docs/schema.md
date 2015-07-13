# Schema Information

## users
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
name            | string    | not null
password_digest | string    | not null
session_token   | string    | not null, unique


## quizs
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (refrences users)


## questions
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
quiz_id         | integer   | not null, foreign key (refrences quizs)
question        | text      | not null


## answers
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
question_id     | integer   | not null, foreign key (refrences questions)
answer          | string    | not null
correct         | boolean   | not null


## tags
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
name            | string    | not null


## tagable
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
name            | string    | not null
tag_id          | integer   | not null, foreign key (refrences tags)
quiz_id         | integer   | not null, foreign key (refrences quiz)


## quiz_views
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (user tags)
quiz_id         | integer   | not null, foreign key (refrences quiz)
last_viewed     | datetime  | not null



## quiz_scores
column name     | data type | details
------------------------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (user tags)
quiz_id         | integer   | not null, foreign key (refrences quiz)
score           | integer   | not null
created_at      | datetime  | not null
