class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :cheatsheet, index: true, foreign_key: true
      t.string :name
      t.string :description
      t.integer :rank

      t.timestamps null: false
    end
  end
end
