class ItemsController < ApplicationController
  def index
    @cheatsheet = Cheatsheet.find(params[:cheatsheet_id])
    @items = @cheatsheet.items
    render json: @items
  end

  def show
    @item = Item.find(params[:id])
    render json: @item
  end

  def create
    @cheatsheet = Cheatsheet.find(params[:cheatsheet_id])
    @item = @cheatsheet.items.build(item_params)
    if @item.save
      render json: @item, status: 201
    else
      render json: { errors: @item.errors }, status: 422
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item.update_attributes(item_params)
      render json: @item, status: 200
    else
      render json: { errors: @item.errors }, status: 422
    end
  end

  def destroy
    Item.find(params[:id]).destroy
    head 200
  end

  def insert_at
    @item = Item.find(params[:id])
    @item.insert_at(params[:position])
    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:name, :description)
  end
end
