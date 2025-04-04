class Api::V1::OpenSlotsController < ApplicationController
  def index
    @user = User.find(params[:user_id])

    if @user.present?
      @events = @user.event_data
    else
      render json: { error: "User not found", status: 404 }
    end

    render json: @events
  end

  def create
    @open_slot = OpenSlot.new(open_slot_params)

    if @open_slot.save
      render json: { success: true, open_slot: @open_slot }
    else
      render json: { error: @open_slot.errors.map(&:full_message).join(", ") }
    end
  end

  def update
    @open_slot = OpenSlot.find(params[:id])

    @open_slot.update(open_slot_params)

    render json: { success: true, open_slot: @open_slot }
  end

  def destroy
    @open_slot = OpenSlot.find(params[:id])

    if @open_slot.destroy
      render json: { success: true }
    end
  end

  private

  def open_slot_params
    params.require(:open_slot).permit(:start, :end, :user_id)
  end
end
