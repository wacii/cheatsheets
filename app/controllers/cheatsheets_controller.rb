class CheatsheetsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @cheatsheets
  end

  def show
    render json: @cheatsheet
  end

  def create
    if @cheatsheet.save
      render json: @cheatsheet, status: 201
    else
      render json: { errors: @cheatsheet.errors }, status: 422
    end
  end

  def update
    if @cheatsheet.update_attributes(cheatsheet_params)
      render json: @cheatsheet, status: 200
    else
      render json: { errors: @cheatsheet.errors }, status: 422
    end
  end

  def destroy
    @cheatsheet.destroy
    head 200
  end

  private

  def cheatsheet_params
    params.require(:cheatsheet).permit(:title)
  end
end
