class OpenSlot < ApplicationRecord
  belongs_to :user

  before_create :set_title

  private

  def set_title
    self.title = "#{self.user.full_name}'s Availability" if self.title.nil?
  end
end
