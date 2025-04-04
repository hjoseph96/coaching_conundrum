class Api::V1::AppointmentsController < ApplicationController
  def create
    @open_slot = OpenSlot.find(params[:open_slot_id])

    @appt = Appointment.new(appointment_params)

    if @appt.save
      @open_slot.destroy

      render json: @appt
    end
  end

  def update
    @appt = Appointment.find(params[:id])

    if @appt.update(appointment_params)
      render json: @appt
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(
      :start, :end, :booked_by_id, :coach_id, :status
    )
  end
end