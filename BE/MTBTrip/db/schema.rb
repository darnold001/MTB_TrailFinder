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

ActiveRecord::Schema.define(version: 2019_07_30_140951) do

  create_table "trails", force: :cascade do |t|
    t.string "name"
    t.string "summary"
    t.string "type"
    t.string "difficulty"
    t.float "stars"
    t.string "location"
    t.string "url"
    t.string "consitionStatus"
    t.string "conditionDate"
    t.string "img"
    t.float "length"
    t.float "ascent"
    t.float "descent"
    t.float "lat"
    t.float "long"
    t.float "apiid"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_trails_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.integer "trail_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trail_id"], name: "index_users_on_trail_id"
  end

end
