# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150723024209) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.string  "answer"
    t.boolean "correct",     null: false
    t.integer "question_id", null: false
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "auths", force: :cascade do |t|
    t.string  "provider_id"
    t.string  "provider"
    t.integer "user_id"
  end

  add_index "auths", ["provider_id", "provider"], name: "index_auths_on_provider_id_and_provider", unique: true, using: :btree

  create_table "grades", force: :cascade do |t|
    t.integer  "correct_answers",     null: false
    t.integer  "number_of_questions", null: false
    t.integer  "quiz_id",             null: false
    t.integer  "user_id",             null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "grades", ["quiz_id"], name: "index_grades_on_quiz_id", using: :btree
  add_index "grades", ["user_id"], name: "index_grades_on_user_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string  "question", null: false
    t.integer "quiz_id",  null: false
  end

  add_index "questions", ["quiz_id"], name: "index_questions_on_quiz_id", using: :btree

  create_table "quizzes", force: :cascade do |t|
    t.string   "name",                      null: false
    t.integer  "user_id",                   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "edited",     default: true, null: false
  end

  add_index "quizzes", ["user_id"], name: "index_quizzes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                null: false
    t.string   "name",                 null: false
    t.string   "password_digest",      null: false
    t.string   "session_token",        null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
