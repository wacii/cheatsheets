class ItemsController < ApplicationController
  load_and_authorize_resource :cheatsheet, only: [:index, :create]
  load_and_authorize_resource shallow: true, through: :cheatsheet

  def index
    render json: @items
  end

  def show
    render json: @item
  end

  def create
    if @item.save
      render json: @item, status: 201
    else
      render json: { errors: @item.errors }, status: 422
    end
  end

  def update
    if @item.update_attributes(item_params)
      render json: @item, status: 200
    else
      render json: { errors: @item.errors }, status: 422
    end
  end

  def destroy
    @item.destroy
    head 200
  end

  def insert_at
    @item.insert_at(params[:position].to_i)
    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:name, :description)
  end
end
