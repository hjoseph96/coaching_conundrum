class WelcomeController < ApplicationController
  def index
    render json: { message: "Welcome to Coaching Conundrum" }
  end
end