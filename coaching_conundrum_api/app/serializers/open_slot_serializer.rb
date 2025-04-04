class OpenSlotSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :user_id, :event_type

  def event_type
    "open_slot"
  end
end
