class Appointment < ApplicationRecord
  before_create :set_title_and_background_color
  before_save :set_completed_color

  belongs_to :coach, foreign_key: :coach_id, class_name: "User"
  belongs_to :client, foreign_key: :booked_by_id, class_name: "User"

  has_one :review

  enum :status, %w(pending completed)


  private

  def set_title_and_background_color
    self.background_color = "#FFD580"
    self.title = "<APPT> #{coach.full_name} <> #{client.full_name}"
  end

  def set_completed_color
    self.background_color = "#808080" if changes[:status].try(:last) == "completed"
  end
end
