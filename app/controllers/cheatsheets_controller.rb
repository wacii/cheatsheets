class CheatsheetsController < ApplicationController
  def index
    @cheatsheets = Cheatsheet.all
    render json: @cheatsheets
  end

  def show
    @cheatsheet = Cheatsheet.find(params[:id])
    render json: @cheatsheet
  end

  def create
    @cheatsheet = Cheatsheet.new(cheatsheet_params)
    if @cheatsheet.save
      render json: @cheatsheet, status: 201
    else
      render json: { errors: @cheatsheet.errors }, status: 422
    end
  end

  def update
    @cheatsheet = Cheatsheet.find(params[:id])
    if @cheatsheet.update_attributes(cheatsheet_params)
      render json: @cheatsheet, status: 200
    else
      render json: { errors: @cheatsheet.errors }, status: 422
    end
  end

  def destroy
    Cheatsheet.find(params[:id]).destroy
    head 200
  end

  private

  def cheatsheet_params
    params.require(:cheatsheet).permit(:title)
  end
end
