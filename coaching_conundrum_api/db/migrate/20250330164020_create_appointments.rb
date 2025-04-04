class CreateAppointments < ActiveRecord::Migration[8.0]
  def change
    create_table :appointments, id: :uuid do |t|
      t.string :title
      t.integer :status, null: false, default: 0
      t.datetime :start
      t.datetime :end
      t.string :background_color
      t.uuid :booked_by_id, null: false
      t.uuid :coach_id, null: false

      t.timestamps
    end
    add_index :appointments, :booked_by_id
    add_index :appointments, :coach_id
  end
end
