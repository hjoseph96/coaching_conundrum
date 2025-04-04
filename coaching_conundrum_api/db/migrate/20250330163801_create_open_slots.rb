class CreateOpenSlots < ActiveRecord::Migration[8.0]
  def change
    create_table :open_slots, id: :uuid do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
    add_index :open_slots, :start
    add_index :open_slots, :end
  end
end
