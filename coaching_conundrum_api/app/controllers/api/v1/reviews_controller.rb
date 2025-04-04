class Api::V1::ReviewsController < ApplicationController

  def index
    @coach = User.find(params[:coach_id])

    render json: @coach.reviews_received
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render json: @review
    end
  end

  private

  def review_params
    params.require(:review).permit(:appointment_id, :user_id, :satisfaction_score, :description)
  end
end