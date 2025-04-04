class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :satisfaction_score, :description, :user_id
end
