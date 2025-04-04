class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :background_color, :booked_by_id, :coach_id, :status

  attributes :event_type, :client_phone, :coach_phone
  attributes :review, :left_review

  def event_type
    "appointment"
  end

  def client_phone
    object.client.phone_number
  end

  def coach_phone
    object.coach.phone_number
  end

  def review
    object.review
  end

  def left_review
    object.review.present?
  end
end
