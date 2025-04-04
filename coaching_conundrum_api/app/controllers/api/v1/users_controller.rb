class Api::V1::UsersController < ApplicationController
  include Devise::Controllers::SignInOut

  before_action :sign_out, if: :signed_in?

  def create
    case sign_in_params[:user_type]
    when "basketball_coach"
      @user = User.find_by(email: "basketball_coach@example.com")
    when "life_coach"
      @user = User.find_by(email: "life_coach@example.com")
    when "test_user_1"
      @user = User.find_by(email: "testuser1@example.com")
    when "test_user_2"
      @user = User.find_by(email: "testuser2@example.com")
    else
      render json: { error: "Invalid user_type given"}
      return
    end

    sign_in(@user)

    render json: { user: @user }
  end

  private

  def sign_in_params
    params.require(:user).permit(:user_type)
  end
end